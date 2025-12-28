import { Card } from "@heroui/react";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Save2 } from "iconsax-reactjs";
import { SingleChatItemTypes } from "@hrbox/modules/messenger/types";
import { RootState } from "@hrbox/core/redux";

export const SaveMessageItem = ({
                                  profile,
                                  isSelected,
                                  onSelect,
                                  setShowAction
                                }: SingleChatItemTypes) => {
  const saveMessages = useSelector(
    (state: RootState) => state.saveMessage?.messages
  );
  const [lastMessages, setLastMessages] = useState<{ [key: string]: string }>(
    {}
  );

  const handleSelect = () => {
    onSelect();
    setShowAction(false);
  };

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setShowAction((prevState) => !prevState);
  };

  useEffect(() => {
    const newLastMessages: { [key: string]: string } = {};
    saveMessages.forEach((chat: any) => {
      if (chat.messages?.created_at) {
        newLastMessages[chat.id] = chat.messages.created_at;
      }
    });
    setLastMessages(newLastMessages);
  }, [saveMessages]);

  const getLastMessageTime = (chatId: string) => {
    const timestamp = lastMessages[chatId];
    if (!timestamp) return "00:00";

    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "00:00" : date.toISOString().substr(11, 5);
  };

  const cardClassNames = `
  relative flex flex-row items-center w-full px-6 py-3 gap-2
  border-b-1 border-primary-0 border-opacity-40
  cursor-pointer transition-colors duration-300

  ${isSelected
    ? "bg-primary-0 dark:bg-primary-800"
    : "bg-white dark:bg-info-1000"}

  hover:bg-primary-0 hover:bg-opacity-40
  dark:hover:bg-primary-800 dark:hover:bg-opacity-40
`;

  const time = getLastMessageTime(profile?.id || "");

  return (
    <Card
      radius="none"
      shadow="none"
      className={cardClassNames}
      isPressable
      onPress={handleSelect}
      onContextMenu={handleRightClick}
    >
      <div className="bg-secondary-400 rounded-3 w-9 h-9 flex justify-center items-center">
        <Save2 size="21" className="text-white" />
      </div>
      <div className="flex flex-col flex-grow items-start justify-start gap-1">
        <span className="dark:text-white text-secondary-1000 font-open-sans text-xs font-normal leading-normal">
          {profile.name}
        </span>
        <span className="dark:text-netural-50 text-secondary-800 font-open-sans text-[10px] font-light leading-normal">
          {profile.description}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 px-1">
        <span className="dark:text-netural-50 text-secondary-800 font-open-sans text-[10px] font-light leading-normal">
          {time}
        </span>
      </div>
    </Card>
  );
};
