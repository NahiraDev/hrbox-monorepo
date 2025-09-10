import { Button } from '@heroui/button';
import { Add, ArrowLeft2, ArrowRight2, Edit, LampCharge, ReceiveSquare, Trash } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { AppButton, AppPagination, AppSearchInput } from 'core/components';
import AppDoubleLineProgress from 'core/sections/AppDoubleLineProgress';

import { GeneralInformation, UserLocation } from '../common';

import { useLazyFetchHardSkillsQuery } from './apis';

export const HardSkills = () => {
  const [fetchSkills, { data }] = useLazyFetchHardSkillsQuery();
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col gap-[14px] h-full">
        <div className="flex justify-between">
          <div className="flex">
            <Button className="flex items-center gap-2 !rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 !px-3 !py-1.5 w-fit">
              <LampCharge className="text-white" size="22" />
              <span className="text-white text-xl font-normal">Hard Skills</span>
            </Button>
            <AppButton
              props={{
                isIconOnly: true,
                color: 'white',
                size: 'md',
                radius: 'sm',
                onPress: () => navigate('/resume/soft-skills'),
                content: <ArrowLeft2 className="text-secondary-1000" size="24" />,
              }}
            />
            <AppButton
              props={{
                isIconOnly: true,
                color: 'white',
                size: 'md',
                radius: 'sm',
                onPress: () => navigate('/resume/academic-history'),
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
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-3">
            <div className="flex flex-col h-full justify-between">
              <div className="grid grid-cols-3 gap-3">
                {data &&
                  data.data.map((skill: any, index: number) => (
                    <div
                      key={index}
                      className="rounded-5 shadow-shadow-light-tight/1 p-4"
                      style={{
                        backgroundImage: `url(${skill.background})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                      }}
                    >
                      <div className="flex flex-col gap-2.5">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between">
                            <div className="flex gap-1.5">
                              <img alt="" className="rounded-2" src={skill.avatar} />
                              <span className="text-base font-semibold text-secondary-1000">{skill.Name}</span>
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
                            <div className="flex flex-col gap-2 justify-center">
                              <div className="flex gap-4">
                                <span className="text-secondary-1000 dark:text-white text-sm font-light">Level:</span>
                                <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                                  {skill.Level}
                                </span>
                              </div>
                              <div className="flex gap-4">
                                <span className="text-secondary-1000 dark:text-white text-sm font-light">Grad:</span>
                                <span className="text-secondary-1000 dark:text-white text-sm font-normal">
                                  {skill.UserPersent}%
                                </span>
                              </div>
                            </div>
                            <div>
                              <AppDoubleLineProgress value={skill.UserPersent} />
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
    </div>
  );
};
