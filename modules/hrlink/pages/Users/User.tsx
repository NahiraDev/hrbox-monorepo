import { useEffect, useState } from 'react';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { Edit, Trash, Eye } from 'iconsax-react';
import * as Yup from 'yup';

import { useModalContext, ModalType, ModalSize } from '@hrbox/core/providers/ModalContext';
import { FormProvider, FormField, useFormContext, FormMode } from '@hrbox/core/components/forms';
import { AppButton } from '~/hrbox-monorepo/UIKit/components';
import { AppInput, AppAutoComplete, AppDatePicker, AppTextArea } from '@hrbox/core/components/forms';

// ============================================
// Types & Schema
// ============================================

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  joinDate: string;
  bio: string;
}

// Validation Schema
const userSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'نام باید حداقل 2 کاراکتر باشد')
    .required('نام ضروری است'),
  lastName: Yup.string()
    .min(2, 'نام خانوادگی باید حداقل 2 کاراکتر باشد')
    .required('نام خانوادگی ضروری است'),
  email: Yup.string()
    .email('ایمیل نامعتبر')
    .required('ایمیل ضروری است'),
  department: Yup.string().required('دپارتمان ضروری است'),
  joinDate: Yup.string().required('تاریخ شروع ضروری است'),
  bio: Yup.string().max(500, 'بیوگرافی نباید بیش از 500 کاراکتر باشد'),
});

// Departments
const departments = [
  { id: '1', name: 'فناوری اطلاعات' },
  { id: '2', name: 'منابع انسانی' },
  { id: '3', name: 'مالی' },
  { id: '4', name: 'فروش' },
];

// ============================================
// Form Component
// ============================================

const UserForm = ({ userId }: { userId?: string }) => {
  const { values, errors, touched, handleSubmit, isSubmitting, formMode, isDirty, formError } =
    useFormContext<User>();
  const { closeModal } = useModalContext();

  const handleFormSubmit = async () => {
    try {
      await handleSubmit();
      closeModal(formMode === FormMode.CREATE ? ModalType.CREATE : ModalType.EDIT, 'user-form');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Error Alert */}
      {formError && (
        <div className="p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger rounded-lg">
          <p className="text-danger text-sm font-medium">{formError}</p>
        </div>
      )}

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <FormField
          name="firstName"
          label="نام"
          required
          placeholder="نام خود را وارد کنید"
        />

        {/* Last Name */}
        <FormField
          name="lastName"
          label="نام خانوادگی"
          required
          placeholder="نام خانوادگی خود را وارد کنید"
        />

        {/* Email */}
        <FormField
          name="email"
          label="ایمیل"
          type="email"
          required
          placeholder="ایمیل@example.com"
          className="md:col-span-2"
        />

        {/* Department (Select) */}
        <FormField
          name="department"
          label="دپارتمان"
          required
          component={AppAutoComplete}
          displayKey="name"
          valueKey="id"
          data={departments}
          placeholder="دپارتمان را انتخاب کنید"
        />

        {/* Join Date (DatePicker) */}
        <FormField
          name="joinDate"
          label="تاریخ شروع کار"
          required
          component={AppDatePicker}
          placeholder="تاریخ را انتخاب کنید"
        />
      </div>

      {/* Bio (Textarea) */}
      <FormField
        name="bio"
        label="بیوگرافی"
        component={AppTextArea}
        placeholder="بیوگرافی خود را بنویسید..."
        size="md"
      />

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <AppButton
          props={{
            content: 'لغو',
            variant: 'light',
            color: 'default',
            onPress: () => closeModal(
              formMode === FormMode.CREATE ? ModalType.CREATE : ModalType.EDIT,
              'user-form'
            ),
          }}
        />
        <AppButton
          props={{
            content: formMode === FormMode.VIEW ? 'بستن' : isSubmitting ? 'درحال ذخیره...' : 'ذخیره',
            color: 'primary',
            isSubmitting: isSubmitting,
            disabled: formMode === FormMode.VIEW || !isDirty || isSubmitting,
            onPress: formMode === FormMode.VIEW ? () => closeModal(ModalType.VIEW, 'user-form') : handleFormSubmit,
          }}
        />
      </div>
    </div>
  );
};
