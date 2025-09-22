import React, { createContext, type ReactNode, useContext, useState } from 'react';

type ModalType = 'delete' | 'edit' | 'view' | 'confirm' | 'custom';

interface ModalContextType {
  openModal: (type: ModalType, name: string,component:React.ReactNode, data?: any ) => void;
  closeModal: (type: string, name: string) => void;
  getModalData: (type: ModalType, name: string) => any;
  isModalOpen: (type: ModalType, name: string) => boolean;
  getOpenModal: () => {title:string , icon:string , size:string , type: string; name: string ,component: React.ReactNode} | null;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<any[]>([]);

  const openModal = (type: ModalType, name: string,component:React.ReactNode, data?: any) => {
    setModals((prev) => {
      const filtered = prev.filter((modal) => !(modal.type === type && modal.name === name));

      return [...filtered, { type, name, data,component }];
    });
  };

  const closeModal = (type: ModalType, name: string) => {
    setModals((prev) => prev.filter((modal) => !(modal.type === type && modal.name === name)));
  };

  const getModalData = (type: ModalType, name: string) => {
    return modals.find((modal) => modal.type === type && modal.name === name)?.data;
  };

  const isModalOpen = (type: ModalType, name: string) => {
    return modals.some((modal) => modal.type === type && modal.name === name);
  };
  const getOpenModal = (): { type: string; name: string,component: React.ReactNode } | null => {
    if (modals.length === 0) return null;
    const latest = modals[modals.length - 1];

    return { type: latest.type, name: latest.name,component: latest.component };
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
