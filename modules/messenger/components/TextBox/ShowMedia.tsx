import { Button, Image, Input } from "@heroui/react";
import { ShowMediaProps } from "./types";
import HappyEmoji from "@hrbox/uikit/icons/HappyEmoji";
import EmojiPicker from "emoji-picker-react";
import { Folder } from "iconsax-reactjs";
import { useSelector } from "react-redux";
import { RootState } from "@hrbox/core/redux/store";

const ShowMedia = ({ data }: ShowMediaProps) => {
  const date = new Date();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const messageAction = useSelector((state: RootState) => state.messageAction);
  const toggleEmojiPickerCaption = () => {
    data.setShowEmojiPickerCaption(!data.showEmojiPickerCaption);
    if (data.showEmojiPickerMessage) {
      data.setShowEmojiPickerMessage(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      data.handleSendMedia();
    }
  };

  const handleCancelClick = () => {
    data.setShowMediaPopup(false);
    data.resetStates();
  };

  return (
    <div
      ref={data?.popoverRef}
      className="absolute flex flex-col items-start gap-4 z-50 rounded-md bg-white dark:bg-info-1000 bottom-14 px-6 py-6 w-[360px]"
    >
      <div>
        <span className="text-base text-secondary-1000 dark:text-white font-semibold">
          {data.isImageFile ? "Send as a Photo" : "Send as a File"}
        </span>
      </div>
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-3 bg-gray-200 flex justify-between text-secondary-1000">
          {data.selectedFile && data.isImageFile ? (
            <Image
              src={data.selectedImage || ""}
              alt="Selected"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div className="px-2 py-2 rounded-3 bg-primary-400">
              <Folder
                size="20"
                variant="Bold"
                className="text-white items-center"
              />
            </div>
          )}
        </div>
        <div className="flex items-start gap-1">
          {data.selectedImage && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-secondary-1000 dark:text-white font-open-sans">
                {data.selectedFile
                  ? data.shortenFileName(data.selectedFile, 20)
                  : "No file selected"}
              </span>
              <span className="text-xs font-light text-secondary-1000 dark:text-netural-50">
                {messageAction.file_size} ,
                {`${hours}:${minutes < 10 ? "0" + minutes : minutes}`}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex flex-col gap-1 w-full">
        <div>
          <label className="text-xs font-normal text-secondary-1000 dark:text-white">
            Caption
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center border border-surface-100 rounded-lg">
            <Input
              type="text"
              placeholder="content"
              value={data.captionMessage}
              onKeyDown={handleKeyDown}
              onChange={(e) => data.handleSetCaption(e.target.value)}
              className="border-none outline-none rounded-lg"
              classNames={{
                inputWrapper: "!bg-transparent"
              }}
            />
            <div
              className="cursor-pointer pr-1 dark:text-netural-100"
              onClick={toggleEmojiPickerCaption}
            >
              <div className="p-1.5 bg-transparent cursor-pointer">
                <HappyEmoji />
              </div>
            </div>

            {data.showEmojiPickerCaption && (
              <div
                className="bg-white !rounded-4 dark:bg-info-1000 !shadow-sm absolute z-10 bottom-[100px] left-[285px]">
                <div className="text-box-emoji-picker ">
                  <EmojiPicker
                    width="256px"
                    height="300px"
                    lazyLoadEmojis={true}
                    skinTonesDisabled={true}
                    previewConfig={{
                      showPreview: false
                    }}
                    onEmojiClick={data.handleEmojiClickCaption}
                  />
                  <div className="absolute bottom-0 right-0 h-4 bg-white w-full !rounded-b-4"></div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-6">
            <Button
              variant="light"
              className="!px-2 !py-1 text-secondary-1000 dark:text-white !rounded-4 text-sm font-normal !min-w-0 !w-[50px] !h-auto"
              onPress={handleCancelClick}
            >
              Cancel
            </Button>
            <Button
              className="!rounded-4 bg-primary-400 dark:bg-surface-100 text-white !px-2 !py-1 text-sm font-normal !min-w-0 !w-[50px] !h-auto"
              onPress={data.handleSendMedia}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMedia;
