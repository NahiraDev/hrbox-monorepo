import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import TextBox from "../../../components/TextBox";
import EmptyChat from "../../../components/EmptyChat";
import TextMessage from "../../../components/Messages/TextMessage";
import PhotoMessage from "../../../components/Messages/PhotoMessage";
import FileMessage from "../../../components/Messages/FileMessage";
import AudioMessage from "../../../components/Messages/AudioMessage";
import LinkMessage from "../../../components/Messages/LinkMessage";
import { useWebSocket } from "../../../context/SignalRWebSocket";
import {
  handleFetchChatMessageApi,
  handleFetchUserChatsApi,
  handleMarkMessageAsSeenPrivateChatApi,
} from "../../../services/Messenger/PrivateChatService/apis";
import { debounce } from "lodash";
import { MessageTypes } from "../../../types";
import { addMessages } from "../../../services/Messenger/PrivateChatService/slices.ts";

export default function PrivateChatPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { messages } = useWebSocket();

  // State management
  const [isMarkingSeen, setIsMarkingSeen] = useState(false);

  // Selectors
  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen,
  );
  const privateChatProfile = useSelector(
    (state: RootState) => state.profile.profile,
  );
  const privateChatMessages = useSelector(
    (state: RootState) => state.privateChat.messages,
  );

  const reply = useSelector((state: RootState) => state.messageAction.reply);

  // Refs
  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Profile
  const myProfile = JSON.parse(localStorage.getItem("profile")!);

  // Pinned Message
  const pinnedMessage = privateChatMessages.find((message) => message.pinned);

  const handleSeen = useCallback(
    debounce(async () => {
      if (isMarkingSeen) return;

      const unseenMessages = privateChatMessages.filter(
        (msg) =>
          msg.status === "delivered" && msg.sender_id !== myProfile.user_id,
      );

      if (unseenMessages.length > 0) {
        setIsMarkingSeen(true);
        try {
          await dispatch(
            handleMarkMessageAsSeenPrivateChatApi({
              message_id: unseenMessages[unseenMessages.length - 1]?.id,
              chat_id: privateChatProfile?.chat_id,
            }),
          ).unwrap();
        } catch (error) {
          console.error("Failed to mark messages as seen", error);
        }
        setIsMarkingSeen(false);
      }
    }, 1000),
    [privateChatMessages],
  );

  useEffect(() => {
    if (messages.length > 0) {
      const uniqueMessages = messages.filter(
        (msg) => !privateChatMessages.some((prevMsg) => prevMsg.id === msg.id),
      );

      if (uniqueMessages.length > 0) {
        dispatch(addMessages(uniqueMessages));
      }
    }
  }, [messages, privateChatMessages, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting,
      { threshold: 1.0 },
    );

    if (chatContainerRef.current) observer.observe(chatContainerRef.current);

    return () => {
      if (chatContainerRef.current)
        observer.unobserve(chatContainerRef.current);
    };
  }, [chatContainerRef]);

  useEffect(() => {
    dispatch(handleFetchChatMessageApi());
    if (privateChatProfile?.user_id) {
      dispatch(
        handleFetchUserChatsApi({ chat_id: privateChatProfile.chat_id || "" }),
      );
    }
  }, [privateChatProfile]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && !isMarkingSeen && handleSeen(),
      { threshold: 1.0 },
    );

    if (messageEndRef.current) observer.observe(messageEndRef.current);

    return () => {
      if (messageEndRef.current) observer.unobserve(messageEndRef.current);
    };
  }, [handleSeen]);

  const renderMessage = useCallback(
    (message: MessageTypes) => {
      const isSent = message.sender_id === myProfile.user_id;

      switch (message.type) {
        case "text":
          return (
            <TextMessage key={message.id} message={message} isSent={isSent} />
          );
        case "image":
          return (
            <PhotoMessage key={message.id} message={message} isSent={isSent} />
          );
        case "file":
          return (
            <FileMessage key={message.id} message={message} isSent={isSent} />
          );
        case "audio":
          return (
            <AudioMessage key={message.id} message={message} isSent={isSent} />
          );
        case "link":
          return (
            <LinkMessage key={message.id} message={message} isSent={isSent} />
          );
        default:
          return null;
      }
    },
    [myProfile.user_id],
  );

  return (
    <div className="overflow-y-auto h-full max-h-[calc(100vh-100px)] !p-0 scrollbar-hidden flex flex-col-reverse">
      <div ref={chatContainerRef} />

      {privateChatProfile && privateChatProfile?.user_id ? (
        <div className={`${isOpen ? "w-[calc(100%-256px)]" : "w-full"}`}>
          <div
            className={`flex flex-col gap-4 ${pinnedMessage ? "mt-40 mb-24" : "my-24"} ${reply && "!mb-32"}`}
          >
            {privateChatMessages.map(renderMessage)}
            <div ref={messageEndRef} />
            <div className="absolute w-full px-6 bottom-3 items-center z-50">
              <TextBox />
            </div>
          </div>
        </div>
      ) : (
        <EmptyChat />
      )}
    </div>
  );
}
