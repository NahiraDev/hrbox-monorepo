import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  GroupServiceTypes,
  GroupAndChannelTypes,
  MemberTypes,
  MessageTypes,
} from "../../../types";
import { apiRequest, handleApiError, notify } from "../../../utils/general";
import { BaseUrl } from "../../../utils/endpoints";
import { handleFetchUserChatsApi } from "../PrivateChatService/apis.ts";

const fetchGroupByIdApi = async (group_id) => {
  const group = await apiRequest(`${BaseUrl}/groups/${group_id}`, "GET");
  if (!group) throw new Error("Group not found.");
  return group;
};

const updateGroupFieldApi = async (group_id, data) => {
  return await apiRequest(`${BaseUrl}/groups/${group_id}`, "PATCH", data);
};

// Add Group
export const handleAddGroupApi = createAsyncThunk(
  "group/addGroup",
  async (groupData: GroupServiceTypes) => {
    return await apiRequest(`${BaseUrl}/groups`, "POST", groupData);
  },
);

// Update Group
export const handleUpdateGroupApi = createAsyncThunk(
  "group/updateGroup",
  async (groupData: GroupServiceTypes) => {
    return await apiRequest(
      `${BaseUrl}/groups/${groupData.id}`,
      "PATCH",
      groupData,
    );
  },
);

// Fetch Groups
export const handleFetchGroupsApi = createAsyncThunk(
  "group/fetchGroups",
  async (_, { rejectWithValue }) => {
    try {
      const groups = await apiRequest(`${BaseUrl}/groups`, "GET");
      return { groups };
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Error fetching group messages:"),
      );
      throw new Error("Failed to fetch group messages.");
    }
  },
);

// Clear History Group
export const handleClearHistoryGroupApi = createAsyncThunk(
  "group/clearChatHistory",
  async ({ group_id }: GroupServiceTypes, { dispatch }) => {
    try {
      const group = await apiRequest(`${BaseUrl}/groups/${group_id}`, "GET");

      if (!group) {
        throw new Error("No chats found for this user.");
      }

      await apiRequest(`${BaseUrl}/groups/${group.id}`, "PATCH", {
        messages: [],
      });

      dispatch(handleFetchGroups());

      toast.success("Messages cleared successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error clearing messages:", error);
      throw new Error("Failed to clear messages.");
    }
  },
);

// Mark As Seen Group Chat
export const handleMarkMessageAsSeenGroupChatApi = createAsyncThunk(
  "group/markMessageAsSeenGroupChat",
  async ({ group_id, message_id }: GroupServiceTypes) => {
    try {
      const group = await apiRequest(`${BaseUrl}/groups/${group_id}`, "GET");

      const updatedMessages = group.messages.map((msg: MessageTypes) => ({
        ...msg,
        status: msg.id === message_id ? "seen" : msg.status,
      }));

      await apiRequest(`${BaseUrl}/groups/${group_id}`, "PATCH", {
        messages: updatedMessages,
      });

      return { message: "Message marked as seen successfully" };
    } catch (error) {
      console.error("Error marking message as seen:", error);
      throw new Error("Failed to mark the message as seen.");
    }
  },
);

// Mute Group
export const handleMuteGroupApi = createAsyncThunk(
  "group/muteGroup",
  async ({ group_id, muted }: GroupServiceTypes, { dispatch }) => {
    try {
      await updateGroupFieldApi(group_id, { muted });
      notify("Group history muted successfully", "success", "top-right");
      return await dispatch(handleFetchGroupsApi()).unwrap();
    } catch (error) {
      console.error("Error muting group:", error);
      throw new Error("Failed to mute the group.");
    }
  },
);

// Pin Message Group
export const handlePinMessageGroupApi = createAsyncThunk(
  "group/pinMessageGroup",
  async ({ message_id, group_id }: GroupServiceTypes, { dispatch }) => {
    try {
      const group = await fetchGroupByIdApi(group_id);

      const messages = group.messages.map((msg: MessageTypes) => ({
        ...msg,
        pinned: true,
      }));

      notify("Message pinned successfully", "success", "top-right");

      await updateGroupFieldApi(group_id, { messages: messages });

      const groups = await dispatch(
        handleFetchGroupChatsApi({ group_id }),
      ).unwrap();

      return { messages, groups };
    } catch (error) {
      console.error("Error pinning message:", error);
      throw new Error("Failed to pin the message.");
    }
  },
);

// Unpin Message
export const handleUnpinMessageGroupApi = createAsyncThunk(
  "group/unpinMessageGroup",
  async ({ message_id, group_id }: GroupServiceTypes, { dispatch }) => {
    try {
      const group = await apiRequest(`${BaseUrl}/groups/${group_id}`, "GET");

      const pinnedMessage = group.messages.find(
        (msg: MessageTypes) => msg.pinned === true,
      );

      if (!pinnedMessage || pinnedMessage.id !== message_id) {
        throw new Error("The specified message is not pinned.");
      }

      const updatedMessage = {
        ...pinnedMessage,
        pinned: false,
      };

      const updatedMessages = group.messages.map((msg: MessageTypes) =>
        msg.id === message_id ? updatedMessage : msg,
      );

      await apiRequest(`${BaseUrl}/groups/${group_id}`, "PATCH", {
        messages: updatedMessages,
      });

      dispatch(handleFetchGroups());

      toast.success("Message unpinned successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error unpinning message:", error);
      throw new Error("Failed to unpin the message.");
    }
  },
);

// Pin Message
export const handlePinGroupApi = createAsyncThunk(
  "group/pinGroup",
  async ({ group_id }: GroupServiceTypes, { dispatch }) => {
    try {
      const groupToPin = await apiRequest(
        `${BaseUrl}/groups/${group_id}`,
        "GET",
      );

      if (!groupToPin) {
        throw new Error("No group found for this ID.");
      }

      const updatedPinnedStatus = !groupToPin.pinned;

      await apiRequest(`${BaseUrl}/groups/${groupToPin.id}`, "PATCH", {
        pinned: updatedPinnedStatus,
      });

      dispatch(handleFetchGroups());

      toast.success("Group pinned successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error pinning group:", error);
      throw new Error("Failed to pin the group.");
    }
  },
);

// Fetch Group Chats
export const handleFetchGroupChatsApi = createAsyncThunk(
  "group/getAllGroupChats",
  async ({ group_id }: GroupServiceTypes) => {
    try {
      const groupChats = await apiRequest(
        `${BaseUrl}/groups/${group_id}`,
        "GET",
      );
      return groupChats;
    } catch (error) {
      console.error("Error fetching group chats:", error);
      throw new Error("Failed to fetch group chats.");
    }
  },
);

// Remove Message From Group
export const handleRemoveMessageGroupApi = createAsyncThunk(
  "group/removeMessageGroup",
  async ({ message_id, group_id }: GroupServiceTypes, { dispatch }) => {
    try {
      const group = await apiRequest(`${BaseUrl}/groups/${group_id}`, "GET");

      const messageToDelete = group.messages.find(
        (msg: MessageTypes) => msg.id === message_id,
      );
      if (!messageToDelete) {
        throw new Error("Message not found.");
      }

      const updatedMessages = group.messages.filter(
        (msg: MessageTypes) => msg.id !== message_id,
      );

      await apiRequest(`${BaseUrl}/groups/${group_id}`, "PATCH", {
        messages: updatedMessages,
      });

      dispatch(handleFetchGroups());

      toast.success("Message deleted successfully", {
        position: "top-right",
      });

      return { message: "Message deleted successfully" };
    } catch (error) {
      console.error("Error deleting message:", error);
      throw new Error("Failed to delete the message.");
    }
  },
);

// Add To Save Message
export const handleAddToSaveMessageGroupApi = createAsyncThunk(
  "group/saveMessage",
  async ({ message_id, group_id }: GroupServiceTypes) => {
    try {
      const groups = await apiRequest(`${BaseUrl}/groups`, "GET");

      const group = groups.find(
        (group: GroupAndChannelTypes) => group.id === group_id,
      );
      if (!group) {
        throw new Error("Chat not found");
      }

      const savedMessage = group.messages.find(
        (message: MessageTypes) => message.id === message_id,
      );
      if (!savedMessage) {
        throw new Error("Message not found");
      }

      await apiRequest(`${BaseUrl}/saveMessage`, "POST", savedMessage);

      toast.success("Message saved successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error saving message:", error);
      throw new Error("Failed to save the message.");
    }
  },
);

// Remove Group
export const handleRemoveGroupApi = createAsyncThunk(
  "group/deleteChat",
  async ({ group_id }: GroupServiceTypes, { dispatch }) => {
    try {
      const group = await apiRequest(`${BaseUrl}/groups/${group_id}`, "GET");

      if (!group) {
        return { message: "No group found with this ID." };
      }

      await apiRequest(`${BaseUrl}/groups/${group.id}`, "DELETE");

      dispatch(handleFetchGroups());

      toast.success("Group deleted successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting group:", error);
      throw new Error("Failed to delete the group.");
    }
  },
);

// Remove User from Group
export const handleRemoveUserFromGroupApi = createAsyncThunk(
  "group/removeUserFromGroup",
  async ({ group_id, member_id, user_id }: GroupServiceTypes, { dispatch }) => {
    try {
      const response = await apiRequest(`${BaseUrl}/groups/${group_id}`, "GET");
      const group = response.data;

      if (group.creatorId !== user_id) {
        throw new Error(
          "You do not have permission to remove users from this group.",
        );
      }

      const memberToRemove = group.members.find(
        (member: MemberTypes) => member.user_id === member_id,
      );

      if (!memberToRemove) {
        throw new Error("No user found with this ID in the group.");
      }

      const updatedMembers = group.members.filter(
        (member: MemberTypes) => member.user_id !== member_id,
      );

      await apiRequest(`${BaseUrl}/groups/${group_id}`, "PATCH", {
        ...group,
        members: updatedMembers,
      });

      dispatch(handleFetchGroups());
      toast.success("User removed from the group successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error removing user:", error);
      throw new Error("Failed to remove user from group.");
    }
  },
);

// Change User Role in Group
export const handleChangeRoleUserGroupApi = createAsyncThunk(
  "group/changeRoleUserGroup",
  async ({ group_id, member_id, user_id }: GroupServiceTypes, { dispatch }) => {
    try {
      const response = await apiRequest(`${BaseUrl}/groups/${group_id}`, "GET");
      const group = response.data;

      if (group.creatorId !== user_id) {
        throw new Error(
          "You do not have permission to change user roles in this group.",
        );
      }

      const memberToChangeRole = group.members.find(
        (member: MemberTypes) => member.user_id === member_id,
      );

      if (!memberToChangeRole) {
        return { message: "No user found with this ID in the group." };
      }

      const updatedMember = {
        ...memberToChangeRole,
        role: "admin",
      };

      const updatedMembers = group.members.map((member: MemberTypes) =>
        member.user_id === member_id ? updatedMember : member,
      );

      await apiRequest(`${BaseUrl}/groups/${group_id}`, "PATCH", {
        ...group,
        members: updatedMembers,
      });

      dispatch(handleFetchGroups());
      toast.success("User role updated successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error updating user role:", error);
      throw new Error("Failed to update user role.");
    }
  },
);
