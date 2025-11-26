import React, { useState } from "react";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { AppModal } from "./AppModal";
import { FormProvider } from "@hrbox/core/providers";

/**
 * ✅ Wrapper برای pass کردن FormContext به AppModal
 */
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
    submitLabel = "ذخیره",
    cancelLabel = "لغو",
    children
}) => {
    // ✅ FormContext رو اینجا دریافت کنید
    let formContext: any = null;
    try {
        formContext = useFormContext();
    } catch {
        // نیست
    }

    // ✅ FormContext state‌ها رو pass کنید
    return (
        <AppModal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            title={title}
            icon={icon}
            submitLabel={submitLabel}
            cancelLabel={cancelLabel}
            // ✅ pass کنید FormContext state‌ها
            isDirty={formContext?.dirty ?? false}
            isSubmitting={formContext?.isSubmitting ?? false}
            formError={formContext?.formError ?? null}
            onSubmit={formContext?.handleSubmit}
            onCancel={formContext?.resetForm}
        >
            {children}
        </AppModal>
    );
};

/**
 * ✅ GlobalModalRenderer - نسخه درست
 */
export const GlobalModalRenderer: React.FC = () => {
    const { getOpenModal, closeModal } = useModalContext();
    const openModal = getOpenModal();
    const [isOpen, setIsOpen] = useState(true);

    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && openModal) {
                closeModal(openModal.type, openModal.name);
            }
        };

        if (openModal) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [openModal, closeModal]);

    if (!openModal) {
        return null;
    }

    const isFormModal = openModal.data?.isForm === true;
    const formConfig = openModal.data?.formConfig;

    // ✅ اگر فرم است
    if (isFormModal && formConfig) {
        return (
            <FormProvider
                initialValues={formConfig.initialValues}
                validationSchema={formConfig.validationSchema}
                formId={formConfig.formId}
                enableCache={formConfig.enableCache}
                clearCacheOnSubmit={formConfig.clearCacheOnSubmit}
                onSubmitAsync={formConfig.onSubmitAsync}
            >
                {/* ✅ Wrapper برای FormContext */}
                <AppModalWithFormContext
                    isOpen={isOpen}
                    onClose={() => {
                        setIsOpen(false);
                        closeModal(openModal.type, openModal.name);
                    }}
                    size={openModal.size}
                    title={openModal.data?.title}
                    icon={openModal.data?.icon}
                    submitLabel={openModal.data?.submitLabel || "ذخیره"}
                    cancelLabel={openModal.data?.cancelLabel || "لغو"}
                >
                    {openModal.component}
                </AppModalWithFormContext>
            </FormProvider>
        );
    }

    // ✅ اگر فرم نیست - Context mode
    return (
        <AppModal
            type={openModal.type}
            name={openModal.name}
            size={openModal.size}
            title={openModal.data?.title}
            icon={openModal.data?.icon}
        >
            {openModal.component}
        </AppModal>
    );
};

export default GlobalModalRenderer;