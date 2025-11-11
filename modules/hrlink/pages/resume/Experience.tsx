import { useEffect } from 'react';

import { AppTable } from '@hrbox/uikit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import { GeneralInformation } from "@hrbox-monorepo/modules/hrlink/components/GeneralInformation";
import { UserLocation } from "@hrbox/modules/hrlink/components/UserLocation";
import { useLazyFetchExperienceQuery } from "@hrbox/modules/hrlink/apis";

const Experience = () => {
  const { openModal } = useModalContext();
  const [fetchExperience, { isLoading, data, isError }] = useLazyFetchExperienceQuery();

  useEffect(() => {
    fetchExperience({});
  }, [fetchExperience]);

  return (
    <div className="grid grid-cols-4 gap-6 h-full">
      <div className="col-span-3">
        <AppTable
          data={data}
          error={isError ? 'Failed to load data' : undefined}
          hasPagination={true}
          loading={isLoading}
          onDelete={(row) => openModal('delete', 'experience', row)}
          onEdit={(row) => openModal('edit', 'experience' , row)}
        />
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <GeneralInformation />
        <UserLocation />
      </div>
    </div>
  );
};

export default Experience
