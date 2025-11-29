import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { useTranslation } from "react-i18next";

import { SettingLayout } from "@/pages/Setting/Layout.tsx";
import PageTabs from "@/pages/Setting/Insurance/PageTabs.tsx";
import AppTable from "@/components/AppTable.tsx";
import PageHeader from "@/components/PageHeader.tsx";
import ModalInsurance from "@/pages/Setting/Insurance/ModalInsurance.tsx";
import PageIndexTabs from "@/pages/Setting/PageIndexTabs.tsx";

export default function Insurance() {
  const { t } = useTranslation();

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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isShowMode, setIsShowMode] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const DUMMY_DATA = [
    {
      id: 1,
      no: 1,
      title: "Fateme Norouzi",
      insuranceName: "Nahira",
      socialSecurityBranch: "Tehran - 14",
      employerCode: "123456",
      legalRepresentative: "Insurance",
    },
    {
      id: 2,
      no: 2,
      title: "Fateme Norouzi",
      insuranceName: "Nahira",
      socialSecurityBranch: "Tehran - 14",
      employerCode: "123456",
      legalRepresentative: "Insurance",
    },
    {
      id: 3,
      no: 3,
      title: "Fateme Norouzi",
      insuranceName: "Nahira",
      socialSecurityBranch: "Tehran - 14",
      employerCode: "123456",
      legalRepresentative: "Insurance",
    },
    {
      id: 4,
      no: 4,
      title: "Fateme Norouzi",
      insuranceName: "Nahira",
      socialSecurityBranch: "Tehran - 14",
      employerCode: "123456",
      legalRepresentative: "Insurance",
    },
    {
      id: 5,
      no: 5,
      title: "Fateme Norouzi",
      insuranceName: "Nahira",
      socialSecurityBranch: "Tehran - 14",
      employerCode: "123456",
      legalRepresentative: "Insurance",
    },
    {
      id: 6,
      no: 6,
      title: "Fateme Norouzi",
      insuranceName: "Nahira",
      socialSecurityBranch: "Tehran - 14",
      employerCode: "123456",
      legalRepresentative: "Insurance",
    },
    {
      id: 7,
      no: 7,
      title: "Fateme Norouzi",
      insuranceName: "Nahira",
      socialSecurityBranch: "Tehran - 14",
      employerCode: "123456",
      legalRepresentative: "Insurance",
    },
  ];

  const tableColumns = [
    { key: "no", label: "No." },
    { key: "title", label: "Title" },
    { key: "insuranceName", label: "Insurance Name" },
    { key: "socialSecurityBranch", label: "Social Security Branch" },
    { key: "employerCode", label: "Insurance Employer Code" },
    { key: "legalRepresentative", label: "Legal Representative" },
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
                  <PageIndexTabs
                    props={{
                      dynamicElements: (
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
                ),
              }}
            />
            <ModalInsurance
              isEditMode={isEditMode}
              isOpen={isOpen}
              isShowMode={isShowMode}
              onOpenChange={onOpenChange}
            />
            <div className="w-full h-full rounded-4">
              <div className="h-full min-h-fit w-full">
                <div className="flex gap-4 h-full min-h-fit">
                  <div className={`relative w-full`}>
                    <AppTable props={tableProps} />
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
