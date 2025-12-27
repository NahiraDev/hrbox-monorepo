import { createSlice } from "@reduxjs/toolkit";
import { handleGetChatContactApi, handleGetContactsApi } from "./apis";
import { InitialStateUsers } from "../../../types";
import { addAsyncCase } from "../../../utils/general.ts";
import { errorMessages } from "./error.ts";
import { UserReducer } from "./reducers.ts";

const UserSlices = createSlice({
  name: "user",
  initialState: InitialStateUsers,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncCase(
      builder,
      handleGetContactsApi,
      UserReducer.handleGetContacts,
      errorMessages.GET_CONTACT_FAILED,
    );
    addAsyncCase(
      builder,
      handleGetChatContactApi,
      UserReducer.handleGetChatContact,
      errorMessages.GET_CHAT_CONTACT_FAILED,
    );
  },
});

export default UserSlices.reducer;
