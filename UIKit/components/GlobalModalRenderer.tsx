import React from "react";
import { useModalContext } from "@Projects/hrbox-monorepo/core/providers/ModalProvider";
import { AppModal } from "@Projects/hrbox-monorepo/UIKit/components/AppModal";

export const GlobalModalRenderer: React.FC = () => {
    const { getOpenModal } = useModalContext();
    const openModal = getOpenModal();

    // اگر مودالی باز نیست، چیزی render نمی‌کنیم
    if (!openModal) {
        return null;
    }

    return (
        <AppModal
            type={openModal.type}
            name={openModal.name}
            title={openModal.title}
            icon={openModal.icon}
            size={openModal.size}
            component={openModal.component}
        />
    );
};

// Export با نام دیگه برای سازگاری
export default GlobalModalRenderer;