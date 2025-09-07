// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

import { DashboardLayout } from "@/pages/Dashboard/Layout.tsx";
// import ResumeChart from "@/components/AppChart.tsx";
// import ResumeCompletion from "@/components/AppResumeComplation.tsx";
// import AppJobOpportunities from "@/components/AppJobOppertunities.tsx";
// import { AppMap } from "@/components/AppMap.tsx";
// import { AppGeneralDetails } from "@/components/AppGeneralDetails.tsx";
// import { AppDispatch } from "@/redux/store.ts";
// import { handleFetchDashboardDataApi } from "@/services/Dashboard/apis.ts";
// import closeicon from "@/icons/closeIcon"
import { Add, Chart, SearchNormal, Setting4 } from "iconsax-react";
import { useTranslation } from "react-i18next";
import AppDocs from "@/components/AppDocs.tsx";
import { useState } from "react";
import { ProcessModal } from "@/pages/Process/ProcessModal.tsx";
import { AddEventModal } from "@/pages/Process/AddEventModal.tsx";
import { AddActionsModall } from "@/pages/Process/AddActionsModal.tsx";
import { AddPointModall } from "@/pages/Process/AddPointModall.tsx";
import { AddActionsShow } from "@/pages/Process/AddActionsShow.tsx";
import { EventModall } from "@/pages/Process/EventModal.tsx";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row-reverse justify-between ">
        <div
          className={
            i18n.language === "en"
              ? "flex flex-row-reverse"
              : "flex flex-row"
          }
        >
          <button
            className={` px-[12px] py-[6px] border-[1px] border-solid dark:bg-[#01101A] dark:border-[#0D4D6A] border-[#0A9AD7] rounded-[8px] bg-white flex-row flex items-center ${i18n.language === "en" ? "" : ""} `}
          >
                    <span className={i18n.language === "en" ? "mr-2" : "ml-2"}>
                      <Add />
                    </span>
            {t("add_new_one")}
          </button>
          <button className="p-[8px] border-[1px] border-solid border-[#0A9AD7] rounded-[8px] mx-[4px] dark:bg-[#01101A] dark:border-[#0D4D6A] bg-white">
            <Setting4 />
          </button>
          <button className="p-[8px] border-[1px] border-solid border-[#0A9AD7] rounded-[8px] dark:bg-[#01101A] dark:border-[#0D4D6A] bg-white">
            <SearchNormal />
          </button>
        </div>
        <div className="flex">
          <button className="px-[12px] py-[6px] rounded-[8px] text-white dark:bg-[#0D4D6A] bg-[#0A9AD7] flex items-center  ">
                    <span
                      className={`${i18n.language === "en" ? "mr-[8px]" : "ml-[8px]"}`}
                    >
                      <Chart />
                    </span>{" "}
            {t("dashboard")}
          </button>
        </div>
      </div>
    </div>
  );
}
