import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchNormal1 } from 'iconsax-react';
import { Input } from '@heroui/react';
import { useAppSelector } from 'core/redux';

import { CloseIcon } from '../icons';

import AppButton from './AppButton';

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const AppSearchInput = ({ placeholder, onSearch }: SearchInputProps) => {
  const lang = useAppSelector((state) => state.language);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  const handleSearch = useCallback(() => {
    onSearch?.(query.trim());
  }, [onSearch, query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch],
  );

  return (
    <div className="flex items-center gap-2">
      {!isOpen && (
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            onPress: handleOpen,
            content: (
              <SearchNormal1
                className="text-secondary-1000 dark:text-white"
                size={24}
              />
            ),
          }}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="search-input"
            animate={{ opacity: 1, width: 300 }}
            className="overflow-hidden"
            exit={{ opacity: 0, width: 0 }}
            initial={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Input
              classNames={{
                inputWrapper: '!bg-white p-1.5 !rounded-4',
              }}
              endContent={
                <AppButton
                  props={{
                    isIconOnly: true,
                    onPress: handleClose,
                    content: <CloseIcon size={20} />,
                  }}
                />
              }
              placeholder={
                lang === 'en '
                  ? `Search ${placeholder} ...`
                  : `${placeholder}جستجو در `
              }
              startContent={
                <SearchNormal1 className="text-secondary-1000" size={22} />
              }
              value={query}
              onKeyDown={handleKeyDown}
              onValueChange={setQuery}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppSearchInput;
