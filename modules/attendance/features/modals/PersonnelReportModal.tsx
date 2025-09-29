import { useModalContext } from '@core/context';
import { Avatar } from '@heroui/react';

import { AppButton, AppModal } from '@core/components';
import avatar from '@core/assets/img/inpersonate-avatar.png';
import ReportTable from '@module/attendance/features/attendanceCalender/ReportTable';
const PersonnelReportModal = () => {
  const { closeModal } = useModalContext();

  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-row justify-between items-center py-5 px-3 bg-gray-200 rounded-t-xl">
            <div className="flex flex-col items-center">
              <div className="w-full flex flex-row justify-between">
                <p className="me-3">
                  <span>20 بهمن 1398</span>
                </p>
                <p>:تاریخ</p>
              </div>{' '}
              <div className="w-full flex flex-row justify-between">
                <p className="me-3">
                  <span>20 بهمن 1398</span>
                </p>
                <p>:ساعت</p>
              </div>{' '}
              <div className="w-full flex flex-row justify-between">
                <p className="me-3">
                  <span>20 بهمن 1398</span>
                </p>
                <p>:کد گزارش</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1>شرکت ایران تام</h1>
              <p>گزارش جامع پرسنلی</p>
            </div>
            <div className="flex flex-row items-center">
              <div className="flex flex-col me-2">
                <p className="text-sm font-medium">Sahar Najafi</p>
                <p>مدیر منابع انسانی</p>
              </div>
              <Avatar className="w-[64px] h-[64px]" radius="md" src={avatar} />
            </div>
          </div>
          <div className="w-full">
            <ReportTable/>
          </div>
        </div>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              onClick: () => closeModal('confirm', 'PersonalReport'),
              content: 'Cancel',
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              type: 'submit',
              size: 'md',
              radius: 'lg',
              content: 'Download File',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
  );
};

export default PersonnelReportModal;
