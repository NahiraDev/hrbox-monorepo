import { useEffect } from 'react';
import { useModalManagement } from 'core/context';

import { useModal } from '../hooks';

export function withModal<P extends object>(
  Component: React.ComponentType<
    P & { isOpen: boolean; onClose: () => void; data?: any }
  >,
) {
  const Wrapped = (props: Omit<P, 'isOpen' | 'onClose' | 'data'>) => {
    const modal = useModal();
    const { isEditMode, isShowMode, deactivateModes } = useModalManagement();

    useEffect(() => {
      if (modal.isOpen) {
        if (isEditMode) {
          console.log('Editing:', modal.data);
        } else if (isShowMode) {
          console.log('Viewing:', modal.data);
        }
      }

      return () => {
        deactivateModes();
      };
    }, [modal.isOpen, isEditMode, isShowMode, deactivateModes, modal.data]);

    return (
      <Component
        {...(props as P)}
        data={modal.data}
        isOpen={modal.isOpen}
        onClose={modal.close}
      />
    );
  };

  Wrapped.useModal = () => useModal();

  return Wrapped;
}
