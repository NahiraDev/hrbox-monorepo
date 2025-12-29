import { PayloadAction } from "@reduxjs/toolkit";
import { GroupAndChannelTypes, MemberTypes, MessageTypes } from "../../../types";

// Utility function to find group by ID
const findGroupById = (groups: any, groupId: any) =>
  groups.findIndex((group: GroupAndChannelTypes) => group.id === groupId);

// Utility function to find message by ID
const findMessageById = (messages: any, messageId: any) =>
  messages.findIndex((message: MessageTypes) => message.id === messageId);

export const groupReducers = {
  handleAddGroup(state: any, action: PayloadAction<GroupAndChannelTypes>) {
    state.groups = [...state.groups, action.payload];
  },

  handleUpdateGroup(state: any, action: PayloadAction<any>) {
    state.groups = [...state.groups, ...action.payload];
  },

  handleMarkMessageAsSeen(state: any, action: PayloadAction<any>) {
    const msgIndex = findMessageById(state.messages, action.payload.message_id);
    if (msgIndex !== -1) {
      state.messages[msgIndex].status = "seen";
    }
  },

  handleRemoveGroup(state: any, action: PayloadAction<any>) {
    const { group_id, user_id, creator_id } = action.payload;
    const groupIndex = findGroupById(state.groups, group_id);

    if (user_id === creator_id) {
      state.groups = state.groups.filter(
        (group: GroupAndChannelTypes) => group.id !== group_id
      );
    } else if (groupIndex !== -1) {
      state.groups[groupIndex].members = state.groups[
        groupIndex
        ].members.filter((member: MemberTypes) => member.id !== user_id);
    }
  },

  handleFetchGroups(state: any, action: PayloadAction<any>) {
    state.groups = action.payload.groups;
  },

  handleMuteGroup(state: any, action: PayloadAction<any>) {
    state.groups = action.payload.groups;
  },

  handlePinMessage(state: any, action: PayloadAction<any>) {
    state.messages = action.payload.messages;
  },

  handleUnpinMessage(state: any, action: PayloadAction<any>) {
    state.messages = action.payload.messages;
  },

  handlePinGroup(state: any, action: PayloadAction<any>) {
    const groupIndex = findGroupById(state.groups, action.payload);
    if (groupIndex !== -1) {
      state.groups[groupIndex].pinned = true;
    }
  },

  handleFetchGroupChats(state: any, action: PayloadAction<any>) {
    const { group_id, messages } = action.payload;
    const groupIndex = findGroupById(state.groups, group_id);

    if (groupIndex !== -1) {
      state.messages = action.payload;
      state.groups[groupIndex].messages = messages;
    }
  },

  handleRemoveMessageFromGroup(state: any, action: PayloadAction<any>) {
    const { group_id, message_id } = action.payload;
    const groupIndex = findGroupById(state.groups, group_id);

    if (groupIndex !== -1) {
      state.groups[groupIndex].messages = state.groups[
        groupIndex
        ].messages.filter((message: MessageTypes) => message.id !== message_id);
    }
  },

  handleAddToSaveMessage(state: any, action: PayloadAction<any>) {
    const { message, group_id } = action.payload;
    const groupIndex = findGroupById(state.groups, group_id);

    if (groupIndex !== -1) {
      const pinnedMessage = { ...message, pinned: true };
      state.groups[groupIndex].messages.push(pinnedMessage);
      state.groups[groupIndex].pinned = true;
    }
  },

  handleRemoveUserFromGroup(state: any, action: PayloadAction<any>) {
    const { group_id, member_id } = action.payload;
    const groupIndex = findGroupById(state.groups, group_id);

    if (groupIndex !== -1) {
      state.groups[groupIndex].members = state.groups[
        groupIndex
        ].members.filter((member: MemberTypes) => member.user_id !== member_id);
    }
  },

  handleChangeRoleUserInGroup(state: any, action: PayloadAction<any>) {
    const { group_id, member_id } = action.payload;

    const memberToUpdate = state.groups
      .flatMap((group: GroupAndChannelTypes) =>
        group.members.map((member: MemberTypes) => ({
          ...member,
          group_id: group.id
        }))
      )
      .find(
        (member: any) =>
          member.user_id === member_id && member.group_id === group_id
      );

    if (memberToUpdate) {
      memberToUpdate.role = "admin";
    }
  }
};
