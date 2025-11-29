import { Button } from "@nextui-org/react";
import { Play, Repeat, ImportCurve } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useWebSocket } from "../../context/SignalRWebSocket";
import { MessageTypes } from "../../types";

const AudioButton = ({
  isDownloading,
  handleDownload,
  audioUrl,
}: {
  isDownloading: boolean;
  handleDownload: (fileUrl: string) => void;
  audioUrl: string;
}) => (
  <>
    <Button
      isIconOnly
      color="primary"
      className="rounded-lg w-[38px] h-[38px] p-2 dark:bg-surface-200"
      onClick={() => handleDownload(audioUrl)}
    >
      <Play color="white" variant="Bold" />
    </Button>
    <Button
      isIconOnly
      color="primary"
      onClick={() => handleDownload(audioUrl)}
      className={`dark:bg-surface-200 dark:hover:bg-primary hover:bg-secondary-400 hover:!opacity-100 shadow-medium absolute top-[1.7rem] left-[1.8rem] min-w-4 w-4 h-4 !rounded-2 p-0.5 ${isDownloading ? "hidden" : ""}`}
    >
      <ImportCurve color="white" size="10" />
    </Button>
    {isDownloading && (
      <Button
        isIconOnly
        color="primary"
        onClick={() => handleDownload(audioUrl)}
        className="dark:bg-surface-200 dark:hover:bg-primary bg-primary-400 hover:bg-secondary-400 absolute hover:!opacity-100 top-[1.7rem] left-[1.8rem] min-w-4 w-4 h-4 !rounded-2 p-0.5"
      >
        <Repeat color="white" size="10" />
      </Button>
    )}
  </>
);

const AudioFileInfo = ({
  fileName,
  fileSize,
}: {
  fileName: string;
  fileSize: string;
}) => (
  <div className="flex flex-col justify-center space-y-1">
    <span className="font-semibold text-xs leading-4 dark:text-white text-secondary-1000">
      {fileName}
    </span>
    <span className="font-light text-xs leading-4 dark:text-white text-secondary-1000">
      {fileSize}
    </span>
  </div>
);

const Audios: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const { messages } = useWebSocket();
  const [messageList, setMessageList] = useState<MessageTypes[]>([]);

  const recipient = useSelector((state: RootState) => state.profile.profile);
  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen,
  );
  const userMessages: MessageTypes[] = useSelector(
    (state: RootState) => state.privateChat.messages || [],
  );

  const loadMessages = () => {
    if (isOpen) {
      setMessageList(userMessages);
    }
  };

  const handleDownload = (fileUrl: string) => {
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloading(false);
  };

  useEffect(() => {
    if (recipient) {
      loadMessages();
    }
  }, [recipient, isOpen]);

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

  const shortenFileName = (fileName: string, maxLength: number): string => {
    if (fileName.length <= maxLength) return fileName;

    const start = fileName.slice(0, 10);
    const end = fileName.slice(-10);
    return `${start}...${end}`;
  };

  return (
    <div className="flex flex-col gap-3">
      {messageList.length > 0 ? (
        messageList.map((item: MessageTypes, index: number) => {
          if (item.type === "audio") {
            return (
              <div
                className="flex justify-start gap-3 items-center"
                key={index}
              >
                <div className="flex justify-center items-center relative">
                  <AudioButton
                    isDownloading={isDownloading}
                    handleDownload={handleDownload}
                    audioUrl={item.audio || ""}
                  />
                </div>
                <AudioFileInfo
                  fileName={shortenFileName(item.file_name || "", 20)}
                  fileSize={item.file_size || ""}
                />
              </div>
            );
          }
          return null;
        })
      ) : (
        <p>No files available</p>
      )}
    </div>
  );
};

export default Audios;
