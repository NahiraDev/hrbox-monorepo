import React, { createContext, type ReactNode, useContext, useState } from 'react';

type ModalType = 'delete' | 'edit' | 'view' | 'confirm' | 'custom';

interface ModalContextType {
  openModal: (type: ModalType | string | undefined, name: string | undefined, data?: any) => void;
  closeModal: (type: ModalType | string | undefined, name: string | undefined) => void;
  getModalData: (type: ModalType | string | undefined, name: string | undefined) => any;
  isModalOpen: (type: ModalType | string | undefined, name: string | undefined) => boolean;
  getOpenModal: () => { type: ModalType | string | undefined; name: string | undefined } | null;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<any[]>([]);

  const openModal = (type: ModalType | string, name: string, data?: any) => {
    setModals((prev) => {
      const filtered = prev.filter((modal) => !(modal.type === type && modal.name === name));

      return [...filtered, { type, name, data }];
    });
  };

  const closeModal = (type: ModalType, name: any) => {
    setModals((prev) => prev.filter((modal) => modal.type !== type && modal.name !== name));
  };

  const getModalData = (type: ModalType, name: any) => {
    return modals.find((modal) => modal.type === type && modal.name === name)?.data;
  };

  const isModalOpen = (type: ModalType, name: any) => {
    return modals.some((modal) => modal.type === type && modal.name === name);
  };
  const getOpenModal = (): { type: string; name: string } | null => {
    if (modals.length === 0) return null;
    const latest = modals[modals.length - 1];

    return { type: latest.type, name: latest.name };
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        getModalData,
        isModalOpen,
        getOpenModal,
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
