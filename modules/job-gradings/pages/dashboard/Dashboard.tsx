import StateOrganize from "./StateOrganize";
import EmployeeStatus from "./EmployeeStatus";
import JDList from "./JDList";

import { useTranslation } from "react-i18next";
import DashboardNotification from "@hrbox/modules/job-gradings/pages/dashboard/Notification";
import { organization } from "../../app/mock";

const Dashboard = () => {
    const { t } = useTranslation();

    

    return (
        <div className="w-full h-full grid grid-cols-[0.6fr_1fr_280px] grid-rows-[2fr_1.3fr] gap-4 p-4">

            {/* Progress Status Of Projects - Top Left */}
            <div className="bg-[#DCF0F9] dark:bg-[#04425C60] border border-primary rounded-xl p-4">
                <div className="pb-2.5 border-b border-[#05587A]">
                    <p className="text-secondary-1000 font-sans text-2xl font-semibold">
                        {t("ProgressStatusOfProjects")}
                    </p>
                </div>
                {/* Chart Component Here */}
                <div className="h-full flex items-end justify-around pt-4">
                    {/* Bar Chart Placeholder */}
                </div>
            </div>

            {/* The State Of The Organization - Top Middle */}
            <StateOrganize/>

            {/* JD List - Right Side (spans 2 rows) */}
            <div className="row-span-2">
                <JDList />
            </div>

            {/* Job-Employee Fit Status - Bottom Left */}
            <EmployeeStatus />

            {/* Notifications - Bottom Middle */}

                <DashboardNotification/>

        </div>
    );
};

export default Dashboard;
