import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  ChannelServiceTypes,
  GroupAndChannelTypes,
  MessageTypes,
  MemberTypes,
} from "../../../types";
import { apiRequest, handleApiError, notify } from "../../../utils/general";
import { BaseUrl } from "../../../utils/endpoints";

const fetchChannelByIdApi = async (channel_id) => {
  return await apiRequest(`${BaseUrl}/channels/${channel_id}`, "GET");
};

const findChannelById = (channels, channel_id) =>
  channels.findIndex(
    (channel: GroupAndChannelTypes) => channel.id === channel_id,
  );

export const handleAddChannelApi = createAsyncThunk(
  "channel/addChannel",
  async (channelData: ChannelServiceTypes) => {
    return await apiRequest(`${BaseUrl}/channels`, "POST", channelData);
  },
);

export const handleUpdateChannelApi = createAsyncThunk(
  "channel/updateChannel",
  async (channelData: ChannelServiceTypes) => {
    return await apiRequest(`${BaseUrl}/channels`, "PATCH", channelData);
  },
);

export const handleFetchChannelsApi = createAsyncThunk(
  "channel/fetchChannels",
  async () => {
    return await apiRequest(`${BaseUrl}/channels`, "GET");
  },
);

export const handleClearHistoryChannelsApi = createAsyncThunk(
  "group/clearChatHistory",
  async ({ channel_id }: ChannelServiceTypes, { dispatch }) => {
    try {
      const channel = await fetchChannelByIdApi(channel_id);
      await apiRequest(`${BaseUrl}/channels/${channel.id}`, "PATCH", {
        messages: [],
      });
      dispatch(handleFetchChannelsApi());
      notify("Messages cleared successfully", "success", "top-right");
    } catch (error) {
      handleApiError(error, "Failed to clear messages.");
      throw new Error("Failed to clear messages.");
    }
  },
);

export const handleMarkMessageAsSeenChannelChatApi = createAsyncThunk(
  "channel/markMessageAsSeenChannelChat",
  async ({ channel_id, message_id }: ChannelServiceTypes) => {
    try {
      const channel = await fetchChannelById(channel_id);
      const updatedMessages = channel.messages.map((msg: MessageTypes) => ({
        ...msg,
        status: msg.id === message_id ? "seen" : msg.status,
      }));

      await apiRequest(`${BaseUrl}/channels/${channel_id}`, "PATCH", {
        messages: updatedMessages,
      });
      return { message: "Message marked as seen successfully" };
    } catch (error) {
      handleApiError(error, "Failed to mark the message as seen.");
      throw new Error("Failed to mark the message as seen.");
    }
  },
);

export const handleMutedChannelApi = createAsyncThunk(
  "channel/muteChannel",
  async ({ channel_id }: ChannelServiceTypes, { dispatch }) => {
    try {
      const channel = await fetchChannelByIdApi(channel_id);
      await apiRequest(`${BaseUrl}/channels/${channel.id}`, "PATCH", {
        muted: !channel.muted,
      });
      dispatch(handleFetchChannelsApi());
      notify("Channel muted successfully", "success", "top-right");
    } catch (error) {
      handleApiError(error, "Error muting channel.");
      throw new Error("Error muting channel.");
    }
  },
);

export const handlePinMessageChannelApi = createAsyncThunk(
  "channel/pinMessageChannel",
  async ({ message_id, channel_id }: ChannelServiceTypes, { dispatch }) => {
    try {
      const channel = await fetchChannelByIdApi(channel_id);
      const updatedMessages = channel.messages.map((msg: MessageTypes) => ({
        ...msg,
        pinned: msg.id === message_id,
      }));

      await apiRequest(`${BaseUrl}/channels/${channel_id}`, "PATCH", {
        messages: updatedMessages,
      });
      dispatch(handleFetchChannelsApi());
      notify("Message pinned successfully", "success", "top-right");
    } catch (error) {
      handleApiError(error, "Failed to pin the message.");
      throw new Error("Failed to pin the message.");
    }
  },
);

export const handleUnpinMessageChannelApi = createAsyncThunk(
  "channel/unpinMessageChannel",
  async ({ message_id, channel_id }: ChannelServiceTypes, { dispatch }) => {
    try {
      const channel = await fetchChannelByIdApi(channel_id);
      const updatedMessages = channel.messages.map((msg: MessageTypes) => ({
        ...msg,
        pinned: msg.id === message_id ? false : msg.pinned,
      }));

      await apiRequest(`${BaseUrl}/channels/${channel_id}`, "PATCH", {
        messages: updatedMessages,
      });
      dispatch(handleFetchChannelsApi());
      notify("Message unpinned successfully", "success", "top-right");
    } catch (error) {
      handleApiError(error, "Error unpinning message.");
      throw new Error("Error unpinning message.");
    }
  },
);

export const handlePinChannelApi = createAsyncThunk(
  "channel/pinChannel",
  async ({ channel_id }: ChannelServiceTypes, { dispatch }) => {
    try {
      const channel = await fetchChannelByIdApi(channel_id);
      await apiRequest(`${BaseUrl}/channels/${channel.id}`, "PATCH", {
        pinned: !channel.pinned,
      });
      dispatch(handleFetchChannelsApi());
      notify("Channel pinned successfully", "success", "top-right");
    } catch (error) {
      handleApiError(error, "Error pinning channel.");
      throw new Error("Error pinning channel.");
    }
  },
);

export const handleFetchChannelChatsApi = createAsyncThunk(
  "channel/getAllChannelsChats",
  async ({ channel_id }: ChannelServiceTypes) => {
    return await fetchChannelByIdApi(channel_id);
  },
);

export const handleRemoveMessageChannelApi = createAsyncThunk(
  "channel/removeMessageChannel",
  async (
    { message_id, channel_id, user_id }: ChannelServiceTypes,
    { dispatch },
  ) => {
    try {
      const channel = await fetchChannelByIdApi(channel_id);
      if (channel.creatorId !== user_id)
        new Error("You do not have permission to delete this message.");

      const updatedMessages = channel.messages.filter(
        (msg: MessageTypes) => msg.id !== message_id,
      );
      await apiRequest(`${BaseUrl}/channels/${channel_id}`, "PATCH", {
        messages: updatedMessages,
      });
      dispatch(handleFetchChannelsApi());
      notify("Message deleted successfully", "success", "top-right");
    } catch (error) {
      handleApiError(error, "Error deleting message.");
      throw new Error("Error deleting message.");
    }
  },
);

export const handleRemoveChannelApi = createAsyncThunk(
  "channel/deleteChatChannel",
  async ({ channel_id, user_id }: ChannelServiceTypes, { dispatch }) => {
    try {
      const channel = await fetchChannelByIdApi(channel_id);
      if (channel.creatorId !== user_id)
        new Error("You do not have permission to delete this channel.");
      await apiRequest(`${BaseUrl}/channels/${channel.id}`, "DELETE");
      dispatch(handleFetchChannelsApi());
      notify("Channel deleted successfully", "success", "top-right");
    } catch (error) {
      handleApiError(error, "Error deleting channel.");
      throw new Error("Error deleting channel.");
    }
  },
);

export const handleAddToSaveMessageChannelApi = createAsyncThunk(
  "channel/saveMessageChannel",
  async ({ message_id, channel_id }: ChannelServiceTypes) => {
    try {
      const channel = await fetchChannelByIdApi(channel_id);
      const savedMessage = channel.messages.find(
        (msg: MessageTypes) => msg.id === message_id,
      );
      if (!savedMessage) new Error("Message not found");

      await apiRequest(`${BaseUrl}/saveMessage`, "POST", savedMessage);
      notify("Message saved successfully", "success", "top-right");
    } catch (error) {
      handleApiError(error, "Error saving message.");
      throw new Error("Error saving message.");
    }
  },
);

export const handleRemoveUserFromChannelApi = createAsyncThunk(
  "channel/removeUserFromChannel",
  async (
    { channel_id, member_id, user_id }: ChannelServiceTypes,
    { dispatch },
  ) => {
    try {
      const channel = await fetchChannelByIdApi(channel_id);
      if (channel.creatorId !== user_id)
        new Error(
          "You do not have permission to remove users from this channel.",
        );

      const updatedMembers = channel.members.filter(
        (member: MemberTypes) => member.user_id !== member_id,
      );
      await apiRequest(`${BaseUrl}/channels/${channel_id}`, "PATCH", {
        members: updatedMembers,
      });
      dispatch(handleFetchChannelsApi());
      notify(
        "User removed from the group successfully",
        "success",
        "top-right",
      );
    } catch (error) {
      handleApiError(error, "Failed to remove user from channel.");
      throw new Error("Failed to remove user from channel.");
    }
  },
);

export const handleChangeRoleUserChannelApi = createAsyncThunk(
  "channel/changeRoleUserChannel",
  async (
    { channel_id, member_id, user_id }: ChannelServiceTypes,
    { dispatch },
  ) => {
    try {
      const channel = await fetchChannelByIdApi(channel_id);
      if (channel.creatorId !== user_id)
        throw new Error(
          "You do not have permission to change user roles in this channel.",
        );

      const updatedMembers = channel.members.map((member: MemberTypes) =>
        member.user_id === member_id ? { ...member, role: "admin" } : member,
      );

      await apiRequest(`${BaseUrl}/channels/${channel_id}`, "PATCH", {
        members: updatedMembers,
      });
      dispatch(handleFetchChannelsApi());
      notify("User role updated successfully", "success", "top-right");
    } catch (error) {
      handleApiError(error, "Failed to update user role.");
      throw new Error("Failed to update user role.");
    }
  },
);
