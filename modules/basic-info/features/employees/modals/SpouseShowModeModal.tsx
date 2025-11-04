import { AppButton, AppInput, AppModal, AppTextArea } from '@core/components';
import { Profile2User } from 'iconsax-react';
import { useModalContext } from '@core/context';

export const SpouseShowModeModal = () => {
  const { openModal } = useModalContext();

  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            <AppInput
              props={{
                mode:'show',
                label: 'First Name',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                value:"Describe Title"
              }}
            />
            <AppInput
              props={{
                mode:'show',
                label: 'Last Name',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                value:"Describe Title"
              }}
            />
            <AppInput
              props={{
                mode:'show',
                label: 'National ID',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                value:"Describe Title"
              }}
            />
            <AppInput
              props={{
                mode:'show',
                label: 'Education',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                value:"Describe Title"
              }}
            />
            <AppInput
              props={{
                mode:'show',
                label: 'Mobile',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                value:"Describe Title"
              }}
            />
            <AppInput
              props={{
                mode:'show',
                label: 'Date of Birth',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                value:"Describe Title"
              }}
            />
          </div>
          <div>
            <AppTextArea
              props={{
                label: 'Descriptions and Achievements*',
                value:"description",
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                mode:'show'
              }}
            />
          </div>
        </div>
      </AppModal.Body>
    </>
  );
};
