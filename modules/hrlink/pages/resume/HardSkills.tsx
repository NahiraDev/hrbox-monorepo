import { Edit, Trash } from 'iconsax-react';
import { AppButton, AppPagination } from '@hrbox/uikit/components';
import { AppDoubleLineProgress } from '@core/sections';
import { useEffect } from 'react';
import { Card } from '@heroui/react';

import { GeneralInformation, UserLocation } from '@module/hrlink/features/common';

import { useLazyFetchHardSkillsQuery } from '@module/hrlink/features/resume/apis';

const HardSkills = () => {
  const [fetchSkills, { data }] = useLazyFetchHardSkillsQuery();

  useEffect(() => {
    fetchSkills({});
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      <div className="col-span-3">
        <div className="flex flex-col h-full justify-between">
          <div className="grid grid-cols-3 gap-3">
            {data &&
              data.data.map((skill: any, index: number) => (
                <Card
                  key={index}
                  className="rounded-xl shadow-theme-sm p-4"
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
                </Card>
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
  );
};

export default HardSkills;
