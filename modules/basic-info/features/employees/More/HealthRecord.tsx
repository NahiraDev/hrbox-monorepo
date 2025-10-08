import { healthy } from '@module/basic-info/app/mock';
import { Card } from '@heroui/react';
import { AppButton, AppDeleteModal } from '@core/components';
import {
  Calendar,
  Drop,
  NotificationFavorite,
  HeartAdd,
  Hospital,
  Add,
  HeartEdit,
  Trash,
} from 'iconsax-react';

import { BasicInfoLayout } from '@module/basic-info/features/common';
import PreEmploymentHealthRecordsModals from '@module/basic-info/features/employees/modals/PreEmploymentHealthRecordsModals';
import { useModalContext } from '@core/context';
import AddNewOnDutyHealthRecords from '@module/basic-info/features/employees/modals/AddNewOnDutyHealthRecords';
import OnDutyHealthRecords from '@module/basic-info/features/employees/modals/OnDutyHealthRecords';

const HealthRecord = () => {
  const { openModal } = useModalContext();

  return (
    <BasicInfoLayout
      content={
        <div className="p-4 grid grid-cols-2 gap-15">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <NotificationFavorite size="24" />
                <span className="text-xl font-semibold text-secondary-900 ">Pre-Employment Health Records</span>
              </div>
              <AppButton
                props={{
                  isIconOnly: true,
                  color: 'white',
                  className: 'border border-primary',
                  onPress: () => openModal('edit',"", <PreEmploymentHealthRecordsModals/>,undefined ,'xl',"Add New Pre-Employment Health Records",<NotificationFavorite className='text-white'/>),
                  content: <Add />,
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {healthy.map((worker, index) => (
                <Card key={index} className="p-3 flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-secondary-900 font-semibold">{worker.title}</span>
                    <AppButton
                      props={{
                        className: 'bg-[#DCF0F94]/40 border border-[#DCF0F9] h-[20px] max-w-[107px] ',
                        size: 'xs',
                        radius: 'lg',
                        onPress: () => openModal('edit', "",<AddNewOnDutyHealthRecords/>,undefined,'lg',"Edit Pre-Employment Health Records",<NotificationFavorite className='text-white'/>),
                        content: (
                          <div className="flex items-center gap-0.5">
                            <HeartAdd color="#05587A" size="11" />
                            <span className="text-[10px] text-primary-700">{worker.titleButton}</span>
                          </div>
                        ),
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between p-1.5 border border-[#DCF0F9]/40 rounded-4">
                    <div className="flex items-center gap-1 text-xs text-secondary-900">
                      <Drop color="red" size="12" variant="Bold" />
                      <span>Type</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary-900">{worker.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-1.5 border border-[#DCF0F9]/40 rounded-4">
                    <div className="flex items-center gap-1 text-xs text-secondary-900">
                      <Calendar size="12" />
                      <span>Date</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary-900">{worker.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col p-1.5 border border-[#DCF0F9]/40 rounded-4">
                    <div className="flex items-center gap-1 text-xs text-secondary-900">
                      <Hospital size="12" />
                      <span>Does he/she require treatment?</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary-900">{worker.question}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <HeartEdit size="24" />
                <span className="text-xl font-semibold text-secondary-900 ">On-Duty Health Records</span>
              </div>
              <AppButton
                props={{
                  isIconOnly: true,
                  color: 'white',
                  className: 'border border-primary',
                  onPress: () => openModal('edit',"", <OnDutyHealthRecords/>,undefined ,'xl',"Add New On-Duty Health Records",<HeartEdit className='text-white'/>),
                  content: <Add />,
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {healthy.map((worker, index) => (
                <Card key={index} className="p-3 flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-secondary-900 font-semibold">{worker.title}</span>
                    <AppButton
                      props={{
                        className: 'bg-[#DCF0F94]/40 border border-[#DCF0F9] h-[20px] max-w-[107px] ',
                        size: 'xs',
                        radius: 'lg',
                        onPress: () => openModal('edit', "",<AddNewOnDutyHealthRecords/>,undefined,'lg',"Edit Pre-Employment Health Records",<NotificationFavorite className='text-white'/>),
                        content: (
                          <div className="flex items-center gap-0.5">
                            <HeartAdd color="#05587A" size="11" />
                            <span className="text-[10px] text-primary-700">{worker.titleButton}</span>
                          </div>
                        ),
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between p-1.5 border border-[#DCF0F9]/40 rounded-4">
                    <div className="flex items-center gap-1 text-xs text-secondary-900">
                      <Drop color="red" size="12" variant="Bold" />
                      <span>Type</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary-900">{worker.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-1.5 border border-[#DCF0F9]/40 rounded-4">
                    <div className="flex items-center gap-1 text-xs text-secondary-900">
                      <Calendar size="12" />
                      <span>Date</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary-900">{worker.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col p-1.5 border border-[#DCF0F9]/40 rounded-4">
                    <div className="flex items-center gap-1 text-xs text-secondary-900">
                      <Hospital size="12" />
                      <span>Does he/she require treatment?</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary-900">{worker.question}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>



        </div>
      }
    />
  );
};

export default HealthRecord;
