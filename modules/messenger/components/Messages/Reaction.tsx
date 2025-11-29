import {
  Button,
  Listbox,
  ListboxItem,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { ReactionList } from "./ReactionList";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  openReplyMessageAction,
  setMessageData,
} from "../../redux/reducers/messageAction";
import React, { useState } from "react";
import ForwardMessage from "../Add/ForwardMessage";
import { toast } from "react-toastify";
import {
  handleAddToSaveMessageApi,
  handlePinMessageApi,
  handlePinUnpinMessageApi,
  handleRemoveMessageApi,
  handleUnpinMessageApi,
} from "../../services/Messenger/PrivateChatService/apis";
import {
  handleAddToSaveMessageGroupApi,
  handlePinMessageGroupApi,
  handleRemoveMessageGroupApi,
} from "../../services/Messenger/GroupChatService/apis";
import {
  handleAddToSaveMessageChannelApi,
  handlePinMessageChannelApi,
  handleRemoveMessageChannelApi,
} from "../../services/Messenger/ChannelChatService/apis";
import {
  handlePinMessageSaveMessageApi,
  handleRemoveMessageSaveMessageApi,
} from "../../services/Messenger/SaveMessageService/apis";
import { ReactMessageProps } from "./types";

// Action types constants
const MessageTypes = {
  private: "private",
  group: "group",
  channel: "channel",
  save: "save",
};

const ReactionKeys = {
  reply: "reply",
  pin: "pin",
  save: "save",
  delete: "delete",
  forward: "forward",
};

const Reaction: React.FC<ReactMessageProps> = ({
  setIsOpenMessengerAction,
  message,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const messageId = useSelector(
    (state: RootState) => state.messageAction.message_id,
  );
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const recipient = useSelector((state: RootState) => state?.profile?.profile);

  // Toggle Modal
  const handleOpenAddGroupModal = () => setIsOpenAddModal((prev) => !prev);

  // Action mapping
  const actionMap = {
    [MessageTypes.private]: {
      save: handleAddToSaveMessageApi,
      remove: handleRemoveMessageApi,
      pin: handlePinMessageApi,
    },
    [MessageTypes.group]: {
      save: handleAddToSaveMessageGroupApi,
      remove: handleRemoveMessageGroupApi,
      pin: handlePinMessageGroupApi,
    },
    [MessageTypes.channel]: {
      save: handleAddToSaveMessageChannelApi,
      remove: handleRemoveMessageChannelApi,
      pin: handlePinMessageChannelApi,
    },
    [MessageTypes.save]: {
      save: handlePinMessageSaveMessageApi,
      remove: handleRemoveMessageSaveMessageApi,
      pin: handlePinMessageSaveMessageApi,
    },
  };

  // Action executor
  const executeAction = (action: string) => {
    const messageType = message?.chat_type as keyof typeof MessageTypes;
    const actionFunction = actionMap[messageType]?.[action];
    if (action === "remove") {
      toast.dismiss();
    }
    if (actionFunction) {
      if (messageType === "private") {
        dispatch(
          actionFunction({
            message_id: messageId,
            chat_id: recipient?.chat_id || "",
          }),
        );
      } else if (messageType === "group") {
        dispatch(
          actionFunction({
            message_id: messageId,
            group_id: recipient?.chat_id || "",
          }),
        );
      } else {
        dispatch(
          actionFunction({
            message_id: messageId,
            channel_id: recipient?.chat_id || "",
          }),
        );
      }
    }
  };

  // Handle confirm delete message
  const handleConfirmDeleteMessage = () => {
    toast(
      <>
        <div className="flex flex-col gap-4">
          <p className="text-secondary-1000">
            Are you sure you want to remove this message?
          </p>
          <div className="flex gap-3">
            <Button
              variant="flat"
              color="success"
              onClick={() => executeAction("remove")}
            >
              Yes
            </Button>
            <Button
              variant="flat"
              color="danger"
              onClick={() => toast.dismiss()}
            >
              No
            </Button>
          </div>
        </div>
      </>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center",
      },
    );
  };

  // Handle forward action
  const handleForward = () => {
    handleOpenAddGroupModal();
  };

  // Handle reply action
  const handleReplyMessage = () => {
    setIsOpenMessengerAction(false);
    dispatch(openReplyMessageAction());

    const replyData = {
      messageId: message.id,
      data:
        message.type === "text"
          ? message.text
          : message.type === "link"
            ? message.link
            : message.type === "image"
              ? message.image
              : message.type === "audio"
                ? message.audio
                : message.type === "file"
                  ? message.file
                  : "",
      reply_message_data:
        message.type === "image"
          ? message.image
          : message.type === "audio"
            ? message.audio
            : message.file,
      reply_message_type: message.type,
      reply_message_file_name: message.file_name,
      file_name: message.file_name,
      reply_message_id: message.id,
    };

    dispatch(setMessageData(replyData));
  };

  // Reaction handler
  const handleReaction = (key: keyof typeof ReactionKeys) => {
    const actionMap = {
      [ReactionKeys.reply]: handleReplyMessage,
      [ReactionKeys.pin]: () => executeAction("pin"),
      [ReactionKeys.save]: () => executeAction("save"),
      [ReactionKeys.delete]: handleConfirmDeleteMessage,
      [ReactionKeys.forward]: handleForward,
    };

    const action = actionMap[key];
    if (action) action();
  };

  return (
    <>
      <Listbox
        className="!px-6 !py-3"
        onAction={(key) => handleReaction(key as keyof typeof ReactionKeys)}
        variant="light"
      >
        {ReactionList.map((item) => (
          <ListboxItem
            className={`!p-0 ${item.key !== "delete" && "!mb-3"}`}
            key={item.key}
          >
            <div className="flex gap-4 group-hover:text-primary-400 group-hover:dark:text-gold">
              {item.icon}
              <span className="text-sm font-normal text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all">
                {item.text}
              </span>
            </div>
          </ListboxItem>
        ))}
      </Listbox>

      <Modal isOpen={isOpenAddModal} onOpenChange={handleOpenAddGroupModal}>
        <ModalContent>
          <ForwardMessage
            data={{
              // setIsOpenMessengerAction,
              message,
            }}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Reaction;
