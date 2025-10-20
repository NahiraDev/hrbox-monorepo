// @module/basic-info/features/employees/modals/AddNewSkill.tsx
import React, { useState } from 'react';
import { AppButton, AppInput } from '@core/components';

interface AddNewSkillProps {
  onClose: () => void;
}

export default function AddNewSkill({ onClose }: AddNewSkillProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: '',
    years: ''
  });

  const categories = ['Technical', 'Soft Skills', 'Language', 'Tools'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Skill:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AppInput
        label="Skill Name *"
        placeholder="e.g., React.js"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

        <AppInput
        label="Years of Experience"
        placeholder="e.g., 3"
        type="number"
        min="0"
        value={formData.years}
        onChange={(e) => setFormData({ ...formData, years: e.target.value })}
      />

      <div className="flex justify-end gap-3 pt-6">
        <AppButton props={{ variant: 'light', type: 'button', onPress: onClose }}>
          Cancel
        </AppButton>
        <AppButton props={{ color: 'primary', type: 'submit' }}>
          Add Skill
        </AppButton>
      </div>
    </form>
  );
}
