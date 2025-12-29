import { Button, Listbox, ListboxItem, Modal, ModalContent } from "@heroui/react";
import { ReactionList } from "./ReactionList";
import { RootState } from "@hrbox/core/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { openReplyMessageAction, setMessageData } from "@hrbox/core/redux/slices/messageAction";
import React, { useState } from "react";
import ForwardMessage from "../Add/ForwardMessage";
import { toast } from "react-toastify";
import {
  useAddToSaveMessageGroupMutation,
  usePinMessageGroupMutation,
  useRemoveMessageGroupMutation
} from "@hrbox/modules/messenger/apis/Group";
import {
  usePinMessageSaveMessageMutation,
  useRemoveMessageSaveMessageMutation
} from "@hrbox/modules/messenger/apis/SaveMessage";
import {
  usePinMessageMutation as useChannelPinMessageMutation,
  useRemoveMessageMutation as useChannelRemoveMessageMutation,
  useSaveMessageMutation as useChannelSaveMessageMutation
} from "@hrbox/modules/messenger/apis/Channel";
import {
  usePinMessageMutation as usePrivateChatPinMessageMutation,
  useRemoveMessageMutation as usePrivateChatRemoveMessageMutation,
  useSaveMessageMutation as usePrivateChatSaveMessageMutation
} from "@hrbox/modules/messenger/apis/Private";
import { ReactMessageProps } from "./types";

const MessageTypes = {
  private: "private",
  group: "group",
  channel: "channel",
  save: "save"
};

const ReactionKeys = {
  reply: "reply",
  pin: "pin",
  save: "save",
  delete: "delete",
  forward: "forward"
};

const Reaction: React.FC<ReactMessageProps> = ({
                                                 setIsOpenMessengerAction,
                                                 message
                                               }) => {
  const dispatch = useDispatch();
  const messageId = useSelector(
    (state: RootState) => state.messageAction.message_id
  );
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const recipient = useSelector((state: RootState) => state?.profile?.profile);

  const [saveChannelMessage] = useChannelSaveMessageMutation();
  const [removeChannelMessage] = useChannelRemoveMessageMutation();
  const [pinChannelMessage] = useChannelPinMessageMutation();

  const [savePrivateChatMessage] = usePrivateChatSaveMessageMutation();
  const [removePrivateChatMessage] = usePrivateChatRemoveMessageMutation();
  const [pinPrivateChatMessage] = usePrivateChatPinMessageMutation();

  const [addToSaveMessageGroup] = useAddToSaveMessageGroupMutation();
  const [removeMessageGroup] = useRemoveMessageGroupMutation();
  const [pinMessageGroup] = usePinMessageGroupMutation();

  const [pinMessageSaveMessage] = usePinMessageSaveMessageMutation();
  const [removeMessageSaveMessage] = useRemoveMessageSaveMessageMutation();

  const handleOpenAddGroupModal = () => setIsOpenAddModal((prev) => !prev);

  const executeAction = async (action: string) => {
    const messageType = message?.chat_type as keyof typeof MessageTypes;

    if (action === "remove") {
      toast.dismiss();
    }

    if (messageType === "channel") {
      try {
        if (action === "save") {
          await saveChannelMessage({
            message_id: messageId,
            channel_id: recipient?.chat_id || ""
          }).unwrap();
        } else if (action === "remove") {
          await removeChannelMessage({
            message_id: messageId,
            channel_id: recipient?.chat_id || "",
            user_id: JSON.parse(localStorage.getItem("profile") || "{}").user_id
          }).unwrap();
        } else if (action === "pin") {
          await pinChannelMessage({
            message_id: messageId,
            channel_id: recipient?.chat_id || ""
          }).unwrap();
        }
      } catch (error) {
        console.error(`Failed to ${action} channel message:`, error);
      }
    } else if (messageType === "private") {
      try {
        if (action === "save") {
          await savePrivateChatMessage({
            message_id: messageId,
            chat_id: recipient?.chat_id || ""
          }).unwrap();
        } else if (action === "remove") {
          await removePrivateChatMessage({
            message_id: messageId,
            chat_id: recipient?.chat_id || ""
          }).unwrap();
        } else if (action === "pin") {
          await pinPrivateChatMessage({
            message_id: messageId,
            chat_id: recipient?.chat_id || ""
          }).unwrap();
        }
      } catch (error) {
        console.error(`Failed to ${action} private chat message:`, error);
      }
    } else if (messageType === "group") {
      try {
        if (action === "save") {
          await addToSaveMessageGroup({
            message_id: messageId,
            group_id: recipient?.chat_id || ""
          }).unwrap();
        } else if (action === "remove") {
          await removeMessageGroup({
            message_id: messageId,
            group_id: recipient?.chat_id || ""
          }).unwrap();
        } else if (action === "pin") {
          await pinMessageGroup({
            message_id: messageId,
            group_id: recipient?.chat_id || ""
          }).unwrap();
        }
      } catch (error) {
        console.error(`Failed to ${action} group message:`, error);
      }
    } else if (messageType === "save") {
      try {
        if (action === "save" || action === "pin") {
          await pinMessageSaveMessage({
            message_id: messageId,
            save_message_id: recipient?.chat_id || ""
          }).unwrap();
        } else if (action === "remove") {
          await removeMessageSaveMessage({
            message_id: messageId,
            save_message_id: recipient?.chat_id || ""
          }).unwrap();
        }
      } catch (error) {
        console.error(`Failed to ${action} save message:`, error);
      }
    }
  };

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
        position: "top-center"
      }
    );
  };

  const handleForward = () => {
    handleOpenAddGroupModal();
  };

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
      reply_message_id: message.id
    };

    dispatch(setMessageData(replyData));
  };

  const handleReaction = (key: keyof typeof ReactionKeys) => {
    const actionMap = {
      [ReactionKeys.reply]: handleReplyMessage,
      [ReactionKeys.pin]: () => executeAction("pin"),
      [ReactionKeys.save]: () => executeAction("save"),
      [ReactionKeys.delete]: handleConfirmDeleteMessage,
      [ReactionKeys.forward]: handleForward
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
              <span
                className="text-sm font-normal text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all">
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
              message
            }}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Reaction;