import { AppButton, AppModal } from 'core/components';
import { Profile2User, Trash } from 'iconsax-react';

export const SpouseModal = () => {
  return (
    <AppModal icon={<Profile2User />} modalType={} size="3xl" title="Spouse">
      <AppModal.Body>

      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            isIconOnly: true,
            onPress: () => console.log('a'),
            content: <Trash className="text-secondary-1000 group-hover:text-white" />,
            className: 'hover:!bg-red-500 transition-all duration-200',
          }}
        />
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            isIconOnly: true,
            onPress: () => console.log('a'),
            content: <Trash className="text-secondary-1000 group-hover:text-white" />,
            className: 'hover:!bg-red-500 transition-all duration-200',
          }}
        />
      </AppModal.Footer>
    </AppModal>
  );
};
