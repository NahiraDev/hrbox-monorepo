import { Button, Listbox, ListboxItem, Modal, ModalContent, useDisclosure } from "@heroui/react";
import { ActionList } from "./ActionList";
import { useDispatch, useSelector } from "react-redux";
import AddGroup from "../Add/AddGroup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  handleClearHistoryChatApi,
  handleMuteChatApi,
  handlePinUnpinChatApi,
  handleRemoveChatApi
} from "@hrbox/modules/project-management/services/Messenger/PrivateChatService/apis";
import {
  handleClearHistoryGroupApi,
  handleMuteGroupApi,
  handlePinGroupApi,
  handleRemoveGroupApi
} from "../../services/Messenger/GroupChatService/apis";
import {
  handleClearHistoryChannelsApi,
  handleMutedChannelApi,
  handlePinChannelApi,
  handleRemoveChannelApi
} from "../../services/Messenger/ChannelChatService/apis";

export const Action = ({ setShowAction, profile }: any) => {
  const { isOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();
  const [action, setAction] = useState<any>();
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const privateChats = useSelector(
    (state: RootState) => state?.privateChat?.privateChats
  );
  const recipient = useSelector((state: RootState) => state.profile.profile);

  const handleAction = (actionType: string, actionService: Function) => {
    if (!profile) {
      return toast.error("Profile is not available");
    }

    const id = profile.id || "";
    const type = profile.type;
    let privateChatPayload = { chat_id: id }; // Default payload for "private"
    let groupPayload = { group_id: id };
    let channelPayload = { channel_id: id };

    switch (type) {
      case "private":
        if (actionType === "pin") {
          privateChatPayload = {
            ...privateChatPayload,
            pinned: !profile.pinned
          };
        } else if (actionType === "mute") {
          privateChatPayload = { ...privateChatPayload, muted: !profile.muted };
        }
        break;

      case "group":
        if (actionType === "pin") {
          groupPayload = { ...groupPayload, pinned: !profile.pinned };
        } else if (actionType === "mute") {
          groupPayload = { ...groupPayload, muted: !profile.muted };
        }
        break;

      case "channel":
        if (actionType === "pin") {
          channelPayload = { ...channelPayload, pinned: !profile.pinned };
        } else if (actionType === "mute") {
          channelPayload = { ...channelPayload, muted: !profile.muted };
        }
        break;

      default:
        return toast.error("Invalid profile type");
    }

    return dispatch(
      actionService(
        type === "private"
          ? privateChatPayload
          : type === "group"
            ? groupPayload
            : channelPayload
      )
    );
  };

  const handleClearChatHistory = () => {
    handleAction(
      "clear",
      profile?.type === "private"
        ? handleClearHistoryChatApi
        : profile?.type === "group"
          ? handleClearHistoryGroupApi
          : handleClearHistoryChannelsApi
    );
    dispatch(setUserProfile({}));
    toast.dismiss();
  };

  const handleDeleteChat = () => {
    handleAction(
      "delete",
      profile?.type === "private"
        ? handleRemoveChatApi
        : profile?.type === "group"
          ? handleRemoveGroupApi
          : handleRemoveChannelApi
    );
    dispatch(setUserProfile({}));
    toast.dismiss();
  };

  const handleConfirmClearHistory = () => {
    setShowAction(false);
    toast(
      <>
        <div className="flex flex-col gap-4">
          <p className="text-secondary-1000">
            Are you sure you want to clear the chat history?
          </p>
          <div className="flex gap-3">
            <Button
              variant="flat"
              color="success"
              onClick={handleClearChatHistory}
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

  const handleToggleMuteChat = () => {
    setShowAction(false);
    handleAction(
      "mute",
      profile?.type === "private"
        ? handleMuteChatApi
        : profile?.type === "group"
          ? handleMuteGroupApi
          : handleMutedChannelApi
    );
  };

  const handleTogglePinChat = () => {
    setShowAction(false);
    handleAction(
      "pin",
      profile?.type === "private"
        ? handlePinUnpinChatApi
        : profile?.type === "group"
          ? handlePinGroupApi
          : handlePinChannelApi
    );
  };

  const handleEditGroupOrChannel = () => {
    onOpenChange();
    dispatch(setIsEdit());
  };

  const handleConfirmDeleteChat = () => {
    setShowAction(false);
    toast(
      <>
        <div className="flex flex-col gap-4">
          <p className="text-secondary-1000">
            Are you sure you want to delete the chat?
          </p>
          <div className="flex gap-3">
            <Button variant="flat" color="success" onClick={handleDeleteChat}>
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

  const handleReaction = (key: string) => {
    switch (key) {
      case "mute":
        return handleToggleMuteChat();
      case "pin":
        return handleTogglePinChat();
      case "clear":
        return handleConfirmClearHistory();
      case "edit":
        return handleEditGroupOrChannel();
      case "delete":
        return handleConfirmDeleteChat();
    }
  };

  const actions = ActionList();

  useEffect(() => {
    setAction(actions);
  }, [privateChats]);

  return (
    <>
      <Listbox
        className="!px-6 !py-3"
        onAction={(key) => handleReaction(key as string)}
        hideSelectedIcon={false}
        variant="light"
      >
        {actions.map((item) => (
          <ListboxItem
            className={`!p-0 group transition-all ${recipient?.chat_type === "private" && item.key === "edit" ? "hidden" : ""} ${item.key !== "delete" && "mb-3"}`}
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <AddGroup
              data={{
                setIsOpenAddModal,
                isOpenAddModal,
                onClose,
                profile
              }}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
