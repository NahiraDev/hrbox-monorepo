import { Avatar, Image, Link, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import Reaction from "./Reaction";
import { setHighlightedMessageId, setMessageId } from "@hrbox/core/redux/slices/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@hrbox/core/redux/store";
import { Folder, Play } from "iconsax-reactjs";
import DoubleCheck from "@hrbox/uikit/icons/DoubleCheck";
import { Check } from "@hrbox/uikit/icons/Check";
import { MessageTypes } from "../../types";

interface PhotoMessageProps {
  message: MessageTypes;
  isSent: boolean;
}

const PhotoMessage: React.FC<PhotoMessageProps> = ({ message, isSent }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpenMessageAction, setIsOpenMessengerAction] =
    useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const profile = useSelector((state: RootState) => state.profile.profile);

  const date = new Date(message.created_at || "");
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const highlightedMessageId = useSelector(
    (state: RootState) => state.messageAction.highlighted_message_id
  );

  const handleOpenReactPopover = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOpenMessengerAction((prev) => !prev);
    dispatch(setMessageId(message.id || ""));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpenMessengerAction(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderReplyPreview = () => {
    if (!message.reply_data) return null;

    return (
      <div
        onClick={() => {
          const element = document.getElementById(
            message.reply_message_id || ""
          );
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest"
            });
            dispatch(setHighlightedMessageId(message.reply_message_id || ""));
            setTimeout(() => dispatch(setHighlightedMessageId("")), 3000);
          }
        }}
        className="border-l-2 border-primary-700 flex items-center gap-2.5 mb-2 cursor-pointer"
      >
        {renderReplyContent()}
      </div>
    );
  };

  const renderReplyContent = () => {
    switch (message.reply_type) {
      case "image":
        return <Image src={message.reply_data} radius="sm" className="w-8" />;
      case "file":
        return (
          <div className="rounded-lg w-8 h-8 p-1.5 bg-primary-400 dark:hover:bg-surface-200">
            <Folder color="white" size="20" variant="Bold" />
          </div>
        );
      case "audio":
        return (
          <div className="rounded-lg w-8 h-8 p-1.5 bg-primary-400 dark:bg-surface-200">
            <Play color="white" size="20" variant="Bold" />
          </div>
        );
      case "text":
        return (
          <span className="text-secondary-1000 dark:text-white">
            {message.reply_message_data}
          </span>
        );
      default:
        return (
          <Link
            target="_blank"
            href={message.link}
            className="text-info-400 text-xs font-light leading-normal underline"
          >
            {message.reply_message_data}
          </Link>
        );
    }
  };

  return (
    <div
      id={`${message?.id}`}
      className={`${highlightedMessageId === message.id ? "bg-primary-0 bg-opacity-50 transition duration-500 ease-in-out" : ""}`}
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
            >
              {!isSent && (
                <Avatar src={profile?.image} className="w-11 h-11 !rounded-2" />
              )}
              <div className="w-[320px]">
                <div
                  className={`flex ${isSent && "flex-row-reverse"} justify-between items-end text-secondary-1000 text-xs font-light leading-normal mb-[5px]`}
                >
                  {isSent ? (
                    <Avatar
                      src={profile?.image}
                      className="!w-8 !h-8 !rounded-2"
                    />
                  ) : (
                    <span className="text-secondary-1000 dark:text-white text-xs font-light">
                      {profile?.name}
                    </span>
                  )}
                  <span
                    className="dark:text-white font-light text-xs text-secondary-1000">{`${hours}:${minutes < 10 ? "0" + minutes : minutes}`}</span>
                </div>

                {renderReplyPreview()}

                {message.type === "image" && (
                  <div
                    className={`rounded-4 shadow-none flex flex-col gap-3 px-4 py-2 w-full ${isSent ? "!rounded-tr-none bg-primary-0 dark:bg-primary-700" : "!rounded-tl-none bg-white dark:bg-info-1000"}`}
                    onContextMenu={handleOpenReactPopover}
                  >
                    <div className="flex justify-between items-end gap-3">
                      <Image
                        alt="Image message"
                        src={message.image}
                        className="z-0 !rounded-2"
                      />
                      <div>
                        {message.status === "seen" ? (
                          <DoubleCheck />
                        ) : (
                          <Check />
                        )}
                      </div>
                    </div>
                    <p className="text-secondary-400 dark:text-white text-xs font-normal">
                      {message.caption}
                    </p>
                  </div>
                )}
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

export default PhotoMessage;
