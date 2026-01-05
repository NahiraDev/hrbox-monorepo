import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export enum ModalType {
  CREATE = "create",
  EDIT = "edit",
  VIEW = "view",
  DELETE = "delete",
  CONFIRM = "confirm",
  CUSTOM = "custom",
}

export enum ModalSize {
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
  "2XL" = "2xl",
  "3XL" = "3xl",
  "4XL" = "4xl",
  "5XL" = "5xl",
  FULL = "full",
}

interface Modal {
  type: ModalType | string;
  name: string;
  component: React.ReactNode;
  data?: any;
  size?: ModalSize | string;
  title?: string;
  icon?: React.ReactNode | null;
  onClose?: () => void;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
}

interface ModalContextType {
  openModal: (
    type: ModalType | string,
    name: string,
    component: React.ReactNode,
    data?: any,
    size?: ModalSize | string,
    title?: string | null,
    icon?: React.ReactNode | null,
    options?: ModalOptions
  ) => void;
  closeModal: (type?: ModalType | string, name?: string) => void;
  getModalData: (name: string) => any;
  isModalOpen: (type?: ModalType | string, name?: string) => boolean;
  getOpenModal: () => Modal | null;
  getAllOpenModals: () => Modal[];
  closeAllModals: () => void;
  getModalCount: () => number;
  updateModalData: (type: ModalType | string, name: string, data: any) => void;
}

interface ModalOptions {
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  onClose?: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<Modal[]>([]);
  useEffect(() => {
    if (modals.length > 0) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [modals.length]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && modals.length > 0) {
        const lastModal = modals[modals.length - 1];

        if (lastModal.closeOnEsc !== false) {
          closeModal(lastModal.type, lastModal.name);

          if (lastModal.onClose) {
            lastModal.onClose();
          }
        }
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [modals]);

  const openModal = useCallback(
    (
      type: ModalType | string,
      name: string,
      component: React.ReactNode,
      data?: any,
      size?: ModalSize | string,
      title?: string | null,
      icon?: React.ReactNode | null,
      options?: ModalOptions
    ) => {
      setModals((prev: any) => {
        const filtered = prev.filter(
          (modal: any) => !(modal.type === type && modal.name === name)
        );

        return [
          ...filtered,
          {
            type,
            name,
            component,
            data,
            size: size ,
            title: title ?? null,
            icon: icon ?? null,
            closeOnBackdrop: options?.closeOnBackdrop ?? true,
            closeOnEsc: options?.closeOnEsc ?? true,
            onClose: options?.onClose
          }
        ];
      });
    },
    []
  );
  const closeModal = useCallback(
    (type?: ModalType | string, name?: string) => {
      setModals((prev) => {
        if (!type || !name) {
          const lastModal = prev[prev.length - 1];
          if (lastModal?.onClose) {
            lastModal.onClose();
          }
          return prev.slice(0, -1);
        }

        const modalToClose = prev.find(
          (modal) => modal.type === type && modal.name === name
        );

        if (modalToClose?.onClose) {
          modalToClose.onClose();
        }

        return prev.filter(
          (modal) => !(modal.type === type && modal.name === name)
        );
      });
    },
    []
  );

  const getModalData = useCallback(
    (name: string) => {
      return modals.find(
        (modal) => modal.name === name
      )?.data;
    },
    [modals]
  );

  const isModalOpen = useCallback(
    (type?: ModalType | string, name?: string) => {
      if (!type || !name) {
        return modals.length > 0;
      }

      return modals.some(
        (modal) => modal.type === type && modal.name === name
      );
    },
    [modals]
  );

  const getOpenModal = useCallback((): Modal | null => {
    return modals.length > 0 ? modals[modals.length - 1] : null;
  }, [modals]);


  const getAllOpenModals = useCallback((): Modal[] => {
    return modals;
  }, [modals]);


  const closeAllModals = useCallback(() => {
    modals.forEach((modal) => {
      if (modal.onClose) {
        modal.onClose();
      }
    });

    setModals([]);
  }, [modals]);

  const getModalCount = useCallback(() => modals.length, [modals]);

  const updateModalData = useCallback(
    (type: ModalType | string, name: string, data: any) => {
      setModals((prev) =>
        prev.map((modal) =>
          modal.type === type && modal.name === name
            ? { ...modal, data: { ...modal.data, ...data } }
            : modal
        )
      );
    },
    []
  );

  const value: ModalContextType = useMemo(
    () => ({
      openModal,
      closeModal,
      getModalData,
      isModalOpen,
      getOpenModal,
      getAllOpenModals,
      closeAllModals,
      getModalCount,
      updateModalData
    }),
    [
      openModal,
      closeModal,
      getModalData,
      isModalOpen,
      getOpenModal,
      getAllOpenModals,
      closeAllModals,
      getModalCount,
      updateModalData
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
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};


export const useModalActions = (type: ModalType | string, name: string) => {
  const { openModal, closeModal, isModalOpen, getModalData, updateModalData } = useModalContext();

  return {
    open: (
      component: React.ReactNode,
      data?: any,
      size?: ModalSize | string,
      title?: string | null,
      icon?: React.ReactNode | null,
      options?: ModalOptions
    ) => openModal(type, name, component, data, size, title, icon, options),

    close: () => closeModal(type, name),

    isOpen: isModalOpen(type, name),

    getData: () => getModalData(name),

    updateData: (data: any) => updateModalData(type, name, data)
  };
};