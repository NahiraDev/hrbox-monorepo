import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { DashboardLayout } from "@/pages/Dashboard/Layout.tsx";
import ResumeChart from "@/components/AppChart.tsx";
import ResumeCompletion from "@/components/AppResumeComplation.tsx";
import AppJobOpportunities from "@/components/AppJobOppertunities.tsx";
import { AppMap } from "@/components/AppMap.tsx";
import { AppGeneralDetails } from "@/components/AppGeneralDetails.tsx";
import { AppDispatch } from "@/redux/createStore.ts";
import { handleFetchDashboardDataApi } from "@/services/Dashboard/apis.ts";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(handleFetchDashboardDataApi());
  }, []);

  return (
    <DashboardLayout
      props={{
        children: (
          <div className="grid grid-cols-4 gap-3 h-[calc(100%-132px)]">
            <div className="col-span-3 flex flex-col gap-3 h-full">
              <div className="flex flex-col gap-3 h-full">
                <ResumeChart />
                <div className="grid grid-cols-2 gap-3 h-2/5">
                  <ResumeCompletion />
                  <AppJobOpportunities />
                </div>
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-3">
              <AppGeneralDetails />
              <AppMap
                props={{
                  isEdit: false,
                }}
              />
            </div>
          </div>
        ),
      }}
    />
  );
}
