import { createQuery } from "@hrbox/core/apis/createEndpoints";
import { MessengerApiEndpoints } from "@hrbox/modules/messenger/app/endpoints";
import { MessengerApi } from "@hrbox/modules/messenger/app/baseApi";

export const userChatApi = MessengerApi.injectEndpoints({
  endpoints: (build: any) => ({

    getContacts: createQuery<any, void>(build, {
      url: MessengerApiEndpoints.contacts.getList,
      method: "GET",
      tags: ["UserChat"]
    }),

    getChatContact: createQuery<any, { user_id: string }>(build, {
      url: MessengerApiEndpoints.contacts.getById,
      method: "GET",
      tags: ["UserChat"]
    })

  })
});

export const {
  useGetContactsQuery,
  useLazyGetContactsQuery,
  useGetChatContactQuery,
  useLazyGetChatContactQuery
} = userChatApi;