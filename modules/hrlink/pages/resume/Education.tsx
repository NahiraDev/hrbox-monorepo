import { useEffect } from 'react';

import { AppTable } from '@hrbox/uikit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import { useDeleteEducationMutation, useLazyFetchEducationQuery } from "@hrbox/modules/hrlink/apis";

const Education = () => {
  const { openModal } = useModalContext();
  const [deleteEducation] = useDeleteEducationMutation();
  const [fetchEducation, { isLoading, data, isError }] = useLazyFetchEducationQuery();

  useEffect(() => {
    fetchEducation({});
  }, [fetchEducation]);

  return (
    <div className="grid grid-cols-4 gap-6 h-full">
      <div className="col-span-3">
        <AppTable
          data={data}
          error={isError ? 'Failed to load data' : undefined}
          hasPagination={true}
          loading={isLoading}
          onDelete={(row) => deleteEducation(row)}
          onEdit={(row) => handleEdit(row)}
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
