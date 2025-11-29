import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  MessageTypes,
  PrivateChatServiceTypes,
  PrivateChatTypes,
} from "../../../types";
import { apiRequest, handleApiError, notify } from "../../../utils/general";
import { BaseUrl } from "../../../utils/endpoints";
import { messages } from "eslint-plugin-react/lib/rules/jsx-props-no-spread-multi";

const fetchChatByIdApi = async (chat_id) => {
  const chat = await apiRequest(`${BaseUrl}/chats/${chat_id}`, "GET");
  if (!chat) throw new Error("Chat not found.");
  return chat;
};

const updateChatFieldApi = async (chat_id, data) => {
  return await apiRequest(`${BaseUrl}/chats/${chat_id}`, "PATCH", data);
};

// mark As Seen Private Chat
export const handleMarkMessageAsSeenPrivateChatApi = createAsyncThunk(
  "privateChat/markMessageAsSeenPrivateChat",
  async ({ chat_id, message_id }: PrivateChatServiceTypes) => {
    try {
      const chat = await fetchChatByIdApi(chat_id);
      const updatedMessages = chat.messages.map((msg: MessageTypes) => ({
        ...msg,
        status: msg.id === message_id ? "seen" : msg.status,
      }));
      const messages = await updateChatFieldApi(chat_id, {
        messages: updatedMessages,
      });
      return { messages, message_id };
    } catch (error) {
      handleApiError(error, "Error marking message as seen:");
      throw new Error("Failed to mark the message as seen.");
    }
  },
);

// Mute Private Chat
export const handleMuteChatApi = createAsyncThunk(
  "privateChat/muteChat",
  async ({ chat_id, muted }: PrivateChatServiceTypes, { dispatch }) => {
    await updateChatFieldApi(chat_id, { muted });
    notify("Chat muted successfully", "success", "top-right");
    return await dispatch(handleFetchChatMessageApi()).unwrap();
  },
);

// Pin Private Chat
export const handlePinUnpinChatApi = createAsyncThunk(
  "privateChat/pinChat",
  async ({ chat_id, pinned }: PrivateChatServiceTypes, { dispatch }) => {
    await updateChatFieldApi(chat_id, { pinned });
    notify("Chat pin status updated", "success", "top-right");
    return await dispatch(handleFetchChatMessageApi()).unwrap();
  },
);

// Forward Message Private Chat
export const handleForwardMessageApi = createAsyncThunk(
  "privateChat/forward",
  async (
    { forward_message, chat_id }: PrivateChatServiceTypes,
    { dispatch },
  ) => {
    try {
      const chat = await fetchChatByIdApi(chat_id);
      const newMessage = {
        ...forward_message,
        forwarded: true,
        forwarded_at: new Date(),
      };
      await updateChatFieldApi(chat_id, {
        messages: [...chat.messages, newMessage],
      });
      await dispatch(handleFetchChatMessageApi()).unwrap();
      notify("Message forwarded successfully", "success", "top-right");
    } catch (error) {
      handleApiError(error, "Error forwarding message:");
      throw new Error("Failed to forward the message.");
    }
  },
);

// Pin UnPin Message Private Chat
export const handlePinMessageApi = createAsyncThunk(
  "privateChat/togglePinMessage",
  async ({ message_id, chat_id }: PrivateChatServiceTypes, { dispatch }) => {
    try {
      const chat = await fetchChatByIdApi(chat_id);

      const messages = chat.messages.map((msg: MessageTypes) => ({
        ...msg,
        pinned: true,
      }));

      notify("Message pinned successfully", "success", "top-right");

      await updateChatFieldApi(chat_id, { messages: messages });

      const privateChats = await dispatch(
        handleFetchUserChatsApi({ chat_id }),
      ).unwrap();

      return { messages, privateChats };
    } catch (error) {
      handleApiError(error, "Error updating pin status:");
      throw new Error("Failed to update pin status.");
    }
  },
);

export const handleUnpinMessageApi = createAsyncThunk(
  "privateChat/toggleUnpinMessage",
  async ({ message_id, chat_id }: PrivateChatServiceTypes, { dispatch }) => {
    try {
      const chat = await fetchChatByIdApi(chat_id);
      const messages = chat.messages.map((msg: MessageTypes) => ({
        ...msg,
        pinned: false,
      }));
      await updateChatFieldApi(chat_id, { messages: messages });
      notify("Message unpinned successfully", "success", "top-right");
      const privateChat = await dispatch(
        handleFetchUserChatsApi({ chat_id }),
      ).unwrap();
      return { messages, privateChat };
    } catch (error) {
      handleApiError(error, "Error updating pin status:");
      throw new Error("Failed to update pin status.");
    }
  },
);

// Clear History Private Chat
export const handleClearHistoryChatApi = createAsyncThunk(
  "privateChat/clearChatHistory",
  async ({ chat_id }: PrivateChatServiceTypes, { dispatch }) => {
    try {
      await updateChatFieldApi(chat_id, { messages: [] });
      const privateChat = await dispatch(
        handleFetchUserChatsApi({ chat_id }),
      ).unwrap();

      notify("Chat history cleared successfully", "success", "top-right");
      await dispatch(handleFetchChatMessageApi()).unwrap();
      return { privateChat };
    } catch (error) {
      handleApiError(error, "Error clearing chat history:");
      throw new Error("Failed to clear chat history.");
    }
  },
);

// Remove Private Chat
export const handleRemoveChatApi = createAsyncThunk(
  "privateChat/removeChat",
  async ({ chat_id }: PrivateChatServiceTypes, { dispatch }) => {
    try {
      await apiRequest(`${BaseUrl}/chats/${chat_id}`, "DELETE");
      notify("Chat removed successfully", "success", "top-right");
      return await dispatch(handleFetchChatMessageApi()).unwrap();
    } catch (error) {
      handleApiError(error, "Error removing chat:");
      throw new Error("Failed to remove chat.");
    }
  },
);

// Remove Message Private Chat
export const handleRemoveMessageApi = createAsyncThunk(
  "privateChat/removeMessage",
  async ({ message_id, chat_id }: PrivateChatServiceTypes) => {
    try {
      const chat = await fetchChatByIdApi(chat_id);
      const messages = chat.messages.filter(
        (msg: MessageTypes) => msg.id !== message_id,
      );
      await updateChatFieldApi(chat_id, { messages: messages });
      notify("Message removed successfully", "success", "top-right");
      return { messages };
    } catch (error) {
      handleApiError(error, "Error removing message:");
      throw new Error("Failed to remove message.");
    }
  },
);

// Add To SaveMessage Private Chat
export const handleAddToSaveMessageApi = createAsyncThunk(
  "privateChat/saveMessage",
  async ({ message_id, chat_id }: PrivateChatServiceTypes) => {
    try {
      const chat = await fetchChatByIdApi(chat_id);
      const savedMessage = chat.messages.find(
        (message: MessageTypes) => message.id === message_id,
      );
      notify("Message saved successfully", "success", "top-right");

      return await apiRequest(`${BaseUrl}/saveMessage`, "POST", savedMessage);
    } catch (error) {
      handleApiError(error, "Failed to save message.");
      throw new Error("Failed to save message.");
    }
  },
);

// Create Chat Service Private Chat
export const handleCreateChatServiceApi = createAsyncThunk(
  "privateChat/createChat",
  async (newChatData: PrivateChatTypes) => {
    try {
      const existingChats = await apiRequest(
        `${BaseUrl}/chats?sender_id=${newChatData.sender_id}&recipient_id=${newChatData?.recipient_id}`,
        "GET",
      );

      if (existingChats.length > 0) {
        return {
          message: "Chat already exists",
          existingChat: existingChats[0],
        };
      }

      const createResponse = await apiRequest(
        `${BaseUrl}/chats`,
        "POST",
        newChatData,
      );
      notify("Chat created successfully", "success", "top-right");
      return createResponse;
    } catch (error) {
      handleApiError(error, "Error creating chat:");
      throw new Error("Failed to create chat.");
    }
  },
);

// Fetch User Chats
export const handleFetchUserChatsApi = createAsyncThunk(
  "privateChat/fetchAllUserChats",
  async ({ chat_id }: PrivateChatServiceTypes) => {
    try {
      return await fetchChatByIdApi(chat_id);
    } catch (error) {
      handleApiError(error, "Error fetching user chats:");
      throw new Error("Failed to fetch user chats.");
    }
  },
);

// Fetch Chat Message
export const handleFetchChatMessageApi = createAsyncThunk(
  "privateChat/fetchChatMessages",
  async (_, { rejectWithValue }) => {
    try {
      const privateChats = await apiRequest(`${BaseUrl}/chats`, "GET");
      return { privateChats };
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Error fetching chat messages:"),
      );
      throw new Error("Failed to fetch chat messages.");
    }
  },
);
