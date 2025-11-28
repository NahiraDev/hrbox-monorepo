import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

import { SettingLayout } from "@/pages/Setting/Layout.tsx";
import PageTabs from "@/pages/Setting/Tax/PageTabs.tsx";
import AppTable from "@/components/AppTable.tsx";
import PageHeader from "@/components/PageHeader.tsx";
import ModalTaxTable from "@/pages/Setting/Tax/ModalTaxTable.tsx";
import SelectCalendarWithTime from "@/components/Calendar/SelectCalendarWithTime.tsx";
import GeneralDetails from "@/components/GeneralDetails";

export default function TaxTable() {
  const DUMMY_EMPLOYEES = [
    {
      id: 1,
      label: "Alice Johnson",
      email: "alice.johnson@example.com",
      position: "Project Manager",
      department: "IT",
    },
    {
      id: 2,
      label: "Bob Smith",
      email: "bob.smith@example.com",
      position: "Software Engineer",
      department: "R&D",
    },
    {
      id: 3,
      label: "Carla Gomez",
      email: "carla.gomez@example.com",
      position: "HR Specialist",
      department: "Human Resources",
    },
    {
      id: 4,
      label: "Daniel Chen",
      email: "daniel.chen@example.com",
      position: "Finance Analyst",
      department: "Finance",
    },
    {
      id: 5,
      label: "Eva Thompson",
      email: "eva.thompson@example.com",
      position: "Marketing Lead",
      department: "Marketing",
    },
    {
      id: 6,
      label: "Faisal Ahmed",
      email: "faisal.ahmed@example.com",
      position: "Legal Advisor",
      department: "Legal Affairs",
    },
    {
      id: 7,
      label: "Grace Lee",
      email: "grace.lee@example.com",
      position: "UI/UX Designer",
      department: "Design",
    },
    {
      id: 8,
      label: "Hiro Tanaka",
      email: "hiro.tanaka@example.com",
      position: "Data Scientist",
      department: "R&D",
    },
    {
      id: 9,
      label: "Isabella Russo",
      email: "isabella.russo@example.com",
      position: "Operations Manager",
      department: "Operations",
    },
    {
      id: 10,
      label: "John Doe",
      email: "john.doe@example.com",
      position: "Support Engineer",
      department: "Customer Support",
    },
  ];
  const DUMMY_NAMELIST = [
    {
      id: 1,
      label: "Alice Johnson",
      email: "alice.johnson@example.com",
      position: "Project Manager",
      department: "IT",
    },
    {
      id: 2,
      label: "Bob Smith",
      email: "bob.smith@example.com",
      position: "Software Engineer",
      department: "R&D",
    },
    {
      id: 3,
      label: "Carla Gomez",
      email: "carla.gomez@example.com",
      position: "HR Specialist",
      department: "Human Resources",
    },
    {
      id: 4,
      label: "Daniel Chen",
      email: "daniel.chen@example.com",
      position: "Finance Analyst",
      department: "Finance",
    },
    {
      id: 5,
      label: "Eva Thompson",
      email: "eva.thompson@example.com",
      position: "Marketing Lead",
      department: "Marketing",
    },
    {
      id: 6,
      label: "Faisal Ahmed",
      email: "faisal.ahmed@example.com",
      position: "Legal Advisor",
      department: "Legal Affairs",
    },
    {
      id: 7,
      label: "Grace Lee",
      email: "grace.lee@example.com",
      position: "UI/UX Designer",
      department: "Design",
    },
    {
      id: 8,
      label: "Hiro Tanaka",
      email: "hiro.tanaka@example.com",
      position: "Data Scientist",
      department: "R&D",
    },
    {
      id: 9,
      label: "Isabella Russo",
      email: "isabella.russo@example.com",
      position: "Operations Manager",
      department: "Operations",
    },
    {
      id: 10,
      label: "John Doe",
      email: "john.doe@example.com",
      position: "Support Engineer",
      department: "Customer Support",
    },
  ];

  const DUMMY_SORTS = [
    { id: 1, label: "Newest First", value: "createdAt_desc" },
    { id: 2, label: "Oldest First", value: "createdAt_asc" },
    { id: 3, label: "Alphabetical (A–Z)", value: "label_asc" },
    { id: 4, label: "Alphabetical (Z–A)", value: "label_desc" },
    { id: 5, label: "Most Recently Updated", value: "updatedAt_desc" },
    { id: 6, label: "Least Recently Updated", value: "updatedAt_asc" },
    { id: 7, label: "Highest Priority", value: "priority_desc" },
    { id: 8, label: "Lowest Priority", value: "priority_asc" },
  ];

  const [isTableExpanded, setTableIsExpanded] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isShowMode, setIsShowMode] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const DUMMY_DATA = [
    {
      id: 1,
      no: 1,
      title: "Tax System",
      year: "2023",
      creationDate: "2023/10/11",
    },
    {
      id: 2,
      no: 2,
      title: "Tax System",
      year: "2023",
      creationDate: "2023/10/11",
    },
    {
      id: 3,
      no: 3,
      title: "Tax System",
      year: "2023",
      creationDate: "2023/10/11",
    },
    {
      id: 4,
      no: 4,
      title: "Tax System",
      year: "2023",
      creationDate: "2023/10/11",
    },
    {
      id: 5,
      no: 5,
      title: "Tax System",
      year: "2023",
      creationDate: "2023/10/11",
    },
    {
      id: 6,
      no: 6,
      title: "Tax System",
      year: "2023",
      creationDate: "2023/10/11",
    },
    {
      id: 7,
      no: 7,
      title: "Tax System",
      year: "2023",
      creationDate: "2023/10/11",
    },
    {
      id: 8,
      no: 8,
      title: "Tax System",
      year: "2023",
      creationDate: "2023/10/11",
    },
  ];

  const tableColumns = [
    { key: "no", label: "No." },
    { key: "title", label: "Title" },
    { key: "year", label: "Year" },
    { key: "creationDate", label: "Creation Date" },
  ];

  const tableProps = {
    data: DUMMY_DATA,
    columns: tableColumns,
    onOpenEditDialog: () => {
      setIsEditMode(true);
      setIsShowMode(false);
      onOpen();
    },
    onOpenShowDialog: () => {
      setIsEditMode(false);
      setIsShowMode(true);
      onOpen();
    },
    hasPagination: true,
    hasPadding: true,
    hasShadow: true,
    hasRowBorder: true,
  };

  return (
    <SettingLayout
      props={{
        children: (
          <>
            <PageHeader
              props={{
                children: (
                  <PageTabs
                    props={{
                      data: {
                        nameList: DUMMY_NAMELIST,
                        sortOptions: DUMMY_SORTS,
                        EmployeeName: DUMMY_EMPLOYEES,
                      },
                    }}
                  />
                ),
              }}
            />
            <ModalTaxTable
              isEditMode={isEditMode}
              isOpen={isOpen}
              isShowMode={isShowMode}
              onOpenChange={onOpenChange}
            />
            <div className="w-full h-full rounded-4">
              <div className="h-full min-h-fit w-full">
                <div className="flex gap-4 h-full min-h-fit">
                  <div className={`relative w-full`}>
                    <button
                      className="dark:bg-info-1000 bg-white cursor-pointer flex justify-center items-center absolute top-[50px] right-[-10px] w-6 h-6 rounded-full shadow-[0px_1px_2px_rgba(0,0,0,0.20)]"
                      onClick={() => setTableIsExpanded(!isTableExpanded)}
                    >
                      {isTableExpanded ? (
                        <ArrowLeft2
                          className="cursor-pointer text-info-1000 dark:text-white"
                          size="12"
                        />
                      ) : (
                        <ArrowRight2
                          className="cursor-pointer text-info-1000 dark:text-white"
                          size="12"
                        />
                      )}
                    </button>
                    <AppTable props={tableProps} />
                  </div>
                  {!isTableExpanded && (
                    <div
                      className={`flex flex-col gap-2 h-full transition-all duration-300  ${isTableExpanded ? "w-[0px]" : "w-[30%]"}`}
                    >
                      <div className="bg-primary-50 dark:bg-transparent rounded-5 h-[73%] w-full">
                        <div className="w-full h-full">
                          <SelectCalendarWithTime />
                        </div>
                      </div>
                      <div className="h-[27%] w-full">
                        <GeneralDetails
                          props={{
                            generalAmount: 90,
                            detailAmounts: [90, 50, 10, 30],
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ),
      }}
    />
  );
}
