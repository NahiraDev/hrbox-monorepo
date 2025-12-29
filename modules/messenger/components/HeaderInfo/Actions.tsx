import { Broom, Edit2, Grid9, Trash, VolumeSlash } from "iconsax-reactjs";

export const Actions = [
  {
    icon: (
      <VolumeSlash
        size="20"
        className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
      />
    ),
    key: "mute",
    text: "Mute Notifications"
  },
  {
    icon: (
      <Broom
        size="20"
        className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
      />
    ),
    key: "clear",
    text: "Clear History"
  },
  {
    icon: (
      <Grid9
        size="20"
        className="text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all"
      />
    ),
    key: "info",
    text: "Informations"
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
    key: "delete",
    text: "Delete Chat"
  }
];
