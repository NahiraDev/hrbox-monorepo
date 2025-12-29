import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { RootState } from "@hrbox/core/redux";
import ChannelFooter from "@hrbox/modules/messenger/components/ChannelFooter";
import { useWebSocket } from "@hrbox/core/providers/SignalRWebSocket";
import TextMessage from "@hrbox/modules/messenger/components/Messages/TextMessage";
import PhotoMessage from "@hrbox/modules/messenger/components/Messages/PhotoMessage";
import FileMessage from "@hrbox/modules/messenger/components/Messages/FileMessage";
import AudioMessage from "@hrbox/modules/messenger/components/Messages/AudioMessage";
import LinkMessage from "@hrbox/modules/messenger/components/Messages/LinkMessage";
import TextBox from "@hrbox/modules/messenger/components/TextBox";
import EmptyChat from "@hrbox/modules/messenger/components/EmptyChat";
import { MessageTypes } from "@hrbox/modules/messenger/types";
import { MessageProps } from "@hrbox/modules/messenger/components/Messages";
import {
  useFetchChannelChatsQuery,
  useFetchChannelsQuery,
  useMarkMessageAsSeenMutation
} from "@hrbox/modules/messenger/apis/Channel";

export default function ChannelPage() {
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

  const { data: channelsData } = useFetchChannelsQuery();
  const { data: channelChatsData } = useFetchChannelChatsQuery(
    { channel_id: userProfile?.chat_id || "" },
    { skip: !userProfile?.chat_id }
  );
  const [markMessageAsSeen] = useMarkMessageAsSeenMutation();

  const loadMessages = async () => {
    if (channelChatsData?.messages) {
      setMessageList(channelChatsData.messages);
    }
  };

  const loadMoreMessages = async () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSeen = useCallback(
    debounce(async () => {
      if (isMarkingSeen) return;

      const unseenMessages = messageList.filter(
        (msg: MessageTypes) =>
          msg.status === "delivered" && msg.sender_id !== myProfile.sender_id
      );

      if (unseenMessages.length > 0) {
        const latestMessageId = unseenMessages[unseenMessages.length - 1]?.id;
        setIsMarkingSeen(true);
        try {
          await markMessageAsSeen({
            message_id: latestMessageId,
            channel_id: userProfile?.chat_id
          }).unwrap();
        } catch (error) {
          console.error("Failed to mark messages as seen", error);
        }
        setIsMarkingSeen(false);
      }
    }, 1000),
    [messageList, isMarkingSeen, myProfile.sender_id, userProfile?.chat_id, markMessageAsSeen]
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
  }, [channelChatsData, userProfile]);

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

  return (
    <div className="overflow-y-auto h-full max-h-[calc(100vh-100px)] !p-0 scrollbar-hidden flex flex-col-reverse">
      <div ref={chatContainerRef} />
      {userProfile !== null ? (
        <div className={`${isOpen ? "w-[calc(100%-256px)]" : "w-full"}`}>
          <div className="flex flex-col gap-4 my-24">
            {messageList &&
              messageList.length > 0 &&
              messageList.map((message: MessageProps & any, index: number) => (
                <div key={message.id || index}>
                  {message.type === "text" ? (
                    <TextMessage
                      message={message}
                      isSent={message.sender_id === myProfile.user_id}
                    />
                  ) : message.type === "image" ? (
                    <PhotoMessage
                      message={message}
                      isSent={message.sender_id === myProfile.user_id}
                    />
                  ) : message.type === "file" ? (
                    <FileMessage
                      message={message}
                      isSent={message.sender_id === myProfile.user_id}
                    />
                  ) : message.type === "audio" ? (
                    <AudioMessage
                      message={message}
                      isSent={message.sender_id === myProfile.user_id}
                    />
                  ) : (
                    <LinkMessage
                      message={message}
                      isSent={message.sender_id === myProfile.user_id}
                    />
                  )}
                </div>
              ))}
            <div ref={messageEndRef} />
            {myProfile?.user_id === userProfile?.sender_id ? (
              <div className="absolute w-full px-6 bottom-3 items-center z-50">
                <TextBox />
              </div>
            ) : (
              <ChannelFooter />
            )}
          </div>
        </div>
      ) : (
        <EmptyChat />
      )}
    </div>
  );
}