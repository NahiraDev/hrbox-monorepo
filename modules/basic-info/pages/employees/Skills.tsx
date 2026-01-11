import { skills as mockSkills } from "@module/basic-info/app/mock";
import { Avatar, Card } from "@heroui/react";
import { AppButton } from "@hrbox/uikit/components";
import { LampCharge, Trash } from "iconsax-reactjs";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { useState } from "react";
import { BasicInfoLayout } from "@hrbox/modules/basic-info/components";
import {useModal} from "@hrbox/core/hooks";
import { AppDoubleLineProgress } from "@hrbox/uikit/components/AppDoubleLineProgress";

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

  const cardContainerClass1 = `grid h-full grid-cols-2 gap-3  overflow-y-scroll  max-h-[calc(63.5vh)] mt-4 mx-2.5 pr-3
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  [&::-webkit-scrollbar-thumb]:hover:bg-blue-800`;


  const SkillCard = (skill: any, index: number) => (
    <Card
      isPressable
      key={index}
      className="p-3 h-full flex gap-1.5 shadow-sm hover:!bg-[#D6F2FF] hover:cursor-pointer bg-white">
      <div className="flex items-center justify-between border-b-2 border-neutral-100 py-1.5 px-0.5 ">
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
      <div className="flex items-center justify-between mt-1.5">
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
        <div className="">
          <AppDoubleLineProgress value={80} />
        </div>
      </div>
    </Card>
  );

  return (
    <>
      <BasicInfoLayout
        content={
          <div className="flex ">
            <div className="flex flex-col w-full mt-4  ">
              <div className="flex gap-1 items-center ml-2">
                <LampCharge size={24} />
                <span className="text-secondary-1000 text-xl font-semibold">Hard Skills</span>
              </div>
              <div className={cardContainerClass1}>
                {currentSkills.map((skill: any, index: number) =>
                  SkillCard(skill, index),
                )}
              </div>
            </div>

            <div className="flex flex-col  w-full  mt-4">
              <div className="flex gap-1 items-center ml-2">
                <LampCharge size={24} />
                <span className="text-secondary-1000 text-xl font-semibold">Soft Skills</span>
              </div>
              <div className={cardContainerClass1}>
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
