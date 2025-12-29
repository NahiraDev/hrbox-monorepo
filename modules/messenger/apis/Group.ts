import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { MessengerApiEndpoints } from "@hrbox/modules/messenger/app/endpoints";
import { MessengerApi } from "@hrbox/modules/messenger/app/baseApi";

export const groupApi = MessengerApi.injectEndpoints({
  endpoints: (build: any) => ({

    addGroup: createMutation<any, any>(build, {
      url: MessengerApiEndpoints.group.create,
      method: "POST",
      tags: ["Group"]
    }),

    updateGroup: createMutation<any, any>(build, {
      url: MessengerApiEndpoints.group.update,
      method: "PATCH",
      tags: ["Group"]
    }),

    fetchGroups: createQuery<any, void>(build, {
      url: MessengerApiEndpoints.group.getList,
      method: "GET",
      tags: ["Group"]
    }),

    clearHistoryGroup: createMutation<any, { group_id: string }>(build, {
      url: MessengerApiEndpoints.group.clearHistory,
      method: "PATCH",
      tags: ["Group"]
    }),

    markMessageAsSeenGroupChat: createMutation<any, { group_id: string; message_id: string }>(build, {
      url: MessengerApiEndpoints.group.markAsSeen,
      method: "PATCH",
      tags: ["Group"]
    }),

    muteGroup: createMutation<any, { group_id: string; muted: boolean }>(build, {
      url: MessengerApiEndpoints.group.mute,
      method: "PATCH",
      tags: ["Group"]
    }),

    pinMessageGroup: createMutation<any, { group_id: string; message_id: string }>(build, {
      url: MessengerApiEndpoints.group.pinMessage,
      method: "PATCH",
      tags: ["Group"]
    }),

    unpinMessageGroup: createMutation<any, { group_id: string; message_id: string }>(build, {
      url: MessengerApiEndpoints.group.unpinMessage,
      method: "PATCH",
      tags: ["Group"]
    }),

    pinGroup: createMutation<any, { group_id: string }>(build, {
      url: MessengerApiEndpoints.group.pin,
      method: "PATCH",
      tags: ["Group"]
    }),

    fetchGroupChats: createQuery<any, { group_id: string }>(build, {
      url: MessengerApiEndpoints.group.getChats,
      method: "GET",
      tags: ["Group"]
    }),

    removeMessageGroup: createMutation<any, { group_id: string; message_id: string }>(build, {
      url: MessengerApiEndpoints.group.removeMessage,
      method: "DELETE",
      tags: ["Group"]
    }),

    addToSaveMessageGroup: createMutation<any, { group_id: string; message_id: string }>(build, {
      url: MessengerApiEndpoints.group.saveMessage,
      method: "POST",
      tags: ["Group"]
    }),

    removeGroup: createMutation<any, { group_id: string }>(build, {
      url: MessengerApiEndpoints.group.delete,
      method: "DELETE",
      tags: ["Group"]
    }),

    removeUserFromGroup: createMutation<any, { group_id: string; member_id: string; user_id: string }>(build, {
      url: MessengerApiEndpoints.group.removeUser,
      method: "PATCH",
      tags: ["Group"]
    }),

    changeRoleUserGroup: createMutation<any, { group_id: string; member_id: string; user_id: string }>(build, {
      url: MessengerApiEndpoints.group.changeRole,
      method: "PATCH",
      tags: ["Group"]
    })

  })
});

export const {
  useAddGroupMutation,
  useUpdateGroupMutation,
  useFetchGroupsQuery,
  useClearHistoryGroupMutation,
  useMarkMessageAsSeenGroupChatMutation,
  useMuteGroupMutation,
  usePinMessageGroupMutation,
  useUnpinMessageGroupMutation,
  usePinGroupMutation,
  useFetchGroupChatsQuery,
  useLazyFetchGroupChatsQuery,
  useRemoveMessageGroupMutation,
  useAddToSaveMessageGroupMutation,
  useRemoveGroupMutation,
  useRemoveUserFromGroupMutation,
  useChangeRoleUserGroupMutation
} = groupApi;