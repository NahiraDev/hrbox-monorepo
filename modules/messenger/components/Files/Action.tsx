import { Button, Listbox, ListboxItem } from "@heroui/react";
import { Profile, Trash } from "iconsax-reactjs";
import { useSelector } from "react-redux";
import { RootState } from "@hrbox/core/redux/store";
import { toast } from "react-toastify";
import { useChangeRoleUserGroupMutation, useRemoveUserFromGroupMutation } from "@hrbox/modules/messenger/apis/Group";
import { useChangeUserRoleMutation, useRemoveUserFromChannelMutation } from "@hrbox/modules/messenger/apis/Channel";
import React from "react";

type GroupAndChannelTypes = "group" | "channel";
type ActionKey = "role" | "delete";

const ACTIONS_LIST = [
  {
    icon: <Profile size="20" className="icon-style" />,
    key: "role" as const,
    text: "Change role to Admin"
  },
  {
    icon: <Trash size="20" className="icon-style" />,
    key: "delete" as const,
    text: "Delete"
  }
];

interface MemberActionProps {
  memberId: string;
  setOpenMemberId: (openMemberId: number | null) => void;
}

const MemberAction: React.FC<MemberActionProps> = ({
                                                     memberId,
                                                     setOpenMemberId
                                                   }) => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const currentUser = JSON.parse(localStorage.getItem("profile") || "{}");

  const [removeUserFromChannel] = useRemoveUserFromChannelMutation();
  const [changeUserRole] = useChangeUserRoleMutation();
  const [removeUserFromGroup] = useRemoveUserFromGroupMutation();
  const [changeRoleUserGroup] = useChangeRoleUserGroupMutation();

  const showToast = (content: React.ReactNode) => {
    toast(content, {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      position: "top-center"
    });
  };

  const handleAction = (key: ActionKey) => {
    if (key === "role") {
      handleChangeRoleToAdmin();
    } else if (key === "delete") {
      handleConfirmDeleteMember();
    }
  };

  const handleChangeRoleToAdmin = async () => {
    const chatType = profile?.chat_type as GroupAndChannelTypes;

    if (chatType === "channel") {
      try {
        await changeUserRole({
          channel_id: profile.chat_id,
          member_id: memberId,
          user_id: currentUser.user_id
        }).unwrap();
      } catch (error) {
        console.error("Failed to change user role:", error);
      }
    } else if (chatType === "group") {
      try {
        await changeRoleUserGroup({
          group_id: profile.chat_id,
          member_id: memberId,
          user_id: currentUser.user_id
        }).unwrap();
      } catch (error) {
        console.error("Failed to change user role:", error);
      }
    }
    setOpenMemberId(null);
  };

  const handleConfirmDeleteMember = () => {
    showToast(
      <>
        <div className="flex flex-col gap-4">
          <p className="text-secondary-1000">
            Are you sure you want to remove member?
          </p>
          <div className="flex gap-3">
            <Button variant="flat" color="success" onClick={handleRemoveUser}>
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
      </>
    );
  };

  const handleRemoveUser = async () => {
    const chatType = profile?.chat_type as GroupAndChannelTypes;

    if (chatType === "channel") {
      try {
        await removeUserFromChannel({
          channel_id: profile.chat_id,
          member_id: memberId,
          user_id: currentUser.user_id
        }).unwrap();
      } catch (error) {
        console.error("Failed to remove user from channel:", error);
      }
    } else if (chatType === "group") {
      try {
        await removeUserFromGroup({
          group_id: profile.chat_id,
          member_id: memberId,
          user_id: currentUser.user_id
        }).unwrap();
      } catch (error) {
        console.error("Failed to remove user from group:", error);
      }
    }

    toast.dismiss();
  };

  return (
    <Listbox
      className="!px-6 !py-3"
      onAction={(key) => handleAction(key as ActionKey)}
      hideSelectedIcon={false}
      variant="light"
    >
      {ACTIONS_LIST.map(({ icon, key, text }) => (
        <ListboxItem
          className={`!p-0 ${key !== "delete" && "!mb-3"} group transition-all`}
          key={key}
        >
          <div className="flex gap-4 group-hover:text-primary-400 group-hover:dark:text-gold">
            {icon}
            <span
              className="text-sm font-normal text-secondary-1000 dark:text-white group-hover:text-primary-400 group-hover:dark:text-gold transition-all">
              {text}
            </span>
          </div>
        </ListboxItem>
      ))}
    </Listbox>
  );
};

export default MemberAction;