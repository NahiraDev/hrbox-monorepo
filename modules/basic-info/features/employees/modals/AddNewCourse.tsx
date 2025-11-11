// @module/basic-info/pages/employees/modals/AddNewCourse.tsx
import React, { useState } from 'react';
import { AppButton, AppInput, AppDatePicker } from '@hrbox/uikit/components';

interface AddNewCourseProps {
  onClose: () => void;
}

export default function AddNewCourse({ onClose }: AddNewCourseProps) {
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    duration: '',
    completionDate: '',
    certificate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Course:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AppInput
        label="Course Title *"
        placeholder="e.g., Advanced React"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <AppInput
        label="Provider *"
        placeholder="e.g., Udemy, Coursera"
        value={formData.provider}
        onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
        required
      />

      <AppInput
        label="Duration"
        placeholder="e.g., 20 hours"
        value={formData.duration}
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
      />

      <AppDatePicker
        label="Completion Date"
        value={formData.completionDate}
        onChange={(date) => setFormData({ ...formData, completionDate: date })}
      />

      <AppInput
        label="Certificate Number"
        placeholder="e.g., CERT-12345"
        value={formData.certificate}
        onChange={(e) => setFormData({ ...formData, certificate: e.target.value })}
      />

      <div className="flex justify-end gap-3 pt-6">
        <AppButton props={{ variant: 'light', type: 'button', onPress: onClose }}>
          Cancel
        </AppButton>
        <AppButton props={{ color: 'primary', type: 'submit' }}>
          Add Course
        </AppButton>
      </div>
    </form>
  );
}
