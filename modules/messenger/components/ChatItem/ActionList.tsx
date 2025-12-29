import { Broom, Edit2, Paperclip, Trash, VolumeHigh, VolumeSlash } from "iconsax-reactjs";
import { useSelector } from "react-redux";
import { RootState } from "@hrbox/core/redux/store";
import { PrivateChatTypes } from "@hrbox/core/types";

export const ActionList = () => {
  const allChats = useSelector(
    (state: RootState) => state?.privateChat?.privateChats
  );
  return [
    {
      icon: allChats.some((chat: PrivateChatTypes) => chat?.muted === false) ? (
        <VolumeSlash
          size="20"
          className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
        />
      ) : (
        <VolumeHigh
          size="20"
          className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
        />
      ),
      text: allChats.some((chat: PrivateChatTypes) => chat?.muted === false)
        ? "Muted Notifications"
        : "Unmute Notifications",
      key: "mute"
    },
    {
      icon: (
        <Paperclip
          size="20"
          className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
        />
      ),
      text: "Pin",
      key: "pin"
    },
    {
      icon: (
        <Broom
          size="20"
          className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
        />
      ),
      text: "Clear History",
      key: "clear"
    },
    {
      icon: (
        <Edit2
          size="20"
          className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
        />
      ),
      text: "Edit",
      key: "edit"
    },
    {
      icon: (
        <Trash
          size="20"
          className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
        />
      ),
      text: "Delete",
      key: "delete"
    }
  ];
};
