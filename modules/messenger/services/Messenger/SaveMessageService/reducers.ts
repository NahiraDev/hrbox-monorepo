export const saveMessageReducers = {
  handleFetchSaveMessages(state, action) {
    state.saveMessages = action.payload;
  },
  handlePinMessageSaveMessage(state, action) {
    const { message_id, save_message_id } = action.meta.arg;
    const updatedMessages = state.saveMessages.map((msg) =>
      msg.id === message_id ? { ...msg, pinned: !msg.pinned } : msg
    );
    state.saveMessages = updatedMessages;
  },
  handleRemoveMessageSaveMessage(state, action) {
    const { message_id } = action.meta.arg;
    state.saveMessages = state.saveMessages.filter(
      (msg) => msg.id !== message_id
    );
  },
  handleClearHistory(state, action) {
    state.saveMessages = [];
  },
  handlePinExistingMessages(state, action) {
    const { message_id } = action.meta.arg;
    const updatedMessages = state.saveMessages.map((msg) =>
      msg.id === message_id || msg.pinned ? { ...msg, pinned: true } : msg
    );
    state.saveMessages = updatedMessages;
  }
};
