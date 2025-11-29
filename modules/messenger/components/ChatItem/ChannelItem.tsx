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
import {
  GroupAndChannelTypes,
  MessageTypes,
  SingleChatItemTypes,
} from "../../types";
import { handleFetchChannelChatsApi } from "../../services/Messenger/ChannelChatService/apis.ts";

export const ChannelItem = ({
  profile,
  isSelected,
  onSelect,
  showAction,
  setShowAction,
}: SingleChatItemTypes) => {
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch<AppDispatch>();
  const channels = useSelector((state: RootState) => state.channels.channels);
  const [lastMessages, setLastMessages] = useState<{ [key: string]: string }>(
    {},
  );

  // Set profile and fetch channel chats
  const setProfile = () => {
    const channelProfile: GroupAndChannelTypes = {
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
      chat_type: "channel",
    };
    dispatch(setUserProfile(channelProfile));
    dispatch(handleFetchChannelChatsApi({ channel_id: profile?.id || "" }));
  };

  // Handle selection and context menu
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

  // Update last messages based on channels
  useEffect(() => {
    const newLastMessages = channels.reduce(
      (acc, channel) => {
        const lastMessage = channel.messages[channel.messages.length - 1];
        if (lastMessage?.created_at)
          acc[channel.id || ""] = lastMessage.created_at;
        return acc;
      },
      {} as { [key: string]: string },
    );

    setLastMessages(newLastMessages);
  }, [channels]);

  // Get last message time in HH:mm format
  const getLastMessageTime = (channelId: string) => {
    const timestamp = lastMessages[channelId];
    if (!timestamp) return "00:00";
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "00:00" : date.toISOString().substr(11, 5); // HH:mm
  };

  // Filter delivered messages
  const deliveredMessages = channels.flatMap((channel: GroupAndChannelTypes) =>
    channel.messages.filter(
      (message: MessageTypes) => message?.status === "delivered",
    ),
  );

  return (
    <Popover placement="bottom" isOpen={showAction}>
      <PopoverTrigger>
        <Card
          radius="none"
          shadow="none"
          className={`relative flex flex-row items-center w-full px-6 py-3 gap-2 border-b-1 ${darkMode ? "bg-primary-800" : "bg-white"} cursor-pointer transition-colors duration-300 ${isSelected ? (darkMode ? "bg-primary-800" : "bg-primary-0") : ""}`}
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
              {getLastMessageTime(profile?.id || "")}
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
