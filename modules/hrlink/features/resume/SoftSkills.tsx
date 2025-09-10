import { Add, ArrowLeft2, ArrowRight2, Edit, LampCharge, ReceiveSquare, Star, Trash } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { AppButton, AppPagination, AppSearchInput } from 'core/components';
import { GeneralInformation, UserLocation } from '@module/hrlink/features/common';
import AppDoubleLineProgress from 'core/sections/AppDoubleLineProgress';
import { SoftSkillsIcon } from '@module/hrlink/icons/SoftSkillsIcon';
import { useLazyFetchSoftSkillsQuery } from '@module/hrlink/features/resume/apis/skills';

export const SoftSkills = () => {
  const [fetchSkills, { data }] = useLazyFetchSoftSkillsQuery();
  const navigate = useNavigate();

  const handleNavigateToHardSkills = () => {
    navigate('/resume/hard-skills');
  };

  return (
    <div className="mx-auto w-full">
      <div className="flex justify-between">
        <div className="flex">
          <button
            className="flex items-center gap-2 rounded-4 bg-transparent px-3 py-1.5 w-fit mb-6"
            onClick={handleNavigateToHardSkills}
          >
            <LampCharge className="text-secondary-400 dark:text-secondary-0" size="22" />
            <span className="text-secondary-400 dark:text-secondary-0 text-xl font-normal">Hard Skills</span>
          </button>
          <button className="flex items-center gap-2 rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 px-3 py-1.5 w-fit mb-6">
            <Star className="text-white" size="22" />
            <span className="text-white text-xl font-normal">Soft Skills</span>
          </button>
        </div>
        <div className="flex gap-2">
          <AppButton
            props={{
              isIconOnly: true,
              color: 'white',
              size: 'md',
              radius: 'sm',
              onPress: () => handleNavigateToHardSkills,
              content: <ArrowLeft2 className="text-secondary-1000" size="24" />,
            }}
          />
          <AppButton
            props={{
              isIconOnly: true,
              color: 'white',
              size: 'md',
              radius: 'sm',
              content: <ArrowRight2 className="text-secondary-1000" size="24" />,
            }}
          />

          <div className="flex items-center gap-2">
            <AppSearchInput placeholder="Education" onSearch={(query) => fetchSkills({ query })} />
          </div>
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'sm',
              content: (
                <>
                  <Add className="text-secondary-1000" size="16" />
                  <span className="text-secondary-1000 font-semibold text-base">Add New One</span>
                </>
              ),
            }}
          />
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'sm',
              content: (
                <>
                  <ReceiveSquare className="text-secondary-1000" size="16" />
                  <span className="text-secondary-1000 font-semibold text-base">Download Resume</span>
                </>
              ),
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 h-[calc(100%-64px)]">
        <div className="col-span-3">
          <div className="flex flex-col h-full justify-between">
            <div className="grid grid-cols-3 gap-3">
              {data &&
                data.data.map((skill: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-5 shadow-shadow-light-tight/1 p-4 bg-[linear-gradient(0deg,rgba(255,255,255,0.86),rgba(255,255,255,0.86)),url('<path-to-image>')] bg-[length:cover] bg-no-repeat bg-[position:50%]"
                    style={{
                      // backgroundImage: `url(${SoftSkillCardBg})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between">
                          <div className="flex gap-1.5">
                            <SoftSkillsIcon />
                            <span className="text-base font-semibold text-secondary-1000">{skill.name}</span>
                          </div>
                          <div className="flex gap-1">
                            <AppButton
                              props={{
                                color: 'white',
                                size: 'md',
                                radius: 'sm',
                                content: <Edit className="text-secondary-1000 dark:text-white" size="14" />,
                              }}
                            />
                            <AppButton
                              props={{
                                color: 'white',
                                size: 'md',
                                radius: 'sm',
                                content: <Trash className="text-secondary-1000 dark:text-white" size="14" />,
                              }}
                            />
                          </div>
                        </div>
                        <div className="bg-[#f6f6f666] h-[1px] w-full shadow-shadow-light-tight/1" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-4">
                              <span className="text-secondary-1000 dark:text-white text-sm font-light">Level:</span>
                              <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                                {skill.level}
                              </span>
                            </div>
                            <div className="flex gap-4">
                              <span className="text-secondary-1000 dark:text-white text-sm font-light">Grad:</span>
                              <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                                {skill.grade}%
                              </span>
                            </div>
                          </div>
                          <div>
                            <AppDoubleLineProgress value={skill.grade} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center">
              <AppPagination total={100} />
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-3">
          <GeneralInformation />
          <UserLocation />
        </div>
      </div>
    </div>
  );
};
