import DoubleCheck from "../../icons/DoubleCheck";
import { Avatar, Image, Link } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import Reaction from "./Reaction";
import {
  closeReplyMessageAction,
  setHighlightedMessageId,
  setMessageId,
} from "../../redux/reducers/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Folder, Play } from "iconsax-react";
import Check from "../../icons/Check";
import { MessageTypes } from "../../types";

const TextMessage = ({
  message,
  isSent,
}: {
  message: MessageTypes;
  isSent: boolean;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpenMessageAction, setIsOpenMessengerAction] =
    useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const myProfile = JSON.parse(localStorage.getItem("profile") || "{}");
  const date = new Date(message.created_at || "");
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const highlightedMessageId = useSelector(
    (state: RootState) => state.messageAction.highlighted_message_id,
  );

  const handleOpenReactPopover = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(closeReplyMessageAction());
    setIsOpenMessengerAction(!isOpenMessageAction);
    dispatch(setMessageId(message?.id || ""));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpenMessengerAction(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderReplyPreview = () => {
    if (!message.reply_data) return null;

    return (
      <div
        onClick={() => {
          const element = document.getElementById(
            message?.reply_message_id || "",
          );
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });
            dispatch(setHighlightedMessageId(message?.reply_message_id || ""));
            setTimeout(() => dispatch(setHighlightedMessageId("")), 3000);
          }
        }}
        className="border-l-2 border-primary-700 dark:border-primary-0 gap-2.5 flex items-center mb-2"
      >
        <div>
          {message.reply_type === "image" ? (
            <Image src={message.reply_data} radius="sm" className="w-8" />
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
              {message?.reply_message_data || ""}
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
          <span className="text-xs font-medium text-primary-700 dark:text-white leading-4">
            {message.sender_id !== myProfile?.user_id
              ? profile?.name
              : myProfile.name}
          </span>
          <span className="text-[10px] font-medium text-secondary-1000 dark:text-white leading-4">
            {message.reply_file_name || message.reply_data}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      id={`${message?.id}`}
      className={`${highlightedMessageId === message.id ? "bg-primary-0 bg-opacity-50 transition duration-500 ease-in-out" : ""}`}
    >
      <div className={`relative w-fit ${isSent ? "ml-auto mr-12" : "ml-12"}`}>
        <Popover
          isOpen={isOpenMessageAction}
          isDismissable={!isOpenMessageAction}
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
                  <span className="dark:text-white font-light text-xs text-secondary-1000">{`${hours}:${minutes < 10 ? "0" + minutes : minutes}`}</span>
                </div>

                {renderReplyPreview()}

                <div
                  className={`rounded-4 shadow-none px-4 py-2 ${isSent ? "!rounded-tr-none bg-primary-0 dark:bg-primary-700" : "!rounded-tl-none bg-white dark:bg-info-1000"}`}
                >
                  <div className="flex items-end justify-between gap-0.5">
                    <p className="text-secondary-1000 dark:text-white text-xs font-light leading-normal break-words">
                      {message?.text}
                    </p>
                    <div>
                      {message?.status === "seen" ? <DoubleCheck /> : <Check />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopoverTrigger>

          <PopoverContent className="!rounded-1 !p-0 !w-[140px]">
            <Reaction
              isOpenMessengerAction={isOpenMessageAction}
              setIsOpenMessengerAction={setIsOpenMessengerAction}
              message={message}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TextMessage;
