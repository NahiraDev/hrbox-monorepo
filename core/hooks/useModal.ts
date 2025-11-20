import { useModalContext, ModalType, ModalSize } from '@hrbox/core/providers/ModalProvider';
import React, { useCallback } from 'react';

interface ModalOptions {
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  onClose?: () => void;
}

export const useModal = () => {
  const {
    openModal,
    closeModal,
    isModalOpen,
    getModalData,
    updateModalData,
    closeAllModals
  } = useModalContext();

  const open = useCallback(
      (
          type: ModalType | string = ModalType.CREATE,
          name: string,
          component: React.ReactNode,
          data?: any,
          size: ModalSize | string = ModalSize.MD,
          title?: string,
          icon?: React.ReactNode,
          options?: ModalOptions
      ) => {
        openModal(type, name, component, data, size, title, icon, options);
      },
      [openModal]
  );

  const close = useCallback(
      (type?: ModalType | string, name?: string) => {
        closeModal(type, name);
      },
      [closeModal]
  );

  const isOpen = useCallback(
      (type?: ModalType | string, name?: string) => {
        return isModalOpen(type, name);
      },
      [isModalOpen]
  );

  const getData = useCallback(
      (name: string) => {
        return getModalData(name);
      },
      [getModalData]
  );

  const updateData = useCallback(
      (type: ModalType | string, name: string, data: any) => {
        updateModalData(type, name, data);
      },
      [updateModalData]
  );

  const closeAll = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

  return {
    open,
    close,
    isOpen,
    getData,
    updateData,
    closeAll
  };
};