import JobModal from './JobModal';
import EducationModal from './EducationModal';
import Skills from './Skills';
// import AchievementsModal from './AchievementsModal';

interface DynamicAddModalProps {
  tab: string;
  onClose: () => void;
}

export const DynamicAddModal = ({ tab, onClose }: DynamicAddModalProps) => {
  const renderModalContent = () => {
    switch (tab) {
      case 'jobs':
        return <JobModal />;
      case 'education':
        return <Education />;
      case 'skills':
        return <Skills />;
      case 'courses':
        return <CourseModal />;
      case 'achievements':
        return <AchievementsModal />;
      default:
        return <CourseModal />;
    }
  };

  return (
    <div className="p-6 max-w-md">
      {renderModalContent()}
    </div>
  );
};
