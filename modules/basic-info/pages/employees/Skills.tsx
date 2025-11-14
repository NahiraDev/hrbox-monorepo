import { skills as mockSkills } from '@module/basic-info/app/mock';
import { Avatar, Card } from '@heroui/react';
import { AppButton, AppDeleteModal } from '@hrbox/uikit/components';
import { LampCharge, Trash } from 'iconsax-reactjs';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import { AppDoubleLineProgress } from '@hrbox/uikit/sections';
import { useState } from 'react'; // Import useState

import { BasicInfoLayout } from '@hrbox-monorepo/modules/basic-info/components';

const Education = () => {
  const { openModal } = useModalContext();
  // State for skills data, initialized with mockSkills
  const [currentSkills, setCurrentSkills] = useState(mockSkills);

  // Function to open the delete confirmation modal
  const handleDeleteClick = (index: number) => {
    openModal(
      'delete',
      '',
      <AppDeleteModal
        onConfirm={() => handleDeleteConfirm(index)}
        onCancel={() => console.log('Cancelled')}
      />,
      undefined,
      'sm',
      'Do you want to remove it?',
      <Trash className='text-white'/>
    );
  };

  // Function to handle the actual deletion and update state
  const handleDeleteConfirm = (index: number) => {
    setCurrentSkills(prev => {
      const newSkills = [...prev];
      // Note: This splice works because the mockSkills array is duplicated in the layout,
      // but in a real app, you would likely have two different state arrays or keys for
      // 'Hard Skills' and 'Soft Skills' to manage them separately.
      newSkills.splice(index, 1);
      return newSkills;
    });
  };


  const SkillCard = (skill: any, index: number) => (
    <Card key={index} className="p-3 flex gap-1.5 shdow-theme-sm bg-white">
      <div className="flex items-center justify-between border-b-2 border-gray-200 p-1.5 ">
        <div className="flex items-center gap-2">
          <Avatar radius="sm" size="sm" />
          <span className="text-lg">{skill.skill}</span>
        </div>
        <div>
          <AppButton
            props={{
              size: 'xs',
              radius: 'sm',
              variant: 'light',
              isIconOnly: true,
              // Call handleDeleteClick with the item's index
              onPress: () => handleDeleteClick(index),
              content: <Trash className="text-secondary-1000 group-hover:text-white" />,
              className: 'p-2 hover:!bg-red-500 transition-all duration-200',
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between ">
        <div className="flex flex-col gap-2 font-light">
          <div className="flex items-center">
            <span>Level:</span>
            <span>{skill.Level}</span>
          </div>
          <div>
            <span>Grad:</span>
            <span>{skill.Grad}</span>
          </div>
        </div>
        <div>
          <AppDoubleLineProgress value={80} />
        </div>
      </div>
    </Card>
  );

  return (
    <>
      <BasicInfoLayout
        content={
          <div className="flex p-7 gap-10">
            {/* Hard Skills Section */}
            <div className="flex flex-col w-full gap-3  ">
              <div className="flex gap-1 items-center text-[20px] font-semibold">
                <LampCharge />
                <span className="text-secondary-1000">Hard Skills</span>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                {/* Use currentSkills state for mapping */}
                {currentSkills.map((skill: any, index: number) => SkillCard(skill, index))}
              </div>
            </div>

            {/* Soft Skills Section (assuming it uses the same data for now) */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-1 text-[20px] items-center font-semibold">
                <LampCharge />
                <span>Soft Skills</span> {/* Changed text for clarity */}
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                {/* Use currentSkills state for mapping */}
                {currentSkills.map((skill: any, index: number) => SkillCard(skill, index))}
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Education;
