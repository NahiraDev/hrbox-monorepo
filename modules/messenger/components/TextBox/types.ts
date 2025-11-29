export type avatarProps = {
  avatarImage: string;
  size?: "lg" | "md" | "sm";
};

export type Emoji = {
  activeSkinTone: string;
  emoji: string;
  imageUrl: string;
  isCustom: boolean;
  names: string[];
  unified: string;
  unifiedWithoutSkinTone: string;
};

export type SelectFileProps = {
  data: {
    isOpenSelectFile: boolean;
    showMediaPopup: boolean;
    setIsOpenSelectFile: (isOpen: boolean) => void;
    handlePhotoClick: () => void;
    resetStates: () => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileClick: () => void;
    popoverRef: React.RefObject<HTMLDivElement>;
  };
};

export type ShowMediaProps = {
  data: {
    selectedImage: string | null | undefined;
    selectedFile: string | null;
    shortenFileName: (fileName: string, maxLength: number) => string;
    imageDetails: {
      size: string;
      date: string;
      time: string;
    };
    captionMessage: string;
    setCaptionMessage: (captionMessage: string) => void;
    setShowEmojiPickerCaption: (emojiPickerCaption: boolean) => void;
    handleSetCaption: (caption: string) => void;
    showEmojiPickerCaption: boolean;
    showEmojiPickerMessage: boolean;
    setShowEmojiPickerMessage: (emojiPickerMessage: boolean) => void;
    resetStates: () => void;
    setShowMediaPopup: (showMediaPopup: boolean) => void;
    handleSendMedia: () => void;
    handleEmojiClickCaption: (emojiData: Emoji) => void;
    isImageFile: boolean;
    popoverRef: React.RefObject<HTMLDivElement>;
  };
};
