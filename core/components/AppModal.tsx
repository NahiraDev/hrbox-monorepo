import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';

interface ModalProps {
  title?: string;
  icon?: React.ReactNode;
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
  title,
  icon,
  size = 'md',
  children,
  backdropClosable = true,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  (AppModal as any).open = open;
  (AppModal as any).close = close;
  const content = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child as any, { close });
  });

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={backdropClosable ? close : undefined}
        >
          <motion.div
            className={`bg-[#ffffff4d] rounded-2xl shadow p-10 w-full backdrop-blur-[20px] ${sizeClasses[size]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <div className="bg-secondary-400 shadow-light-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">
                  {icon}
                  <span className="text-white font-normal text-xl">
                    {title}
                  </span>
                </div>
              </div>
            </div>
            {content}
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
  return <div className="flex justify-between gap-4">{children}</div>;
}

AppModal.Body = AppModalBody;
AppModal.Footer = AppModalFooter;

export default AppModal;
