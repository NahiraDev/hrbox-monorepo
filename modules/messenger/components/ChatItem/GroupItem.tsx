import { Avatar, Card } from "@nextui-org/react";
import UiBadge from "../Badge";
import { useDarkMode } from "../../context/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setUserProfile } from "../../redux/reducers/profile";
import React, { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Action } from "./Action";
import { Paperclip } from "iconsax-react";
import { closeInfo } from "../../redux/reducers/messengerAction";
import { handleGetChatContactApi } from "../../services/Messenger/UserService/apis";
import { MessageTypes, SingleChatItemTypes } from "../../types";

export const GroupItem = ({
  profile,
  isSelected,
  onSelect,
  showAction,
  setShowAction,
}: SingleChatItemTypes) => {
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: RootState) => state.groups.groups);
  const profileUser = JSON.parse(localStorage.getItem("profile") || "{}");

  const [lastMessages, setLastMessages] = useState<{ [key: string]: string }>(
    {},
  );

  // Indicator profile in Redux
  const setProfile = () => {
    dispatch(
      setUserProfile({
        name: profile?.name || "",
        image: profile?.image || "",
        original_image: profile?.original_image || "",
        sender_id: profile?.sender_id || "",
        chat_id: profile?.id || "",
        description: profile?.description || "",
        members: profile?.members || [],
        messages: Array.isArray(profile.messages) ? profile.messages : [],
        type: profile?.type || "",
        muted: profile?.muted || false,
        pinned: false,
        chat_type: "group",
      }),
    );
    dispatch(handleGetChatContactApi({ group_id: profile?.sender_id }));
  };

  // Handling selection and context menu
  const handleSelect = () => {
    onSelect();
    setProfile();
    setShowAction(false);
    dispatch(closeInfo());
  };

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setShowAction((prev) => !prev);
  };

  // Get the last message time
  const getLastMessageTime = (chatId: string) => {
    const timestamp = lastMessages[chatId];
    if (!timestamp) return "00:00";
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "00:00" : date.toISOString().substr(11, 5); // HH:mm format
  };

  // Update last messages whenever groups change
  useEffect(() => {
    const newLastMessages = groups.reduce(
      (acc, group) => {
        const lastMessage = group.messages[group.messages.length - 1];
        if (lastMessage?.created_at) acc[group.id] = lastMessage.created_at;
        return acc;
      },
      {} as { [key: string]: string },
    );

    setLastMessages(newLastMessages);
  }, [groups]);

  // Filter delivered messages
  const deliveredMessages = groups.flatMap((group) =>
    group.messages.filter(
      (message: MessageTypes) => message?.status === "delivered",
    ),
  );
  const cardClassNames = `relative flex flex-row items-center w-full px-6 py-3 gap-2 border-b-1 ${darkMode ? "bg-primary-800" : "bg-white"} cursor-pointer transition-colors duration-300 ${isSelected ? (darkMode ? "bg-primary-800" : "bg-primary-0") : ""}`;
  return (
    <Popover placement="bottom" isOpen={showAction}>
      <PopoverTrigger>
        <Card
          radius="none"
          shadow="none"
          className={cardClassNames}
          isPressable
          onPress={handleSelect}
          onContextMenu={handleRightClick}
        >
          <Avatar size="md" radius="sm" src={profile?.image} alt="avatar" />
          <div className="flex flex-col flex-grow items-start justify-start gap-1">
            <span className="dark:text-white text-secondary-1000 text-xs font-normal">
              {profile?.name}
            </span>
            <span className="dark:text-neutral-50 text-secondary-800 text-[10px]">
              {profile?.members?.length} Members
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-1">
            {profile?.pinned ? (
              <Paperclip
                size={16}
                className="text-secondary-1000 dark:text-white"
              />
            ) : (
              <UiBadge
                initialCount={deliveredMessages.length}
                isMuted={profile?.muted}
                panel="jobSeeker"
              />
            )}
            <span className="dark:text-neutral-50 text-secondary-800 text-[10px]">
              {getLastMessageTime(profile.id || "")}
            </span>
          </div>
        </Card>
      </PopoverTrigger>
      {showAction && (
        <PopoverContent>
          <Action
            profile={profile}
            showAction={showAction}
            setShowAction={setShowAction}
          />
        </PopoverContent>
      )}
    </Popover>
  );
};
