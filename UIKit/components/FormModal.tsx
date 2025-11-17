import React from "react";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { ModalSize } from "@hrbox/core/providers/ModalProvider";

interface FormModalProps {
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

/**
 * ✅ FormModal - فقط یک wrapper برای Form است
 * 
 * کار: FormContext رو extract کنه و state‌ها رو پاس بده
 * 
 * ⚠️ اصلاً AppModal رو render نمی‌کنه!
 * فقط children رو رندر می‌کنه و context ارائه می‌دهد
 */
export const FormModal: React.FC<FormModalProps> = ({
    formId,
    submitLabel = "ذخیره",
    cancelLabel = "لغو",
    onSubmit: customOnSubmit,
    onCancel: customOnCancel,
    isDirty: customIsDirty,
    isSubmitting: customIsSubmitting,
    formError: customFormError,
    children
}) => {
    // ✅ FormContext رو دریافت کنید
    let formContext: any = null;
    try {
        formContext = useFormContext();
    } catch {
        // اگر FormContext وجود نداشت، مشکلی نیست
    }

    const handleSubmit = () => {
        if (formContext?.handleSubmit) {
            formContext.handleSubmit();
        } else if (customOnSubmit) {
            customOnSubmit();
        }
    };

    const handleCancel = () => {
        if (formContext?.resetForm) {
            formContext.resetForm();
        }
        if (customOnCancel) {
            customOnCancel();
        }
    };

    // ✅ State ها رو استخراج کنید
    const isDirty = formContext?.dirty ?? customIsDirty ?? false;
    const isSubmitting = formContext?.isSubmitting ?? customIsSubmitting ?? false;
    const formError = formContext?.formError ?? customFormError ?? null;

    // ✅ اطلاعات رو برای AppModal ارائه بدید
    // (AppModal اینها رو میتونه از useModalInternal بگیره)
    
    // 🎯 فقط children رو رندر کنید
    // AppModal خودش میتونه اینها رو استفاده کنه
    return children;
};