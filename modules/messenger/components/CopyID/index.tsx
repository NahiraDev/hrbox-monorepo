import { useState } from "react";
import { DocumentCopy } from "iconsax-reactjs";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useSelector } from "react-redux";
import { RootState } from "@hrbox/core/redux";

export const CopyId = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const recipientId = useSelector(
    (state: RootState) =>
      state?.profile?.profile?.user_name || state?.profile?.profile?.chat_id
  );

  const handleCopy = async () => {
    if (recipientId) {
      await navigator.clipboard.writeText("@" + "" + recipientId.toString());
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  };

  return (
    <div className="flex justify-between items-center my-4">
      <span className="dark:text-white text-secondary-1000 font-open-sans text-xs font-light leading-normal">
        @{recipientId}
      </span>
      <Popover
        placement="top"
        showArrow={true}
        isOpen={true}
        classNames={{
          base: [
            "before:bg-secondary-400 dark:before:bg-surface-200"
          ]
        }}
      >
        <PopoverTrigger>
          <Button
            isIconOnly
            className="bg-transparent !h-auto !my-0"
            fullWidth={false}
            onClick={() => handleCopy()}
          >
            <div className="flex justify-center items-center">
              <DocumentCopy
                size="16"
                variant="Outline"
                className={`${isCopied ? "dark:text-gold text-primary" : "dark:text-white text-secondary-1000"}`}
              />
            </div>
          </Button>
        </PopoverTrigger>
        {isCopied && (
          <PopoverContent
            className="flex items-center justify-center px-3 !rounded-4 dark:bg-surface-200 bg-secondary-400">
            <div className="text-xs text-white font-light leading-normal">
              Copied
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};
