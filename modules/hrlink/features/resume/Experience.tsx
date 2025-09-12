import { useEffect } from 'react';

import { GeneralInformation, UserLocation } from '../common';
import { AppLoader, AppTable, useModalContext } from '../../../../core';

import { useLazyFetchExperienceQuery } from './apis';

const Experience = () => {
  const { openModal } = useModalContext();
  const [fetchExperience, { isLoading, data, isError }] = useLazyFetchExperienceQuery();

  useEffect(() => {
    fetchExperience({});
  }, [fetchExperience]);

  return (
    <div className="grid grid-cols-4 gap-6 h-full">
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
  );
};

export default Experience
