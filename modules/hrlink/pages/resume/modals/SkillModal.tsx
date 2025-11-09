import { AppButton, AppModal } from '@hrbox/uikit/components';
import { ArrowDown, Personalcard } from 'iconsax-react';
import { useState } from 'react';

export const SkillModal = () => {
  const [isOpenSkills, setIsOpenSkills] = useState<boolean>(false);
  const [isOpenField, setIsOpenField] = useState<boolean>(false);
  const [isOpenIndustrial, setIsOpenIndustrial] = useState<boolean>(false);
  const toggleSkills = () => setIsOpenSkills((prev) => !prev);
  const toggleIndustrial = () => setIsOpenIndustrial((prev) => !prev);
  const toggleField = () => setIsOpenField((prev) => !prev);
  const handleSkillSelect = (skill: any) => {
    const getParentIdAndTypes = {
      type: '2',
      parentId: skill.Id,
    };

    setSelectedSkills([...selectedSkills, skill]);
  };

  const handleIndustrialSelect = (industrial: any) => {
    setSelectedIndustrial([...selectedIndustrial, industrial]);
  };

  const availableFields = selectedIndustrial;

  return (
    <AppModal icon={<Personalcard className="text-white" size="22" />} size="3xl" title="Add New Soft Skills">
      <AppModal.Body>
        {/*<div className="flex flex-col gap-1">*/}
        {/*  <span className="text-secondary-1000 font-inter">Skills*</span>*/}
        {/*  <button*/}
        {/*    className="rounded-5 border-1 bg-white border-secondary-0 p-2.5 flex justify-between items-center transition-all duration-300 overflow-hidden w-full"*/}
        {/*    style={{*/}
        {/*      height: isOpenSkills ? 300 : 50,*/}
        {/*    }}*/}
        {/*    onClick={toggleSkills}*/}
        {/*  >*/}
        {/*    <div className="flex gap-4 flex-wrap">*/}
        {/*      {skillsData.data.slice(0, isOpenSkills ? undefined : 5).map((skill: any) => {*/}
        {/*        const isSelected = selectedSkills.includes(skill?.Id);*/}

        {/*        return (*/}
        {/*          <Chip*/}
        {/*            key={skill?.Id}*/}
        {/*            className={`cursor-pointer border-1 border-transparent transition hover:border-secondary-100 ${*/}
        {/*              isSelected ? '!bg-secondary-100 text-secondary-400' : '!bg-[#dee1eb66] text-secondary-700'*/}
        {/*            }`}*/}
        {/*            onClick={(e) => {*/}
        {/*              e.stopPropagation();*/}
        {/*              handleSkillSelect(skill);*/}
        {/*            }}*/}
        {/*          >*/}
        {/*            {skill?.Name}*/}
        {/*          </Chip>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </div>*/}
        {/*    <div className="flex justify-end mt-2">*/}
        {/*      <div className={`w-5 h-5 transition-transform duration-300 ${isOpenSkills ? 'rotate-180' : 'rotate-0'}`}>*/}
        {/*        <ArrowDown />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </button>*/}
        {/*</div>*/}

        {/*<div className="flex flex-col gap-1">*/}
        {/*  <span className="text-secondary-1000 font-inter">Industrial*</span>*/}
        {/*  <button*/}
        {/*    className="rounded-5 border-1 bg-white border-secondary-0 p-2.5 flex justify-between items-center transition-all duration-300 overflow-hidden w-full"*/}
        {/*    disabled={selectedSkills.length === 0}*/}
        {/*    style={{*/}
        {/*      height: isOpenIndustrial ? 300 : 50,*/}
        {/*    }}*/}
        {/*    onClick={toggleIndustrial}*/}
        {/*  >*/}
        {/*    <div className="flex gap-4 flex-wrap">*/}
        {/*      {skillsData?.industrial.slice(0, isOpenIndustrial ? undefined : 5).map((industrial: any) => {*/}
        {/*        const isSelected = selectedIndustrial.includes(industrial?.Id);*/}

        {/*        return (*/}
        {/*          <Chip*/}
        {/*            key={industrial?.Id}*/}
        {/*            className={`cursor-pointer border-1 border-transparent transition hover:border-secondary-100 ${*/}
        {/*              isSelected ? '!bg-secondary-100 text-secondary-400' : '!bg-[#dee1e866] text-secondary-700'*/}
        {/*            }`}*/}
        {/*            onClick={(e) => {*/}
        {/*              e.stopPropagation();*/}
        {/*              handleIndustrialSelect(industrial);*/}
        {/*            }}*/}
        {/*          >*/}
        {/*            {industrial?.Name}*/}
        {/*          </Chip>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </div>*/}
        {/*    <div className="flex justify-end mt-2">*/}
        {/*      <div*/}
        {/*        className={`w-5 h-5 transition-transform duration-300 ${isOpenIndustrial ? 'rotate-180' : 'rotate-0'}`}*/}
        {/*      >*/}
        {/*        <ArrowDown />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </button>*/}
        {/*</div>*/}

        {/*<div className="flex flex-col gap-1">*/}
        {/*  <span className="text-secondary-1000 font-inter">Field*</span>*/}
        {/*  <button*/}
        {/*    className="rounded-5 border-1 bg-white border-secondary-0 p-2.5 flex justify-between items-center transition-all duration-300 overflow-hidden w-full"*/}
        {/*    disabled={selectedIndustrial.length === 0}*/}
        {/*    style={{*/}
        {/*      height: isOpenField ? 300 : 50,*/}
        {/*    }}*/}
        {/*    onClick={toggleField}*/}
        {/*  >*/}
        {/*    <div className="flex gap-4 flex-wrap">*/}
        {/*      {availableFields.slice(0, isOpenField ? undefined : 5).map((field: any) => {*/}
        {/*        const isSelected = selectedFields.includes(field);*/}

        {/*        return (*/}
        {/*          <Chip*/}
        {/*            key={field?.Name}*/}
        {/*            className={`cursor-pointer border-1 border-transparent transition hover:border-secondary-100 ${*/}
        {/*              isSelected ? '!bg-secondary-100 text-secondary-400' : '!bg-[#dee1eb66] text-secondary-700'*/}
        {/*            }`}*/}
        {/*          >*/}
        {/*            {field?.Name}*/}
        {/*          </Chip>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </div>*/}
        {/*    <div className="flex justify-end mt-2">*/}
        {/*      <div className={`w-5 h-5 transition-transform duration-300 ${isOpenField ? 'rotate-180' : 'rotate-0'}`}>*/}
        {/*        <ArrowDown />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </button>*/}
        {/*</div>*/}
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex gap-2">
          <AppButton
            props={{
              size: 'md',
              variant: 'light',
              color: 'default',
              content: 'Close',
            }}
          />
          <AppButton
            props={{
              size: 'md',
              variant: 'light',
              color: 'secondary',
              type: 'submit',
              content: 'Submit',
            }}
          />
        </div>
      </AppModal.Footer>
    </AppModal>
  )
}
