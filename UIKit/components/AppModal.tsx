import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useModalContext, ModalType, ModalSize } from "@hrbox/core/providers/ModalProvider";
import { Button } from "@heroui/react";
import React, { createContext, useContext } from "react";
import clsx from "clsx";

// ============================================
// Close Icon Component
// ============================================
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

// ============================================
// Size Classes
// ============================================
const sizeClasses: Record<ModalSize | string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  full: "w-full h-full"
};

// ============================================
// Internal Context
// ============================================
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

// ============================================
// AppModal.Header
// ============================================
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
              "bg-gradient-to-r px-6 py-4 flex items-center justify-between",
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
                  <div className="text-2xl text-white">{modalIcon}</div>
              )}
              {modalTitle && (
                  <h2 className="text-lg font-bold text-white">{modalTitle}</h2>
              )}
            </div>
        )}

        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={closeModal}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="بستن"
        >
          <Close size="24" className="text-white" />
        </motion.button>
      </motion.div>
  );
};

// ============================================
// AppModal.Body
// ============================================
interface AppModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

const AppModalBody: React.FC<AppModalBodyProps> = ({ children, className }) => {
  const { formError } = useModalInternal();

  return (
      <motion.div
          className={clsx("flex-1 overflow-y-auto p-6", className)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
      >
        {/* Error Alert */}
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

// ============================================
// AppModal.Footer
// ============================================
interface AppModalFooterProps {
  children?: React.ReactNode;
  className?: string;
  submitLabel?: string;
  cancelLabel?: string;
}

const AppModalFooter: React.FC<AppModalFooterProps> = ({
                                                         children,
                                                         className,
                                                         submitLabel = "ذخیره",
                                                         cancelLabel = "لغو"
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

  // ✅ اگر isContextMode = false (standalone mode):
  // showFooter = true (باید نمایش داده شود)
  const isFormMode = !isContextMode;
  
  const showFooter =
      !hideFooter && (isFormMode || isDirty || isSubmitting || onSubmit);

  if (!showFooter) return null;

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      closeModal();
    }
  };

  return (
      <motion.div
          className={clsx(
              "px-6 py-4 flex items-center justify-end gap-3",
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
                      isDisabled={!isDirty || isSubmitting}
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

// ============================================
// AppModal - Base Component
// ============================================
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
       submitLabel = "ذخیره",
       cancelLabel = "لغو",
       hideFooter = false,
       children,
       isOpen = true,
       onClose
     }) => {
  const { getOpenModal, isModalOpen, closeModal } = useModalContext();
  const modalData = getOpenModal();

  // ✅ تشخیص mode
  const isContextMode = !!(type && name);

  // ترکیب props و modalData
  const modalTitle = title || modalData?.title;
  const modalIcon = icon || modalData?.icon;
  const modalSize = (size || modalData?.size || "md") as ModalSize;
  const modalType = type || modalData?.type;
  const modalName = name || modalData?.name;
  const modalComponent = component || modalData?.component;

  // ✅ بررسی نمایش مودال
  const shouldShowModal = isContextMode
      ? isModalOpen(modalType, modalName)
      : isOpen;

  if (isContextMode && !shouldShowModal) {
    return null;
  }

  // Handlers
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
        return "from-danger to-danger-600";
      case ModalType.EDIT:
        return "from-primary to-primary-600";
      case ModalType.VIEW:
        return "from-secondary-400 to-secondary-600";
      case ModalType.CREATE:
      default:
        return "from-primary to-primary-600";
    }
  };

  // Context Value
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
    // ✅ props رو مستقیم استفاده کنید
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
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                onClick={handleBackdropClick}
            >
              <motion.div
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  className={clsx(
                      "w-full rounded-2xl bg-panel-surface dark:bg-neutral-800",
                      "shadow-2xl overflow-hidden max-h-[90vh] flex flex-col",
                      sizeClasses[modalSize] || "max-w-md"
                  )}
              >
                <ModalContextProvider.Provider value={contextValue}>
                  {/* Header */}
                  {(modalTitle || modalIcon) && <AppModalHeader />}

                  {/* Content */}
                  <AppModalBody>
                    {children ?? modalComponent}
                  </AppModalBody>

                  {/* Footer */}
                  {!hideFooter && (
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

  // Return portal for context mode, otherwise direct render
  return isContextMode
      ? createPortal(modalContent, document.body)
      : modalContent;
};

// Attach sub-components
AppModalBase.Header = AppModalHeader;
AppModalBase.Body = AppModalBody;
AppModalBase.Footer = AppModalFooter;

export const AppModal = AppModalBase;