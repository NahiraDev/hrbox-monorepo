import { Avatar, Card } from "@nextui-org/react";
import UiBadge from "../Badge";
import { useDarkMode } from "../../context/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setUserProfile } from "../../redux/reducers/profile";
import React, { useEffect, useRef, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Paperclip } from "iconsax-react";
import { closeInfo } from "../../redux/reducers/messengerAction";
import { SingleChatItemTypes } from "../../types";
import { Action } from "./Action.tsx";
import { handleFetchUserChatsApi } from "../../services/Messenger/PrivateChatService/apis.ts";

export const PrivateChatItem = ({
  profile,
  isSelected,
  onSelect,
  showAction,
  setShowAction,
}: SingleChatItemTypes) => {
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch<AppDispatch>();
  const profileUser = JSON.parse(localStorage.getItem("profile") || "{}");
  const privateChatProfile = useSelector(
    (state: RootState) => state.profile.profile,
  );
  const privateChats = useSelector(
    (state: RootState) => state.privateChat?.privateChats,
  );

  const [lastMessages, setLastMessages] = useState<{ [key: string]: string }>(
    {},
  );
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const setProfile = () => {
    const userId =
      profile.recipient_id === profileUser?.user_id
        ? profile?.sender_id
        : profile?.recipient_id;
    const userProfile = {
      name: profile?.name || "",
      image: profile?.image || "",
      user_id: userId || "",
      chat_id: profile?.id || "",
      description: profile?.description || "",
      user_name: profile?.user_name || "",
      muted: profile?.muted,
      pinned: false,
      chat_type: "private",
    };
    dispatch(setUserProfile(userProfile));
    dispatch(handleFetchUserChatsApi({ chat_id: profile.id }));
  };

  const handleSelect = () => {
    onSelect();
    setProfile();
    dispatch(closeInfo());
  };

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setShowAction(!showAction);
  };

  const getLastMessageTime = (chatId: string) => {
    const timestamp = lastMessages[chatId];
    if (!timestamp) return "00:00";
    const date = new Date(timestamp);
    return isNaN(date.getTime())
      ? "00:00"
      : `${date.getUTCHours().toString().padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const newLastMessages: { [key: string]: string } = {};
    privateChats.forEach((chat: any) => {
      const lastMessage = chat.messages;
      if (lastMessage?.created_at) {
        newLastMessages[chat.id] = lastMessage.created_at;
      }
    });
    setLastMessages(newLastMessages);
  }, [privateChats]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setShowAction(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deliveredMessages = privateChats.flatMap(
    (chat: any) =>
      chat?.messages?.filter(
        (message: MessageTypes) => message?.status === "delivered",
      ) || [],
  );
  const cardClassNames = `relative flex flex-row items-center w-full px-6 py-3 gap-2 border-b-1 ${isSelected ? (darkMode ? "bg-primary-800" : "bg-primary-0") : darkMode ? "bg-info-1000" : "bg-white"} cursor-pointer transition-colors duration-300 ${darkMode ? "hover:bg-primary-800 hover:bg-opacity-40" : "hover:bg-primary-0 hover:bg-opacity-40"}`;
  const renderChatItem = (isRecipient: boolean) => (
    <Popover isOpen={showAction} isDismissable={!showAction} ref={popoverRef}>
      <PopoverTrigger>
        <Card
          radius="none"
          shadow="none"
          className={cardClassNames}
          isPressable
          onPress={handleSelect}
          onContextMenu={handleRightClick}
        >
          <Avatar
            size="md"
            radius="sm"
            src={
              isRecipient
                ? privateChatProfile?.image || profile?.image
                : profile?.image
            }
            alt="avatar picture"
          />
          <div className="flex flex-col flex-grow items-start justify-start gap-1">
            <span className="dark:text-white text-secondary-1000 font-open-sans text-xs font-normal">
              {isRecipient
                ? privateChatProfile?.name || profile?.name
                : profile?.name}
            </span>
            <span className="dark:text-netural-50 text-secondary-800 font-open-sans text-[10px] font-light">
              last seen recently
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-1">
            {profile?.pinned ? (
              <Paperclip size={16} className="text-secondary-1000" />
            ) : (
              <UiBadge
                initialCount={deliveredMessages.length}
                isMuted={profile?.muted}
                panel="jobSeeker"
              />
            )}
            <span className="dark:text-netural-50 text-secondary-800 font-open-sans text-[10px] font-light">
              {getLastMessageTime(profile.id || "")}
            </span>
          </div>
        </Card>
      </PopoverTrigger>
      {showAction && (
        <PopoverContent className="!p-0">
          <Action
            profile={profile}
            showAction={showAction}
            setShowAction={setShowAction}
          />
        </PopoverContent>
      )}
    </Popover>
  );

  return (
    <>
      {profile?.recipient_id === profileUser?.user_id
        ? renderChatItem(true)
        : profile?.sender_id === profileUser?.user_id
          ? renderChatItem(false)
          : null}
    </>
  );
};
