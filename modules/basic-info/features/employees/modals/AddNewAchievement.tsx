// @module/basic-info/features/employees/modals/AddNewJob.tsx
import React, { useState } from 'react';
import { AppButton, AppInput, AppDatePicker, AppModal, AppCheckBox, AppSwitch, AppTextArea } from '@core/components';
import { useModalContext } from '@root/core';

interface AddNewJobProps {
  onClose: () => void;
}

export default function AddNewAchievement({ onClose }: AddNewJobProps) {
  const { closeModal } = useModalContext();

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    type: '',
    startDate: '',
    salary: '',
    description: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCancel = () => {
    onClose();
    closeModal('edit', '');
  };

  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  const handleSubmit = () => {
    if (!isSubmitted) {
      console.log('New Job:', formData);
      setIsSubmitted(true);
    } else {
      setIsSaved(true);
    }
  };

  return (
    <div className="w-[645px]">
      <AppModal.Body>
        <div className="flex flex-col gap-y-6 overflow-y-scroll max-h-[70vh]">
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            <AppInput
              props={{
                className: 'border border-[#DCF0F9] w-full',
                label: 'Title',
                placeholder: 'Describe title',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                isDisabled: isSubmitted
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9] w-full',
                label: 'Title',
                placeholder: 'Describe title',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                isDisabled: isSubmitted
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9] w-full',
                label: 'Title',
                placeholder: 'Describe title',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                isDisabled: isSubmitted
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9] w-full',
                label: 'Title',
                placeholder: 'Describe title',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                isDisabled: isSubmitted
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            <AppTextArea
              props={{
                className: 'border border-[#DCF0F9] w-[635px]',
                label: 'Descriptions and Achievements',
                placeholder: 'Description',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                value: formData.description,
                onChange: (e: any) => setFormData({ ...formData, description: e.target.value }),
                isDisabled: isSubmitted
              }}
            />
          </div>
        </div>
      </AppModal.Body>
      <AppModal.Footer>
        {!isSaved && (
          !isSubmitted ? (
            <div className="flex items-center justify-center gap-3 mt-5 ">
              <AppButton
                props={{
                  size: 'md',
                  radius: 'lg',
                  onPress: handleCancel,
                  content: 'Cancel'
                }}
              />
              <AppButton
                props={{
                  className:"bg-primary text-white",
                  size: 'md',
                  radius: 'lg',
                  onPress: handleSubmit,
                  content: 'Submit'
                }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 mt-5 ">
              <AppButton
                props={{
                  size: 'md',
                  radius: 'lg',
                  onPress: handleCancel,
                  content: 'Cancel'
                }}
              />
              <AppButton
                props={{
                  className:"bg-primary text-white",
                  size: 'md',
                  radius: 'lg',
                  onPress: handleSubmit,
                  content: 'Save Changes'
                }}
              />
            </div>
          )
        )}
      </AppModal.Footer>
    </div>
  );
}
