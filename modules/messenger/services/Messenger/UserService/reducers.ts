import { setLoadingFalse } from "../../../utils/general.ts";
import { PayloadAction } from "@reduxjs/toolkit";

export const UserReducer = {
  handleGetContacts(state: any, action: PayloadAction<any>) {
    setLoadingFalse(state);
    console.log(action);
    state.users = action.payload;
  },
  handleGetChatContact(state: any, action: PayloadAction<any>) {
    setLoadingFalse(state);
    state.profile = action.payload[0];
  },
};
