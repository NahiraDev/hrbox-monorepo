export const MessengerApiEndpoints = {
  channel: {
    create: "/channels",
    update: "/channels",
    getList: "/channels",
    getChats: "/channels/:channel_id",
    clearHistory: "/channels/:channel_id/clear",
    markAsSeen: "/channels/:channel_id/seen",
    mute: "/channels/:channel_id/mute",
    pin: "/channels/:channel_id/pin",
    pinMessage: "/channels/:channel_id/messages/:message_id/pin",
    unpinMessage: "/channels/:channel_id/messages/:message_id/unpin",
    removeMessage: "/channels/:channel_id/messages/:message_id",
    delete: "/channels/:channel_id",
    saveMessage: "/saveMessage",
    removeUser: "/channels/:channel_id/members/:member_id",
    changeRole: "/channels/:channel_id/members/:member_id/role"
  },
  group: {
    create: "/groups",
    update: "/groups",
    getList: "/groups",
    getChats: "/groups/:group_id",
    clearHistory: "/groups/:group_id/clear",
    markAsSeen: "/groups/:group_id/seen",
    mute: "/groups/:group_id/mute",
    pin: "/groups/:group_id/pin",
    pinMessage: "/groups/:group_id/messages/:message_id/pin",
    unpinMessage: "/groups/:group_id/messages/:message_id/unpin",
    removeMessage: "/groups/:group_id/messages/:message_id",
    delete: "/groups/:group_id",
    saveMessage: "/saveMessage",
    removeUser: "/groups/:group_id/members/:member_id",
    changeRole: "/groups/:group_id/members/:member_id/role",
    addUser: "/groups/:group_id/members"
  },
  private: {
    create: "/private",
    update: "/private",
    getList: "/private",
    getChats: "/private/:chat_id",
    clearHistory: "/private/:chat_id/clear",
    markAsSeen: "/private/:chat_id/seen",
    mute: "/private/:chat_id/mute",
    pin: "/private/:chat_id/pin",
    pinMessage: "/private/:chat_id/messages/:message_id/pin",
    unpinMessage: "/private/:chat_id/messages/:message_id/unpin",
    removeMessage: "/private/:chat_id/messages/:message_id",
    delete: "/private/:chat_id",
    saveMessage: "/saveMessage",
    block: "/private/:chat_id/block"
  },
  contacts: {
    getList: "/contacts",
    getById: "/contacts/:user_id"
  },
  saveMessages: {
    fetch: "/saveMessages",
    pinMessage: "/saveMessages/:save_message_id/messages/:message_id/pin",
    removeMessage: "/saveMessages/:save_message_id/messages/:message_id",
    clearHistory: "/saveMessages/:save_message_id/clear",
    pinExisting: "/saveMessages/:save_message_id/messages/:message_id/pin-existing"
  }
};