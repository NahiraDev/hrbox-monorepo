import React, { createContext, type ReactNode, useContext, useState } from 'react';
import { store } from '@core/helpers';
import { preloadAppModalData, resetAppModalData } from '@core/redux';

type ModalType = 'delete' | 'edit' | 'view' | 'confirm' | 'custom';

interface ModalContextType {
  openModal: (type: ModalType | string, name: string,component:React.ReactNode, data?: any ) => void;
  closeModal: (type: ModalType | string, name: string) => void;
  getModalData: (type: ModalType | string, name: string) => any;
  isModalOpen: (type: ModalType | string, name: string) => boolean;
  getOpenModal: () => {title:string , icon:string , size:string , type: ModalType | string , name: string ,component: React.ReactNode} | null;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<any[]>([]);

  const openModal = (type: ModalType | string, name: string, component: React.ReactNode, data?: any) => {
    setModals(prev => {
      const filtered = prev.filter(modal => !(modal.type === type && modal.name === name));
      return [...filtered, { type, name, data, component }];
    });

    if (data) {
      store.dispatch(preloadAppModalData({ modalName: name, data }));
    }
  };

  const closeModal = (type: ModalType | string, name: string) => {
    setModals(prev => prev.filter(modal => !(modal.type === type && modal.name === name)));

    store.dispatch(resetAppModalData({ modalName: name }));
  };

  const getModalData = (type: ModalType | string, name: string) => {
    return modals.find((modal) => modal.type === type && modal.name === name)?.data;
  };

  const isModalOpen = (type: ModalType | string, name: string) => {
    return modals.some((modal) => modal.type === type && modal.name === name);
  };
  const getOpenModal = (): { type: ModalType | string; name: string,component: React.ReactNode } | null => {
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
