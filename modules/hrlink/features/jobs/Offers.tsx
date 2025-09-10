import {
  Buildings2,
  Clock,
  Dislike,
  DollarCircle,
  Like1,
  Location,
  Setting4,
  Status,
} from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { AppButton, AppSearchInput } from '../../../../core';
import { AppPagination } from '../../../../core/components';
import { JobOffersIcon , JobOppertunitiesIcon } from '../../icons';
import { useLazyJobOffersQuery } from './apis';

const JobOffers = () => {
  const [fetchJobOffers , {data}] = useLazyJobOffersQuery()
  const [selectedStates, setSelectedStates] = useState<Record<number, 'like' | 'dislike' | null>>({});
  const buttonStyle = (current: 'like' | 'dislike' | null, type: 'like' | 'dislike') => {
    const isActive = current === type;

    return `
    !h-[22px] !w-[54px] !min-w-fit flex items-center gap-2 !px-1 !py-0.5 !rounded-2
    ${isActive ? 'bg-secondary-400' : 'bg-white dark:bg-info-1000'}
  `;
  };

  const textStyle = (current: 'like' | 'dislike' | null, type: 'like' | 'dislike') => {
    const isActive = current === type;

    return `text-[10px] font-normal ${isActive ? 'text-white' : 'text-secondary-1000 dark:text-white'}`;
  };

  const iconStyle = (current: 'like' | 'dislike' | null, type: 'like' | 'dislike') => {
    const isActive = current === type;

    return `${isActive ? 'text-white' : 'text-secondary-1000 dark:text-white'}`;
  };

  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col justify-between gap-3.5 h-full">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <AppButton
              props={{
                color: 'white',
                size: 'md',
                radius: 'sm',
                content: (
                  <>
                    <JobOffersIcon color="#fff" />
                    <span className="text-white text-xl font-normal">Job Recommendations</span>
                  </>
                ),
              }}
            />
            <AppButton
              props={{
                color: 'white',
                size: 'md',
                radius: 'sm',
                onPress: () => navigate('/job/oppertunities'),
                content: (
                  <>
                    <JobOppertunitiesIcon color="#fff" />
                    <span className="text-secondary-400 dark:text-white text-xl font-normal">Job Opportunities</span>
                  </>
                ),
              }}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <AppSearchInput placeholder="Education" onSearch={(query) => fetchJobOffers({ query })} />
            </div>
            <AppButton
              props={{
                isIconOnly: true,
                color: 'white',
                size: 'md',
                radius: 'sm',
                content: <Setting4 className="text-secondary-1000" />,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col h-full justify-between">
          <div className="grid grid-cols-3 gap-3">
            {data &&
              data.map((job: any) => (
                <button key={job.id} onClick={() => navigate('/job/detail/' + job.company)}>
                  <div className="rounded-5 shadow-shadow-light-tight/1 px-3 py-4">
                    <div className="flex justify-between pb-1 border-b-1 border-neutral-100 dark:border-neutral-700">
                      <div className="flex items-center gap-2">
                        <Buildings2 className="text-secondary-400" size="22" />
                        <span className="text-secondary-1000 font-semibold">{job.company}</span>
                      </div>
                      <div className="flex gap-1">
                        <AppButton
                          props={{
                            isIconOnly: true,
                            color: 'white',
                            size: 'md',
                            radius: 'sm',
                            className: buttonStyle(selectedStates[job.id], 'dislike'),
                            onPress: (e: any) => {
                              e.stopPropagation();
                              setSelectedStates((prev) => ({
                                ...prev,
                                [job.id]: prev[job.id] === 'dislike' ? null : 'dislike',
                              }));
                            },
                            content: (
                              <>
                                <span className={textStyle(selectedStates[job.id], 'dislike')}>Dislike</span>
                                <Dislike
                                  className={iconStyle(selectedStates[job.id], 'dislike')}
                                  size="12"
                                  variant="Bold"
                                />
                              </>
                            ),
                          }}
                        />
                        <AppButton
                          props={{
                            isIconOnly: true,
                            color: 'white',
                            size: 'md',
                            radius: 'sm',
                            className: buttonStyle(selectedStates[job.id], 'like'),
                            onPress:(e:any) => {
                              e.stopPropagation();
                              setSelectedStates((prev) => ({
                                ...prev,
                                [job.id]: prev[job.id] === 'like' ? null : 'like',
                              }));
                            },
                            content: (
                              <>
                                <span className={textStyle(selectedStates[job.id], 'like')}>Like</span>
                                <Like1 className={iconStyle(selectedStates[job.id], 'like')} size="12" variant="Bold" />
                              </>
                            ),
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between pt-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-secondary-800 font-bold text-sm">{job.title}</span>
                        <div className="flex items-center gap-2">
                          <Location className="text-secondary-1000" size="16" />
                          <span className="text-secondary-1000 text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-secondary-1000" size="16" />
                          <span className="text-secondary-1000 text-sm">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarCircle className="text-secondary-1000" size="16" />
                          <span className="text-secondary-1000 text-sm">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Status className="text-info" size="20" variant="Bold" />
                          <span className="text-info-700 text-sm">{job.status}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-end">
                          <img alt="" className="w-[84px] h-[84px] rounded-5" src={""} />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
          </div>
          <div className="flex justify-center">
            <AppPagination total={100} />
          </div>
        </div>
      </div>
    </div>
  );
};
