import React from 'react';
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    size?: ModalSize;
    header?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    backdropClosable?: boolean;
}
declare const AppModal: {
    ({ isOpen, onClose, size, children, backdropClosable, }: ModalProps): React.ReactPortal;
    Header: typeof AppModalHeader;
    Body: typeof AppModalBody;
    Footer: typeof AppModalFooter;
};
declare function AppModalHeader({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function AppModalBody({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function AppModalFooter({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export default AppModal;
//# sourceMappingURL=AppModal.d.ts.map