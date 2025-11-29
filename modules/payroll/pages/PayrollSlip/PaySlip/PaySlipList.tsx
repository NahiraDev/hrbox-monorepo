import { useDisclosure } from "@heroui/react";

import PageHeader from "@/components/PageHeader.tsx";
import { PayrollSlipLayout } from "@/pages/PayrollSlip/Layout.tsx";
import PaySlipListBoxes from "@/pages/PayrollSlip/PaySlip/PaySlipListBoxes.tsx";
import PaySlipTabs from "@/pages/PayrollSlip/PaySlip/PaySlipTabs.tsx";
import PaySlipInformationModal from "@/pages/PayrollSlip/PaySlip/PaySlipInformationModal.tsx";

export default function PaySlipList() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dummySalaryData = [
    {
      id: 1,
      totalAmount: "120,000",
      creationDate: "2024/11/10",
      persianCreationDate: "1404/05/05",
      month: "January",
      persianMonth: "دی",
    },
    {
      id: 2,
      totalAmount: "18,000",
      creationDate: "2024/11/10",
      persianCreationDate: "1404/05/05",
      month: "February",
      persianMonth: "بهمن",
    },
    {
      id: 3,
      totalAmount: "3,400",
      creationDate: "2024/11/10",
      persianCreationDate: "1404/05/05",
      month: "March",
      persianMonth: "اسفند",
    },
    {
      id: 4,
      totalAmount: "$7,200",
      creationDate: "2024/11/10",
      persianCreationDate: "1404/05/05",
      month: "April",
      persianMonth: "فروردین",
    },
    {
      id: 5,
      totalAmount: "$3,600",
      creationDate: "2024/11/10",
      persianCreationDate: "1404/05/05",
      month: "May",
      persianMonth: "اردیبهشت",
    },
    {
      id: 6,
      totalAmount: "2,400",
      creationDate: "2024/11/10",
      persianCreationDate: "1404/05/05",
      month: "June",
      persianMonth: "خرداد",
    },
    {
      id: 7,
      totalAmount: "1,200",
      creationDate: "2024/11/10",
      persianCreationDate: "1404/05/05",
      month: "July",
      persianMonth: "تیر",
    },
    {
      id: 8,
      totalAmount: "15,000",
      creationDate: "2024/11/10",
      persianCreationDate: "1404/05/05",
      month: "August",
      persianMonth: "مرداد",
    },
    {
      id: 9,
      totalAmount: "4,000",
      creationDate: "2024/11/10",
      persianCreationDate: "1404/05/05",
      month: "September",
      persianMonth: "شهریور",
    },
    {
      id: 10,
      totalAmount: "20,000",
      creationDate: "2024/11/10",
      persianCreationDate: "1404/05/05",
      month: "October",
      persianMonth: "مهر",
    },
    {
      id: 11,
      totalAmount: "6,600",
      creationDate: "2024/11/10",
      persianCreationDate: "1404/05/05",
      month: "November",
      persianMonth: "آبان",
    },
    {
      id: 12,
      totalAmount: "9,000",
      creationDate: "2024/11/10",
      persianCreationDate: "1404/05/05",
      month: "December",
      persianMonth: "آذر",
    },
  ];

  function showPaySlipInfo() {
    onOpen();
  }

  return (
    <PayrollSlipLayout
      props={{
        children: (
          <>
            <PaySlipInformationModal
              props={{
                isOpen: isOpen,
                onOpenChange: onOpenChange,
              }}
            />
            <PageHeader props={{ children: <PaySlipTabs /> }} />
            <div className="w-full h-full rounded-4">
              <div className="h-full min-h-fit w-full">
                <div className="flex gap-4 h-full min-h-fit">
                  <div className="w-full h-full bg-primary-0 dark:bg-[rgba(4,66,92,0.60)] rounded-4 border border-primary dark:border-[#0D4D6A] p-3 overflow-auto">
                    <div className="w-full h-full rounded-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {dummySalaryData.map((entry) => (
                          <PaySlipListBoxes
                            key={entry.id}
                            props={{
                              totalAmount: entry.totalAmount,
                              creationDate: entry.creationDate,
                              persianCreationDate: entry.persianCreationDate,
                              month: entry.month,
                              persianMonth: entry.persianMonth,
                              onClick: showPaySlipInfo,
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
