import React, { createContext, type ReactNode, useContext, useState } from 'react';

type ModalType = 'delete' | 'edit' | 'view' | 'confirm' | 'custom';

interface ModalContextType {
  openModal: (type: ModalType | string, data?: unknown) => void;
  closeModal: (type: ModalType | string) => void;
  getModalData: (type: ModalType | string) => unknown;
  isModalOpen: (type: ModalType | string) => boolean;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<any[]>([]);

  const openModal = (type: ModalType, data: any) => {
    setModals((prev) => [...prev.filter((m) => m.type !== type), { type, data }]);
  };

  const closeModal = (type: ModalType) => {
    setModals((prev) => prev.filter((m) => m.type !== type));
  };

  const getModalData = (type: ModalType) => {
    return modals.find((m) => m.type === type)?.data;
  };

  const isModalOpen = (type: ModalType) => {
    return modals.some((m) => m.type === type);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        getModalData,
        isModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
};
