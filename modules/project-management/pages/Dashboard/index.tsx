import AppTasksList from "@hrbox/modules/project-management/components/AppTaskList";
import { AppDashboardChart } from "@hrbox/modules/project-management/components/AppDashboardChart";
import { AppTaskProgressChart } from "@hrbox/modules/project-management/components/AppTaskProgressChart";
import { AppCoWorks } from "@hrbox/modules/project-management/components/AppCoWorks";

export default function Dashboard() {
  return (
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
  );
}
