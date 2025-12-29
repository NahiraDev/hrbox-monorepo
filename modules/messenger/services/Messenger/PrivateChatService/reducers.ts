import { PayloadAction } from "@reduxjs/toolkit";
import { MessageTypes, PrivateChatServiceTypes, PrivateChatStateTypes, PrivateChatTypes } from "../../../types";

// Utility function to find group by ID
const findChatById = (state: ChatState, chat_id: string) =>
  state.privateChats.find((chat) => chat.id === chat_id);

const updateMessageStatus = (
  messages: MessageTypes[],
  message_id: string,
  statusKey: keyof MessageTypes,
  statusValue: any
) => {
  return messages.map((msg) =>
    msg.id === message_id ? { ...msg, [statusKey]: statusValue } : msg
  );
};

export const privateChatReducer = {
  handleMarkMessageAsSeenPrivateChat(
    state: PrivateChatStateTypes,
    action: PayloadAction<PrivateChatServiceTypes>
  ) {
    console.log(action.payload);
    action.payload.messages.messages = updateMessageStatus(
      action.payload.messages.messages,
      action.payload.message_id,
      "status",
      "seen"
    );
  },

  handleMuteChat(
    state: PrivateChatStateTypes,
    action: PayloadAction<PrivateChatServiceTypes>
  ) {
    state.privateChats = action.payload.privateChats;
  },

  handleForwardMessage(
    state: PrivateChatStateTypes,
    action: PayloadAction<PrivateChatServiceTypes>
  ) {
    const { forward_message, chat_id } = action.payload;
    const chat = findChatById(state, chat_id);

    if (chat) {
      const newMessage = {
        ...forward_message,
        forwarded: true,
        forwarded_at: Date.now()
      };
      chat.messages.push(newMessage);
    }
  },

  handlePinMessage(
    state: PrivateChatStateTypes,
    action: PayloadAction<PrivateChatServiceTypes>
  ) {
    state.messages = action.payload.messages;
  },

  handleUnpinMessage(
    state: PrivateChatStateTypes,
    action: PayloadAction<PrivateChatServiceTypes>
  ) {
    state.messages = action.payload.messages;
  },

  handlePinUnpinChat(
    state: PrivateChatStateTypes,
    action: PayloadAction<PrivateChatServiceTypes>
  ) {
    state.privateChats = action.payload.privateChats;
  },

  handleCreateChatService(
    state: PrivateChatStateTypes,
    action: PayloadAction<PrivateChatTypes>
  ) {
    state.privateChats = [...state.privateChats, action.payload];
  },

  handleFetchChatMessage(
    state: PrivateChatStateTypes,
    action: PayloadAction<PrivateChatTypes[]>
  ) {
    state.privateChats = action.payload.privateChats;
  },

  handleFetchUserChats(
    state: PrivateChatStateTypes,
    action: PayloadAction<PrivateChatTypes[]>
  ) {
    state.messages = action.payload.messages;
  },

  handleClearHistoryChat(state: PrivateChatStateTypes) {
    state.messages = [];
  },

  handleRemoveMessage(
    state: PrivateChatStateTypes,
    action: PayloadAction<PrivateChatServiceTypes>
  ) {
    state.messages = action.payload.messages;
  },

  handleAddToSaveMessage(
    state: PrivateChatStateTypes,
    action: PayloadAction<PrivateChatServiceTypes>
  ) {
    console.log(action.payload);
    console.log(test);
  },

  handleRemoveChat(
    state: PrivateChatStateTypes,
    action: PayloadAction<PrivateChatServiceTypes>
  ) {
    state.privateChats = action.payload.privateChats;
  }
};
