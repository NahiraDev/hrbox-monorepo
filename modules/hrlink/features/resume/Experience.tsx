import { Add, ArrowLeft2, ArrowRight2, Personalcard, ReceiveSquare } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { GeneralInformation, UserLocation } from '../common';
import { AppButton, AppLoader, AppSearchInput, AppTable, useModalContext } from '../../../../core';

import { useLazyFetchExperienceQuery } from './apis';

export const Experience = () => {
  const { openModal } = useModalContext();
  const navigate = useNavigate();
  const [fetchExperience, { isLoading, data, isError }] = useLazyFetchExperienceQuery();

  useEffect(() => {
    fetchExperience({});
  }, [fetchExperience]);

  return (
    <div className="mx-auto w-full">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 rounded-4 bg-secondary-400 dark:bg-surface-200 shadow-shadow-light-tight/1 px-3 py-1.5 w-fit mb-6">
          <Personalcard className="text-white" size="22" />
          <span className="text-white text-xl font-normal">Work Experience</span>
        </div>
        <div className="flex gap-2">
          <AppButton
            props={{
              isIconOnly: true,
              color: 'white',
              size: 'md',
              radius: 'sm',
              onPress: () => navigate('/resume/info'),
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
            <AppSearchInput placeholder="Education" onSearch={(query) => fetchExperience({ query })} />
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
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          {isLoading ? (
            <div>
              <AppLoader />
            </div>
          ) : (
            <AppTable
              data={data}
              error={isError ? 'Failed to load data' : undefined}
              hasPagination={true}
              loading={isLoading}
              onDelete={(row) => openModal('delete', 'experience', row)}
              onEdit={(row) => openModal('edit', 'experience' , row)}
            />
          )}
        </div>
        <div className="col-span-1 flex flex-col gap-3">
          <GeneralInformation />
          <UserLocation />
        </div>
      </div>
    </div>
  );
};
