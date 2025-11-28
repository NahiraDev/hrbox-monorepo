import { Image } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useWebSocket } from "../../context/SignalRWebSocket";
import { useEffect, useState } from "react";
import { MessageTypes } from "../../types";

// Reusable component to display a single image message
const PhotoItem = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    className="!rounded-2 object-cover"
    width={66}
    height={66}
    src={src}
    alt={alt}
  />
);

const Photos = () => {
  const { messages } = useWebSocket();
  const [messageList, setMessageList] = useState<MessageTypes[]>([]);

  const recipient = useSelector((state: RootState) => state.profile.profile);
  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen,
  );
  const userMessages: MessageTypes[] | any = useSelector(
    (state: RootState) => state.privateChat?.messages || [],
  );

  // Load messages when recipient or chat state changes
  const loadMessages = async () => {
    if (isOpen) {
      setMessageList(userMessages);
    }
  };

  useEffect(() => {
    if (recipient) {
      loadMessages();
    }
  }, [messages, isOpen]);

  // Update message list with unique messages
  useEffect(() => {
    if (messages.length > 0) {
      setMessageList((prevMessages: MessageTypes[]) => {
        const uniqueMessages = messages.filter(
          (msg) =>
            !prevMessages.some(
              (prevMsg: MessageTypes) => prevMsg.id === msg.id,
            ),
        );
        return [...prevMessages, ...uniqueMessages];
      });
    }
  }, [messages]);

  return (
    <div className="grid grid-cols-3 justify-center items-center gap-1.5">
      {messageList.length > 0 ? (
        messageList.map((item: any, index: number) => {
          if (item.type === "image") {
            return (
              <PhotoItem key={index} src={item?.image} alt={item?.image} />
            );
          }
          return null;
        })
      ) : (
        <p>No Files available</p>
      )}
    </div>
  );
};

export default Photos;
