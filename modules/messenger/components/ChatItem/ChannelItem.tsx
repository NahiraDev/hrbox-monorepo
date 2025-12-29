import { Avatar, Card, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import UiBadge from "../Badge";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@hrbox/core/redux/store";
import { setUserProfile } from "@hrbox/core/redux/slices/profile";
import React, { useEffect, useState } from "react";
import { Action } from "./Action";
import { Paperclip } from "iconsax-reactjs";
import { closeInfo } from "@hrbox/core/redux/slices/messengerAction";
import { useFetchChannelChatsQuery } from "@hrbox/modules/messenger/apis/Channel";
import { GroupAndChannelTypes, MessageTypes, SingleChatItemTypes } from "@hrbox/modules/messenger/types";

export const ChannelItem = ({
                              profile,
                              isSelected,
                              onSelect,
                              showAction,
                              setShowAction
                            }: SingleChatItemTypes) => {
  const dispatch = useDispatch<AppDispatch>();
  const channels = useSelector((state: RootState) => state.channels.channels);
  const [lastMessages, setLastMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");

  const { data: channelChatsData } = useFetchChannelChatsQuery(
    { channel_id: selectedChannelId },
    { skip: !selectedChannelId }
  );

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
      chat_type: "channel"
    };
    dispatch(setUserProfile(channelProfile));
    setSelectedChannelId(profile?.id || "");
  };

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

  useEffect(() => {
    const newLastMessages = channels.reduce(
      (acc, channel) => {
        const lastMessage = channel.messages[channel.messages.length - 1];
        if (lastMessage?.created_at)
          acc[channel.id || ""] = lastMessage.created_at;
        return acc;
      },
      {} as { [key: string]: string }
    );

    setLastMessages(newLastMessages);
  }, [channels]);

  const getLastMessageTime = (channelId: string) => {
    const timestamp = lastMessages[channelId];
    if (!timestamp) return "00:00";
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "00:00" : date.toISOString().substr(11, 5);
  };

  const deliveredMessages = channels.flatMap((channel: GroupAndChannelTypes) =>
    channel.messages.filter(
      (message: MessageTypes) => message?.status === "delivered"
    )
  );

  return (
    <Popover placement="bottom" isOpen={showAction}>
      <PopoverTrigger>
        <Card
          radius="none"
          shadow="none"
          className={`relative flex flex-row items-center w-full px-6 py-3 gap-2 border-b-1 bg-white dark:bg-primary-800 cursor-pointer transition-colors duration-300 ${isSelected ? "bg-primary-0 dark:bg-primary-800" : ""}`}
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