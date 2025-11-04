import { AppButton, AppInput, AppModal, AppTextArea } from '@core/components';
import { Category } from 'iconsax-react';
import { useModalContext } from '@core/context';

const EducationShowModeModal = () => {

  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <AppInput
              props={{
                mode:'show',
                value:"Describe Title",
                label: 'Degree Level',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                mode:'show',
                value:"Describe Title",
                label: 'Educational Institution',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                mode:'show',
                value:"Describe Title",
                label: 'University Type',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                mode:'show',
                value:"Describe Title",
                label: 'Field of Study',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                mode:'show',
                value:"Describe Title",
                label: 'Thesis Title',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                mode:'show',
                value:"Describe Title",
                label: 'GPA',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                mode:'show',
                value:"Describe Title",
                label: 'From Year',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                mode:'show',
                value:"Describe Title",
                label: 'To Year',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                mode:'show',
                value:"Describe Title",
                label: 'Province',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
          </div>
          <div>
            <AppTextArea
              props={{
                mode:'show',
                value:"Descriptions",
                label: 'Descriptions*',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
          </div>
        </div>
      </AppModal.Body>
    </>
  );
};

export default EducationShowModeModal;
