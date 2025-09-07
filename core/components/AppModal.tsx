import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalContext } from 'core/context';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';

interface ModalProps {
  title?: string;
  icon?: React.ReactNode;
  size?: ModalSize;
  children?: React.ReactNode;
  modalType: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  full: 'w-full h-full',
};

const AppModal = ({ title, icon, size = 'md', children, modalType }: ModalProps) => {
  const { isModalOpen, closeModal } = useModalContext();
  const handleBackdropClick = () => {
    if (closeModal) {
      closeModal(modalType);
    }
  };
  const content = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child as any, { close: closeModal });
  });

  return createPortal(
    <AnimatePresence>
      {isModalOpen(modalType) && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-[#fff] rounded-2xl shadow p-10 w-full backdrop-blur-[20px] ${sizeClasses[size]}`}
            exit={{ scale: 0.95, opacity: 0 }}
            initial={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-6">
              {(title || icon) && (
                <div className="flex items-center">
                  <div
                    className={`shadow-light-tight/1 dark:shadow-dark-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit items-center bg-${modalType === 'delete' ? 'danger' : 'primary'}`}
                  >
                    {icon}
                    <span className="text-white font-normal text-xl">{title}</span>
                  </div>
                </div>
              )}
              {content}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

function AppModalBody({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>;
}

function AppModalFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-7 justify-end">{children}</div>;
}

AppModal.Body = AppModalBody;
AppModal.Footer = AppModalFooter;

export default AppModal;
