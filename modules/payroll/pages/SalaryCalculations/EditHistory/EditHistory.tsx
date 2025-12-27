import { Button, useDisclosure } from "@heroui/react";
import { Refresh2 } from "iconsax-react";
import { Tooltip } from "@heroui/tooltip";
import { useTranslation } from "react-i18next";

import { SalaryCalculationsLayout } from "@/pages/SalaryCalculations/Layout.tsx";
import PageHeader from "@/components/PageHeader.tsx";
import AppTable from "@/components/AppTable.tsx";
import PageTabs from "@/pages/SalaryCalculations/EditHistory/PageTabs.tsx";
import EditDetailModal from "@/pages/SalaryCalculations/EditHistory/EditDetail.tsx";

export default function EditHistory() {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  const tableColumns = [
    { key: "no", label: "No." },
    { key: "employeeID", label: "Employee ID" },
    { key: "fullName", label: "Full Name" },
    { key: "modifierUser", label: "Modifier User" },
    { key: "changeType", label: "Change Type" },
    { key: "editDate", label: "Edit Date" },
    { key: "editTime", label: "Edit Time" },
  ];

  const DUMMY_DATA = [
    {
      no: 1,
      employeeID: "1234",
      fullName: "Reza Eftekhari",
      modifierUser: "Zahra Pakniyat",
      changeType: "Edit",
      editDate: "2022/05/12",
      editTime: "22:00",
    },
    {
      no: 2,
      employeeID: "1234",
      fullName: "Reza Eftekhari",
      modifierUser: "Zahra Pakniyat",
      changeType: "Edit",
      editDate: "2022/05/12",
      editTime: "22:00",
    },
    {
      no: 3,
      employeeID: "1234",
      fullName: "Reza Eftekhari",
      modifierUser: "Zahra Pakniyat",
      changeType: "Edit",
      editDate: "2022/05/12",
      editTime: "22:00",
    },
    {
      no: 4,
      employeeID: "1234",
      fullName: "Reza Eftekhari",
      modifierUser: "Zahra Pakniyat",
      changeType: "Edit",
      editDate: "2022/05/12",
      editTime: "22:00",
    },
    {
      no: 5,
      employeeID: "1234",
      fullName: "Reza Eftekhari",
      modifierUser: "Zahra Pakniyat",
      changeType: "Edit",
      editDate: "2022/05/12",
      editTime: "22:00",
    },
    {
      no: 6,
      employeeID: "1234",
      fullName: "Reza Eftekhari",
      modifierUser: "Zahra Pakniyat",
      changeType: "Edit",
      editDate: "2022/05/12",
      editTime: "22:00",
    },
    {
      no: 7,
      employeeID: "1234",
      fullName: "Reza Eftekhari",
      modifierUser: "Zahra Pakniyat",
      changeType: "Edit",
      editDate: "2022/05/12",
      editTime: "22:00",
    },
    {
      no: 8,
      employeeID: "1234",
      fullName: "Reza Eftekhari",
      modifierUser: "Zahra Pakniyat",
      changeType: "Edit",
      editDate: "2022/05/12",
      editTime: "22:00",
    },
  ];

  const detailsOfChanges = {
    userName: "Dr.R.E",
    personnelCode: "1234567",
    modifierUser: {
      name: "Zahra Pakniyat",
      role: "UI/UX Designer",
      avatar: "https://picsum.photo/200",
      ipAddress: "192.168.1.1",
      date: "2023/11/10",
      time: "17:00",
    },
    changes: [
      {
        no: 1,
        title: "Parameter",
        before: "112",
        after: "12",
      },
      {
        no: 2,
        title: "Parameter",
        before: "112",
        after: "12",
      },
    ],
  };

  const revertActions = () => (
    <Tooltip className="flex justify-center" content={t("revert")}>
      <Button className="!min-w-fit !p-0 !w-4 !h-4 !rounded-0 !bg-transparent">
        <span className="text-lg cursor-pointer">
          <Refresh2 size="16" />
        </span>
      </Button>
    </Tooltip>
  );

  const tableProps = {
    data: DUMMY_DATA,
    columns: tableColumns,
    hasPagination: true,
    customActions: revertActions,
    onOpenShowDialog: () => {
      onOpen();
    },
  };

  return (
    <SalaryCalculationsLayout
      props={{
        children: (
          <>
            <PageHeader
              props={{
                children: (
                  <PageTabs
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
            <EditDetailModal
              props={{
                isOpen: isOpen,
                onOpenChange: onOpenChange,
                data: detailsOfChanges,
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
