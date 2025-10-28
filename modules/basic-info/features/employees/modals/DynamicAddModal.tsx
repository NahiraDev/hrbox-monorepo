// @module/basic-info/features/employees/modals/DynamicAddModal.tsx
import AddNewJob from './AddNewJob';
import AddNewEducation from './AddNewEducation';
import AddNewSkill from './AddNewSkill';
import AddNewCourse from './AddNewCourse';
import AddNewAchievement from './AddNewAchievement';

interface DynamicAddModalProps {
  tab: string;
  onClose: () => void;
}

export const DynamicAddModal = ({ tab, onClose }: DynamicAddModalProps) => {
  const renderModalContent = () => {
    switch (tab) {
      case 'jobs':
        return <AddNewJob onClose={onClose} />;
      case 'education':
        return <AddNewEducation onClose={onClose} />;
      case 'skills':
        return <AddNewSkill onClose={onClose} />;
      case 'courses':
        return <AddNewCourse onClose={onClose} />;
      case 'achievements':
        return <AddNewAchievement onClose={onClose} />;
      default:
        return <AddNewCourse onClose={onClose} />;
    }
  };

  return (
    <div className="p-6 max-w-md">
      {/* ✅ عنوان حذف شد */}
      {renderModalContent()}
    </div>
  );
};
