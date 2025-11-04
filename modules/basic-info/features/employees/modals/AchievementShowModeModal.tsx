// @module/basic-info/features/employees/modals/AddNewJob.tsx
import React, { useState } from 'react';
import { AppButton, AppInput, AppDatePicker, AppModal, AppCheckBox, AppSwitch, AppTextArea } from '@core/components';
import { useModalContext } from '@root/core';

interface AddNewJobProps {
  onClose: () => void;
}

export default function AchievementShowModeModal({ onClose }: AddNewJobProps) {
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
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            <AppInput
              props={{
                label: 'Title',
                value: 'Describe title',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                mode:'show'
              }}
            />
            <AppInput
              props={{
                label: 'Title',
                value: 'Describe title',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                mode:'show'
              }}
            />
            <AppInput
              props={{
                label: 'Title',
                value: 'Describe title',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                mode:'show'
              }}
            />
            <AppInput
              props={{
                label: 'Title',
                value: 'Describe title',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                mode:'show'
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            <AppTextArea
              props={{
                className: " w-[640px]",
                label: 'Description',
                value:"Describe text",
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                mode:"show",
              }}
            />
          </div>
        </div>
      </AppModal.Body>
    </div>
  );
}
