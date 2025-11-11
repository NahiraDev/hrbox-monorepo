import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useModalContext, ModalType, ModalSize } from "@hrbox/core/providers/ModalProvider";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { Button } from "@heroui/react";
import React, { createContext, useContext } from "react";
import clsx from "clsx";

const sizeClasses: Record<ModalSize | string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
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
        "bg-gradient-to-r px-6 py-4 flex items-center justify-between",
        "border-b border-neutral-200 dark:border-neutral-700",
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
          className="mb-4 p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-700 rounded-lg"
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

  const isFormMode = !isContextMode;
  const showFooter =
    !hideFooter && (isFormMode || isDirty || isSubmitting || onSubmit);

  if (!showFooter) return null;

  return (
    <motion.div
      className={clsx(
        "px-6 py-4 flex items-center justify-end gap-3",
        "border-t border-neutral-200 dark:border-neutral-700",
        "bg-neutral-50 dark:bg-neutral-900/50",
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
            onPress={onCancel || closeModal}
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
// AppModal - Base Component (Context Mode)
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
       children
     }) => {
  const { getOpenModal, isModalOpen, closeModal } = useModalContext();
  const modalData = getOpenModal();

  const isContextMode = !!(type && name);
  const isFormMode = !isContextMode;

  const modalTitle = title || modalData?.title;
  const modalIcon = icon || modalData?.icon;
  const modalSize = (size || modalData?.size || "md") as ModalSize;
  const modalType = type || modalData?.type;
  const modalName = name || modalData?.name;
  const modalComponent = component || modalData?.component;

  if (isContextMode && !modalData) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if (isContextMode) {
        closeModal(modalType, modalName);
      } else if (onCancel) {
        onCancel();
      }
    }
  };

  const handleClose = () => {
    if (isContextMode) {
      closeModal(modalType, modalName);
    } else if (onCancel) {
      onCancel();
    }
  };

  const getHeaderColor = () => {
    switch (modalType) {
      case ModalType.DELETE:
        return "from-danger to-danger-600";
      case ModalType.EDIT:
        return "from-primary-400 to-primary-600";
      case ModalType.VIEW:
        return "from-secondary-400 to-secondary-600";
      case ModalType.CREATE:
      default:
        return "from-primary to-primary-600";
    }
  };

  const shouldShowModal = isContextMode
    ? isModalOpen(modalType, modalName)
    : true;

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

  const portalContent = (
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
              "border border-neutral-200 dark:border-neutral-700",
              "shadow-2xl overflow-hidden max-h-[90vh] flex flex-col",
              sizeClasses[modalSize]
            )}
          >
            <ModalContextProvider.Provider value={contextValue}>
              {/* Header */}
              {(modalTitle || modalIcon) && <AppModalHeader />}

              {/* Content */}
              {children ? (
                children
              ) : (
                <>
                  <AppModalBody>{modalComponent}</AppModalBody>

                  {/* Footer (Default) */}
                  {!hideFooter &&
                    (isFormMode ||
                      isDirty ||
                      isSubmitting ||
                      onSubmit) && (
                      <motion.div
                        className={clsx(
                          "px-6 py-4 flex items-center justify-end gap-3",
                          "border-t border-neutral-200 dark:border-neutral-700",
                          "bg-neutral-50 dark:bg-neutral-900/50"
                        )}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Button
                          color="default"
                          variant="light"
                          onPress={onCancel || handleClose}
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
                      </motion.div>
                    )}
                </>
              )}
            </ModalContextProvider.Provider>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return isContextMode
    ? createPortal(portalContent, document.body)
    : portalContent;
};

AppModalBase.Header = AppModalHeader;
AppModalBase.Body = AppModalBody;
AppModalBase.Footer = AppModalFooter;

export const AppModal = AppModalBase;