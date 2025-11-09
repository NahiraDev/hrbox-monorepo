import React, { useCallback } from 'react';
import { useModalContext, ModalType, ModalSize } from '@hrbox/core/providers/ModalProvider';

interface FormModalConfig {
  modalName: string;
  formId: string;
  title?: string;
  icon?: React.ReactNode;
  size?: ModalSize | string;
  component: React.ReactNode;
}

export const useFormModal = (config: FormModalConfig) => {
  const { openModal, closeModal, isModalOpen, getModalData } = useModalContext();

  const openFormModal = useCallback(
    (type: ModalType | string, data?: any) => {
      openModal(
        type,
        config.modalName,
        config.component,
        data,
        config.size || ModalSize.MD,
        config.title,
        config.icon
      );
    },
    [openModal, config]
  );

  const closeFormModal = useCallback(
    (type: ModalType | string) => {
      closeModal(type, config.modalName);
    },
    [closeModal, config]
  );

  const isOpen = useCallback(
    (type: ModalType | string) => {
      return isModalOpen(type, config.modalName);
    },
    [isModalOpen, config]
  );

  const getFormData = useCallback(
    (type: ModalType | string) => {
      return getModalData(type, config.modalName);
    },
    [getModalData, config]
  );

  return {
    openFormModal,
    closeFormModal,
    isOpen,
    getFormData,
  };
};
