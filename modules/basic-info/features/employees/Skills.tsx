import { skills } from 'mock';
import { Avatar, Card } from '@heroui/react';
import { AppButton, AppDeleteModal } from 'core/components';
import { LampCharge, Trash } from 'iconsax-react';
import { useModalContext } from 'core/context';
import { AppDoubleLineProgress } from 'core/sections';

import { BasicInfoLayout } from '../../features/common';

const Education = () => {
  const { openModal } = useModalContext();

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
              onPress: () => openModal('delete'),
              content: <Trash className="text-secondary-1000 group-hover:text-white" />,
              className: 'hover:!bg-red-500 transition-all duration-200',
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
            <div className="flex flex-col w-full gap-3  ">
              <div className="flex gap-1 items-center text-[20px] font-semibold">
                <LampCharge />
                <span className="text-secondary-1000">Hard Skills</span>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                {skills.map((skill: any, index: number) => SkillCard(skill, index))}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-1 text-[20px] items-center font-semibold">
                <LampCharge />
                <span>Hard Skills</span>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                {skills.map((skill: any, index: number) => SkillCard(skill, index))}
              </div>
            </div>
          </div>
        }
      />
      <AppDeleteModal />
    </>
  );
};

export default Education;
