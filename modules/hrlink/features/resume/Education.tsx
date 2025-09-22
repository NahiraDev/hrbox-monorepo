import { useEffect } from 'react';

import { UserLocation, GeneralInformation } from '../common';
import { AppTable, AppLoader } from '@core/components';
import { useModalContext } from '@core/context';

import { useDeleteEducationMutation, useLazyFetchEducationQuery } from './apis';

const Education = () => {
  const { openModal } = useModalContext();
  const [deleteEducation] = useDeleteEducationMutation();
  const [fetchEducation, { isLoading, data, isError }] = useLazyFetchEducationQuery();

  const handleEdit = (row: any) => {
    openModal('edit', row);
  };

  useEffect(() => {
    fetchEducation({});
  }, [fetchEducation]);

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
            onDelete={(row) => deleteEducation(row)}
            onEdit={(row) => handleEdit(row)}
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

export default Education;
