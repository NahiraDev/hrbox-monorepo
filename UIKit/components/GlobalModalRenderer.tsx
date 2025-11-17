import React from "react";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { AppModal } from "./AppModal";
import { FormProvider } from "@hrbox/core/providers";

/**
 * ✅ نقطه مهم:
 * 
 * اگر isForm = true:
 *   FormProvider > AppModal > component
 * 
 * اگر isForm = false:
 *   AppModal > component
 */
export const GlobalModalRenderer: React.FC = () => {
    const { getOpenModal, closeModal } = useModalContext();
    const openModal = getOpenModal();

    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && openModal) {
                closeModal(openModal.type, openModal.name);
            }
        };

        if (openModal) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
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
                <AppModal
                    type={openModal.type}
                    name={openModal.name}
                    size={openModal.size}
                    title={openModal.data?.title}
                    icon={openModal.data?.icon}
                    submitLabel={openModal.data?.submitLabel}
                    cancelLabel={openModal.data?.cancelLabel}
                >
                    {openModal.component}
                </AppModal>
            </FormProvider>
        );
    }

    // ✅ اگر فرم نیست
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