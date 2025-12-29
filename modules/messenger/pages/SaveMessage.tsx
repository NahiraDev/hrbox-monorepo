import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "@hrbox/core/redux/store";
import TextBox from "@hrbox/modules/messenger/components/TextBox";
import EmptyChat from "@hrbox/modules/messenger/components/EmptyChat";
import { useWebSocket } from "@hrbox/core/providers/SignalRWebSocket";
import TextMessage from "@hrbox/modules/messenger/components/Messages/TextMessage";
import PhotoMessage from "@hrbox/modules/messenger/components/Messages/PhotoMessage";
import FileMessage from "@hrbox/modules/messenger/components/Messages/FileMessage";
import AudioMessage from "@hrbox/modules/messenger/components/Messages/AudioMessage";
import LinkMessage from "@hrbox/modules/messenger/components/Messages/LinkMessage";
import { handleFetchSaveMessagesApi } from "@hrbox/modules/messenger/services/Messenger/SaveMessageService/apis";
import { MessageTypes } from "@hrbox/modules/messenger/types";

export default function SaveMessagePage() {
  const { messages } = useWebSocket();
  const [messageList, setMessageList] = useState<MessageTypes[]>([]);
  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen
  );
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.profile.profile);
  const myProfile = JSON.parse(localStorage.getItem("profile")!);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const saveMessage = useSelector(
    (state: RootState) => state.saveMessage.messages
  );

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
  useEffect(() => {
    if (userProfile) {
      loadMessages();
    }
  }, [userProfile]);

  const loadMessages = async () => {
    setMessageList(saveMessage);
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessageList((prevMessages: MessageTypes[]) => {
        const uniqueMessages = messages.filter(
          (msg: MessageTypes) =>
            !prevMessages.some(
              (prevMsg: MessageTypes) => prevMsg.id === msg.id
            )
        );
        return [...prevMessages, ...uniqueMessages];
      });
    }
  }, [messages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    dispatch(handleFetchSaveMessagesApi());
  }, []);
  return (
    <div
      ref={chatContainerRef}
      className="overflow-y-auto h-full max-h-[calc(100vh-100px)] !p-0 scrollbar-hidden"
    >
      {saveMessage !== null ? (
        <div className={`${isOpen ? "w-[calc(100%-256px)]" : "w-full"}`}>
          <div className="flex flex-col gap-4 my-24">
            {messageList.map(renderMessage)}
            <div className="absolute w-full px-6 bottom-3 items-center z-50">
              <TextBox />
            </div>
          </div>
        </div>
      ) : (
        <EmptyChat />
      )}
      <div ref={messageEndRef} />
    </div>
  );
}
