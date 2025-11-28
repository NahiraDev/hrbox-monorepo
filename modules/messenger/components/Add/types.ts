import { Dispatch, SetStateAction } from "react";
import { MessageTypes } from "../../types";

export type ReactPhotoEditorProps = {
  file: File | undefined;
  allowColorEditing?: boolean;
  allowRotate?: boolean;
  allowFlip?: boolean;
  allowZoom?: boolean;
  downloadOnSave?: boolean;
  open?: boolean;
  onClose?: () => void;
  onSaveImage: (image: File) => void;
};

export type AddGroupProps = {
  data?: {
    setIsOpenAddModal?: Dispatch<SetStateAction<boolean>>;
    isOpenAddModal?: boolean;
    onClose: () => void;
    profile?: any;
  };
};
export type AddMembersProps = {
  data: {
    groupName: string;
    groupDescription: string;
    selectedType: string;
    selectedImage: string;
    openMemberModal: boolean;
    setOpenMemberModal: Dispatch<SetStateAction<boolean>>;
    onClose: () => void;
    setIsOpenAddModal?: (isOpenAddModal: boolean) => void;
    isOpenAddModal?: boolean;
    setOrginalImage?: Dispatch<SetStateAction<string>>;
    orginalImage?: string;
    isSelected: boolean;
  };
};

export type MemberListProps = {
  data: {
    isOpenAddModal: boolean;
    setIsOpenAddModal: (isOpenAddModal: boolean) => void;
    setIsOpenMessengerAction?: Dispatch<SetStateAction<boolean>>;
    message?: MessageTypes[];
  };
};

export type CreateGroupProps = {
  data: {
    isOpen: boolean;
    onClose: () => void;
    handleCancel: () => void;
    selectedImage: string | null;
    setSelectedImage: Dispatch<SetStateAction<string>>;
    handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    orginalImage?: string | null;
    setOrginalImage: Dispatch<SetStateAction<string>>;
  };
};
