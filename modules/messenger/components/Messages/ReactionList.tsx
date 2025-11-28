import {
  ArrowCircleLeft,
  Paperclip,
  Trash,
  Archive,
  Back,
} from "iconsax-react";

export const ReactionList = [
  {
    icon: (
      <ArrowCircleLeft
        size="20"
        className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
      />
    ),
    key: "reply",
    text: "Reply",
  },
  {
    icon: (
      <Paperclip
        size="20"
        className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
      />
    ),
    key: "pin",
    text: "Pin",
  },
  {
    icon: (
      <Back
        size="20"
        className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
      />
    ),
    key: "forward",
    text: "Forward",
  },
  {
    icon: (
      <Archive
        size="20"
        className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
      />
    ),
    key: "save",
    text: "Save",
  },
  {
    icon: (
      <Trash
        size="20"
        className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
      />
    ),
    key: "delete",
    text: "Delete",
  },
];
