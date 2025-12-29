import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Folder2, Gallery, Paperclip2 } from "iconsax-reactjs";
import { SelectFileProps } from "./types";

const SelectFile = ({ data }: SelectFileProps) => {
  const handleButtonClick = () => {
    data.setIsOpenSelectFile(!data.isOpenSelectFile);
  };

  const handlePhotoClick = () => {
    data.handlePhotoClick();
  };

  const handleFileClick = () => {
    data.handleFileClick();
  };
  return (
    <Popover
      placement="top"
      className="bottom-[10px] left-12"
      isOpen={data.isOpenSelectFile}
      ref={data.popoverRef}
    >
      <PopoverTrigger>
        <Button
          isIconOnly
          disabled={data.showMediaPopup}
          onClick={handleButtonClick}
          className="p-0 bg-transparent"
        >
          <Paperclip2
            size={20}
            className="cursor-pointer text-neutral-400 dark:text-gold"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-10 flex-col items-start gap-3 py-2 px-4 !rounded-md bg-white border border-neutral-200 dark:bg-info-1000 dark:border-info-1000">
        <div
          className="cursor-pointer flex items-center text-secondary-1000 hover:text-primary dark:text-white dark:hover:text-gold group"
          onClick={handlePhotoClick}
        >
          <Gallery
            size={20}
            className="text-secondary-1000 mr-4 dark:text-white group-hover:text-primary dark:group-hover:text-gold"
          />
          Photo
        </div>
        <Input
          type="file"
          accept="image/*"
          id="photoInput"
          className="hidden"
          onChange={data.handleFileChange}
        />
        <div
          className="cursor-pointer flex items-center text-gray-700 hover:text-primary dark:text-white dark:hover:text-gold group"
          onClick={handleFileClick}
        >
          <Folder2
            size={20}
            className="text-secondary-1000 mr-4 dark:text-white group-hover:text-primary dark:group-hover:text-gold"
          />
          File
        </div>
        <Input
          type="file"
          accept="*/*"
          id="fileInput"
          className="hidden"
          onChange={data.handleFileChange}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SelectFile;
