import {
  Add,
  ArrowLeft2,
  ArrowRight2,
  ReceiveSquare,
  UserOctagon,
} from 'iconsax-react';
import { useEffect } from 'react';
import EducationModal from '@module/hrlink/features/resume/modals/EducationModal';
import {useNavigate} from 'react-router-dom';
import { UserLocation, GeneralInformation } from '../common';
import {
  AppPageTitle,
  AppTable,
  AppButton,
  AppSearchInput,
  AppLoader,
} from '../../../../core';

import { useDeleteEducationMutation, useLazyFetchEducationQuery } from './apis';

export const Education = () => {
  const navigate = useNavigate();
  const [deleteEducation] = useDeleteEducationMutation();
  const educationModal = EducationModal.useModal();
  const [fetchEducation, { isLoading, data, isError }] = useLazyFetchEducationQuery();

  const handleEdit = (row: any) => {
    educationModal.open({ row, isEditMode: true });
  };

  useEffect(() => {
    fetchEducation({});
  }, [fetchEducation]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <AppPageTitle
          icon={<UserOctagon className="text-white" size="22" />}
          title="Education"
        />
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            onPress: () => navigate('/resume/job-experience'),
            content: <ArrowLeft2 className="text-secondary-1000" size="24" />,
          }}
        />
        <div className="flex gap-2">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              onPress: () => navigate('/resume/hard-skills'),
              content: (
                <ArrowRight2 className="text-secondary-1000" size="24" />
              ),
            }}
          />

          <div>
            <div className="flex items-center gap-2">
              <AppSearchInput
                placeholder="Education"
                onSearch={(query) => fetchEducation({ query })}
              />
            </div>
          </div>
          <AppButton
            props={{
              color: 'white',
              radius: 'lg',
              size: 'md',
              content: (
                <>
                  <Add className="text-secondary-1000" size="16" />
                  <span className="text-secondary-1000 font-semibold">
                    Add New One
                  </span>
                </>
              ),
            }}
          />
          <AppButton
            props={{
              color: 'white',
              radius: 'lg',
              size: 'md',
              content: (
                <>
                  <ReceiveSquare className="text-secondary-1000" size="16" />
                  <span className="text-secondary-1000 font-semibold">
                    Download Resume
                  </span>
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
    </div>
  );
};
