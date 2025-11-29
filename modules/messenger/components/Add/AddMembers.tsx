import { Avatar, Button, Modal, ModalContent } from "@heroui/react";
import React, { useEffect, useState } from "react";
import SearchBox from "../SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { AddMembersProps } from "./types";
import { handleGetContactsApi } from "../../services/Messenger/UserService/apis";
import { GroupAndChannelTypes, MemberTypes } from "../../types";
import {
  handleAddGroupApi,
  handleFetchGroupsApi,
  handleUpdateGroupApi,
} from "../../services/Messenger/GroupChatService/apis";
import {
  handleAddChannelApi,
  handleFetchChannelsApi,
  handleUpdateChannelApi,
} from "../../services/Messenger/ChannelChatService/apis";

const AddMembers: React.FC<AddMembersProps> = ({ data }) => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const users: MemberTypes[] = useSelector(
    (state: RootState) => state.users?.users,
  );
  const groupProfile: GroupAndChannelTypes = useSelector(
    (state: RootState) => state?.profile?.profile,
  );
  const myProfile = JSON.parse(localStorage.getItem("profile") || "{}");
  const isEditGroupAndChannel = useSelector(
    (state: RootState) => state?.messengerAction?.isEdit,
  );

  const handleToggleActive = (index: number) => {
    setActiveIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };
  const generateId = (): string => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };
  const handleCreateGroup = async () => {
    const selectedMembers = activeIndexes.map((index) => users[index]);

    const groupData: GroupAndChannelTypes = {
      id: generateId(),
      name: data.groupName,
      description: data.groupDescription,
      type: data.selectedType === "group" ? "group" : "channel",
      sender_id: myProfile?.user_id || "",
      muted: data.isSelected || false,
      pinned: false,
      image: data.selectedImage || "",
      members: selectedMembers,
      messages: [],
      original_image: data.orginalImage || "",
    };

    if (!isEditGroupAndChannel) {
      if (data.selectedType === "group") {
        dispatch(handleAddGroupApi(groupData));
        dispatch(handleFetchGroupsApi());
      } else {
        dispatch(handleAddChannelApi(groupData));
        dispatch(handleFetchChannelsApi());
      }
    } else {
      if (data.selectedType === "group") {
        dispatch(handleUpdateGroupApi({ groupData }));
        dispatch(handleFetchGroupsApi());
      } else {
        dispatch(handleUpdateChannelApi(groupData));
        dispatch(handleFetchChannelsApi());
      }
    }

    data.setOpenMemberModal(false);
    data?.setIsOpenAddModal?.(false);
  };

  useEffect(() => {
    if (groupProfile && groupProfile.members) {
      const indexes = users.reduce(
        (acc: number[], user: MemberTypes, index) => {
          if (
            groupProfile.members.some(
              (member: MemberTypes) => member.id === user?.id,
            )
          ) {
            acc.push(index);
          }
          return acc;
        },
        [],
      );
      setActiveIndexes(indexes);
    }
  }, [groupProfile, users]);

  useEffect(() => {
    dispatch(handleGetContactsApi());
  }, [dispatch]);

  return (
    <Modal
      size="sm"
      className="bg-white dark:bg-info-1000"
      isOpen={data.openMemberModal}
      onOpenChange={data?.onClose}
    >
      <ModalContent>
        <div className="flex flex-col rounded-3 bg-white dark:bg-info-1000">
          <div className="flex items-center gap-2 px-6 py-4">
            <span className="text-secondary-1000 dark:text-white text-base font-semibold font-open-sans leading-normal">
              Add Members
            </span>
            <span className="text-secondary-1000 dark:text-white text-xs font-normal font-open-sans leading-normal">
              {activeIndexes.length}/{users.length}
            </span>
          </div>
          <div className="px-4">
            <SearchBox />
          </div>
          {users &&
            users.map((item: MemberTypes, index: number) => (
              <div
                key={index}
                onClick={() => handleToggleActive(index)}
                className={`flex items-center gap-2 px-4 py-1 border-b border-primary-0 border-opacity-40 cursor-pointer 
                ${activeIndexes.includes(index) ? "bg-[#DCF0F966] dark:bg-surface-200" : "hover:bg-primary-0 dark:hover:bg-primary-800 hover:opacity-40"}`}
              >
                <div className="py-2">
                  <Avatar radius="md" src={item.image} />
                </div>
                <div className="flex flex-col">
                  <span className="font-normal text-xs font-open-sans leading-normal text-secondary-1000 dark:text-white">
                    {item?.name}
                  </span>
                  <span
                    className={`font-light text-[10px] font-open-sans leading-normal text-secondary-800 dark:text-neutral-50`}
                  >
                    {item?.description}
                  </span>
                </div>
              </div>
            ))}
          <div className="flex justify-end pt-[6px] pb-[14px] pr-5 gap-7">
            <Button
              size="sm"
              variant="light"
              className="px-2 py-1 min-w-0 !h-fit rounded-4 text-secondary-1000 dark:text-white leading-normal font-normal text-sm"
              onClick={data.onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateGroup}
              size="sm"
              className="px-2 py-1 min-w-0 !h-fit rounded-4 bg-primary text-white font-normal font-open-sans leading-normal text-sm"
            >
              Next
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default AddMembers;
