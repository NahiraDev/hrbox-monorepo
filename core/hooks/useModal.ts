import { useModalContext, ModalType, ModalSize } from '@hrbox/core/providers/ModalProvider';
import React, { useCallback } from 'react';

export const useModal = () => {
  const { openModal, closeModal, isModalOpen, getModalData } = useModalContext();

  const open = useCallback(
    (
      type: ModalType | string = ModalType.CREATE,
      name: string,
      component: React.ReactNode,
      data?: any,
      size: ModalSize | string = ModalSize.MD,
      title?: string,
      icon?: React.ReactNode
    ) => {
      openModal(type, name, component, data, size, title, icon);
    },
    [openModal]
  );

  const close = useCallback(
    (type: ModalType | string = ModalType.CREATE, name: string) => {
      closeModal(type, name);
    },
    [closeModal]
  );

  const isOpen = useCallback(
    (type: ModalType | string = ModalType.CREATE, name: string) => {
      return isModalOpen(type, name);
    },
    [isModalOpen]
  );

  const getData = useCallback(
    (type: ModalType | string = ModalType.CREATE, name: string) => {
      return getModalData(type, name);
    },
    [getModalData]
  );

  return { open, close, isOpen, getData };
};