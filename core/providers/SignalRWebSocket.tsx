import { createContext, useContext, useEffect, useRef, useState } from "react";
import { RootState } from "@hrbox/core/redux/store";
import { useSelector } from "react-redux";
import { MessageTypes } from "@hrbox/modules/messenger/types";

interface WebSocketContextType {
  messages: MessageTypes[];
  isConnected: boolean;
  socket: WebSocket | null;
  sendMessage: (message: MessageTypes) => Promise<void>;
  setMessages: React.Dispatch<React.SetStateAction<MessageTypes[]>>;
  typingStatus: string;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const SignalRContextProvider = ({
                                         children
                                       }: {
  children: React.ReactNode;
}) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [typingStatus, setTypingStatus] = useState<string>("");

  const baseUrl = import.meta.env.VITE_HRBOX_URL;
  const profile = useSelector((state: RootState) => state?.profile?.profile);

  const typingResetTimer = useRef<NodeJS.Timeout | null>(null);
  const typingResetDelay = 1000;

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:4000");

    socketRef.current.onopen = () => setIsConnected(true);

    socketRef.current.onmessage = (event) => handleMessage(event);

    socketRef.current.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed");
    };

    return () => {
      socketRef.current?.close();
      clearTimeout(typingResetTimer.current!);
    };
  }, []);

  const handleMessage = (event: MessageEvent) => {
    const messageData: MessageTypes = JSON.parse(event.data);

    if (
      messageData?.type === "isTyping" &&
      messageData?.sender_id !== profile?.user_id
    ) {
      handleTypingStatus();
    }

    addMessageIfNotDuplicate(messageData);
  };

  const handleTypingStatus = () => {
    setTypingStatus("is typing");

    if (typingResetTimer.current) {
      clearTimeout(typingResetTimer.current);
    }

    typingResetTimer.current = setTimeout(() => {
      setTypingStatus("");
    }, typingResetDelay);
  };

  const addMessageIfNotDuplicate = (messageData: MessageTypes) => {
    setMessages((prevMessages) => {
      if (!prevMessages.some((msg) => msg.id === messageData.id)) {
        return [...prevMessages, messageData];
      }
      return prevMessages;
    });
  };

  const generateId = (): string => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 4 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  };

  const sendMessage = async (message: MessageTypes) => {
    if (!socketRef.current || !isConnected) {
      console.error("WebSocket is not connected");
      return;
    }

    const newMessage: MessageTypes = createMessagePayload(message);

    socketRef.current.send(JSON.stringify(newMessage));

    try {
      await updateServerWithNewMessage(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("Error saving message to server:", error);
    }
  };

  const createMessagePayload = (message: MessageTypes): MessageTypes => ({
    id: generateId(),
    chat_type: profile?.chat_type || "private",
    type: message.type,
    created_at: message.created_at,
    status: "delivered",
    sender_id: message.sender_id,
    recipient_id: message.recipient_id,
    ...(message.type === "text" && { text: message.text }),
    ...(message.type === "link" && { link: message.link }),
    ...(message.type === "file" && {
      file: message.file,
      file_name: message.file_name,
      file_size: message.file_size
    }),
    ...(message.type === "audio" && {
      audio: message.audio,
      file_name: message.file_name,
      file_size: message.file_size
    }),
    ...(message.reply_type && {
      reply_type: message.reply_type,
      reply_data: message.reply_data,
      reply_file_name: message.reply_file_name,
      reply_message_id: message.reply_message_id
    }),
    ...(message.caption && { caption: message.caption })
  });

  // Update the server with the new message
  const updateServerWithNewMessage = async (newMessage: MessageTypes) => {
    type ChatType = "private" | "group" | "channel" | "save";

    const baseUrlMap: Record<ChatType, string> = {
      private: `/chats/${profile?.chat_id}`,
      group: `/groups/${profile?.chat_id}`,
      channel: `/channels/${profile?.chat_id}`,
      save: `/saveMessages/${profile?.chat_id}`
    };

    const chatResponse = await fetch(
      `${baseUrl}${baseUrlMap[newMessage.chat_type as ChatType]}`
    );

    if (!chatResponse.ok) throw new Error("Failed to fetch existing chats");

    const existingChats = await chatResponse.json();

    if (existingChats.length > 0 || existingChats.messages) {
      const currentMessages =
        existingChats[0]?.messages || existingChats.messages || [];

      currentMessages.push(newMessage);

      await fetch(`${baseUrl}${baseUrlMap[newMessage.chat_type as ChatType]}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages })
      });
    } else {
      throw new Error("Chat not found");
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        messages,
        isConnected,
        socket: socketRef.current,
        sendMessage,
        setMessages,
        typingStatus
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error(
      "useWebSocket must be used within a SignalRContextProvider"
    );
  }

  return context;
};
