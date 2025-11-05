import { AnimatePresence, motion } from 'framer-motion';
import { Warning2 } from 'iconsax-react';
import { AppButton } from 'shared/components/index';

// import { CloseIcon } from '../../public/icons';
import { clearError, useAppDispatch, useAppSelector } from 'core/redux';
import { useEffect } from 'react';

export const AppErrorToast = () => {
  const errorMessage = useAppSelector((state) => state.error.message);
  const dispatch = useAppDispatch();

  const onCloseToast = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseToast();
    };

    if (errorMessage) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [errorMessage]);

  return (
    <AnimatePresence>
      {errorMessage && (
        <motion.div
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-shadow-light-tight/1 p-10 w-full backdrop-blur-[20px]"
          exit={{ scale: 0.9, opacity: 0 }}
          initial={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-8 relative">
            <AppButton
              props={{
                className: 'absolute top-4 right-4',
                size: '',
                radius: '',
                onPress: () => {
                  onCloseToast;
                },
                content: (
                  <div>
                    {/*<CloseIcon />*/}
                  </div>
                ),
              }}
            />
            <div className="bg-warning-400 py-1.5 px-3 rounded-md flex gap-1.5">
              <Warning2 color="#fff" size="32" />
              <span className="text-white text-xl">Error!</span>
            </div>
            <p className="text-lg">{errorMessage}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
