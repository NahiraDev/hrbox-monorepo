import { createSlice } from "@reduxjs/toolkit";
import { MessengerAction } from "@hrbox/modules/messenger/types";

export const initialStateMessengerAction: MessengerAction = {
  isOpen: false,
  isEdit: false,
  isOpenEmojiPicker: false
};

const MessengerActionReducer = createSlice({
  name: "MessengerAction",
  initialState: initialStateMessengerAction,
  reducers: {
    setIsEdit(state) {
      state.isEdit = !state.isEdit;
    },
    closeInfo(state) {
      state.isOpen = false;
    },
    toggleInfo(state) {
      state.isOpen = !state.isOpen;
    },
    openEmojiPicker: (state) => {
      state.isOpenEmojiPicker = true;
    },
    closeEmojiPicker: (state) => {
      state.isOpenEmojiPicker = false;
    }
  }
});

export const {
  setIsEdit,
  closeInfo,
  toggleInfo,
  openEmojiPicker,
  closeEmojiPicker
} = MessengerActionReducer.actions;

export default MessengerActionReducer.reducer;
