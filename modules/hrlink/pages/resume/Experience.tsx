import { useEffect, useState } from 'react';

import { AppTable } from '@hrbox/uikit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import { GeneralInformation } from "@hrbox/modules/hrlink/components/GeneralInformation";
import { UserLocation } from "@hrbox/modules/hrlink/components/UserLocation";
import { useFetchExperiencesQuery } from "@hrbox/modules/hrlink/apis";

const Experience = () => {
  const { openModal } = useModalContext();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data: fetchedExperience, isLoading, isError } = useFetchExperiencesQuery({page, pageSize});
  console.log(`experience data \n${fetchedExperience}`);
  console.log(`is loading? \n${isLoading}`);
  console.log(`error experience \n ${isError}`)
  console.log(useFetchExperiencesQuery.toString());
  console.log('RTK cache:', (window as any).store?.getState()?.HRLinkApi);

  return (
    <div className="grid grid-cols-4 gap-6 h-full">
      <div className="col-span-3">
        <AppTable
        
          data={fetchedExperience}
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
