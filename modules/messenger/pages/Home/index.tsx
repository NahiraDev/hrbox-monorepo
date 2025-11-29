import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import EmptyChat from "../../../components/EmptyChat";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  handleFetchSaveMessages,
  handleFetchSaveMessagesApi,
} from "../../../services/Messenger/SaveMessageService/apis";
import { useWebSocket } from "../../../context/SignalRWebSocket";
import TextMessage from "../../../components/Messages/TextMessage";
import PhotoMessage from "../../../components/Messages/PhotoMessage";
import FileMessage from "../../../components/Messages/FileMessage";
import AudioMessage from "../../../components/Messages/AudioMessage";
import LinkMessage from "../../../components/Messages/LinkMessage";
import TextBox from "../../../components/TextBox";
import { debounce } from "lodash";
import {
  handleFetchChatMessageApi,
  handleFetchUserChatsApi,
  handleMarkMessageAsSeenPrivateChatApi,
} from "../../../services/Messenger/PrivateChatService/apis";
import {
  handleFetchGroupsApi,
  handleMarkMessageAsSeenGroupChatApi,
} from "../../../services/Messenger/GroupChatService/apis";
import {
  handleFetchChannelsApi,
  handleMarkMessageAsSeenChannelChatApi,
} from "../../../services/Messenger/ChannelChatService/apis";
import { MessageTypes } from "../../../types";

export default function HomePage() {
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
    (state: RootState) => state.privateChat.messages,
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
          msg.status === "delivered" && msg.sender_id !== myProfile.user_id,
      );

      if (userProfile?.chat_type === "private") {
        if (unseenMessages.length > 0) {
          const latestMessageId = unseenMessages[unseenMessages.length - 1]?.id;
          setIsMarkingSeen(true);
          try {
            await dispatch(
              handleMarkMessageAsSeenPrivateChatApi({
                message_id: latestMessageId,
                chat_id: userProfile?.chat_id,
              }),
            ).unwrap();
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
            await dispatch(
              handleMarkMessageAsSeenGroupChatApi({
                message_id: latestMessageId,
                group_id: userProfile?.chat_id,
              }),
            ).unwrap();
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
    dispatch(handleFetchChatMessageApi());
    dispatch(handleFetchGroupsApi());
    dispatch(handleFetchChannelsApi());
    dispatch(handleFetchSaveMessagesApi());
  }, []);

  useEffect(() => {
    if (userProfile?.user_id) {
      dispatch(
        handleFetchUserChats({
          chat_id: userProfile.chat_id || "",
        }),
      );
    }
  }, [userProfile?.user_id]);

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
}
