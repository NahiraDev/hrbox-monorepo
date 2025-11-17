import React from "react";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { AppModal } from "./AppModal";
import { ModalSize } from "@hrbox/core/providers/ModalProvider";

interface FormModalProps {
    // AppModal props
    isOpen?: boolean;
    onClose: () => void;

    // Props برای Context Mode
    type?: string;
    name?: string;

    // Props برای Standalone Mode
    title?: string;
    icon?: React.ReactNode;
    size?: ModalSize | string;
    component?: React.ReactNode;
    children?: React.ReactNode;

    // Props مربوط به فرم
    formId?: string;
    submitLabel?: string;
    cancelLabel?: string;
    hideFooter?: boolean;

    // Override handlers
    onSubmit?: () => void;
    onCancel?: () => void;
    isDirty?: boolean;
    isSubmitting?: boolean;
    formError?: string | null;
}

export const FormModal: React.FC<FormModalProps> = ({
                                                        formId,
                                                        submitLabel = "ذخیره",
                                                        cancelLabel = "لغو",
                                                        onSubmit: customOnSubmit,
                                                        onCancel: customOnCancel,
                                                        isDirty: customIsDirty,
                                                        isSubmitting: customIsSubmitting,
                                                        formError: customFormError,
                                                        ...props
                                                    }) => {
    // سعی در دریافت FormContext (از Formik)
    let formContext: any = null;
    try {
        formContext = useFormContext();
    } catch {
        // اگر FormContext وجود نداشت، مشکلی نیست
    }

    const handleSubmit = () => {
        if (formContext?.handleSubmit) {
            // استفاده از handleSubmit فرمیک
            formContext.handleSubmit();
        } else if (customOnSubmit) {
            customOnSubmit();
        }
    };

    // Handler برای cancel
    const handleCancel = () => {
        if (formContext?.resetForm) {
            // Reset کردن فرم موقع لغو
            formContext.resetForm();
        }
        if (customOnCancel) {
            customOnCancel();
        }
    };

    // ترکیب state از FormContext و props
    // استفاده از dirty یا touched از Formik
    const isDirty = formContext?.dirty ?? customIsDirty ?? false;
    const isSubmitting = formContext?.isSubmitting ?? customIsSubmitting ?? false;
    const formError = formContext?.formError ?? customFormError ?? null;

    return (
        <AppModal
            {...props}
            isDirty={isDirty}
            isSubmitting={isSubmitting}
            formError={formError}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel={submitLabel}
            cancelLabel={cancelLabel}
        />
    );
};