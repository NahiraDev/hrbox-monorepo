import { Add, ArrowLeft2, ArrowRight2, Edit, ReceiveSquare, Trash } from 'iconsax-react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { AppButton, AppPagination, AppSearchInput } from 'core/components';
import { useNavigate } from 'react-router-dom';

import { GeneralInformation, UserLocation } from '../common';
import { CupStarIcon } from '../../icons';

import { useLazyFetchAwardsQuery } from './apis';

export const Awards = () => {
  const [fetchAwards, { data }] = useLazyFetchAwardsQuery();
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full">
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex items-center gap-2 rounded-4 bg-secondary-400 shadow-light-tight-1 px-3 py-1.5 w-fit mb-6">
            <CupStarIcon color="#fff" />
            <span className="text-white text-xl font-normal">Achievements and accolades</span>
          </div>
        </div>
        <div className="flex gap-2">
          <AppButton
            props={{
              isIconOnly: true,
              color: 'white',
              size: 'md',
              radius: 'sm',
              onPress: () => navigate('/resume/hard-skills'),
              content: <ArrowLeft2 className="text-secondary-1000" size="24" />,
            }}
          />
          <AppButton
            props={{
              isIconOnly: true,
              color: 'white',
              size: 'md',
              radius: 'sm',
              onPress: () => navigate('/resume/courses'),
              content: <ArrowRight2 className="text-secondary-1000" size="24" />,
            }}
          />
          <div className="flex items-center gap-2">
            <AppSearchInput placeholder="Education" onSearch={(query) => fetchAwards({ query })} />
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
            <div className="grid grid-cols-2 gap-3">
              {data && data.map((achievement: any, index: number) => (
                <Card key={index} className="rounded-5 shadow-light-tight-1 p-4 bg-white flex flex-col gap-2.5">
                  <CardHeader className="flex flex-col gap-1.5 border-b-1 border-neutral-100 pb-1.5">
                    <div className="flex justify-between">
                      <div className="flex gap-1.5">
                        <CupStarIcon color="#04070e" />
                        <span className="text-base font-semibold text-secondary-1000">{achievement.name}</span>
                      </div>
                      <div className="flex gap-1">
                        <AppButton
                          props={{
                            isIconOnly: true,
                            color: 'white',
                            size: 'md',
                            radius: 'sm',
                            content: <Edit className="text-secondary-1000" size="14" />,
                          }}
                        />
                        <AppButton
                          props={{
                            isIconOnly: true,
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
                    <div className="">
                      <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-4">
                            <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-light">title:</span>
                            <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-normal">
                              {achievement.Name}
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-light">Date:</span>
                            <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-normal">
                              {achievement.GainYear + '/' + achievement.GainMonth}
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-light">
                              Description:
                            </span>
                            <span className="text-secondary-1000 dark:text-secondary-0 text-sm font-normal">
                              {achievement.Comment}
                            </span>
                          </div>
                        </div>
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
    </div>
  );
};
