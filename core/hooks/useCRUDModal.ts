import { ModalSize, ModalType } from "@hrbox/core/providers";
import { useModal } from "@hrbox/core/hooks/useModal";
import React from "react";

export const useCRUDModal = (config: {
  name: string;
  size?: ModalSize | string;
}) => {
  const { open, close } = useModal();
  const { name, size = ModalSize.MD } = config;

  return {
    openCreate: (component: React.ReactNode, title?: string, icon?: React.ReactNode) =>
      open(ModalType.CREATE, name, component, undefined, size, title, icon),

    openEdit: (component: React.ReactNode, data?: any, title?: string, icon?: React.ReactNode) =>
      open(ModalType.EDIT, name, component, data, size, title, icon),

    openView: (component: React.ReactNode, data?: any, title?: string, icon?: React.ReactNode) =>
      open(ModalType.VIEW, name, component, data, size, title, icon),

    openDelete: (component: React.ReactNode, data?: any, title?: string, icon?: React.ReactNode) =>
      open(ModalType.DELETE, name, component, data, size, title, icon),

    close: (type: ModalType | string = ModalType.CREATE) =>
      close(type, name),
  };
};
