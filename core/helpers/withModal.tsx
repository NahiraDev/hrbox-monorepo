import { useModal } from '../hooks';

export function withModal<P extends object>(
  Component: React.ComponentType<P & { isOpen: boolean; onClose: () => void }>,
) {
  const Wrapped = (props: Omit<P, 'isOpen' | 'onClose'>) => {
    const modal = useModal();
    return <Component {...(props as P)} isOpen={modal.isOpen} onClose={modal.close} data={modal.data} />;
  };

  Wrapped.useModal = () => useModal();

  return Wrapped;
}
