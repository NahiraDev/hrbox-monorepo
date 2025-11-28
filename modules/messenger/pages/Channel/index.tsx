import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import TextBox from "../../../components/TextBox";
import EmptyChat from "../../../components/EmptyChat";
import TextMessage from "../../../components/Messages/TextMessage";
import { MessageProps } from "../../../components/Messages/types";
import PhotoMessage from "../../../components/Messages/PhotoMessage";
import FileMessage from "../../../components/Messages/FileMessage";
import AudioMessage from "../../../components/Messages/AudioMessage";
import LinkMessage from "../../../components/Messages/LinkMessage";
import { useWebSocket } from "../../../context/SignalRWebSocket";
import {
  handleFetchChannelChatsApi,
  handleFetchChannelsApi,
  handleMarkMessageAsSeenChannelChatApi
} from "../../../services/Messenger/ChannelChatService/apis";
import { debounce } from "lodash";
import { AppDispatch, RootState } from "@hrbox/core/redux";
import ChannelFooter from "@hrbox/modules/messenger/components/ChannelFooter";

export default function ChannelPage() {
  const { messages } = useWebSocket();
  const [messageList, setMessageList] = useState<MessageTypes[]>([]);
  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen,
  );
  const userProfile = useSelector((state: RootState) => state.profile.profile);
  const myProfile = JSON.parse(localStorage.getItem("profile")!);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isMarkingSeen, setIsMarkingSeen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const allChats: MessageTypes[] | any = useSelector(
    (state: RootState) => state.channels?.channels,
  );
  const dispatch = useDispatch<AppDispatch>();

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
          msg.status === "delivered" && msg.sender_id !== myProfile.sender_id,
      );

      if (unseenMessages.length > 0) {
        const latestMessageId = unseenMessages[unseenMessages.length - 1]?.id;
        setIsMarkingSeen(true);
        try {
          await dispatch(
            handleMarkMessageAsSeenChannelChatApi({
              message_id: latestMessageId,
              channel_id: userProfile?.chat_id,
            }),
          ).unwrap();
        } catch (error) {
          console.error("Failed to mark messages as seen", error);
        }
        setIsMarkingSeen(false);
      }
    }, 1000),
    [messageList],
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreMessages();
        }
      },
      { threshold: 1.0 },
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
    dispatch(handleFetchChannelsApi());
  }, []);

  useEffect(() => {
    if (userProfile?.chat_id) {
      dispatch(
        handleFetchChannelChatsApi({
          channel_id: userProfile.chat_id || "",
        }),
      );
    }
  }, [userProfile?.chat_id]);

  useEffect(() => {
    setMessageList((prevMessages: MessageTypes[]) => {
      const uniqueMessages = messages.filter(
        (msg: MessageTypes) =>
          !prevMessages.some((prevMsg: MessageTypes) => prevMsg.id === msg.id),
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
      { threshold: 1.0 },
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
                <div>
                  <div key={index}>
                    {message.type === "text" ? (
                      <TextMessage
                        key={index}
                        message={message}
                        isSent={message.sender_id === myProfile.user_id}
                      />
                    ) : message.type === "image" ? (
                      <PhotoMessage
                        key={index}
                        message={message}
                        isSent={message.sender_id === myProfile.user_id}
                      />
                    ) : message.type === "file" ? (
                      <FileMessage
                        key={index}
                        message={message}
                        isSent={message.sender_id === myProfile.user_id}
                      />
                    ) : message.type === "audio" ? (
                      <AudioMessage
                        key={index}
                        message={message}
                        isSent={message.sender_id === myProfile.user_id}
                      />
                    ) : (
                      <LinkMessage
                        key={index}
                        message={message}
                        isSent={message.sender_id === myProfile.user_id}
                      />
                    )}
                  </div>
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
