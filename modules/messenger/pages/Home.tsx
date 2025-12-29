import { useSelector } from "react-redux";
import { RootState } from "@hrbox/core/redux/store";
import EmptyChat from "@hrbox/modules/messenger/components/EmptyChat";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFetchSaveMessagesQuery } from "@hrbox/modules/messenger/apis/SaveMessage";
import { useWebSocket } from "@hrbox/core/providers/SignalRWebSocket";
import TextMessage from "@hrbox/modules/messenger/components/Messages/TextMessage";
import PhotoMessage from "@hrbox/modules/messenger/components/Messages/PhotoMessage";
import FileMessage from "@hrbox/modules/messenger/components/Messages/FileMessage";
import AudioMessage from "@hrbox/modules/messenger/components/Messages/AudioMessage";
import LinkMessage from "@hrbox/modules/messenger/components/Messages/LinkMessage";
import TextBox from "@hrbox/modules/messenger/components/TextBox";
import { debounce } from "lodash";
import {
  useFetchChatMessagesQuery,
  useFetchUserChatsQuery,
  useMarkMessageAsSeenMutation as useMarkMessageAsSeenPrivateChatMutation
} from "@hrbox/modules/messenger/apis/Private";
import { useFetchGroupsQuery, useMarkMessageAsSeenGroupChatMutation } from "@hrbox/modules/messenger/apis/Group";
import {
  useFetchChannelsQuery,
  useMarkMessageAsSeenMutation as useMarkMessageAsSeenChannelMutation
} from "@hrbox/modules/messenger/apis/Channel";
import { MessageTypes } from "@hrbox/modules/messenger/types";

const HomePage = () => {
  const { messages } = useWebSocket();
  const [messageList, setMessageList] = useState<MessageTypes[]>([]);
  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen
  );
  const userProfile = useSelector((state: RootState) => state.profile.profile);
  const myProfile = JSON.parse(localStorage.getItem("profile")!);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isMarkingSeen, setIsMarkingSeen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { data: allChats } = useFetchChatMessagesQuery();
  useFetchGroupsQuery();
  useFetchChannelsQuery();
  useFetchSaveMessagesQuery();
  useFetchUserChatsQuery(
    { chat_id: userProfile?.chat_id || "" },
    { skip: !userProfile?.user_id }
  );
  const [markMessageAsSeenPrivateChat] = useMarkMessageAsSeenPrivateChatMutation();
  const [markMessageAsSeenGroupChat] = useMarkMessageAsSeenGroupChatMutation();
  const [markMessageAsSeenChannel] = useMarkMessageAsSeenChannelMutation();

  const loadMessages = async () => {
    setMessageList(allChats);
  };

  const loadMoreMessages = async () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSeen = useCallback(
    debounce(async () => {
      if (isMarkingSeen) return;

      const unseenMessages = messageList.filter(
        (msg: MessageTypes) =>
          msg.status === "delivered" && msg.sender_id !== myProfile.user_id
      );

      if (userProfile?.chat_type === "private") {
        if (unseenMessages.length > 0) {
          const latestMessageId = unseenMessages[unseenMessages.length - 1]?.id;
          setIsMarkingSeen(true);
          try {
            await markMessageAsSeenPrivateChat({
              message_id: latestMessageId,
              chat_id: userProfile?.chat_id
            }).unwrap();
          } catch (error) {
            console.error("Failed to mark messages as seen", error);
          }
          setIsMarkingSeen(false);
        }
      } else if (userProfile?.chat_type === "group") {
        if (unseenMessages.length > 0) {
          const latestMessageId = unseenMessages[unseenMessages.length - 1]?.id;
          setIsMarkingSeen(true);
          try {
            await markMessageAsSeenGroupChat({
              message_id: latestMessageId,
              group_id: userProfile?.chat_id
            }).unwrap();
          } catch (error) {
            console.error("Failed to mark messages as seen", error);
          }
          setIsMarkingSeen(false);
        }
      } else if (userProfile?.chat_type === "channel") {
        if (unseenMessages.length > 0) {
          const latestMessageId = unseenMessages[unseenMessages.length - 1]?.id;
          setIsMarkingSeen(true);
          try {
            await markMessageAsSeenChannel({
              message_id: latestMessageId,
              channel_id: userProfile?.chat_id
            }).unwrap();
          } catch (error) {
            console.error("Failed to mark messages as seen", error);
          }
          setIsMarkingSeen(false);
        }
      }
    }, 1000),
    [messageList]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreMessages();
        }
      },
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
    loadMessages();
  }, [allChats, userProfile]);

  useEffect(() => {
    setMessageList((prevMessages: MessageTypes[]) => {
      const uniqueMessages = messages.filter(
        (msg: MessageTypes) =>
          !prevMessages.some((prevMsg: MessageTypes) => prevMsg.id === msg.id)
      );
      return [...prevMessages, ...uniqueMessages];
    });
  }, [messages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isMarkingSeen) {
          handleSeen();
        }
      },
      { threshold: 1.0 }
    );

    if (messageEndRef.current) {
      observer.observe(messageEndRef.current);
    }

    return () => {
      if (messageEndRef.current) {
        observer.unobserve(messageEndRef.current);
      }
    };
  }, [handleSeen]);

  const renderMessage = (message: MessageTypes) => {
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
  };

  return (
    <div className="overflow-y-auto h-full max-h-[calc(100vh-100px)] !p-0 scrollbar-hidden flex flex-col-reverse">
      <div ref={chatContainerRef} />

      {userProfile !== null ? (
        <div className={`${isOpen ? "w-[calc(100%-256px)]" : "w-full"}`}>
          <div className="flex flex-col gap-4 my-24">
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
};

export default HomePage;