import { Avatar, Card, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import UiBadge from "../Badge";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@hrbox/core/redux/store";
import { setUserProfile } from "@hrbox/core/redux/slices/profile";
import React, { useEffect, useState } from "react";
import { Action } from "./Action";
import { Paperclip } from "iconsax-reactjs";
import { closeInfo } from "@hrbox/core/redux/slices/messengerAction";
import { useFetchGroupsQuery } from "@hrbox/modules/messenger/apis/Group";
import { MessageTypes, SingleChatItemTypes } from "@hrbox/modules/messenger/types";

export const GroupItem = ({
                            profile,
                            isSelected,
                            onSelect,
                            showAction,
                            setShowAction
                          }: SingleChatItemTypes) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: groups = [] } = useFetchGroupsQuery();
  const profileUser = JSON.parse(localStorage.getItem("profile") || "{}");

  const [lastMessages, setLastMessages] = useState<{ [key: string]: string }>(
    {}
  );

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
        chat_type: "group"
      })
    );
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

  const getLastMessageTime = (chatId: string) => {
    const timestamp = lastMessages[chatId];
    if (!timestamp) return "00:00";
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "00:00" : date.toISOString().substr(11, 5);
  };

  useEffect(() => {
    const newLastMessages = groups.reduce(
      (acc, group) => {
        const lastMessage = group.messages[group.messages.length - 1];
        if (lastMessage?.created_at) acc[group.id] = lastMessage.created_at;
        return acc;
      },
      {} as { [key: string]: string }
    );

    setLastMessages(newLastMessages);
  }, [groups]);

  const deliveredMessages = groups.flatMap((group) =>
    group.messages.filter(
      (message: MessageTypes) => message?.status === "delivered"
    )
  );

  const cardClassNames = `
  relative flex flex-row items-center w-full px-6 py-3 gap-2
  border-b-1
  cursor-pointer transition-colors duration-300

  ${isSelected
    ? "bg-primary-0 dark:bg-primary-800"
    : "bg-white dark:bg-primary-800"}

  hover:bg-primary-0 dark:hover:bg-primary-800
`;
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