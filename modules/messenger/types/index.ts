export type ChannelServiceTypes = {
  member_id?: string;
  channel_id?: string;
  message_id?: string;
  user_id?: string;
};

export type GroupServiceTypes = {
  member_id?: string;
  group_id?: string;
  message_id?: string;
  user_id?: string;
};

export type PrivateChatServiceTypes = {
  chat_id?: string;
  message_id?: string;
  forward_message?: any;
};

export type SaveMessageServiceTypes = {
  save_message_id?: string;
  message_id?: string;
};

export type MemberTypes = {
  image: string;
  user_id: string;
  name: string;
  description: string;
  id: string;
  user_name: string;
  role?: string;
};

export type PrivateChatTypes = {
  id: string;
  type: string;
  recipient_id: string;
  sender_id: string;
  image: string;
  name: string;
  description: string;
  user_name: string;
  user_id?: string;
  muted: boolean;
  messages: MessageTypes[];
  created_at: string;
  pinned?: boolean;
};

export type MessageTypes = {
  id?: string;
  chat_id?: string;
  chat_type?: string;
  type?: string;
  text?: string;
  link?: string;
  file_name?: string;
  file_size?: string;
  created_at?: string;
  status?: string;
  image?: string;
  file?: string;
  audio?: string;
  sender_id?: string;
  recipient_id?: string;
  reply_type?: string;
  reply_data?: string;
  reply_file_name?: string;
  reply_message_id?: string;
  reply_message_data?: string;
  caption?: string;
  pinned?: boolean;
  forward_message?: string;
  is_sent?: boolean;
  saved?: boolean;
  removed?: boolean;
};

export type GroupAndChannelTypes = {
  id?: string;
  name: string;
  description: string;
  type: string;
  chat_id?: string;
  sender_id: string;
  muted: boolean;
  image: string;
  members: MemberTypes[] | [];
  messages: MessageTypes[];
  original_image: string;
  pinned: boolean;
  chat_type?: string;
  recipient_id?: string;
  user_name?: string;
};

export type SingleChatItemTypes = {
  id?: string;
  profile: GroupAndChannelTypes | PrivateChatTypes;
  showAction: boolean;
  setShowAction: (showAction: boolean) => void;
  isSelected: boolean;
  onSelect: () => void;
  type?: string;
};

export type ElementTypes = {
  behavior: "auto" | "smooth";
  block: ScrollLogicalPosition;
  inline: ScrollLogicalPosition;
};

export enum MessageStatus {
  seen = "seen",
  unseen = "unseen",
}

export type PrivateChatStateTypes = {
  messages: MessageTypes[];
  privateChats: PrivateChatTypes[];
  loading: boolean;
  error: string | null;
};

export type GroupStateTypes = {
  messages: MessageTypes[];
  groups: GroupAndChannelTypes[];
  loading: boolean;
  error: string | null;
};

export type ChannelStateTypes = {
  messages: MessageTypes[];
  channels: GroupAndChannelTypes[];
  loading: boolean;
  error: string | null;
};

export type ChatUserTypes = {
  image: string;
  user_id: string;
  name: string;
  description: string;
  id: string;
  members?: [] | null;
};

export interface MessageActionState {
  message_id?: string;
  chat_id: string;
  reply: boolean;
  message_data: string;
  reply_message_data?: string;
  reply_message_type?: string;
  reply_message_file_name?: string;
  reply_message_id?: string;
  file_name?: string;
  file_size?: string;
  is_typing?: boolean;
  highlighted_message_id?: string;
  filteredMessages: [];
}

export interface MessengerAction {
  isOpen: boolean;
  isEdit: boolean;
  isOpenEmojiPicker: boolean;
}

export interface Profile {
  name?: string;
  description?: string;
  image?: string;
  user_id?: string;
  chat_id?: string;
  muted?: boolean;
  pinned?: boolean;
  members?: [];
  messages?: [];
  cropped_image?: string;
  sender_id?: string;
  type?: string;
  user_name?: string;
  chat_type?: string;
}

export interface UserProfileState {
  profile: Profile;
}

export const initialStateProfile: UserProfileState = {
  profile: {}
};

export interface UsersStateTypes {
  users: MemberTypes[];
  profile: ChatUserTypes | null;
  loading: boolean;
  error: string | null;
}

export interface SaveMessageStateTypes {
  saveMessages: GroupAndChannelTypes[] | PrivateChatTypes[];
  messages: MessageTypes[];
  loading: boolean;
  error: string | null;
}

export const InitialStateUsers: UsersStateTypes = {
  users: [],
  profile: null,
  loading: false,
  error: null
};

export const InitialStatePrivateChat: PrivateChatStateTypes = {
  messages: [],
  privateChats: [],
  loading: false,
  error: null
};

export const InitialStateGroup: GroupStateTypes = {
  messages: [],
  groups: [],
  loading: false,
  error: null
};

export const InitialStateChannel: ChannelStateTypes = {
  channels: [],
  messages: [],
  loading: false,
  error: null
};

export const InitialStateSaveMessage: SaveMessageStateTypes = {
  saveMessages: [],
  messages: [],
  loading: false,
  error: null
};


