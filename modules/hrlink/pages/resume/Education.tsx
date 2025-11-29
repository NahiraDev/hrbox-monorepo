import { useEffect } from 'react';

import { AppTable } from '@hrbox/uikit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import { useDeleteEducationMutation, useFetchEducationsQuery } from "@hrbox/modules/hrlink/apis";
import { GeneralInformation } from '../../components/GeneralInformation';
import {UserLocation} from "@hrbox/modules/hrlink/components/UserLocation";

const Education = () => {
  const { openModal } = useModalContext();
  const [deleteEducation] = useDeleteEducationMutation();
  const {data:fetchEducation,isError, isFetching} = useFetchEducationsQuery({});

  return (
    <div className="grid grid-cols-4 gap-6 h-full">
      <div className="col-span-3">
        <AppTable
          data={fetchEducation}
          error={isError ? 'Failed to load data' : undefined}
          hasPagination={true}
          // loading={isFetching}
          onDelete={(row) => deleteEducation(row)}
          // onEdit={(row) => handleEdit(row)}
        />
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <GeneralInformation />
        <UserLocation />
      </div>
    </div>
  );
};

export default Education;
