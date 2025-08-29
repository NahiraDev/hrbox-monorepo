import { BaseContentLayout } from 'core';

import AppTasksList from '../../components/AppTaskList';
import { AppDashboardChart } from '../../components/AppDashboardChart';
import { AppTaskProgressChart } from '../../components/AppTaskProgressChart';
import { AppCoWorks } from '../../components/AppCoWorks';

export default function Dashboard() {
  return (
    <BaseContentLayout
      props={{
        children: (
          <div className="w-full h-full flex gap-3">
            <div className="w-[40%]">
              <AppDashboardChart />
            </div>
            <div className="w-[30%]">
              <AppTasksList />
            </div>
            <div className="w-[30%]">
              <div className="flex flex-col gap-3 h-full">
                <div className="h-2/3">
                  <AppTaskProgressChart />
                </div>
                <div className="h-1/3">
                  <AppCoWorks />
                </div>
              </div>
            </div>
          </div>
        ),
      }}
    />
  );
}
