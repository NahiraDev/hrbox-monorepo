import React, { createContext, type ReactNode, useContext, useState } from 'react';

type ModalType = 'delete' | 'edit' | 'view' | 'confirm' | 'custom';

interface ModalContextType {
  openModal: (type: ModalType, name: string, component: React.ReactNode, data?: any | undefined, size?: string, title?: string | null, icon?: React.ReactNode) => void;
  closeModal: (type: ModalType, name: string) => void;
  getModalData: (type: ModalType, name: string) => any;
  isModalOpen: (type: ModalType, name: string) => boolean;
  getOpenModal: () => { title?: string | null ; icon?: React.ReactNode | null; size?: string | null; type: ModalType | string; name: string; component: React.ReactNode } | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{
  children: ReactNode;
  store?: any;
}> = ({ children, store }) => {
  const [modals, setModals] = useState<any[]>([]);

  const openModal = (
    type: ModalType | string,
    name: string,
    component: React.ReactNode,
    data?: any | undefined,
    size?: string | null,
    title?: string | null,
    icon?: React.ReactNode | null
  ) => {
    setModals(prev => {
      const filtered = prev.filter(
        modal => !(modal.type === type && modal.name === name),
      );
      return [...filtered, { type, name, data, component, size, title, icon }];
    });
  };

  const closeModal = (type: ModalType | string, name: string) => {
    setModals(prev =>
      prev.filter(modal => !(modal.type === type && modal.name === name)),
    );
  };

  const getModalData = (type: ModalType | string, name: string) => {
    return modals.find(modal => modal.type === type && modal.name === name)
      ?.data;
  };

  const isModalOpen = (type: ModalType | string, name: string) => {
    return modals.some(modal => modal.type === type && modal.name === name);
  };

  const getOpenModal = (): {
    title?: string | null;
    icon?: React.ReactNode | null;
    size?: string | null;
    type: ModalType | string;
    name: string;
    component: React.ReactNode;
  } | null => {
    if (modals.length === 0) return null;
    const latest = modals[modals.length - 1];
    return {
      type: latest.type,
      name: latest.name,
      component: latest.component,
      size: latest.size,
      title: latest.title,
      icon: latest.icon,
    };
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
