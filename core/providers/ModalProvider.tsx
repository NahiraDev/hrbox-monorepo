import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

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
  '2XL' = '2xl',
  '3XL' = '3xl',
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
  getModalData: (type: ModalType | string, name: string) => any;
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

/**
 * ✅ ModalProvider - مدیریت مودال‌های متعدد با قابلیت‌های پیشرفته
 *
 * قابلیت‌ها:
 * - مدیریت چند مودال همزمان با z-index صحیح
 * - پشتیبانی از ESC key برای بستن
 * - پشتیبانی از click on backdrop
 * - قفل اسکرول body هنگام باز بودن مودال
 * - Update کردن data مودال
 * - Callback برای onClose
 */
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  // ============================================
  // Body Scroll Lock
  // ============================================
  useEffect(() => {
    if (modals.length > 0) {
      // قفل اسکرول body
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [modals.length]);

  // ============================================
  // ESC Key Handler
  // ============================================
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modals.length > 0) {
        const lastModal = modals[modals.length - 1];

        // بررسی closeOnEsc (پیش‌فرض true)
        if (lastModal.closeOnEsc !== false) {
          closeModal(lastModal.type, lastModal.name);

          // اجرای callback
          if (lastModal.onClose) {
            lastModal.onClose();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [modals]);

  // ============================================
  // باز کردن مودال
  // ============================================
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
        setModals((prev) => {
          // حذف مودال قبلی با همین type و name (اگر وجود داشت)
          const filtered = prev.filter(
              (modal) => !(modal.type === type && modal.name === name)
          );

          // افزودن مودال جدید به آخر لیست (بالاترین z-index)
          return [
            ...filtered,
            {
              type,
              name,
              component,
              data,
              size: size || ModalSize.MD,
              title: title ?? null,
              icon: icon ?? null,
              closeOnBackdrop: options?.closeOnBackdrop ?? true,
              closeOnEsc: options?.closeOnEsc ?? true,
              onClose: options?.onClose,
            },
          ];
        });
      },
      []
  );

  // ============================================
  // بستن مودال
  // ============================================
  const closeModal = useCallback(
      (type?: ModalType | string, name?: string) => {
        setModals((prev) => {
          // اگر type و name داده نشده، آخرین مودال رو ببند
          if (!type || !name) {
            const lastModal = prev[prev.length - 1];
            if (lastModal?.onClose) {
              lastModal.onClose();
            }
            return prev.slice(0, -1);
          }

          // پیدا کردن مودال و اجرای onClose
          const modalToClose = prev.find(
              (modal) => modal.type === type && modal.name === name
          );

          if (modalToClose?.onClose) {
            modalToClose.onClose();
          }

          // حذف مودال
          return prev.filter(
              (modal) => !(modal.type === type && modal.name === name)
          );
        });
      },
      []
  );

  // ============================================
  // دریافت data مودال
  // ============================================
  const getModalData = useCallback(
      (type: ModalType | string, name: string) => {
        return modals.find(
            (modal) => modal.type === type && modal.name === name
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

  // ============================================
  // تعداد مودال‌های باز
  // ============================================
  const getModalCount = useCallback(() => modals.length, [modals]);

  // ============================================
  // بروزرسانی data مودال
  // ============================================
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

  // ============================================
  // Context Value با useMemo برای جلوگیری از re-render
  // ============================================
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
        updateModalData,
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
        updateModalData,
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

    getData: () => getModalData(type, name),

    updateData: (data: any) => updateModalData(type, name, data),
  };
};