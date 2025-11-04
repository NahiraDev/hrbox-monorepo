import { AppAutoComplete, AppButton, AppInput, AppModal, AppTextArea } from '@core/components';
import { Add, Location } from 'iconsax-react';
import { useModalContext } from '@core/context';
import { Avatar } from '@heroui/react';

export const OrganizationLocationShowModeModal = () => {
  const { openModal } = useModalContext();

  return (
    <>
      <AppModal.Body>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex gap-3 items-center ">
              <Avatar className='p-3.5 text-white' size="lg" radius="sm" color='primary' src="" />
              <span className="!font-medium text-secondary-1000">Location Photo</span>
          </div>
          <AppInput
            props={{
              label: "Location Title",
              value: "Describe title",
              mode: "show"
            }}
          />
          <AppInput
            props={{
              label: 'URL',
              value:"Organizations",
              mode: "show"
            }}
          />
          <AppInput
            props={{
              label: 'URL',
              value:"Departments/Units",
              mode: "show",
            }}
          />
          <AppInput
            props={{
              label: 'URL',
              value:"Person/People",
              mode: "show"
            }}
          />
          <AppInput
            props={{
              label: 'URL',
              value:"Describe Code Number",
              mode: "show",
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
        </div>
        <div className="flex flex-col gap-6 mt-6">
          <AppTextArea
            props={{
              label: 'Address*',
              size: 'lg',
              value:"Description",
              color: 'primary',
              radius: 'lg',
              mode: "show"
            }}
          />
          <AppTextArea
            props={{
              label: 'Descriptions*',
              size: 'lg',
              value:"Description",
              color: 'primary',
              radius: 'lg',
              mode: "show"
            }}
          />
        </div>
      </AppModal.Body>
    </>
  );
};
