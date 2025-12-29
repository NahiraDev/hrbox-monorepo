import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { MessengerApiEndpoints } from "@hrbox/modules/messenger/app/endpoints";
import { MessengerApi } from "@hrbox/modules/messenger/app/baseApi";

export const privateChatApi = MessengerApi.injectEndpoints({
  endpoints: (build: any) => ({

    markMessageAsSeen: createMutation<any, { chat_id: string; message_id: string }>(build, {
      url: MessengerApiEndpoints.private.markAsSeen,
      method: "PATCH",
      tags: ["PrivateChat"]
    }),

    muteChat: createMutation<any, { chat_id: string; muted: boolean }>(build, {
      url: MessengerApiEndpoints.private.mute,
      method: "PATCH",
      tags: ["PrivateChat"]
    }),

    pinUnpinChat: createMutation<any, { chat_id: string; pinned: boolean }>(build, {
      url: MessengerApiEndpoints.private.pin,
      method: "PATCH",
      tags: ["PrivateChat"]
    }),

    forwardMessage: createMutation<any, { forward_message: any; chat_id: string }>(build, {
      url: MessengerApiEndpoints.private.forward,
      method: "POST",
      tags: ["PrivateChat"]
    }),

    pinMessage: createMutation<any, { message_id: string; chat_id: string }>(build, {
      url: MessengerApiEndpoints.private.pinMessage,
      method: "PATCH",
      tags: ["PrivateChat"]
    }),

    unpinMessage: createMutation<any, { message_id: string; chat_id: string }>(build, {
      url: MessengerApiEndpoints.private.unpinMessage,
      method: "PATCH",
      tags: ["PrivateChat"]
    }),

    clearChatHistory: createMutation<any, { chat_id: string }>(build, {
      url: MessengerApiEndpoints.private.clearHistory,
      method: "PATCH",
      tags: ["PrivateChat"]
    }),

    removeChat: createMutation<any, { chat_id: string }>(build, {
      url: MessengerApiEndpoints.private.delete,
      method: "DELETE",
      tags: ["PrivateChat"]
    }),

    removeMessage: createMutation<any, { message_id: string; chat_id: string }>(build, {
      url: MessengerApiEndpoints.private.removeMessage,
      method: "DELETE",
      tags: ["PrivateChat"]
    }),

    saveMessage: createMutation<any, { message_id: string; chat_id: string }>(build, {
      url: MessengerApiEndpoints.private.saveMessage,
      method: "POST",
      tags: ["PrivateChat"]
    }),

    createChat: createMutation<any, any>(build, {
      url: MessengerApiEndpoints.private.create,
      method: "POST",
      tags: ["PrivateChat"]
    }),

    fetchUserChats: createQuery<any, { chat_id: string }>(build, {
      url: MessengerApiEndpoints.private.getChats,
      method: "GET",
      tags: ["PrivateChat"]
    }),

    fetchChatMessages: createQuery<any, any>(build, {
      url: MessengerApiEndpoints.private.getList,
      method: "GET",
      tags: ["PrivateChat"]
    })

  })
});

export const {
  useMarkMessageAsSeenMutation,
  useMuteChatMutation,
  usePinUnpinChatMutation,
  useForwardMessageMutation,
  usePinMessageMutation,
  useUnpinMessageMutation,
  useClearChatHistoryMutation,
  useRemoveChatMutation,
  useRemoveMessageMutation,
  useSaveMessageMutation,
  useCreateChatMutation,
  useFetchUserChatsQuery,
  useLazyFetchUserChatsQuery,
  useFetchChatMessagesQuery
} = privateChatApi;