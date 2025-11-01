import { skills as mockSkills } from '@module/basic-info/app/mock';
import { Avatar, Card } from '@heroui/react';
import { AppButton, AppDeleteModal } from '@core/components';
import { LampCharge, Trash } from 'iconsax-react';
import { useModalContext } from '@core/context';
import { AppDoubleLineProgress } from '@core/sections';
import { useState } from 'react';
import { BasicInfoLayout } from '@module/basic-info/features/common';

const Education = () => {
  const { openModal } = useModalContext();
  const [currentSkills, setCurrentSkills] = useState(mockSkills);

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
      <Trash className="text-white" />
    );
  };

  const handleDeleteConfirm = (index: number) => {
    setCurrentSkills((prev) => {
      const newSkills = [...prev];
      newSkills.splice(index, 1);
      return newSkills;
    });
  };

  const SkillCard = (skill: any, index: number) => (
    <Card
      key={index}
      className="p-3 flex gap-1.5 shadow-theme-sm bg-white border-2 border-transparent hover:border-primary-400 hover:!bg-[#D6F2FF] transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center justify-between border-b-2 border-gray-200 p-1.5">
        <div className="flex items-center gap-2">
          <Avatar radius="sm" size="sm" />
          <span className="!text-lg !font-medium">{skill.skill}</span>
        </div>
        <div>
          <AppButton
            props={{
              size: 'xs',
              radius: 'sm',
              variant: 'light',
              isIconOnly: true,
              onPress: () => handleDeleteClick(index),
              content: <Trash className="text-secondary-1000 group-hover:text-white" />,
              className: 'p-2 hover:!bg-red-500 transition-all duration-200',
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col gap-1.5 font-light text-sm">
          <div className="flex items-center gap-1">
            <span className="text-secondary-600 !font-light">Level:</span>
            <span>{skill.Level}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-secondary-600 !font-light">Grad:</span>
            <span>{skill.Grad}</span>
          </div>
        </div>
        <div className="w-24">
          <AppDoubleLineProgress value={80} size={65}/>
        </div>
      </div>
    </Card>
  );

  return (
    <BasicInfoLayout
      content={
        <div className="flex p-7 gap-10 ">
          {/* Hard Skills Section */}
          <div className="flex flex-col w-full gap-3 overflow-y-auto max-h-[520px]">
            <div className="flex gap-1 items-center ">
              <LampCharge size={24 }/>
              <span className="text-secondary-1000 !font-semibold !text-[20px]">Hard Skills</span>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              {currentSkills.map((skill: any, index: number) => SkillCard(skill, index))}
            </div>
          </div>

          {/* Soft Skills Section */}
          <div className="flex flex-col gap-3 w-full overflow-y-auto max-h-[520px] ">
            <div className="flex gap-1  items-center ">
              <LampCharge size={24} />
              <span className="text-secondary-1000 !font-semibold !text-[20px]">Soft Skills</span>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              {currentSkills.map((skill: any, index: number) => SkillCard(skill, index))}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Education;
