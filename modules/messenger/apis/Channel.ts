import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { MessengerApiEndpoints } from "@hrbox/modules/messenger/app/endpoints";
import { MessengerApi } from "@hrbox/modules/messenger/app/baseApi";

export const channelApi = MessengerApi.injectEndpoints({
  endpoints: (build: any) => ({

    createChannel: createMutation<any, any>(build, {
      url: MessengerApiEndpoints.channel.create,
      method: "POST",
      tags: ["Channel"]
    }),

    updateChannel: createMutation<any, any>(build, {
      url: MessengerApiEndpoints.channel.update,
      method: "PATCH",
      tags: ["Channel"]
    }),

    fetchChannels: createQuery<any, void>(build, {
      url: MessengerApiEndpoints.channel.getList,
      method: "GET",
      tags: ["Channel"]
    }),

    clearChannelHistory: createMutation<any, { channel_id: string }>(build, {
      url: MessengerApiEndpoints.channel.clearHistory,
      method: "PATCH",
      tags: ["Channel"]
    }),

    markMessageAsSeen: createMutation<any, { channel_id: string; message_id: string }>(build, {
      url: MessengerApiEndpoints.channel.markAsSeen,
      method: "PATCH",
      tags: ["Channel"]
    }),

    muteChannel: createMutation<any, { channel_id: string }>(build, {
      url: MessengerApiEndpoints.channel.mute,
      method: "PATCH",
      tags: ["Channel"]
    }),

    pinMessage: createMutation<any, { channel_id: string; message_id: string }>(build, {
      url: MessengerApiEndpoints.channel.pinMessage,
      method: "PATCH",
      tags: ["Channel"]
    }),

    unpinMessage: createMutation<any, { channel_id: string; message_id: any }>(build, {
      url: MessengerApiEndpoints.channel.unpinMessage,
      method: "PATCH",
      tags: ["Channel"]
    }),

    pinChannel: createMutation<any, { channel_id: string }>(build, {
      url: MessengerApiEndpoints.channel.pin,
      method: "PATCH",
      tags: ["Channel"]
    }),

    fetchChannelChats: createQuery<any, { channel_id: string }>(build, {
      url: MessengerApiEndpoints.channel.getChats,
      method: "GET",
      tags: ["Channel"]
    }),

    removeMessage: createMutation<any, { channel_id: string; message_id: string; user_id: string }>(build, {
      url: MessengerApiEndpoints.channel.removeMessage,
      method: "DELETE",
      tags: ["Channel"]
    }),

    deleteChannel: createMutation<any, { channel_id: string; user_id: string }>(build, {
      url: MessengerApiEndpoints.channel.delete,
      method: "DELETE",
      tags: ["Channel"]
    }),

    saveMessage: createMutation<any, { channel_id: string; message_id: string }>(build, {
      url: MessengerApiEndpoints.channel.saveMessage,
      method: "POST",
      tags: ["Channel"]
    }),

    removeUserFromChannel: createMutation<any, { channel_id: string; member_id: string; user_id: string }>(build, {
      url: MessengerApiEndpoints.channel.removeUser,
      method: "PATCH",
      tags: ["Channel"]
    }),

    changeUserRole: createMutation<any, { channel_id: string; member_id: string; user_id: string }>(build, {
      url: MessengerApiEndpoints.channel.changeRole,
      method: "PATCH",
      tags: ["Channel"]
    })

  })
});

export const {
  useCreateChannelMutation,
  useUpdateChannelMutation,
  useFetchChannelsQuery,
  useClearChannelHistoryMutation,
  useMarkMessageAsSeenMutation,
  useMuteChannelMutation,
  usePinMessageMutation,
  useUnpinMessageMutation,
  usePinChannelMutation,
  useFetchChannelChatsQuery,
  useRemoveMessageMutation,
  useDeleteChannelMutation,
  useSaveMessageMutation,
  useRemoveUserFromChannelMutation,
  useChangeUserRoleMutation
} = channelApi;