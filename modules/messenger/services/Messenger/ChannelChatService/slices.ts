import { createSlice } from "@reduxjs/toolkit";
import {
  handleAddChannelApi,
  handleAddToSaveMessageChannelApi,
  handleChangeRoleUserChannelApi,
  handleFetchChannelChatsApi,
  handleFetchChannelsApi,
  handleMarkMessageAsSeenChannelChatApi,
  handleMutedChannelApi,
  handlePinChannelApi,
  handlePinMessageChannelApi,
  handleRemoveChannelApi,
  handleRemoveMessageChannelApi,
  handleRemoveUserFromChannelApi,
  handleUnpinMessageChannelApi,
  handleUpdateChannelApi,
} from "./apis";
import { InitialStateChannel } from "../../../types";
import { channelReducers } from "./reducers";
import { addAsyncCase } from "../../../utils/general.ts";
import { errorMessages } from "./error.ts";

const ChannelChatServiceSlices = createSlice({
  name: "channel",
  initialState: InitialStateChannel,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncCase(
      builder,
      handleAddChannelApi,
      channelReducers.handleAddChannel,
      errorMessages.ADD_CHANNEL_FAILED,
    );
    addAsyncCase(
      builder,
      handleUpdateChannelApi,
      channelReducers.handleUpdateChannel,
      errorMessages.UPDATE_CHANNEL_FAILED,
    );
    addAsyncCase(
      builder,
      handleMarkMessageAsSeenChannelChatApi,
      channelReducers.handleMarkMessageAsSeen,
      errorMessages.MARK_AS_SEEN_CHANNEL_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handleRemoveChannelApi,
      channelReducers.handleRemoveChannel,
      errorMessages.REMOVE_CHANNEL_FAILED,
    );
    addAsyncCase(
      builder,
      handleFetchChannelsApi,
      channelReducers.handleFetchChannel,
      errorMessages.FETCH_CHANNEL_FAILED,
    );
    addAsyncCase(
      builder,
      handleMutedChannelApi,
      channelReducers.handleMutedChannel,
      errorMessages.MUTE_CHANNEL_FAILED,
    );
    addAsyncCase(
      builder,
      handlePinMessageChannelApi,
      channelReducers.handlePinMessage,
      errorMessages.PIN_CHANNEL_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handleUnpinMessageChannelApi,
      channelReducers.handleUnpinMessage,
      errorMessages.UNPIN_CHANNEL_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handlePinChannelApi,
      channelReducers.handlePinChannel,
      errorMessages.PIN_CHANNEL_FAILED,
    );
    addAsyncCase(
      builder,
      handleFetchChannelChatsApi,
      channelReducers.handleFetchChannelChats,
      errorMessages.FETCH_CHANNEL_CHATS_FAILED,
    );
    addAsyncCase(
      builder,
      handleRemoveMessageChannelApi,
      channelReducers.handleRemoveMessageFromChannel,
      errorMessages.REMOVE_MESSAGE_CHANNEL_FAILED,
    );
    addAsyncCase(
      builder,
      handleAddToSaveMessageChannelApi,
      channelReducers.handleAddToSaveMessage,
      errorMessages.ADD_TO_SAVE_MESSAGE_CHANNEL_FAILED,
    );
    addAsyncCase(
      builder,
      handleRemoveUserFromChannelApi,
      channelReducers.handleRemoveUserFromChannel,
      errorMessages.REMOVE_USER_FROM_CHANNEL_FAILED,
    );
    addAsyncCase(
      builder,
      handleChangeRoleUserChannelApi,
      channelReducers.handleChangeRoleUserInChannel,
      errorMessages.CHANGE_ROLE_USER_CHANNEL_FAILED,
    );
  },
});

export default ChannelChatServiceSlices.reducer;
