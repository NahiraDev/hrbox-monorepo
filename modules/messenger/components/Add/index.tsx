import {
  Button,
  RadioGroup,
  Radio,
  Input,
  useDisclosure,
  Switch,
  cn,
} from "@nextui-org/react";
import { Image as IconImage } from "iconsax-react";
import React, { useState, useRef, useEffect } from "react";
import AddMembers from "./AddMembers";
import { CreateGroup } from "./CreateGroup";
import { AddGroupProps } from "./types";
import { useDarkMode } from "../../context/DarkMode";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AddGroup: React.FC<AddGroupProps> = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [orginalImage, setOrginalImage] = useState<string>("");
  const [groupDescription, setGroupDescription] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [openMemberModal, setOpenMemberModal] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedType, setSelectedType] = useState<string>("channel");
  const { darkMode } = useDarkMode();
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const recipient = useSelector((state: RootState) => state?.profile?.profile);
  const isEditGroupAndChannel = useSelector(
    (state: RootState) => state?.messengerAction?.isEdit,
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setOrginalImage(reader.result as string);
        onOpen();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  };

  const handleSetGroupName = (value: string) => {
    setGroupName(value);
  };

  const handleSetGroupDescription = (value: string) => {
    setGroupDescription(value);
  };

  const handleCancel = () => {
    setSelectedImage("");
    data?.onClose();
    setOpenMemberModal(false);
  };

  const handleChangeMuted = () => {
    setIsSelected(!isSelected);
  };

  const handleOpenMemberModal = () => {
    setOpenMemberModal(true);
  };

  useEffect(() => {
    if (isEditGroupAndChannel) {
      setGroupName(data?.profile?.name || "");
      setGroupDescription(data?.profile?.description || "");
      setSelectedType(data?.profile?.type || "");
    }
  }, [isEditGroupAndChannel]);
  useEffect(() => {
    if (!isEditGroupAndChannel) {
      setSelectedImage(orginalImage || "");
    } else {
      setSelectedImage(data?.profile?.original_image || "");
    }
  }, [isOpen]);
  return (
    <div className="flex flex-col w-full rounded-3 bg-white dark:bg-info-1000 relative py-4 px-6">
      <div className="py-2 px-3 bg-surface-50 rounded-4 dark:bg-surface-100 flex !w-fit">
        <span className="text-secondary-400 dark:text-secondary-0 font-normal text-sm">
          Group Or Channel?
        </span>
      </div>

      <RadioGroup onChange={handleTypeChange} value={selectedType}>
        <div className="flex gap-[54px] px-1 pt-4">
          <Radio
            value="channel"
            className="text-secondary-1000 dark:text-white font-normal leading-6 text-base"
          >
            Channel
          </Radio>
          <Radio
            value="group"
            className="text-secondary-1000 dark:text-white font-normal leading-6 text-base"
          >
            Group
          </Radio>
        </div>
      </RadioGroup>

      <div className="flex gap-6 pt-6">
        <div
          className={`${selectedImage && "hidden"}`}
          onClick={() => {
            !isEditGroupAndChannel
              ? selectedImage !== null
                ? fileInputRef.current?.click()
                : onOpen()
              : onOpen();
          }}
        >
          {isEditGroupAndChannel ? (
            <div className="cursor-pointer !w-[64px] !h-[64px]">
              <img
                src={data?.profile?.image}
                className={`rounded-lg  object-cover cursor-pointer transition-transform transform `}
              />
            </div>
          ) : (
            <div className="bg-primary-400 dark:bg-surface-200 px-[14px] py-[14px] rounded-5 flex justify-center items-center cursor-pointer">
              <IconImage size="36" variant="Bold" className="text-white" />
              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}
        </div>
        {selectedImage && (
          <div className="flex items-center">
            <img
              id="full-image"
              src={selectedImage || undefined}
              alt="Final"
              className={`rounded-lg object-cover cursor-pointer transition-transform transform !w-[50px] !h-[50px]`}
              onClick={() => {
                !isEditGroupAndChannel
                  ? selectedImage === null
                    ? fileInputRef.current?.click()
                    : onOpen()
                  : onOpen();
              }}
            />
          </div>
        )}
        <div className="w-full flex flex-col gap-1">
          <span className="text-xs font-normal block text-secondary-1000 dark:text-white leading-4">
            {selectedType === "group" ? "Group Name" : "Channel Name"}
          </span>
          <Input
            type="text"
            onChange={(e) => handleSetGroupName(e.target.value)}
            value={groupName}
            variant="bordered"
            labelPlacement="outside"
            placeholder={`Enter ${selectedType === "group" ? "group" : "channel"} name`}
            classNames={{
              inputWrapper:
                "!rounded-4 border-1 !px-1.5 !py-1 !h-8 !border-surface-50 dark:!border-surface-100",
            }}
          />
        </div>
      </div>

      <div className="pt-6 flex flex-col gap-1">
        <span className="text-xs font-normal block text-secondary-1000 dark:text-white leading-4">
          Description
        </span>
        <Input
          onChange={(e) => handleSetGroupDescription(e.target.value)}
          value={groupDescription}
          type="text"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter description"
          classNames={{
            inputWrapper:
              "!rounded-4 border-1 !px-1.5 !py-1 !h-8 !border-surface-50 dark:!border-surface-100",
          }}
        />
      </div>
      <div className="pt-6 flex items-center">
        <Switch
          {...(darkMode
            ? {
                classNames: {
                  thumb: cn("bg-info-1000 shadow-lg !w-3 !h-3 transition-all"),
                  wrapper: cn(
                    "bg-neutral-100 text-info-1000 !w-[30px] !h-[18px] mr-2 rounded-full flex items-center justify-start transition-background", // اندازه و انیمیشن برای wrapper
                    "group-data-[selected=true]:bg-surface-200",
                  ),
                },
              }
            : {
                classNames: {
                  thumb: cn("bg-white shadow-lg !w-3 !h-3 transition-all"),
                  wrapper: cn(
                    "!w-[30px] !h-[18px] mr-2 rounded-full flex items-center justify-start transition-background",
                  ),
                },
              })}
          isSelected={!isEditGroupAndChannel ? recipient?.muted : isSelected}
          onValueChange={handleChangeMuted}
          size="sm"
        />
        <span className="text-secondary-1000 dark:text-white text-sm font-normal">
          {isSelected ? "Unmute" : "Mute"} Notifications
        </span>
      </div>
      <div className="flex justify-end gap-6 pt-6">
        <Button
          variant="light"
          className="!rounded-4 text-secondary-1000 dark:text-white h-fit min-w-0 px-2 py-1"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          onClick={handleOpenMemberModal}
          className="!rounded-4 bg-primary dark:bg-surface-200 text-white h-fit min-w-0 px-2 py-1"
        >
          Next
        </Button>
      </div>
      <CreateGroup
        data={{
          isOpen,
          onClose,
          handleCancel,
          selectedImage,
          setSelectedImage,
          handleImageUpload,
          orginalImage,
          setOrginalImage,
        }}
      />
      <AddMembers
        data={{
          groupName,
          groupDescription,
          selectedType,
          openMemberModal,
          setOpenMemberModal,
          onClose,
          setIsOpenAddModal: data?.setIsOpenAddModal,
          isOpenAddModal: data?.isOpenAddModal,
          setOrginalImage,
          orginalImage,
          selectedImage,
          isSelected,
        }}
      />
    </div>
  );
};

export default AddGroup;
