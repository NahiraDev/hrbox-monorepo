import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchNormal1 } from 'iconsax-react';
import { AppInput , AppButton } from '@hrbox/uikit/components/index';


export const AppSearchInput = ({ onSearch }: any) => {
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
            color: 'default',
            size: 'xs',
            isIconOnly: true,
            onPress: handleOpen,
            content: <SearchNormal1 className="text-secondary-1000" size={24} />,
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
            <AppInput
              props={{
                value: query,
                onKeyDown: handleKeyDown,
                onValueChange: setQuery,
                endContent: (
                  <AppButton
                    props={{
                      color: 'default',
                      size: 'xs',
                      isIconOnly: true,
                      onPress: handleClose,
                      // content: <CloseIcon size={20} />,
                    }}
                  />
                ),
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
