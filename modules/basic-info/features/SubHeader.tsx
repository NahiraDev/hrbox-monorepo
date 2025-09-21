import { AppButton } from 'core/components';
import { Add, MessageEdit } from 'iconsax-react';
import { useModalContext } from 'core/context';
  const SubHeader = () => {
  const { openModal } = useModalContext();
  return (
    <div>
      <AppButton
        props={{
          size: 'xs',
          radius: 'sm',
          color: 'white',
          variant: 'solid',
          isIconOnly: true,
          onPress: () => openModal('edit',undefined),
          className: 'bg-white border-1 border-primary-400',
          content: <MessageEdit className="text-secondary-900" size="20" />,
        }}
      />
      <AppButton
        props={{
          size: 'xs',
          radius: 'sm',
          color: 'white',
          variant: 'solid',
          isIconOnly: true,
          onPress: () => openModal('edit',undefined),
          className: 'bg-white border-1 border-primary-400',
          content: <Add className="text-secondary-900" size="20" />,
        }}
      />
    </div>
  );
};

export default SubHeader
