import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { MessengerApiEndpoints } from "@hrbox/modules/messenger/app/endpoints";
import { MessengerApi } from "@hrbox/modules/messenger/app/baseApi";

export const saveMessageApi = MessengerApi.injectEndpoints({
  endpoints: (build: any) => ({

    fetchSaveMessages: createQuery<any, void>(build, {
      url: MessengerApiEndpoints.saveMessages.fetch,
      method: "GET",
      tags: ["SaveMessage"]
    }),

    pinMessageSaveMessage: createMutation<any, { message_id: string; save_message_id: string }>(build, {
      url: MessengerApiEndpoints.saveMessages.pinMessage,
      method: "PATCH",
      tags: ["SaveMessage"]
    }),

    removeMessageSaveMessage: createMutation<any, { message_id: string; save_message_id: string }>(build, {
      url: MessengerApiEndpoints.saveMessages.removeMessage,
      method: "DELETE",
      tags: ["SaveMessage"]
    }),

    clearHistorySaveMessage: createMutation<any, { save_message_id: string }>(build, {
      url: MessengerApiEndpoints.saveMessages.clearHistory,
      method: "PATCH",
      tags: ["SaveMessage"]
    }),

    pinExistingMessages: createMutation<any, { message_id: string; save_message_id: string }>(build, {
      url: MessengerApiEndpoints.saveMessages.pinExisting,
      method: "PATCH",
      tags: ["SaveMessage"]
    })

  })
});

export const {
  useFetchSaveMessagesQuery,
  useLazyFetchSaveMessagesQuery,
  usePinMessageSaveMessageMutation,
  useRemoveMessageSaveMessageMutation,
  useClearHistorySaveMessageMutation,
  usePinExistingMessagesMutation
} = saveMessageApi;