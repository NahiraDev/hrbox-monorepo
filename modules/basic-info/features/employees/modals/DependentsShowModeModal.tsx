import { AppButton, AppInput, AppModal, AppTextArea } from '@core/components';
import { useModalContext } from '@core/context';

export const DependentsShowModeModal = () => {
  const { openModal } = useModalContext();

  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            <AppInput
              props={{
                value:"Describe title",
                mode:'show',
                label: 'First Name',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                value:"Describe title",
                mode:'show',
                label: 'Last Name',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                value:"Describe title",
                mode:'show',
                label: 'National ID',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                value:"Describe title",
                mode:'show',
                label: 'Education',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                value:"Describe title",
                mode:'show',
                label: 'Mobile',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                value:"Describe title",
                mode:'show',
                label: 'Date of Birth',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                value:"Describe title",
                mode:'show',
                label: 'Relation',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
          </div>
          <div>
            <AppTextArea
              props={{
                value:"Descriptions",
                mode:'show',
                label: 'Descriptions and Achievements*',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
          </div>
        </div>
      </AppModal.Body>
    </>
  )
}
