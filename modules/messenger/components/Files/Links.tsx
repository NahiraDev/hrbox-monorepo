import { Button, Link } from "@nextui-org/react";
import { Link2 } from "iconsax-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useWebSocket } from "../../context/SignalRWebSocket";
import { MessageTypes } from "../../types";

// Reusable component for displaying link and associated button
const LinkMessage = ({ link }: { link: string }) => (
  <div className="flex justify-start gap-3 items-center">
    <div className="flex justify-center items-center">
      <Button
        isIconOnly
        color="primary"
        className="rounded-lg w-[38px] h-full p-2 bg-primary-400 dark:hover:bg-surface-200"
      >
        <Link2 color="white" />
      </Button>
    </div>
    <div className="flex flex-col justify-center space-y-1">
      <span className="font-normal text-xs leading-4 dark:text-white text-secondary-1000">
        {link}
      </span>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={link}
        className="font-light text-xs underline leading-4 text-info-400"
      >
        {link}
      </Link>
    </div>
  </div>
);

const Links: React.FC = () => {
  const { messages } = useWebSocket();
  const [messageList, setMessageList] = useState<MessageTypes[]>([]);

  const recipient = useSelector((state: RootState) => state.profile.profile);
  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen,
  );

  // Fetch user messages from Redux store
  const userMessages: MessageTypes[] = useSelector(
    (state: RootState) => state.privateChat?.messages || [],
  );

  // Load messages when recipient or chat state changes
  const loadMessages = () => {
    if (isOpen) {
      setMessageList(userMessages);
    }
  };

  useEffect(() => {
    if (recipient) {
      loadMessages();
    }
  }, [recipient, isOpen]);

  // Update message list with unique messages
  useEffect(() => {
    if (messages.length > 0) {
      setMessageList((prevMessages) => {
        const uniqueMessages = messages.filter(
          (msg) => !prevMessages.some((prevMsg) => prevMsg.id === msg.id),
        );
        return [...prevMessages, ...uniqueMessages];
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-3">
      {messageList.length > 0 ? (
        messageList.map((item: MessageTypes, index: number) => {
          if (item.type === "link") {
            return <LinkMessage key={index} link={item.link} />;
          }
          return null; // Return null for non-link messages
        })
      ) : (
        <p>No links available</p>
      )}
    </div>
  );
};

export default Links;
