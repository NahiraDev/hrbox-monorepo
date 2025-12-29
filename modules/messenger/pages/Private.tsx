import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { RootState } from "@hrbox/core/redux/store";
import TextBox from "@hrbox/modules/messenger/components/TextBox";
import EmptyChat from "@hrbox/modules/messenger/components/EmptyChat";
import TextMessage from "@hrbox/modules/messenger/components/Messages/TextMessage";
import PhotoMessage from "@hrbox/modules/messenger/components/Messages/PhotoMessage";
import FileMessage from "@hrbox/modules/messenger/components/Messages/FileMessage";
import AudioMessage from "@hrbox/modules/messenger/components/Messages/AudioMessage";
import LinkMessage from "@hrbox/modules/messenger/components/Messages/LinkMessage";
import { useWebSocket } from "@hrbox/core/providers/SignalRWebSocket";
import {
  useFetchChatMessagesQuery,
  useFetchUserChatsQuery,
  useMarkMessageAsSeenMutation
} from "@hrbox/modules/messenger/apis/Private";
import { debounce } from "lodash";
import { MessageTypes } from "@hrbox/modules/messenger/types";

const PrivateChatPage = () => {
  const dispatch = useDispatch();
  const { messages } = useWebSocket();

  const [isMarkingSeen, setIsMarkingSeen] = useState(false);

  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen
  );
  const privateChatProfile = useSelector(
    (state: RootState) => state.profile.profile
  );

  const reply = useSelector((state: RootState) => state.messageAction.reply);

  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const myProfile = JSON.parse(localStorage.getItem("profile")!);


  const [markMessageAsSeen] = useMarkMessageAsSeenMutation();
  const { data: privateChatMessages, refetch: refetchChatMessages } = useFetchChatMessagesQuery();
  const { refetch: refetchUserChats } = useFetchUserChatsQuery(
    { chat_id: privateChatProfile?.chat_id || "" },
    { skip: !privateChatProfile?.user_id }
  );
  const pinnedMessage = privateChatMessages.find((message: { pinned: any; }) => message.pinned);

  const handleSeen = useCallback(
    debounce(async () => {
      if (isMarkingSeen) return;

      const unseenMessages = privateChatMessages.filter(
        (msg) =>
          msg.status === "delivered" && msg.sender_id !== myProfile.user_id
      );

      if (unseenMessages.length > 0) {
        setIsMarkingSeen(true);
        try {
          await markMessageAsSeen({
            message_id: unseenMessages[unseenMessages.length - 1]?.id,
            chat_id: privateChatProfile?.chat_id
          }).unwrap();
        } catch (error) {
          console.error("Failed to mark messages as seen", error);
        }
        setIsMarkingSeen(false);
      }
    }, 1000),
    [privateChatMessages]
  );

  useEffect(() => {
    if (messages.length > 0) {
      const uniqueMessages = messages.filter(
        (msg) => !privateChatMessages.some((prevMsg: { id: any; }) => prevMsg.id === msg.id)
      );
    }
  }, [messages, privateChatMessages, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting,
      { threshold: 1.0 }
    );

    if (chatContainerRef.current) observer.observe(chatContainerRef.current);

    return () => {
      if (chatContainerRef.current)
        observer.unobserve(chatContainerRef.current);
    };
  }, [chatContainerRef]);

  useEffect(() => {
    refetchChatMessages();
    if (privateChatProfile?.user_id) {
      refetchUserChats();
    }
  }, [privateChatProfile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && !isMarkingSeen && handleSeen(),
      { threshold: 1.0 }
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
    [myProfile.user_id]
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
};

export default PrivateChatPage;