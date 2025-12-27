import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest, handleApiError } from "../../../utils/general.ts";
import { BaseUrl } from "../../../utils/endpoints.ts";

export const handleGetContactsApi = createAsyncThunk(
  "user/getContacts",
  async (_, { rejectWithValue }) => {
    try {
      return await apiRequest(`${BaseUrl}/contacts`, "GET");
    } catch (error) {
      handleApiError("Fetch Contact List", error);
      return rejectWithValue(handleApiError("Fetch Contact List", error));
    }
  },
);

export const handleGetChatContactApi = createAsyncThunk(
  "user/getChatContact",
  async ({ user_id }: { user_id: string }) => {
    try {
      await apiRequest(`${BaseUrl}/contacts/${user_id}`);
    } catch (error) {
      handleApiError("get Chat Contact", error);
      return rejectWithValue(handleApiError("get Chat Contact", error));
    }
  },
);
