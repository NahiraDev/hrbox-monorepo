import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchNormal1 } from "iconsax-reactjs";
import { AppButton, AppInput } from "@hrbox/uikit/components/index";
import { CloseIcon } from "@hrbox/uikit/icons";
import { FormMode } from "@hrbox/uikit/components/types";

interface AppSearchInputProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
  formMode?: FormMode;
  name?: string;
  isDisabled?: boolean;
  width?: number;
  className?: string;
}

export const AppSearchInput = ({
                                 onSearch,
                                 placeholder = "جستجو...",
                                 defaultValue = "",
                                 formMode = FormMode.CREATE,
                                 name = "search",
                                 isDisabled = false,
                                 width = 300,
                                 className = ""
                               }: AppSearchInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(defaultValue);

  const handleOpen = useCallback(() => {
    if (!isDisabled) {
      setIsOpen(true);
    }
  }, [isDisabled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  const handleSearch = useCallback(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch?.(trimmedQuery);
    }
  }, [onSearch, query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      } else if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleSearch, handleClose]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {!isOpen && (
        <AppButton
          color="primary"
          size="sm"
          variant="bordered"
          isIconOnly
          onPress={handleOpen}
          isDisabled={isDisabled}
          content={<SearchNormal1 className="text-secondary-1000" size={24} />}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="search-input"
            animate={{ opacity: 1, width }}
            className="overflow-hidden"
            exit={{ opacity: 0, width: 0 }}
            initial={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <AppInput
              name={name}
              value={query}
              formMode={formMode}
              placeholder={placeholder}
              isDisabled={isDisabled}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              startContent={<SearchNormal1 size={20} className="dark:text-[#DEE1E8] text-[#1E3363]" />}
              endContent={
                <AppButton
                  color="light"
                  size="xs"
                  isIconOnly
                  className="h-full"
                  onPress={handleClose}
                  content={<CloseIcon size={20} className="dark:text-[#DEE1E8] text-[#1E3363]" />}
                />
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};