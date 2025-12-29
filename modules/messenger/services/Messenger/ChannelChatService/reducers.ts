import { PayloadAction } from "@reduxjs/toolkit";
import { GroupAndChannelTypes, MemberTypes, MessageTypes } from "../../../types";

const findChannelIndex = (state: any, channel_id: string) => {
  return state.channels.findIndex(
    (channel: GroupAndChannelTypes) => channel.id === channel_id
  );
};

const findMessageIndex = (
  channel: GroupAndChannelTypes,
  message_id: string
) => {
  return channel.messages.findIndex(
    (message: MessageTypes) => message.id === message_id
  );
};

const updateChannelField = (
  state: any,
  channel_id: string,
  updates: Partial<GroupAndChannelTypes>
) => {
  const index = findChannelIndex(state, channel_id);
  if (index !== -1) {
    state.channels[index] = { ...state.channels[index], ...updates };
  }
};

export const channelReducers = {
  handleAddChannel(state: any, action: PayloadAction<GroupAndChannelTypes>) {
    state.channels.push(action.payload);
  },

  handleUpdateChannel(state: any, action: PayloadAction<any>) {
    updateChannelField(state, action.payload.id, action.payload);
  },

  handleMarkMessageAsSeen(state: any, action: PayloadAction<any>) {
    setLoadingFalse(state);
    const { channel_id, message_id } = action.payload;
    const index = findChannelIndex(state, channel_id);
    if (index !== -1) {
      const msgIndex = findMessageIndex(state.channels[index], message_id);
      if (msgIndex !== -1) {
        state.channels[index].messages[msgIndex].status = "seen";
      }
    }
  },

  handleRemoveChannel(state: any, action: PayloadAction<any>) {
    const { channel_id, user_id, creator_id } = action.payload;
    const index = findChannelIndex(state, channel_id);

    if (user_id === creator_id) {
      state.channels = state.channels.filter(
        (channel: GroupAndChannelTypes) => channel.id !== channel_id
      );
    } else if (index !== -1) {
      state.channels[index].members = state.channels[index].members.filter(
        (member: MemberTypes) => member.id !== user_id
      );
    }
  },

  handleFetchChannel(state: any, action: PayloadAction<any>) {
    state.channels = action.payload;
  },

  handleMutedChannel(state: any, action: PayloadAction<string>) {
    updateChannelField(state, action.payload, { muted: true });
  },

  handlePinMessage(state: any, action: PayloadAction<any>) {
    const { channel_id, message_id } = action.payload;
    const index = findChannelIndex(state, channel_id);

    if (index !== -1) {
      const msgIndex = findMessageIndex(state.channels[index], message_id);
      if (msgIndex !== -1) {
        state.channels[index].messages[msgIndex].pinned = true;
      }
    }
  },

  handleUnpinMessage(state: any, action: PayloadAction<any>) {
    const { channel_id, message_id } = action.payload;
    const index = findChannelIndex(state, channel_id);

    if (index !== -1) {
      const msgIndex = findMessageIndex(state.channels[index], message_id);
      if (msgIndex !== -1) {
        state.channels[index].messages[msgIndex].pinned = false;
      }
    }
  },

  handlePinChannel(state: any, action: PayloadAction<string>) {
    updateChannelField(state, action.payload, { pinned: true });
  },

  handleFetchChannelChats(state: any, action: PayloadAction<any>) {
    const { channel_id, messages } = action.payload;
    const index = findChannelIndex(state, channel_id);

    if (index !== -1) {
      state.channels[index].messages = messages;
    }
  },

  handleRemoveMessageFromChannel(state: any, action: PayloadAction<any>) {
    const { channel_id, messageId } = action.payload;
    const index = findChannelIndex(state, channel_id);

    if (index !== -1) {
      state.channels[index].messages = state.channels[index].messages.filter(
        (message: MessageTypes) => message.id !== messageId
      );
    }
  },

  handleAddToSaveMessage(state: any, action: PayloadAction<any>) {
    const { message, channel_id } = action.payload;
    const index = findChannelIndex(state, channel_id);

    if (index !== -1) {
      state.channels[index].messages.push({ ...message, pinned: true });
    }
  },

  handleRemoveUserFromChannel(state: any, action: PayloadAction<any>) {
    const { channel_id, member_id } = action.payload;
    const index = findChannelIndex(state, channel_id);

    if (index !== -1) {
      state.channels[index].members = state.channels[index].members.filter(
        (member: MemberTypes) => member.id !== member_id
      );
    }
  },

  handleChangeRoleUserInChannel(state: any, action: PayloadAction<any>) {
    const { channel_id, member_id, newRole } = action.payload;
    const index = findChannelIndex(state, channel_id);

    if (index !== -1) {
      const member = state.channels[index].members.find(
        (member: MemberTypes) => member.id === member_id
      );

      if (member) {
        member.role = newRole;
      }
    }
  }
};
