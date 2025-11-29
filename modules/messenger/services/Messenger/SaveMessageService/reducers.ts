import { setLoadingFalse } from "../../../utils/general.ts";

export const saveMessageReducers = {
  handleFetchSaveMessages(state, action) {
    setLoadingFalse(state);
    state.saveMessages = action.payload;
  },
  handlePinMessageSaveMessage(state, action) {
    setLoadingFalse(state);
    const { message_id, save_message_id } = action.meta.arg;
    const updatedMessages = state.saveMessages.map((msg) =>
      msg.id === message_id ? { ...msg, pinned: !msg.pinned } : msg,
    );
    state.saveMessages = updatedMessages;
  },
  handleRemoveMessageSaveMessage(state, action) {
    setLoadingFalse(state);
    const { message_id } = action.meta.arg;
    state.saveMessages = state.saveMessages.filter(
      (msg) => msg.id !== message_id,
    );
  },
  handleClearHistory(state, action) {
    setLoadingFalse(state);
    state.saveMessages = [];
  },
  handlePinExistingMessages(state, action) {
    setLoadingFalse(state);
    const { message_id } = action.meta.arg;
    const updatedMessages = state.saveMessages.map((msg) =>
      msg.id === message_id || msg.pinned ? { ...msg, pinned: true } : msg,
    );
    state.saveMessages = updatedMessages;
  },
};
