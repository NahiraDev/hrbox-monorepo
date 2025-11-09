import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

export enum ModalType {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
  DELETE = 'delete',
  CONFIRM = 'confirm',
  CUSTOM = 'custom',
}

export enum ModalSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  FULL = 'full',
}

interface Modal {
  type: ModalType | string;
  name: string;
  component: React.ReactNode;
  data?: any;
  size?: ModalSize | string;
  title?: string | null;
  icon?: React.ReactNode | null;
  onClose?: () => void;
}

interface ModalContextType {
  openModal: (
    type: ModalType | string,
    name: string,
    component: React.ReactNode,
    data?: any,
    size?: ModalSize | string,
    title?: string | null,
    icon?: React.ReactNode | null
  ) => void;
  closeModal: (type: ModalType | string | undefined, name: string | undefined) => void;
  getModalData: (type: ModalType | string, name: string) => any;
  isModalOpen: (type: ModalType | string | undefined, name: string | undefined) => boolean;
  getOpenModal: () => Modal | null;
  closeAllModals: () => void;
  getModalCount: () => number;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * ✅ ModalProvider - مدیریت مودال‌های متعدد
 */
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  // باز کردن مودال
  const openModal = useCallback(
    (
      type: ModalType | string,
      name: string,
      component: React.ReactNode,
      data?: any,
      size?: ModalSize | string,
      title?: string | null,
      icon?: React.ReactNode | null
    ) => {
      setModals((prev) => {
        const filtered = prev.filter(
          (modal) => !(modal.type === type && modal.name === name)
        );
        return [
          ...filtered,
          { type, name, component, data, size, title, icon },
        ];
      });
    },
    []
  );

  // بستن مودال
  const closeModal = useCallback(
    (type: ModalType | string, name: string) => {
      setModals((prev) =>
        prev.filter((modal) => !(modal.type === type && modal.name === name))
      );
    },
    []
  );

  // دریافت data مودال
  const getModalData = useCallback(
    (type: ModalType | string, name: string) => {
      return modals.find(
        (modal) => modal.type === type && modal.name === name
      )?.data;
    },
    [modals]
  );

  // بررسی باز بودن مودال
  const isModalOpen = useCallback(
    (type: ModalType | string, name: string) => {
      return modals.some(
        (modal) => modal.type === type && modal.name === name
      );
    },
    [modals]
  );

  const getOpenModal = useCallback((): Modal | null => {
    return modals.length > 0 ? modals[modals.length - 1] : null;
  }, [modals]);

  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  const getModalCount = useCallback(() => modals.length, [modals]);

  const value: ModalContextType = useMemo(
    () => ({
      openModal,
      closeModal,
      getModalData,
      isModalOpen,
      getOpenModal,
      closeAllModals,
      getModalCount,
    }),
    [
      openModal,
      closeModal,
      getModalData,
      isModalOpen,
      getOpenModal,
      closeAllModals,
      getModalCount,
    ]
  );

  return (
    <ModalContext.Provider value={value}>
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