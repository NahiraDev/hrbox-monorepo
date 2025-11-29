import { PayloadAction } from "@reduxjs/toolkit";
import {
  GroupAndChannelTypes,
  MemberTypes,
  MessageTypes,
} from "../../../types";
import { setLoadingFalse } from "../../../utils/general";

// Utility function to find group by ID
const findGroupById = (groups, groupId) =>
  groups.findIndex((group: GroupAndChannelTypes) => group.id === groupId);

// Utility function to find message by ID
const findMessageById = (messages, messageId) =>
  messages.findIndex((message: MessageTypes) => message.id === messageId);

export const groupReducers = {
  handleAddGroup(state, action: PayloadAction<GroupAndChannelTypes>) {
    setLoadingFalse(state);
    state.groups = [...state.groups, action.payload];
  },

  handleUpdateGroup(state, action: PayloadAction<any>) {
    setLoadingFalse(state);
    console.log(action.payload);
    state.groups = [...state.groups, ...action.payload];
  },

  handleMarkMessageAsSeen(state, action: PayloadAction<any>) {
    setLoadingFalse(state);
    const msgIndex = findMessageById(state.messages, action.payload.message_id);
    if (msgIndex !== -1) {
      state.messages[msgIndex].status = "seen";
    }
  },

  handleRemoveGroup(state, action: PayloadAction<any>) {
    const { group_id, user_id, creator_id } = action.payload;
    const groupIndex = findGroupById(state.groups, group_id);

    if (user_id === creator_id) {
      state.groups = state.groups.filter(
        (group: GroupAndChannelTypes) => group.id !== group_id,
      );
    } else if (groupIndex !== -1) {
      state.groups[groupIndex].members = state.groups[
        groupIndex
      ].members.filter((member: MemberTypes) => member.id !== user_id);
    }
    setLoadingFalse(state);
  },

  handleFetchGroups(state, action: PayloadAction<any>) {
    setLoadingFalse(state);
    state.groups = action.payload.groups;
  },

  handleMuteGroup(state, action: PayloadAction<any>) {
    setLoadingFalse(state);
    state.groups = action.payload.groups;
  },

  handlePinMessage(state, action: PayloadAction<any>) {
    setLoadingFalse(state);
    state.messages = action.payload.messages;
  },

  handleUnpinMessage(state, action: PayloadAction<any>) {
    setLoadingFalse(state);
    state.messages = action.payload.messages;
  },

  handlePinGroup(state, action: PayloadAction<any>) {
    setLoadingFalse(state);
    const groupIndex = findGroupById(state.groups, action.payload);
    if (groupIndex !== -1) {
      state.groups[groupIndex].pinned = true;
    }
  },

  handleFetchGroupChats(state, action: PayloadAction<any>) {
    setLoadingFalse(state);
    const { group_id, messages } = action.payload;
    const groupIndex = findGroupById(state.groups, group_id);

    if (groupIndex !== -1) {
      state.messages = action.payload;
      state.groups[groupIndex].messages = messages;
    }
  },

  handleRemoveMessageFromGroup(state, action: PayloadAction<any>) {
    setLoadingFalse(state);
    const { group_id, message_id } = action.payload;
    const groupIndex = findGroupById(state.groups, group_id);

    if (groupIndex !== -1) {
      state.groups[groupIndex].messages = state.groups[
        groupIndex
      ].messages.filter((message: MessageTypes) => message.id !== message_id);
    }
  },

  handleAddToSaveMessage(state, action: PayloadAction<any>) {
    setLoadingFalse(state);
    const { message, group_id } = action.payload;
    const groupIndex = findGroupById(state.groups, group_id);

    if (groupIndex !== -1) {
      const pinnedMessage = { ...message, pinned: true };
      state.groups[groupIndex].messages.push(pinnedMessage);
      state.groups[groupIndex].pinned = true;
    }
  },

  handleRemoveUserFromGroup(state, action: PayloadAction<any>) {
    setLoadingFalse(state);
    const { group_id, member_id } = action.payload;
    const groupIndex = findGroupById(state.groups, group_id);

    if (groupIndex !== -1) {
      state.groups[groupIndex].members = state.groups[
        groupIndex
      ].members.filter((member: MemberTypes) => member.user_id !== member_id);
    }
  },

  handleChangeRoleUserInGroup(state, action: PayloadAction<any>) {
    setLoadingFalse(state);
    const { group_id, member_id } = action.payload;

    const memberToUpdate = state.groups
      .flatMap((group: GroupAndChannelTypes) =>
        group.members.map((member: MemberTypes) => ({
          ...member,
          group_id: group.id,
        })),
      )
      .find(
        (member: any) =>
          member.user_id === member_id && member.group_id === group_id,
      );

    if (memberToUpdate) {
      memberToUpdate.role = "admin";
    }
  },
};
