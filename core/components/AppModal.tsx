import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  backdropClosable?: boolean;
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

const AppModal = ({
  isOpen,
  onClose,
  size = 'md',
  children,
  backdropClosable = true,
}: ModalProps) => {
  const content = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child as any, { onClose });
  });

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={backdropClosable ? onClose : undefined}
        >
          <motion.div
            className={`bg-[#ffffff4d] rounded-2xl shadow p-10 w-full backdrop-blur-[20px] ${sizeClasses[size]}`}
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

function AppModalHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

function AppModalBody({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>;
}

function AppModalFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-between gap-4 mt-6">{children}</div>;
}

AppModal.Header = AppModalHeader;
AppModal.Body = AppModalBody;
AppModal.Footer = AppModalFooter;

export default AppModal;
