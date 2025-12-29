import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ModalSize, ModalType, useModalContext } from "@hrbox/core/providers/ModalProvider";
import { Button } from "@heroui/react";
import React, { createContext, useContext } from "react";
import clsx from "clsx";

const Close: React.FC<{ size?: string; className?: string }> = ({
                                                                  size = "24",
                                                                  className = ""
                                                                }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
};

const sizeClasses: Record<ModalSize | string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  full: "w-full h-full"
};

interface AppModalContextType {
  modalTitle?: string;
  modalIcon?: React.ReactNode;
  modalSize: ModalSize | string;
  modalType?: string;
  modalName?: string;
  isContextMode: boolean;
  shouldShowModal: boolean;
  closeModal: () => void;
  getHeaderColor: () => string;
  isDirty?: boolean;
  isSubmitting?: boolean;
  formError?: string | null;
  onSubmit?: () => void;
  onCancel?: () => void;
  hideFooter?: boolean;
}

const ModalContextProvider = createContext<AppModalContextType | undefined>(
  undefined
);

const useModalInternal = () => {
  const ctx = useContext(ModalContextProvider);
  if (!ctx) {
    throw new Error("useModalInternal must be used within AppModal");
  }
  return ctx;
};

interface AppModalHeaderProps {
  children?: React.ReactNode;
}

const AppModalHeader: React.FC<AppModalHeaderProps> = ({ children }) => {
  const {
    modalTitle,
    modalIcon,
    getHeaderColor,
    closeModal,
    shouldShowModal
  } = useModalInternal();

  if (!shouldShowModal || (!modalTitle && !modalIcon && !children)) return null;

  return (
    <motion.div
      className={clsx(
        "px-3 py-1.5 flex items-center justify-between rounded-lg",
        getHeaderColor()
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {children ? (
        <div>{children}</div>
      ) : (
        <div className="flex items-center gap-3">
          {modalIcon && (
            <div className="text-lg text-white">{modalIcon}</div>
          )}
          {modalTitle && (
            <h2 className="text-xl font-medium text-white">{modalTitle}</h2>
          )}
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={closeModal}
        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
        aria-label="Close"
      >
        <Close size="24" className="text-[#0F1729]" />
      </motion.button>
    </motion.div>
  );
};

interface AppModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

const AppModalBody: React.FC<AppModalBodyProps> = ({ children, className }) => {
  const { formError } = useModalInternal();

  return (
    <motion.div
      className={clsx("flex-1", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      {formError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-danger-50 dark:bg-danger-900/20 rounded-lg"
        >
          <p className="text-sm text-danger dark:text-danger-300">
            {formError}
          </p>
        </motion.div>
      )}

      {/* Main Content */}
      {children}
    </motion.div>
  );
};

interface AppModalFooterProps {
  children?: React.ReactNode;
  className?: string;
  submitLabel?: string;
  cancelLabel?: string;
}

const AppModalFooter: React.FC<AppModalFooterProps> = ({
                                                         children,
                                                         className,
                                                         submitLabel = "Submit",
                                                         cancelLabel = "Cancel"
                                                       }) => {
  const {
    isDirty,
    isSubmitting,
    onSubmit,
    onCancel,
    closeModal,
    hideFooter,
    isContextMode
  } = useModalInternal();
  const isFormMode = !isContextMode;

  const showFooter =
    !hideFooter && (isFormMode || isDirty || isSubmitting || onSubmit);

  if (!showFooter) return null;

  const handleCancel = () => {
    closeModal();
  };

  return (
    <motion.div
      className={clsx(
        "flex items-center justify-end gap-3",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {children ? (
        children
      ) : (
        <>
          <Button
            color="default"
            variant="light"
            onPress={handleCancel}
            isDisabled={isSubmitting}
          >
            {cancelLabel}
          </Button>
          {onSubmit && (
            <Button
              color="primary"
              onPress={onSubmit}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              {submitLabel}
            </Button>
          )}
        </>
      )}
    </motion.div>
  );
};

interface AppModalProps {
  title?: string;
  icon?: React.ReactNode;
  size?: ModalSize | string;
  type?: string;
  name?: string;
  component?: React.ReactNode;
  isDirty?: boolean;
  isSubmitting?: boolean;
  formError?: string | null;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  hideFooter?: boolean;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const AppModalBase: React.FC<AppModalProps> & {
  Header: typeof AppModalHeader;
  Body: typeof AppModalBody;
  Footer: typeof AppModalFooter;
} = ({
       title,
       icon,
       size = "md",
       type,
       name,
       component,
       isDirty = false,
       isSubmitting = false,
       formError = null,
       onSubmit,
       onCancel,
       submitLabel = "Submit",
       cancelLabel = "Cancel",
       hideFooter = false,
       children,
       isOpen = true,
       onClose
     }) => {
  const { getOpenModal, isModalOpen, closeModal } = useModalContext();
  const modalData = getOpenModal();

  const isContextMode = !!(type && name);

  const modalTitle = title || modalData?.title;
  const modalIcon = icon || modalData?.icon;
  const modalSize = (size || modalData?.size || "md") as ModalSize;
  const modalType = type || modalData?.type;
  const modalName = name || modalData?.name;
  const modalComponent = component || modalData?.component;

  const shouldShowModal = isContextMode
    ? isModalOpen(modalType, modalName)
    : isOpen;

  if (isContextMode && !shouldShowModal) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    if (isContextMode) {
      closeModal(modalType, modalName);
    } else if (onClose) {
      onClose();
    } else if (onCancel) {
      onCancel();
    }
  };

  const getHeaderColor = () => {
    switch (modalType) {
      case ModalType.DELETE:
        return "bg-[linear-gradient(90deg,#0A9AD7_19.05%,#FFFFFF_100%)]";
      case ModalType.EDIT:
        return "bg-[linear-gradient(90deg,#0A9AD7_19.05%,#FFFFFF_100%)]";
      case ModalType.VIEW:
        return "bg-[linear-gradient(90deg,#0A9AD7_19.05%,#FFFFFF_100%)]";
      case ModalType.CREATE:
      default:
        return "bg-[linear-gradient(90deg,#0A9AD7_19.05%,#FFFFFF_100%)]";
    }
  };

  const contextValue: AppModalContextType = {
    modalTitle,
    modalIcon,
    modalSize: modalSize as ModalSize,
    modalType,
    modalName,
    isContextMode,
    shouldShowModal,
    closeModal: handleClose,
    getHeaderColor,
    isDirty,
    isSubmitting,
    formError,
    onSubmit,
    onCancel,
    hideFooter
  };

  // Modal Content
  const modalContent = (
    <AnimatePresence mode="wait">
      {shouldShowModal && (
        <motion.div
          key={`modal-${modalType}-${modalName}`}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              "rounded-2xl bg-panel-surface dark:bg-neutral-800 border border-primary",
              "shadow-2xl overflow-hidden max-h-[90vh] p-12 gap-6  flex flex-col relative",
              sizeClasses[modalSize] || "max-w-md"
            )}
          >
            <ModalContextProvider.Provider value={contextValue}>
              {(modalTitle || modalIcon) && <AppModalHeader />}

              <AppModalBody>
                {children ?? modalComponent}
              </AppModalBody>

              {!modalType && (
                <AppModalFooter
                  submitLabel={submitLabel}
                  cancelLabel={cancelLabel}
                />
              )}
            </ModalContextProvider.Provider>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return isContextMode
    ? createPortal(modalContent, document.body)
    : modalContent;
};

AppModalBase.Header = AppModalHeader;
AppModalBase.Body = AppModalBody;
AppModalBase.Footer = AppModalFooter;

export const AppModal = AppModalBase;