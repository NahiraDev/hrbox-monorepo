import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { MessageTypes, SaveMessageServiceTypes } from "../../../types";
import { apiRequest, notify } from "../../../utils/general";
import { BaseUrl } from "../../../utils/endpoints";

const handleApiError = (action: string, error: any) => {
  console.error(`Error ${action}:`, error);
  throw new Error(`Failed to ${action}`);
};

const updateMessages = async (
  save_message_id: string,
  updatedMessages: MessageTypes[],
  dispatch: any,
) => {
  await apiRequest(`${BaseUrl}/saveMessage/${save_message_id}`, "PATCH", {
    messages: updatedMessages,
  });
  dispatch(handleFetchSaveMessagesApi());
};

// Fetch Saved Messages
export const handleFetchSaveMessagesApi = createAsyncThunk(
  "saveMessage/fetchMessages",
  async () => {
    try {
      return await apiRequest(`${BaseUrl}/saveMessage`, "GET");
    } catch (error) {
      handleApiError("fetch saved messages", error);
    }
  },
);

// Pin or Remove Pin on Message
export const handlePinMessageSaveMessageApi = createAsyncThunk(
  "saveMessage/togglePinMessageSaveMessage",
  async (
    { message_id, save_message_id }: SaveMessageServiceTypes,
    { dispatch },
  ) => {
    try {
      const saveMessage = await apiRequest(
        `${BaseUrl}/saveMessage/${save_message_id}`,
        "GET",
      );
      const updatedMessages = saveMessage.messages.map((msg: MessageTypes) => ({
        ...msg,
        pinned: msg.id === message_id ? !msg.pinned : msg.pinned,
      }));
      await updateMessages(save_message_id, updatedMessages, dispatch);
      notify("Message pin toggled successfully", "success", "top-right");
    } catch (error) {
      handleApiError("toggle pin on message", error);
    }
  },
);

// Remove Message
export const handleRemoveMessageSaveMessageApi = createAsyncThunk(
  "saveMessage/removeMessage",
  async (
    { message_id, save_message_id }: SaveMessageServiceTypes,
    { dispatch },
  ) => {
    try {
      const saveMessage = await apiRequest(
        `${BaseUrl}/saveMessage/${save_message_id}`,
        "GET",
      );
      const updatedMessages = saveMessage.messages.filter(
        (msg: MessageTypes) => msg.id !== message_id,
      );
      await updateMessages(save_message_id, updatedMessages, dispatch);
      notify("Message deleted successfully", "success", "top-right");
    } catch (error) {
      handleApiError("delete message", error);
    }
  },
);

// Clear All Messages
export const handleClearHistoryApi = createAsyncThunk(
  "saveMessage/clearMessages",
  async ({ save_message_id }: SaveMessageServiceTypes, { dispatch }) => {
    try {
      await updateMessages(save_message_id, [], dispatch);
      notify("Messages cleared successfully", "success", "top-right");
    } catch (error) {
      handleApiError("clear messages", error);
    }
  },
);

// Pin Existing Messages
export const handlePinExistingMessagesApi = createAsyncThunk(
  "saveMessage/pinExistingMessages",
  async (
    { message_id, save_message_id }: SaveMessageServiceTypes,
    { dispatch },
  ) => {
    try {
      const saveMessage = await apiRequest(
        `${BaseUrl}/saveMessage/${save_message_id}`,
        "GET",
      );
      const updatedMessages = saveMessage.messages.map((msg: MessageTypes) => ({
        ...msg,
        pinned: msg.id === message_id || msg.pinned,
      }));
      await updateMessages(save_message_id, updatedMessages, dispatch);
      notify("Message pinned successfully", "success", "top-right");
    } catch (error) {
      handleApiError("pin existing messages", error);
    }
  },
);
