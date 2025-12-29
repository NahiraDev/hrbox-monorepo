import { Button, Listbox, ListboxItem, Modal, ModalContent, useDisclosure } from "@heroui/react";
import { ActionList } from "./ActionList";
import { useDispatch, useSelector } from "react-redux";
import AddGroup from "../Add/AddGroup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useClearChatHistoryMutation,
  useMuteChatMutation,
  usePinUnpinChatMutation,
  useRemoveChatMutation
} from "@hrbox/modules/messenger/apis/Private";
import {
  useClearHistoryGroupMutation,
  useMuteGroupMutation,
  usePinGroupMutation,
  useRemoveGroupMutation
} from "@hrbox/modules/messenger/apis/Group";
import {
  useClearChannelHistoryMutation,
  useDeleteChannelMutation,
  useMuteChannelMutation,
  usePinChannelMutation
} from "@hrbox/modules/messenger/apis/Channel";
import { RootState, setIsEdit, setUserProfile } from "@hrbox/core/redux";

export const Action = ({ setShowAction, profile }: any) => {
  const { isOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const [action, setAction] = useState<any>();
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const privateChats = useSelector(
    (state: RootState) => state?.privateChat?.privateChats
  );
  const recipient = useSelector((state: RootState) => state.profile.profile);
  const currentUser = JSON.parse(localStorage.getItem("profile") || "{}");

  const [clearChannelHistory] = useClearChannelHistoryMutation();
  const [muteChannel] = useMuteChannelMutation();
  const [pinChannel] = usePinChannelMutation();
  const [deleteChannel] = useDeleteChannelMutation();

  const [clearChatHistory] = useClearChatHistoryMutation();
  const [muteChat] = useMuteChatMutation();
  const [pinUnpinChat] = usePinUnpinChatMutation();
  const [removeChat] = useRemoveChatMutation();

  const [clearHistoryGroup] = useClearHistoryGroupMutation();
  const [muteGroup] = useMuteGroupMutation();
  const [pinGroup] = usePinGroupMutation();
  const [removeGroup] = useRemoveGroupMutation();

  const handleClearChatHistory = async () => {
    if (profile?.type === "channel") {
      try {
        await clearChannelHistory({ channel_id: profile.id }).unwrap();
        dispatch(setUserProfile({}));
        toast.dismiss();
      } catch (error) {
        console.error("Failed to clear channel history:", error);
      }
    } else if (profile?.type === "private") {
      try {
        await clearChatHistory({ chat_id: profile.id }).unwrap();
        dispatch(setUserProfile({}));
        toast.dismiss();
      } catch (error) {
        console.error("Failed to clear chat history:", error);
      }
    } else {
      try {
        await clearHistoryGroup({ group_id: profile.id }).unwrap();
        dispatch(setUserProfile({}));
        toast.dismiss();
      } catch (error) {
        console.error("Failed to clear group history:", error);
      }
    }
  };

  const handleDeleteChat = async () => {
    if (profile?.type === "channel") {
      try {
        await deleteChannel({
          channel_id: profile.id,
          user_id: currentUser.user_id
        }).unwrap();
        dispatch(setUserProfile({}));
        toast.dismiss();
      } catch (error) {
        console.error("Failed to delete channel:", error);
      }
    } else if (profile?.type === "private") {
      try {
        await removeChat({ chat_id: profile.id }).unwrap();
        dispatch(setUserProfile({}));
        toast.dismiss();
      } catch (error) {
        console.error("Failed to remove chat:", error);
      }
    } else {
      try {
        await removeGroup({ group_id: profile.id }).unwrap();
        dispatch(setUserProfile({}));
        toast.dismiss();
      } catch (error) {
        console.error("Failed to remove group:", error);
      }
    }
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
              onPress={handleClearChatHistory}
            >
              Yes
            </Button>
            <Button
              variant="flat"
              color="danger"
              onPress={() => toast.dismiss()}
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

  const handleToggleMuteChat = async () => {
    setShowAction(false);
    if (profile?.type === "channel") {
      try {
        await muteChannel({ channel_id: profile.id }).unwrap();
      } catch (error) {
        console.error("Failed to mute channel:", error);
      }
    } else if (profile?.type === "private") {
      try {
        await muteChat({
          chat_id: profile.id,
          muted: !profile.muted
        }).unwrap();
      } catch (error) {
        console.error("Failed to mute chat:", error);
      }
    } else {
      try {
        await muteGroup({
          group_id: profile.id,
          muted: !profile.muted
        }).unwrap();
      } catch (error) {
        console.error("Failed to mute group:", error);
      }
    }
  };

  const handleTogglePinChat = async () => {
    setShowAction(false);
    if (profile?.type === "channel") {
      try {
        await pinChannel({ channel_id: profile.id }).unwrap();
      } catch (error) {
        console.error("Failed to pin channel:", error);
      }
    } else if (profile?.type === "private") {
      try {
        await pinUnpinChat({
          chat_id: profile.id,
          pinned: !profile.pinned
        }).unwrap();
      } catch (error) {
        console.error("Failed to pin chat:", error);
      }
    } else {
      try {
        await pinGroup({ group_id: profile.id }).unwrap();
      } catch (error) {
        console.error("Failed to pin group:", error);
      }
    }
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