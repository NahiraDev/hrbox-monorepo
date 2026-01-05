import React, { useState } from "react";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { AppModal } from "./AppModal";
import { FormProvider } from "@hrbox/core/providers";

const AppModalWithFormContext: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  size?: string;
  title?: string;
  icon?: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  children?: React.ReactNode;
}> = ({
        isOpen,
        onClose,
        size,
        title,
        icon,
        submitLabel = "Submit",
        cancelLabel = "Cancel",
        children
      }) => {
  const formContext = useFormContext();

  const handleSubmit = async () => {
    try {
      await formContext.submitForm();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      title={title}
      icon={icon}
      submitLabel={submitLabel}
      cancelLabel={cancelLabel}
      isDirty={formContext.dirty}
      isSubmitting={formContext.isSubmitting}
      formError={formContext.formError}
      onSubmit={handleSubmit}
      onCancel={() => {
        formContext.resetFormState();
        onClose();
      }}
    >
      {children}
    </AppModal>
  );
};

export const GlobalModalRenderer: React.FC = () => {
  const { getOpenModal, closeModal } = useModalContext();
  const openModal = getOpenModal();
  const [isOpen, setIsOpen] = useState(true);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openModal && openModal.closeOnEsc !== false) {
        closeModal(openModal.type, openModal.name);
      }
    };

    if (openModal) {
      document.addEventListener("keydown", handleEscape);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openModal, closeModal]);

  if (!openModal) {
    return null;
  }

  const isFormModal = openModal.data?.isForm === true;
  const formConfig = openModal.data?.formConfig;

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      closeModal(openModal.type, openModal.name);
    }, 200);
  };

  if (isFormModal && formConfig) {
    const safeFormConfig = {
      initialValues: formConfig.initialValues || {},
      validationSchema: formConfig.validationSchema,
      formId: formConfig.formId || `modal-form-${Date.now()}`,
      enableCache: formConfig.enableCache ?? false,
      clearCacheOnSubmit: formConfig.clearCacheOnSubmit ?? true,
      onSubmitAsync: formConfig.onSubmitAsync,
      onSubmit: formConfig.onSubmit
    };

    return (
      <FormProvider
        initialValues={safeFormConfig.initialValues}
        validationSchema={safeFormConfig.validationSchema}
        formId={safeFormConfig.formId}
        enableCache={safeFormConfig.enableCache}
        clearCacheOnSubmit={safeFormConfig.clearCacheOnSubmit}
        onSubmitAsync={safeFormConfig.onSubmitAsync}
        onSubmit={safeFormConfig.onSubmit}
      >
        <AppModalWithFormContext
          isOpen={isOpen}
          onClose={handleClose}
          size={openModal.size}
          title={openModal.data?.title || openModal.title}
          icon={openModal.data?.icon || openModal.icon}
          submitLabel={openModal.data?.submitLabel || "ذخیره"}
          cancelLabel={openModal.data?.cancelLabel || "لغو"}
        >
          {openModal.component}
        </AppModalWithFormContext>
      </FormProvider>
    );
  }

  return (
    <AppModal
      type={openModal.type}
      name={openModal.name}
      size={openModal.size}
      title={openModal.data?.title || openModal.title}
      icon={openModal.data?.icon || openModal.icon}
    >
      {openModal.component}
    </AppModal>
  );
};

export default GlobalModalRenderer;