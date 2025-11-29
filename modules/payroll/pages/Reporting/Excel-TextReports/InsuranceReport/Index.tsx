import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/PageHeader.tsx";
import { ReportsLayout } from "@/pages/Reporting/Layout.tsx";
import InsuranceBoxes from "@/pages/Reporting/Excel-TextReports/InsuranceReport/InsuranceBoxes.tsx";
import PageTabs from "@/pages/Reporting/Excel-TextReports/InsuranceReport/PageTabs.tsx";
import { routeUrls } from "@/routes";

export default function Index() {
  const dummySalaryData = [
    {
      id: 1,
      organizationName: "HRBOX",
      insuranceBranchCode: "20000000",
      totalAmount: "120,000",
      month: "January",
      persianMonth: "دی",
    },
    {
      id: 2,
      organizationName: "HRBOX",
      insuranceBranchCode: "20000000",
      totalAmount: "18,000",
      month: "February",
      persianMonth: "بهمن",
    },
    {
      id: 3,
      organizationName: "HRBOX",
      insuranceBranchCode: "20000000",
      totalAmount: "3,400",
      month: "March",
      persianMonth: "اسفند",
    },
    {
      id: 4,
      organizationName: "HRBOX",
      insuranceBranchCode: "20000000",
      totalAmount: "$7,200",
      month: "April",
      persianMonth: "فروردین",
    },
    {
      id: 5,
      organizationName: "HRBOX",
      insuranceBranchCode: "20000000",
      totalAmount: "$3,600",
      month: "May",
      persianMonth: "اردیبهشت",
    },
    {
      id: 6,
      organizationName: "HRBOX",
      insuranceBranchCode: "20000000",
      totalAmount: "2,400",
      month: "June",
      persianMonth: "خرداد",
    },
    {
      id: 7,
      organizationName: "HRBOX",
      insuranceBranchCode: "20000000",
      totalAmount: "1,200",
      month: "July",
      persianMonth: "تیر",
    },
    {
      id: 8,
      organizationName: "HRBOX",
      insuranceBranchCode: "20000000",
      totalAmount: "15,000",
      month: "August",
      persianMonth: "مرداد",
    },
    {
      id: 9,
      organizationName: "HRBOX",
      insuranceBranchCode: "20000000",
      totalAmount: "4,000",
      month: "September",
      persianMonth: "شهریور",
    },
    {
      id: 10,
      organizationName: "HRBOX",
      insuranceBranchCode: "20000000",
      totalAmount: "20,000",
      month: "October",
      persianMonth: "مهر",
    },
    {
      id: 11,
      organizationName: "HRBOX",
      insuranceBranchCode: "20000000",
      totalAmount: "6,600",
      month: "November",
      persianMonth: "آبان",
    },
    {
      id: 12,
      organizationName: "HRBOX",
      insuranceBranchCode: "20000000",
      totalAmount: "9,000",
      month: "December",
      persianMonth: "آذر",
    },
  ];
  const navigate = useNavigate();

  function navigateToInsuranceList() {
    navigate(routeUrls.insuranceList);
  }

  return (
    <ReportsLayout
      props={{
        children: (
          <>
            <PageHeader props={{ children: <PageTabs /> }} />
            <div className="w-full h-full rounded-4">
              <div className="h-full min-h-fit w-full">
                <div className="flex gap-4 h-full min-h-fit">
                  <div className="w-full h-full bg-primary-0 dark:bg-[rgba(4,66,92,0.60)] rounded-4 border border-primary dark:border-[#0D4D6A] p-3 overflow-auto">
                    <div className="w-full h-full rounded-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {dummySalaryData.map((entry) => (
                          <InsuranceBoxes
                            key={entry.id}
                            props={{
                              organizationName: entry.organizationName,
                              insuranceBranchCode: entry.insuranceBranchCode,
                              totalAmount: entry.totalAmount,
                              month: entry.month,
                              persianMonth: entry.persianMonth,
                              onClick: navigateToInsuranceList,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ),
      }}
    />
  );
}
