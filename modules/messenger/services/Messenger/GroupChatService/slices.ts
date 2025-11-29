import { createSlice } from "@reduxjs/toolkit";
import {
  handleAddGroupApi,
  handleAddToSaveMessageGroupApi,
  handleChangeRoleUserGroupApi,
  handleFetchGroupChatsApi,
  handleFetchGroupsApi,
  handleMarkMessageAsSeenGroupChatApi,
  handleMuteGroupApi,
  handlePinGroupApi,
  handlePinMessageGroupApi,
  handleRemoveGroupApi,
  handleRemoveMessageGroupApi,
  handleRemoveUserFromGroupApi,
  handleUnpinMessageGroupApi,
  handleUpdateGroupApi,
} from "./apis";
import { InitialStateGroup } from "../../../types";
import { groupReducers } from "./reducers";
import { addAsyncCase } from "../../../utils/general.ts";
import { errorMessages } from "./error.ts";

const GroupChatServiceSlices = createSlice({
  name: "group",
  initialState: InitialStateGroup,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncCase(
      builder,
      handleAddGroupApi,
      groupReducers.handleAddGroup,
      errorMessages.ADD_GROUP_FAILED,
    );
    addAsyncCase(
      builder,
      handleUpdateGroupApi,
      groupReducers.handleUpdateGroup,
      errorMessages.UPDATE_GROUP_FAILED,
    );
    addAsyncCase(
      builder,
      handleMarkMessageAsSeenGroupChatApi,
      groupReducers.handleMarkMessageAsSeen,
      errorMessages.MARK_AS_SEEN_GROUP_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handleRemoveGroupApi,
      groupReducers.handleRemoveGroup,
      errorMessages.REMOVE_GROUP_FAILED,
    );
    addAsyncCase(
      builder,
      handleFetchGroupsApi,
      groupReducers.handleFetchGroups,
      errorMessages.FETCH_GROUPS_FAILED,
    );
    addAsyncCase(
      builder,
      handleMuteGroupApi,
      groupReducers.handleMuteGroup,
      errorMessages.MUTE_GROUP_FAILED,
    );
    addAsyncCase(
      builder,
      handlePinMessageGroupApi,
      groupReducers.handlePinMessage,
      errorMessages.PIN_GROUP_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handleUnpinMessageGroupApi,
      groupReducers.handleUnpinMessage,
      errorMessages.UNPIN_GROUP_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handlePinGroupApi,
      groupReducers.handlePinGroup,
      errorMessages.PIN_GROUP_FAILED,
    );
    addAsyncCase(
      builder,
      handleFetchGroupChatsApi,
      groupReducers.handleFetchGroupChats,
      errorMessages.FETCH_GROUP_CHATS_FAILED,
    );
    addAsyncCase(
      builder,
      handleRemoveMessageGroupApi,
      groupReducers.handleRemoveMessageFromGroup,
      errorMessages.REMOVE_MESSAGE_GROUP_FAILED,
    );
    addAsyncCase(
      builder,
      handleAddToSaveMessageGroupApi,
      groupReducers.handleAddToSaveMessage,
      errorMessages.ADD_TO_SAVE_MESSAGE_GROUP_FAILED,
    );
    addAsyncCase(
      builder,
      handleRemoveUserFromGroupApi,
      groupReducers.handleRemoveUserFromGroup,
      errorMessages.REMOVE_USER_FROM_GROUP_FAILED,
    );
    addAsyncCase(
      builder,
      handleChangeRoleUserGroupApi,
      groupReducers.handleChangeRoleUserInGroup,
      errorMessages.CHANGE_ROLE_USER_GROUP_FAILED,
    );
  },
});

export default GroupChatServiceSlices.reducer;
