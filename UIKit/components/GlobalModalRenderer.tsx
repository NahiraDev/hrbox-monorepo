import React from "react";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { AppModal } from "./AppModal";

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
            // Prevent body scroll when modal is open
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

    return (
        <AppModal
            type={openModal.type}
            name={openModal.name}
            title={openModal.title ?? undefined}
            icon={openModal.icon ?? undefined}
            size={openModal.size}
            component={openModal.component}
        />
    );
};

export default GlobalModalRenderer;