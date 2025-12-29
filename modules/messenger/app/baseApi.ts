import { createModuleApi } from "@hrbox/core/apis/baseApi";

export const MessengerApi = createModuleApi({
  reducerPath: "MessengerApi",
  baseUrl: "http://localhost:3000",
  tagTypes: [
    "Channel", "Group", "Message", "PrivateChat", "SaveMessage"
  ],
  requiresAuth: true,
  autoToast: true
});