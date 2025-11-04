import React, { useState } from 'react';
import {
  AppButton,
  AppInput,
  AppModal,
  AppCheckBox,
  AppSwitch,
  AppTextArea,
} from '@core/components';
import { useModalContext } from '@root/core';

interface AddNewJobProps {
  onClose: () => void;
}

const JobShowModeModal = ({ onClose }: AddNewJobProps) => {
  const { closeModal } = useModalContext();

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    type: '',
    startDate: '',
    salary: '',
    description: '',
  });


  const handleCancel = () => {
    onClose();
    closeModal('edit', '');
  };

  return (
    <div className="w-[645px]">
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            <AppInput
              props={{
                label: 'Title',
                value:"Describe Title",
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                mode:'show'
              }}
            />
            <AppInput
              props={{
                label: 'Company ',
                value:"Describe Title",
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                mode:'show'
              }}
            /><AppInput
            props={{
              label: 'Start Date',
              value:"Describe Title",
              size: 'lg',
              color: 'primary',
              radius: 'lg',
              mode:'show'
            }}
          /><AppInput
            props={{
              label: 'Salary Received',
              value:"Describe Title",
              size: 'lg',
              color: 'primary',
              radius: 'lg',
              mode:'show'
            }}
          />
            <AppInput
            props={{
              label: 'Industry',
              value:"Describe Title",
              size: 'lg',
              color: 'primary',
              radius: 'lg',
              mode:'show'
            }}
          />
          </div>
          <div className="bg-surface-50 flex items-center justify-between py-5 px-3 rounded-lg">
            <span>I am still working at this company</span>
            <div className="flex items-center justify-around w-[315px]">
              <AppCheckBox props={{ children: <span>Yes</span>}} />
              <AppCheckBox props={{ children: <span>No</span> }} />
            </div>
          </div>

          {/* ======= ورودی‌های اضافی ======= */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            <AppInput
              props={{
                label: 'Upload Work Sample',
                value:"Describe Title",
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                mode:'show'
              }}
            />
            <AppInput
              props={{
                label: 'Province',
                value:"Describe Title",
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                mode:'show'
              }}
            />
            <AppInput
              props={{
                label: 'Job Group',
                value:"Describe Title",
                size: 'lg',
                color: 'primary',
                radius: 'lg',
                mode:'show'
              }}
            />
            <AppSwitch
              props={{
                size: 'lg',
                color: 'danger',
                label: 'Full Time',
              }}
            />
          </div>

          {/* ======= توضیحات ======= */}
          <AppTextArea
            props={{
              label: 'Descriptions and Achievements',
              value:"Descriptions",
              size: 'lg',
              color: 'primary',
              radius: 'lg',
              value: formData.description,
              mode:"show",
              onChange: (e: any) =>
                setFormData({ ...formData, description: e.target.value }),
            }}
          />
        </div>
      </AppModal.Body>
    </div>
  );
};

export default JobShowModeModal;
