import { Avatar, Button, Image, Link, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import DoubleCheck from "@hrbox/uikit/icons/DoubleCheck";
import { useEffect, useRef, useState } from "react";
import { Folder, ImportCurve, Play, Repeat } from "iconsax-reactjs";
import Reaction from "./Reaction";
import { closeReplyMessageAction, setHighlightedMessageId, setMessageId } from "@hrbox/core/redux/slices/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@hrbox/core/redux/store";
import { Check } from "@hrbox/uikit/icons/Check";
import { ElementTypes, MessageTypes } from "../../types";

const AudioMessage = ({
                        message,
                        isSent
                      }: {
  message: MessageTypes;
  isSent: boolean;
}) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isOpenMessageAction, setIsOpenMessengerAction] =
    useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const myProfile = JSON.parse(localStorage.getItem("profile") || "{}");
  const profile = useSelector((state: RootState) => state.profile.profile);
  const date = new Date(message.created_at || "");
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const highlightedMessageId = useSelector(
    (state: RootState) => state.messageAction.highlighted_message_id
  );

  const handleIsDownloading = (status: boolean) => {
    setIsDownloading(status);
  };

  const handleOpenReactPopover = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(closeReplyMessageAction());
    setIsOpenMessengerAction(!isOpenMessageAction);
    dispatch(setMessageId(message.id || ""));
  };

  const handleDownload = (fileUrl: string) => {
    handleIsDownloading(true);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      handleIsDownloading(false);
    }, 2000);
  };
  const shortenFileName = (file_name: string, maxLength: number) => {
    if (file_name.length <= maxLength) {
      return file_name;
    }
    const start = file_name.slice(0, 10);
    const end = file_name.slice(-10);
    return `${start}...${end}`;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpenMessengerAction(false);
    }
  };
  return (
    <div
      id={`${message?.id}`}
      className={`${highlightedMessageId === message.id ? "bg-primary-0 bg-opacity-50 transition duration-500 ease-in-out" : highlightedMessageId === message?.reply_message_id ? "bg-primary-0 bg-opacity-50 transition duration-500 ease-in-out" : ""}`}
    >
      <div className={`relative w-fit ${isSent ? "ml-auto mr-12" : "ml-12"}`}>
        <Popover
          isDismissable={!isOpenMessageAction}
          isOpen={isOpenMessageAction}
          ref={popoverRef}
        >
          <PopoverTrigger>
            <div
              className={`flex ${isSent ? "flex-row-reverse justify-end" : "gap-4"}`}
              onContextMenu={handleOpenReactPopover}
            >
              {!isSent && (
                <Avatar src={profile?.image} className="w-11 h-11 !rounded-2" />
              )}
              <div className="w-[320px]">
                <div
                  className={`flex ${isSent && "flex-row-reverse"} justify-between items-end text-secondary-1000 text-xs font-light leading-normal mb-[5px]`}
                >
                  <div className="flex">
                    <Avatar
                      src={profile?.image}
                      className="!w-8 !h-8 !rounded-2"
                    />
                  </div>
                  <span
                    className="text-secondary-1000 dark:text-white text-xs font-light">{`${hours}:${minutes < 10 ? "0" + minutes : minutes}`}</span>
                </div>
                {message.reply_data && (
                  <div
                    onClick={() => {
                      const element = document.getElementById(
                        message?.reply_message_id || ""
                      );
                      if (element) {
                        const scrollOptions: ElementTypes = {
                          behavior: "smooth",
                          block: "center",
                          inline: "nearest"
                        };
                        element.scrollIntoView(scrollOptions);
                        dispatch(
                          setHighlightedMessageId(
                            message?.reply_message_id || ""
                          )
                        );
                      }
                      setTimeout(() => {
                        dispatch(setHighlightedMessageId(""));
                      }, 3000);
                    }}
                    className="border-l-2 border-primary-700 gap-2.5 flex items-center mb-2"
                  >
                    <div>
                      {message.reply_type === "image" ? (
                        <Image
                          src={message.reply_data}
                          radius="sm"
                          className="w-8"
                        />
                      ) : message.reply_type === "file" ? (
                        <div className="rounded-lg w-8 h-8 p-1.5 bg-primary-400 dark:hover:bg-surface-200">
                          <Folder color="white" size="20" variant="Bold" />
                        </div>
                      ) : message.reply_type === "audio" ? (
                        <div className="rounded-lg w-8 h-8 p-1.5 bg-primary-400 dark:bg-surface-200">
                          <Play color="white" size="20" variant="Bold" />
                        </div>
                      ) : message.reply_type === "text" ? (
                        <span className="text-secondary-1000 dark:text-white">
                          {message?.reply_message_data}
                        </span>
                      ) : (
                        <Link
                          target="_blank"
                          href={message.link}
                          className="text-info-400 text-xs font-light leading-normal underline"
                        >
                          {message?.reply_message_data}
                        </Link>
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-primary-700 leading-4">
                        {message.sender_id !== myProfile?.user_id
                          ? profile?.name
                          : myProfile.name}
                      </span>
                      <span className="text-[10px] font-medium text-secondary-1000 leading-4">
                        {message.reply_type === "text" ||
                          (message.reply_type === "link"
                            ? message.reply_data
                            : message.reply_file_name)}
                      </span>
                    </div>
                  </div>
                )}
                <div
                  className={`rounded-4 ${isSent ? "!rounded-tr-none bg-primary-0 dark:bg-primary-700" : "!rounded-tl-none bg-white dark:bg-info-1000"} px-4 py-2 flex flex-col gap-2`}
                >
                  <div className="flex justify-between gap-0.5 items-end">
                    <div className="flex justify-center gap-3 relative">
                      <Button
                        isIconOnly
                        color="primary"
                        className="rounded-lg w-[38px] h-[38px] p-2 dark:bg-surface-200"
                        onClick={() => handleDownload(message?.audio || "")}
                      >
                        <Play color="white" variant="Bold" />
                      </Button>
                      {!isDownloading ? (
                        <Button
                          isIconOnly
                          color="primary"
                          onClick={() => handleDownload(message?.audio || "")}
                          className="dark:bg-surface-200 dark:hover:bg-primary hover:bg-secondary-400 hover:!opacity-100 shadow-medium absolute top-[1.7rem] left-[1.8rem] min-w-4 w-4 h-4 !rounded-2 p-0.5"
                        >
                          <ImportCurve color="white" size="10" />
                        </Button>
                      ) : (
                        <Button
                          isIconOnly
                          color="primary"
                          onClick={() => handleIsDownloading(false)}
                          className="dark:bg-surface-200 dark:hover:bg-primary bg-primary-400 hover:bg-secondary-400 absolute hover:!opacity-100 top-[1.7rem] left-[1.8rem] min-w-4 w-4 h-4 !rounded-2 p-0.5"
                        >
                          <Repeat color="white" size="10" />
                        </Button>
                      )}
                      <div className="flex flex-col justify-center space-y-1">
                        <span
                          className={`font-semibold text-xs leading-4 dark:text-white text-secondary-1000`}
                        >
                          <span>
                            {shortenFileName(message?.file_name || "", 20)}
                          </span>
                        </span>
                        <span
                          className={`font-light text-xs leading-4 dark:text-white text-secondary-1000`}
                        >
                          {message.file_size}
                        </span>
                      </div>
                    </div>
                    <div>
                      {message?.status === "seen" ? <DoubleCheck /> : <Check />}
                    </div>
                  </div>
                  <p className="text-secondary-400 dark:text-white text-xs font-normal">
                    {message?.caption}
                  </p>
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="!rounded-3 !p-0 !w-[140px]">
            <Reaction
              message={message}
              isOpenMessengerAction={isOpenMessageAction}
              setIsOpenMessengerAction={setIsOpenMessengerAction}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default AudioMessage;
