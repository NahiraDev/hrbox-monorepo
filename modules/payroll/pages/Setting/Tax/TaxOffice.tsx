import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { useTranslation } from "react-i18next";

import { SettingLayout } from "@/pages/Setting/Layout.tsx";
import PageTabs from "@/pages/Setting/Tax/PageTabs.tsx";
import AppTable from "@/components/AppTable.tsx";
import SelectCalendarWithTime from "@/components/Calendar/SelectCalendarWithTime.tsx";
import GeneralDetails from "@/components/GeneralDetails";
import PageHeader from "@/components/PageHeader.tsx";
import ModalTaxOffice from "@/pages/Setting/Tax/ModalTaxOffice.tsx";

export default function TaxOffice() {
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
  const { t } = useTranslation();

  const DUMMY_DATA = [
    {
      id: 1,
      no: 1,
      title: "Supervisory Allowance",
      code: "23546",
      creationDate: "2022/05/12",
    },
    {
      id: 2,
      no: 2,
      title: "Supervisory Allowance",
      code: "23547",
      creationDate: "2022/06/15",
    },
    {
      id: 3,
      no: 3,
      title: "Supervisory Allowance",
      code: "23548",
      creationDate: "2022/07/20",
    },
    {
      id: 4,
      no: 4,
      title: "Supervisory Allowance",
      code: "23549",
      creationDate: "2022/08/18",
    },
    {
      id: 5,
      no: 5,
      title: "Supervisory Allowance",
      code: "23550",
      creationDate: "2022/09/25",
    },
    {
      id: 6,
      no: 6,
      title: "Supervisory Allowance",
      code: "23551",
      creationDate: "2022/10/02",
    },
    {
      id: 7,
      no: 7,
      title: "Supervisory Allowance",
      code: "23552",
      creationDate: "2022/11/10",
    },
    {
      id: 8,
      no: 8,
      title: "Supervisory Allowance",
      code: "23553",
      creationDate: "2022/12/05",
    },
  ];

  const tableColumns = [
    { key: "no", label: "No." },
    { key: "title", label: "Title" },
    { key: "code", label: "Code" },
    { key: "creationDate", label: "Creation Date" },
  ];

  let extraMessage = (
    <div className="mt-8 py-3 px-2 bg-[rgba(253,225,225,0.40)] rounded-4">
      <span className="relative pl-4 text-secondary-1000 dark:text-white dark:bg-[rgba(138,27,27,0.60)] before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-red-600 before:rounded-full">
        {t(
          "thisBranchOfYourTaxHasBeenAssignedTo15PeopleForExampleWithTheDeletionOfThisBranchWhereShouldIOrderForTheseFewPeople",
        )}
      </span>
    </div>
  );

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
    extraMessage: extraMessage,
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
            <ModalTaxOffice
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
