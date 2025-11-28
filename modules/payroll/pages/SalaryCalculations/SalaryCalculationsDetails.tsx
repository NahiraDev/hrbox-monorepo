import { useDisclosure } from "@heroui/react";

import { SalaryCalculationsLayout } from "@/pages/SalaryCalculations/Layout.tsx";
import PageHeader from "@/components/PageHeader.tsx";
import SalaryDetailTabs from "@/pages/SalaryCalculations/SalaryDetailTabs.tsx";
import AppTable from "@/components/AppTable.tsx";

export default function SalaryCalculationsDetails() {
  const { onOpen } = useDisclosure();
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
  const DUMMY_DATA = [
    {
      No: 1,
      Id: 1,
      EmployeeID: "12334",
      FullName: "Reza Ebtekajo",
      JobTitle: "CEO",
      DepartmentUnit: "Management",
      NoDays: "20 Days",
      EndOfYearBonus: "4,000,000",
      BonusesAndBenefits: "4,000,000",
      Status: "Pending",
      editable: true,
    },
    {
      No: 2,
      Id: 2,
      EmployeeID: "12334",
      FullName: "Reza Ebtekajo",
      JobTitle: "CEO",
      DepartmentUnit: "Management",
      NoDays: "20 Days",
      EndOfYearBonus: "4,000,000",
      BonusesAndBenefits: "4,000,000",
      Status: "Pending",
      editable: true,
    },
    {
      No: 3,
      Id: 3,
      EmployeeID: "12334",
      FullName: "Reza Ebtekajo",
      JobTitle: "CEO",
      DepartmentUnit: "Management",
      NoDays: "20 Days",
      EndOfYearBonus: "4,000,000",
      BonusesAndBenefits: "4,000,000",
      Status: "Pending",
      editable: true,
    },
    {
      No: 4,
      Id: 4,
      EmployeeID: "12334",
      FullName: "Reza Ebtekajo",
      JobTitle: "CEO",
      DepartmentUnit: "Management",
      NoDays: "20 Days",
      EndOfYearBonus: "4,000,000",
      BonusesAndBenefits: "4,000,000",
      Status: "Pending",
      editable: true,
    },
    {
      No: 5,
      Id: 5,
      EmployeeID: "12334",
      FullName: "Reza Ebtekajo",
      JobTitle: "CEO",
      DepartmentUnit: "Management",
      NoDays: "20 Days",
      EndOfYearBonus: "4,000,000",
      BonusesAndBenefits: "4,000,000",
      Status: "Pending",
      editable: true,
    },
    {
      No: 6,
      Id: 6,
      EmployeeID: "12334",
      FullName: "Reza Ebtekajo",
      JobTitle: "CEO",
      DepartmentUnit: "Management",
      NoDays: "20 Days",
      EndOfYearBonus: "4,000,000",
      BonusesAndBenefits: "4,000,000",
      Status: "Pending",
      editable: true,
    },
    {
      No: 7,
      Id: 7,
      EmployeeID: "12334",
      FullName: "Reza Ebtekajo",
      JobTitle: "CEO",
      DepartmentUnit: "Management",
      NoDays: "20 Days",
      EndOfYearBonus: "4,000,000",
      BonusesAndBenefits: "4,000,000",
      Status: "Pending",
      editable: true,
    },
    {
      No: 8,
      Id: 8,
      EmployeeID: "12334",
      FullName: "Reza Ebtekajo",
      JobTitle: "CEO",
      DepartmentUnit: "Management",
      NoDays: "20 Days",
      EndOfYearBonus: "4,000,000",
      BonusesAndBenefits: "4,000,000",
      Status: "Pending",
      editable: true,
    },
  ];

  const tableColumns = [
    { key: "No", label: "No." },
    { key: "EmployeeID", label: "Employee ID" },
    { key: "FullName", label: "Full Name" },
    { key: "JobTitle", label: "Job Title" },
    { key: "DepartmentUnit", label: "Department/Unit" },
    { key: "NoDays", label: "No. Days" },
    { key: "EndOfYearBonus", label: "End-of-Year Bonus" },
    { key: "BonusesAndBenefits", label: "Bonuses and Benefits" },
    { key: "Status", label: "Status" },
  ];

  const tableProps = {
    data: DUMMY_DATA,
    columns: tableColumns,
    onOpenEditDialog: () => {
      onOpen();
    },
    onOpenShowDialog: () => {
      onOpen();
    },
    hasPagination: true,
    hasPadding: true,
    hasShadow: true,
    hasRowBorder: true,
    selectionMode: "multiple",
    hasRowEdit: true,
  };

  return (
    <SalaryCalculationsLayout
      props={{
        children: (
          <>
            <PageHeader
              props={{
                children: (
                  <SalaryDetailTabs
                    props={{
                      data: {
                        DUMMY_SORTS,
                        DUMMY_NAMELIST,
                        DUMMY_EMPLOYEES,
                      },
                    }}
                  />
                ),
              }}
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
