import { PayloadAction } from "@reduxjs/toolkit";

export const UserReducer = {
  handleGetContacts(state: any, action: PayloadAction<any>) {
    state.users = action.payload;
  },
  handleGetChatContact(state: any, action: PayloadAction<any>) {
    state.profile = action.payload[0];
  }
};
