import { Edit, Trash } from 'iconsax-react';
import { AppButton, AppPagination } from '@core/components';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { useEffect } from 'react';

import { GeneralInformation, UserLocation } from '@module/hrlink/features/common';
import { AppDoubleLineProgress } from '@core/sections';
import { SoftSkillsIcon } from '@module/hrlink/icons';

import { useLazyFetchSoftSkillsQuery } from './apis';

const SoftSkills = () => {
  const [fetchSkills, { data }] = useLazyFetchSoftSkillsQuery();

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
                <Card key={index} className="rounded-lg shadow-theme-sm p-4">
                  <CardHeader className="flex flex-col gap-1.5">
                    <div className="flex justify-between">
                      <div className="flex gap-1.5">
                        <SoftSkillsIcon />
                        <span className="font-semibold text-secondary-1000">{skill.name}</span>
                      </div>
                      <div className="flex gap-1">
                        <AppButton
                          props={{
                            color: 'white',
                            size: 'md',
                            radius: 'sm',
                            content: <Edit className="text-secondary-1000" size="14" />,
                          }}
                        />
                        <AppButton
                          props={{
                            color: 'white',
                            size: 'md',
                            radius: 'sm',
                            content: <Trash className="text-secondary-1000" size="14" />,
                          }}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                          <span className="text-secondary-1000 text-sm font-light">Level:</span>
                          <span className="text-secondary-1000 text-sm font-normal">{skill.level}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-secondary-1000 text-sm font-light">Grad:</span>
                          <span className="text-secondary-1000 text-sm font-normal">{skill.grade}%</span>
                        </div>
                      </div>
                      <div>
                        <AppDoubleLineProgress value={skill.grade} />
                      </div>
                    </div>
                  </CardBody>
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

export default SoftSkills;
