import { createSlice } from "@reduxjs/toolkit";
import { InitialStateSaveMessage } from "../../../types";
import { addAsyncCase } from "../../../utils/general";
import { saveMessageReducers } from "./reducers.ts";
import {
  handleClearHistoryApi,
  handleFetchSaveMessagesApi,
  handlePinExistingMessagesApi,
  handlePinMessageSaveMessageApi,
  handleRemoveMessageSaveMessageApi,
} from "./apis.ts";
import { errorMessages } from "./error.ts";

const SaveMessageReducer = createSlice({
  name: "saveMessage",
  initialState: InitialStateSaveMessage,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncCase(
      builder,
      handleFetchSaveMessagesApi,
      saveMessageReducers.handleFetchSaveMessages,
      errorMessages.FETCH_SAVE_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handlePinMessageSaveMessageApi,
      saveMessageReducers.handlePinMessageSaveMessage,
      errorMessages.PIN_MESSAGE_SAVE_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handleRemoveMessageSaveMessageApi,
      saveMessageReducers.handleRemoveMessageSaveMessage,
      errorMessages.REMOVE_MESSAGE_SAVE_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handlePinExistingMessagesApi,
      saveMessageReducers.handlePinExistingMessages,
      errorMessages.PIN_EXISTING_SAVE_MESSAGE_FAILED,
    );
    addAsyncCase(
      builder,
      handleClearHistoryApi,
      saveMessageReducers.handleClearHistory,
      errorMessages.CLEAR_HISTORY_SAVE_MESSAGE_FAILED,
    );
  },
});

export default SaveMessageReducer.reducer;
