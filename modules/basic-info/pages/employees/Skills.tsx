import { skills as mockSkills } from "@module/basic-info/app/mock";
import { Avatar, Card } from "@heroui/react";
import { AppButton } from "@hrbox/uikit/components";
import { LampCharge, Trash } from "iconsax-reactjs";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
// import { AppDoubleLineProgress } from "@hrbox/uikit/sections/AppDoubleLineProgress";
import { useState } from "react";
import { BasicInfoLayout } from "@hrbox/modules/basic-info/components";
import {useModal} from "@hrbox/core/hooks";

const Education = () => {
  const modal = useModal();
  const [currentSkills, setCurrentSkills] = useState(mockSkills);

  const handleDeleteClick = (index: number) => {
    // openModal(
    //   "delete",
    //   "",
    //   <AppDeleteModal
    //     onConfirm={() => handleDeleteConfirm(index)}
    //     onCancel={() => console.log("Cancelled")}
    //   />,
    //   undefined,
    //   "sm",
    //   "Do you want to remove it?",
    //   <Trash className="text-white" />,
    // );
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
      isPressable
      key={index}
      className="p-3 flex gap-1.5 shadow-sm hover:!bg-[#D6F2FF] hover:cursor-pointer bg-white">
      <div className="flex items-center justify-between border-b-2 border-gray-200 p-1.5 ">
        <div className="flex items-center gap-1.5 px-1.5">
          <Avatar radius="sm" size="sm" color='primary' />
          <span className="text-[16px] font-semibold text-secondary-1000">{skill.skill}</span>
        </div>
        <div>
          <AppButton
              size="xs"
              radius="sm"
              variant="light"
              isIconOnly={true}
              onPress={() => handleDeleteClick(index)}
              content={
                <Trash className="text-secondary-1000 group-hover:text-white"size={16} />
              }
              className="p-2 hover:!bg-red-500 transition-all duration-200"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-1.5 gap-[49px]">
        <div className="flex flex-col gap-2 font-light">
          <div className="flex items-center gap-4">
            <span className='text-sm text-[#353535] font-light'>Level:</span>
            <span className='text-sm text-[#353535]'>{skill.Level}</span>
          </div>
          <div  className="flex items-center gap-4">
            <span className='text-sm text-[#353535] font-light'>Grad:</span>
            <span className='text-sm text-[#353535]'>{skill.Grad}</span>
          </div>
        </div>
        <div>
          {/*<AppDoubleLineProgress value={80} />*/}
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
              <div className="flex gap-1 items-center">
                <LampCharge size={24} />
                <span className="text-secondary-1000 text-xl font-semibold">Hard Skills</span>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                {currentSkills.map((skill: any, index: number) =>
                  SkillCard(skill, index),
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-1 items-center">
                <LampCharge size={24} />
                <span className="text-secondary-1000 text-xl font-semibold">Soft Skills</span>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                {/* Use currentSkills state for mapping */}
                {currentSkills.map((skill: any, index: number) =>
                  SkillCard(skill, index),
                )}
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Education;
