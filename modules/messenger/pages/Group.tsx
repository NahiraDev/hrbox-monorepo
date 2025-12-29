import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import TextBox from "@hrbox/modules/messenger/components/TextBox";
import EmptyChat from "@hrbox/modules/messenger/components/EmptyChat";
import TextMessage from "@hrbox/modules/messenger/components/Messages/TextMessage";
import PhotoMessage from "@hrbox/modules/messenger/components/Messages/PhotoMessage";
import FileMessage from "@hrbox/modules/messenger/components/Messages/FileMessage";
import AudioMessage from "@hrbox/modules/messenger/components/Messages/AudioMessage";
import LinkMessage from "@hrbox/modules/messenger/components/Messages/LinkMessage";
import { useWebSocket } from "@hrbox/core/providers/SignalRWebSocket";
import {
  useFetchGroupChatsQuery,
  useFetchGroupsQuery,
  useMarkMessageAsSeenGroupChatMutation
} from "@module/messenger/apis/Group";
import { debounce } from "lodash";
import { MessageTypes } from "@hrbox/modules/messenger/types";
import { RootState } from "@hrbox/core/redux";

export default function GroupPage() {
  const { messages } = useWebSocket();
  const [messageList, setMessageList] = useState<MessageTypes[]>([]);
  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen
  );
  const groupProfile = useSelector((state: RootState) => state.profile.profile);
  const profile = JSON.parse(localStorage.getItem("profile")!);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isMarkingSeen, setIsMarkingSeen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pinnedMessage: MessageTypes | undefined =
    messageList &&
    messageList.find(
      (message: MessageTypes) => message.pinned === true && message
    );
  const reply = useSelector((state: RootState) => state.messageAction.reply);
  const filteredMessages = useSelector(
    (state: RootState) => state.messageAction.filteredMessages
  );

  useFetchGroupsQuery();
  const { data: groupChatsData } = useFetchGroupChatsQuery(
    { group_id: groupProfile?.chat_id || "" },
    { skip: !groupProfile?.user_id }
  );
  const [markMessageAsSeen] = useMarkMessageAsSeenGroupChatMutation();

  const loadMoreMessages = () =>
    setCurrentPage((prevPage: number) => prevPage + 1);

  const handleSeen = useCallback(
    debounce(async () => {
      if (isMarkingSeen) return;

      const unseenMessages = messageList.filter(
        (msg: MessageTypes) =>
          msg.status === "delivered" && msg.sender_id !== profile.user_id
      );

      if (unseenMessages.length > 0) {
        setIsMarkingSeen(true);
        try {
          await markMessageAsSeen({
            message_id: unseenMessages[unseenMessages.length - 1]?.id,
            group_id: groupProfile?.chat_id
          }).unwrap();
        } catch (error) {
          console.error("Failed to mark messages as seen", error);
        }
        setIsMarkingSeen(false);
      }
    }, 1000),
    [messageList]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMoreMessages(),
      { threshold: 1.0 }
    );

    if (chatContainerRef.current) {
      observer.observe(chatContainerRef.current);
    }

    return () => {
      if (chatContainerRef.current) {
        observer.unobserve(chatContainerRef.current);
      }
    };
  }, [chatContainerRef]);

  useEffect(() => {
    setMessageList(filteredMessages);

    setMessageList((prevMessages: MessageTypes[]) => [
      ...prevMessages,
      ...messages.filter(
        (msg: any) => !prevMessages.some((prevMsg) => prevMsg.id === msg.id)
      )
    ]);

    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && !isMarkingSeen && handleSeen(),
      { threshold: 1.0 }
    );

    if (messageEndRef.current) observer.observe(messageEndRef.current);

    return () => {
      if (messageEndRef.current) {
        observer.unobserve(messageEndRef.current);
      }
    };
  }, [messages, groupProfile]);

  const renderMessage = (message: MessageTypes) => {
    const isSent = message.sender_id === profile.user_id;

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
  };

  return (
    <div className="overflow-y-auto h-full max-h-[calc(100vh-100px)] !p-0 scrollbar-hidden flex flex-col-reverse">
      <div ref={chatContainerRef} />

      {groupProfile !== null ? (
        <div className={`${isOpen ? "w-[calc(100%-256px)]" : "w-full"}`}>
          <div
            className={`flex flex-col gap-4 ${pinnedMessage ? "mt-40 mb-24" : "my-24"} ${reply && "!mb-32"}`}
          >
            {messageList.map(renderMessage)}
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