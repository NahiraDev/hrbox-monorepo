import { useNavigate } from "react-router-dom";

import { SalaryCalculationsLayout } from "@/pages/SalaryCalculations/Layout.tsx";
import PageHeader from "@/components/PageHeader.tsx";
import PageIndexTabs from "@/pages/SalaryCalculations/PageIndexTabs.tsx";
import SalaryCalculateBox from "@/pages/SalaryCalculations/SalaryCalculateBox.tsx";
import { routeUrls } from "@/routes";

export default function SalaryCalculations() {
  const dummySalaryData = [
    {
      id: 1,
      status: "Done",
      peopleCount: 24,
      editCount: 2,
      totalAmount: "120,000",
      month: "January",
      persianMonth: "دی",
      showCalculate: false,
    },
    {
      id: 2,
      status: "Done",
      peopleCount: 24,
      editCount: 0,
      totalAmount: "18,000",
      month: "February",
      persianMonth: "بهمن",
      showCalculate: true,
    },
    {
      id: 3,
      status: "Done",
      peopleCount: 17,
      editCount: 1,
      totalAmount: "3,400",
      month: "March",
      persianMonth: "اسفند",
      showCalculate: false,
    },
    {
      id: 4,
      status: "Done",
      peopleCount: 24,
      editCount: 5,
      totalAmount: "$7,200",
      month: "April",
      persianMonth: "فروردین",
      showCalculate: true,
    },
    {
      id: 5,
      status: "Done",
      peopleCount: 24,
      editCount: 0,
      totalAmount: "$3,600",
      month: "May",
      persianMonth: "اردیبهشت",
      showCalculate: true,
    },
    {
      id: 6,
      status: "Pending",
      peopleCount: 24,
      editCount: 0,
      totalAmount: "2,400",
      month: "June",
      persianMonth: "خرداد",
      showCalculate: false,
    },
    {
      id: 7,
      status: "Done",
      peopleCount: 24,
      editCount: 3,
      totalAmount: "1,200",
      month: "July",
      persianMonth: "تیر",
      showCalculate: false,
    },
    {
      id: 8,
      status: "Pending",
      peopleCount: 10,
      editCount: 1,
      totalAmount: "15,000",
      month: "August",
      persianMonth: "مرداد",
      showCalculate: true,
    },
    {
      id: 9,
      status: "Done",
      peopleCount: 8,
      editCount: 0,
      totalAmount: "4,000",
      month: "September",
      persianMonth: "شهریور",
      showCalculate: false,
    },
    {
      id: 10,
      status: "Pending",
      peopleCount: 30,
      editCount: 6,
      totalAmount: "20,000",
      month: "October",
      persianMonth: "مهر",
      showCalculate: true,
    },
    {
      id: 11,
      status: "Done",
      peopleCount: 22,
      editCount: 2,
      totalAmount: "6,600",
      month: "November",
      persianMonth: "آبان",
      showCalculate: false,
    },
    {
      id: 12,
      status: "Pending",
      peopleCount: 18,
      editCount: 1,
      totalAmount: "9,000",
      month: "December",
      persianMonth: "آذر",
      showCalculate: true,
    },
  ];
  const navigate = useNavigate();

  function navigateToBoxDetail(id: number) {
    navigate(routeUrls.salaryDetail + "/" + id);
  }

  return (
    <SalaryCalculationsLayout
      props={{
        children: (
          <>
            <PageHeader props={{ children: <PageIndexTabs /> }} />
            <div className="w-full h-full rounded-4">
              <div className="h-full min-h-fit w-full">
                <div className="flex gap-4 h-full min-h-fit">
                  <div className="w-full h-full bg-primary-0 dark:bg-[rgba(4,66,92,0.60)] rounded-4 border border-primary dark:border-[#0D4D6A] p-3 overflow-auto">
                    <div className="w-full h-full rounded-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {dummySalaryData.map((entry) => (
                          <SalaryCalculateBox
                            key={entry.id}
                            props={{
                              status: entry.status,
                              peopleCount: entry.peopleCount,
                              editCount: entry.editCount,
                              totalAmount: entry.totalAmount,
                              month: entry.month,
                              showCalculate: entry.showCalculate,
                              persianMonth: entry.persianMonth,
                              onClick: () => navigateToBoxDetail(entry.id),
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
