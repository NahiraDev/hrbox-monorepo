import { useEffect } from 'react';

import { GeneralInformation, UserLocation } from '@module/hrlink/features/common';
import { AppLoader, AppTable } from '@core/components';
import { useModalContext } from '@core/context';

import { useLazyFetchExperienceQuery } from '@module/hrlink/features/resume/apis';

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
