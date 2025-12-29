import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageActionState } from "@hrbox/modules/messenger/types";


export const initialStateMessageAction: MessageActionState = {
  message_id: "",
  chat_id: "",
  reply: false,
  message_data: "",
  reply_message_data: "",
  reply_message_type: "",
  reply_message_file_name: "",
  reply_message_id: "",
  file_name: "",
  is_typing: false,
  highlighted_message_id: "",
  filteredMessages: []
};

const MessageActionReducer = createSlice({
  name: "messengerAction",
  initialState: initialStateMessageAction,
  reducers: {
    updateFilteredMessages(state, action) {
      state.filteredMessages = action.payload;
    },
    setMessageId(state, action: PayloadAction<string>) {
      state.message_id = action.payload;
    },
    openReplyMessageAction(state) {
      state.reply = true;
    },
    setHighlightedMessageId(state, action: PayloadAction<string>) {
      state.highlighted_message_id = action.payload;
    },
    closeReplyMessageAction(state) {
      state.reply = false;
      state.message_id = "";
      state.message_data = "";
      state.reply_message_data = "";
      state.reply_message_type = "";
      state.reply_message_file_name = "";
      (state.reply_message_id = ""), (state.file_name = "");
    },
    setIsTyping(state, action) {
      state.is_typing = action.payload;
    },
    setMessageData(
      state,
      action: PayloadAction<{
        messageId: string;
        data?: any;
        reply_message_data?: any;
        reply_message_type?: string;
        reply_message_file_name?: string;
        reply_message_id?: string;
        file_name?: string;
      }>
    ) {
      state.message_id = action.payload.messageId;
      state.message_data = action.payload.data;
      state.reply_message_data = action.payload.reply_message_data;
      state.reply_message_type = action.payload.reply_message_type;
      state.reply_message_file_name = action.payload.reply_message_file_name;
      state.reply_message_id = action.payload.reply_message_id;
      state.file_name = action.payload.file_name;
    }
  }
});

export const {
  openReplyMessageAction,
  setMessageData,
  setHighlightedMessageId,
  setMessageId,
  setIsTyping,
  closeReplyMessageAction,
  updateFilteredMessages
} = MessageActionReducer.actions;

export default MessageActionReducer.reducer;
