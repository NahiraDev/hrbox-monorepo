import { createSlice } from "@reduxjs/toolkit";
import {
  handleAddToSaveMessageApi,
  handleClearHistoryChatApi,
  handleCreateChatServiceApi,
  handleFetchChatMessageApi,
  handleFetchUserChatsApi,
  handleForwardMessageApi,
  handleMarkMessageAsSeenPrivateChatApi,
  handleMuteChatApi,
  handlePinChatApi,
  handlePinMessageApi,
  handlePinUnpinChatApi,
  handleRemoveChatApi,
  handleRemoveMessageApi,
  handleUnpinChatApi,
  handleUnpinMessageApi,
} from "./apis";
import { privateChatReducer } from "./reducers";
import { addAsyncCase } from "../../../utils/general";
import { errorMessages } from "./error.ts";
import { InitialStatePrivateChat } from "../../../types";

const privateChatSlice = createSlice({
  name: "privateChat",
  initialState: InitialStatePrivateChat,
  reducers: {
    addMessages(state, action) {
      state.messages.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    addAsyncCase(
      builder,
      handleMarkMessageAsSeenPrivateChatApi,
      privateChatReducer.handleMarkMessageAsSeenPrivateChat,
      errorMessages.MARK_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handleMuteChatApi,
      privateChatReducer.handleMuteChat,
      errorMessages.MUTE_CHAT_FAILED,
    );
    addAsyncCase(
      builder,
      handleForwardMessageApi,
      privateChatReducer.handleForwardMessage,
      errorMessages.FORWARD_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handlePinMessageApi,
      privateChatReducer.handlePinMessage,
      errorMessages.PIN_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handleUnpinMessageApi,
      privateChatReducer.handleUnpinMessage,
      errorMessages.UNPIN_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handlePinUnpinChatApi,
      privateChatReducer.handlePinUnpinChat,
      errorMessages.PIN_CHAT_FAILED,
    );
    addAsyncCase(
      builder,
      handleCreateChatServiceApi,
      privateChatReducer.handleCreateChatService,
      errorMessages.CREATE_CHAT_FAILED,
    );
    addAsyncCase(
      builder,
      handleFetchChatMessageApi,
      privateChatReducer.handleFetchChatMessage,
      errorMessages.FETCH_CHAT_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handleFetchUserChatsApi,
      privateChatReducer.handleFetchUserChats,
      errorMessages.FETCH_USER_CHATS_FAILED,
    );
    addAsyncCase(
      builder,
      handleClearHistoryChatApi,
      privateChatReducer.handleClearHistoryChat,
      errorMessages.CLEAR_HISTORY_FAILED,
    );
    addAsyncCase(
      builder,
      handleRemoveMessageApi,
      privateChatReducer.handleRemoveMessage,
      errorMessages.REMOVE_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handleAddToSaveMessageApi,
      privateChatReducer.handleAddToSaveMessage,
      errorMessages.SAVE_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handleRemoveChatApi,
      privateChatReducer.handleRemoveChat,
      errorMessages.REMOVE_CHAT_FAILED,
    );
  },
});
export const { addMessages } = privateChatSlice.actions;
export default privateChatSlice.reducer;
