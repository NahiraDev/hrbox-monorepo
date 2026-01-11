import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ModalSize, ModalType, useModalContext } from "@hrbox/core/providers/ModalProvider";
import { Button } from "@heroui/react";
import React, { createContext, useContext } from "react";
import clsx from "clsx";
import { useFormContext } from "@hrbox/core/providers";

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

const getSizeClass = (size: string): string => {
  const sizes: { [key: string]: string } = {
    "sm": "w-sm",
    "md": "w-md",
    "lg": "w-lg",
    "xl": "w-xl",
    "2xl": "w-2xl",
    "3xl": "w-3xl",
    "4xl": "w-4xl",
    "5xl": "w-5xl",
    "full": "w-full h-full"
  };
  return sizes[size] || "max-w-md";
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

  let formSubmitForm;
  try {
    const ctx = useFormContext();
    formSubmitForm = ctx.submitForm;
  } catch {
    formSubmitForm = null;
  }

  const showFooter =
    !hideFooter && (isFormMode || isDirty || isSubmitting || onSubmit);

  if (!showFooter) return null;

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    closeModal();
  };

  const handleSubmitClick = async () => {
    try {
      if (onSubmit) {
        await onSubmit();
      } else if (formSubmitForm) {
        await formSubmitForm();
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
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
          {(onSubmit || formSubmitForm) && (
            <Button
              color="primary"
              onPress={handleSubmitClick}
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
        return "bg-[linear-gradient(90deg,#0A9AD7_19.05%,#FFFFFF_100%)] rtl:bg-[linear-gradient(270deg,#0A9AD7_19.05%,#FFFFFF_100%)]";
      case ModalType.EDIT:
        return "bg-[linear-gradient(90deg,#1E3363_19.05%,#FFFFFF_100%)] rtl:bg-[linear-gradient(270deg,#1E3363_19.05%,#FFFFFF_100%)]";
      case ModalType.VIEW:
        return "bg-[linear-gradient(90deg,#0A9AD7_19.05%,#FFFFFF_100%)] rtl:bg-[linear-gradient(270deg,#0A9AD7_19.05%,#FFFFFF_100%)]";
      case ModalType.CREATE:
      default:
        return "bg-[linear-gradient(90deg,#0A9AD7_19.05%,#FFFFFF_100%)] rtl:bg-[linear-gradient(270deg,#0A9AD7_19.05%,#FFFFFF_100%)]";
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

  const modalContent = (
    <AnimatePresence mode="wait">
      {shouldShowModal && (
        <motion.div
          key={`modal-${modalType}-${modalName}`}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              "rounded-2xl bg-panel-surface dark:bg-[#01101A] border border-primary",
              "shadow-2xl overflow-hidden max-h-[90vh] p-12 gap-6  flex flex-col relative",
              getSizeClass(modalSize)
            )}
          >
            <ModalContextProvider.Provider value={contextValue}>
              {(modalTitle || modalIcon) && <AppModalHeader />}

              <AppModalBody>
                {children ?? modalComponent}
              </AppModalBody>

              {modalType !== "view" && (
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