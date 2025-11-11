import { AppPagination } from '@hrbox/uikit/components';
import { useLazyFetchEventsQuery } from '@module/hrlink/features/companies/apis';
import { Buildings2, Calendar, People } from 'iconsax-reactjs';
import { useEffect } from 'react';

const CompanyEvents = () => {
  const [fetchEvents, { data }] = useLazyFetchEventsQuery();

  useEffect(() => {
    fetchEvents({});
  }, []);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="grid grid-cols-3 gap-3">
        {data &&
          data.map((event: any) => (
            <div key={event.id} className="rounded-5 dark:bg-info-1000 shadow-shadow-light-tight/1 px-3 py-4">
              <div className="flex flex-col gap-[14px]">
                <div className="flex justify-between pb-1 border-b-1 border-netural-100 dark:border-netural-400">
                  <div className="flex items-center gap-2">
                    <Buildings2 className="text-secondary-400" size="22" />
                    <span className="text-secondary-1000 font-semibold">{event.title}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <img
                    alt=""
                    className="rounded-[14px]"
                    src={''}
                    style={{
                      width: '96px',
                      height: '96px',
                    }}
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                      <Calendar className="text-[#292D32] dark:text-white" size="20" />
                      <span className="text-sm text-[#353535] dark:text-white font-semibold">
                        March 15, 2024, 9:00 AM
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <Location className="text-[#292D32] dark:text-white" size="20" />
                      <span className="text-sm text-[#353535] dark:text-white font-semibold">
                        March 15, 2024, 9:00 AM
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <People className="text-[#292D32] dark:text-white" size="20" />
                      <span className="text-sm text-[#353535] dark:text-white font-semibold">
                        March 15, 2024, 9:00 AM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center">
        <AppPagination total={100} />
      </div>
    </div>
  );
};

export default CompanyEvents;
