import { AppAutoComplete, AppButton, AppInput, AppModal, AppTextArea } from 'core/components';
import { NotificationFavorite } from 'iconsax-react';
import { useModalContext } from 'core/context';

const PreEmploymentHealthRecordsModals = () => {
  const { openModal } = useModalContext();
  return (
    <AppModal icon={<NotificationFavorite color="white" />} size="3xl" title="Add New Pre-Employment Health Records">
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <AppAutoComplete
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Type',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Drug Addiction',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Smoking',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Blood Type',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Gastrointestinal Disease',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                  label: 'Alcohol Consumption',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Musculoskeletal Disease',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Mental Health Condition',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Blood Sugar Level',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Vitamin D Level',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Blood Pressure',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Liver Enzyme Status',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Audiometry ',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Breath Test',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Vision Test',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'ECG',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Blood Lipid Level',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Blood Iron Level',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Attached File',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppAutoComplete
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Date  ',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
          </div>
          <AppTextArea
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Descriptions and Achievements*',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
        </div>
      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            onPress: () => openModal('delete', undefined),
            content: <span>Cancle</span>,
            className:
              'text-Secondary-1000 py-1.5 px-3 text-xl rounded-lg hover:!bg-red-500 hover:text-white transition-all duration-200',
          }}
        />
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            onPress: () => console.log('a'),
            content: <span>Submit</span>,
            className: 'bg-primary text-white py-1.5 px-3 text-xl rounded-lg ',
          }}
        />
      </AppModal.Footer>
    </AppModal>
  );
};

export default PreEmploymentHealthRecordsModals;
