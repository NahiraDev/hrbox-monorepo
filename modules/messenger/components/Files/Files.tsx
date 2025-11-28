import { Button } from "@nextui-org/react";
import { Folder, ImportCurve, Repeat } from "iconsax-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useWebSocket } from "../../context/SignalRWebSocket";
import { MessageTypes } from "../../types";

// Reusable component for the download button with different states
const DownloadButton = ({
  isDownloading,
  handleDownload,
  handleCancelDownload,
  fileUrl,
}: {
  isDownloading: boolean;
  handleDownload: (fileUrl: string) => void;
  handleCancelDownload: () => void;
  fileUrl: string;
}) => (
  <Button
    isIconOnly
    color="primary"
    onClick={() =>
      isDownloading ? handleCancelDownload() : handleDownload(fileUrl)
    }
    className="dark:bg-surface-200 dark:hover:bg-primary hover:bg-secondary-400 shadow-light-tight/1 absolute top-[1.7rem] left-[1.8rem] min-w-4 w-4 h-4 rounded-2"
  >
    {isDownloading ? (
      <Repeat color="white" size="11" />
    ) : (
      <ImportCurve color="white" size="11" />
    )}
  </Button>
);

// Reusable component for displaying file name and size
const FileInfo = ({
  fileName,
  fileSize,
  createdAt,
}: {
  fileName: string;
  fileSize: string;
  createdAt: string;
}) => (
  <div className="flex flex-col justify-center space-y-1">
    <span className="font-semibold text-xs leading-4 dark:text-white text-secondary-1000 text-ellipsis overflow-hidden">
      {fileName}
    </span>
    <span className="font-light text-xs leading-4 dark:text-white text-secondary-1000">
      {fileSize}, {createdAt}
    </span>
  </div>
);

const Files: React.FC = () => {
  const { messages } = useWebSocket();
  const [messageList, setMessageList] = useState<MessageTypes[]>([]);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const recipient = useSelector((state: RootState) => state.profile.profile);
  const isOpen = useSelector(
    (state: RootState) => state.messengerAction.isOpen,
  );

  // Fetch user messages from Redux store
  const userMessages: MessageTypes[] = useSelector(
    (state: RootState) => state.privateChat?.messages || [],
  );

  // Handle file download
  const handleDownload = (fileUrl: string) => {
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = ""; // Set filename if needed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloading(false); // Reset downloading status after download
  };

  // Cancel downloading action
  const handleCancelDownload = () => {
    setIsDownloading(false);
  };

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

  // Shorten file names for display
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
          if (item.type === "file") {
            return (
              <div key={index} className="flex justify-start gap-3 items-start">
                <div className="flex justify-center items-start relative">
                  <div className="rounded-lg w-[38px] h-[38px] flex justify-center items-center bg-primary-400 hover:bg-surface-200">
                    <Folder color="white" variant="Bold" />
                  </div>
                  <DownloadButton
                    isDownloading={isDownloading}
                    handleDownload={handleDownload}
                    handleCancelDownload={handleCancelDownload}
                    fileUrl={item.file || ""}
                  />
                </div>
                <FileInfo
                  fileName={shortenFileName(item.file_name || "", 20)}
                  fileSize={item.file_size || ""}
                  createdAt={item.created_at || ""}
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

export default Files;
