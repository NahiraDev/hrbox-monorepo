import { useState } from "react";
import { useDisclosure } from "@heroui/react";

import { SettingLayout } from "@/pages/Setting/Layout.tsx";
import PageTabs from "@/pages/Setting/Parameters/PageTabs.tsx";
import AppTable from "@/components/AppTable.tsx";
import PageHeader from "@/components/PageHeader.tsx";
import ModalLegalParameters from "@/pages/Setting/Parameters/ModalLegalParameters.tsx";

export default function LegalParameters() {
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
      title: "1403 parameters",
      baseSalary: "14,000,000",
      childAllowance: "14,000,000",
      goodsVoucher: "14,000,000",
      housingAllowance: "14,000,000",
      foodAllowance: "14,000,000",
      severancePay: "14,000,000",
      effectiveDate: "2024/05/05",
    },
    {
      id: 2,
      no: 2,
      title: "1403 parameters",
      baseSalary: "14,500,000",
      childAllowance: "14,500,000",
      goodsVoucher: "14,500,000",
      housingAllowance: "14,500,000",
      foodAllowance: "14,500,000",
      severancePay: "14,500,000",
      effectiveDate: "2024/05/05",
    },
    {
      id: 3,
      no: 3,
      title: "1403 parameters",
      baseSalary: "15,000,000",
      childAllowance: "15,000,000",
      goodsVoucher: "15,000,000",
      housingAllowance: "15,000,000",
      foodAllowance: "15,000,000",
      severancePay: "15,000,000",
      effectiveDate: "2024/05/05",
    },
    {
      id: 4,
      no: 4,
      title: "1403 parameters",
      baseSalary: "15,500,000",
      childAllowance: "15,500,000",
      goodsVoucher: "15,500,000",
      housingAllowance: "15,500,000",
      foodAllowance: "15,500,000",
      severancePay: "15,500,000",
      effectiveDate: "2024/05/05",
    },
    {
      id: 5,
      no: 5,
      title: "1403 parameters",
      baseSalary: "16,000,000",
      childAllowance: "16,000,000",
      goodsVoucher: "16,000,000",
      housingAllowance: "16,000,000",
      foodAllowance: "16,000,000",
      severancePay: "16,000,000",
      effectiveDate: "2024/05/05",
    },
    {
      id: 6,
      no: 6,
      title: "1403 parameters",
      baseSalary: "16,500,000",
      childAllowance: "16,500,000",
      goodsVoucher: "16,500,000",
      housingAllowance: "16,500,000",
      foodAllowance: "16,500,000",
      severancePay: "16,500,000",
      effectiveDate: "2024/05/05",
    },
    {
      id: 7,
      no: 7,
      title: "1403 parameters",
      baseSalary: "17,000,000",
      childAllowance: "17,000,000",
      goodsVoucher: "17,000,000",
      housingAllowance: "17,000,000",
      foodAllowance: "17,000,000",
      severancePay: "17,000,000",
      effectiveDate: "2024/05/05",
    },
    {
      id: 8,
      no: 8,
      title: "1403 parameters",
      baseSalary: "17,500,000",
      childAllowance: "17,500,000",
      goodsVoucher: "17,500,000",
      housingAllowance: "17,500,000",
      foodAllowance: "17,500,000",
      severancePay: "17,500,000",
      effectiveDate: "2024/05/05",
    },
  ];

  const tableColumns = [
    { key: "no", label: "No." },
    { key: "title", label: "Title" },
    { key: "baseSalary", label: "Base Salary" },
    { key: "childAllowance", label: "Child Allowance" },
    { key: "goodsVoucher", label: "Goods Voucher" },
    { key: "housingAllowance", label: "Housing Allowance" },
    { key: "foodAllowance", label: "Food Allowance" },
    { key: "severancePay", label: "Severance Pay" },
    { key: "effectiveDate", label: "Effective Date" },
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
            <ModalLegalParameters
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
