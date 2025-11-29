import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import PageHeader from "@/components/PageHeader.tsx";
import PageTabs from "@/pages/JudgmentIssued/PageTabs.tsx";
import AppTable from "@/components/AppTable.tsx";
import SelectCalendarWithTime from "@/components/Calendar/SelectCalendarWithTime.tsx";
import GeneralDetails from "@/components/GeneralDetails";
import ModalIndividualOrder from "@/pages/JudgmentIssued/ModalIndividualOrder.tsx";

export default function IndividuaOrder() {
  const [isTableExpanded, setTableIsExpanded] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isShowMode, setIsShowMode] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const DUMMY_DATA = [
    {
      id: 1,
      no: 1,
      employeeId: "1234556",
      fullName: "Zahra",
      title: "Sentencing",
      category: "Salary Increase",
      total: "9,000,000",
      creationDate: "2023/11/10",
    },
    {
      id: 2,
      no: 2,
      employeeId: "2345667",
      fullName: "Ahmad",
      title: "Promotion",
      category: "Position Change",
      total: "12,500,000",
      creationDate: "2023/11/15",
    },
    {
      id: 3,
      no: 3,
      employeeId: "3456778",
      fullName: "Sara",
      title: "Bonus",
      category: "Performance Bonus",
      total: "3,200,000",
      creationDate: "2023/11/20",
    },
    {
      id: 4,
      no: 4,
      employeeId: "4567889",
      fullName: "Hassan",
      title: "Transfer",
      category: "Department Change",
      total: "8,750,000",
      creationDate: "2023/11/25",
    },
    {
      id: 5,
      no: 5,
      employeeId: "5678990",
      fullName: "Maryam",
      title: "Sentencing",
      category: "Salary Increase",
      total: "11,000,000",
      creationDate: "2023/12/01",
    },
    {
      id: 6,
      no: 6,
      employeeId: "6789001",
      fullName: "Ali",
      title: "Warning",
      category: "Disciplinary Action",
      total: "0",
      creationDate: "2023/12/05",
    },
    {
      id: 7,
      no: 7,
      employeeId: "7890112",
      fullName: "Fatima",
      title: "Promotion",
      category: "Grade Increase",
      total: "15,300,000",
      creationDate: "2023/12/10",
    },
    {
      id: 8,
      no: 8,
      employeeId: "8901223",
      fullName: "Omar",
      title: "Bonus",
      category: "Annual Bonus",
      total: "4,500,000",
      creationDate: "2023/12/15",
    },
    {
      id: 9,
      no: 9,
      employeeId: "9012334",
      fullName: "Leila",
      title: "Sentencing",
      category: "Salary Adjustment",
      total: "9,800,000",
      creationDate: "2023/12/20",
    },
    {
      id: 10,
      no: 10,
      employeeId: "0123445",
      fullName: "Karim",
      title: "Transfer",
      category: "Location Change",
      total: "10,200,000",
      creationDate: "2023/12/25",
    },
    {
      id: 11,
      no: 11,
      employeeId: "1234567",
      fullName: "Nadia",
      title: "Promotion",
      category: "Management Role",
      total: "18,000,000",
      creationDate: "2024/01/05",
    },
    {
      id: 12,
      no: 12,
      employeeId: "2345678",
      fullName: "Yusuf",
      title: "Bonus",
      category: "Project Completion",
      total: "6,200,000",
      creationDate: "2024/01/10",
    },
    {
      id: 13,
      no: 13,
      employeeId: "3456789",
      fullName: "Amina",
      title: "Sentencing",
      category: "Salary Increase",
      total: "13,500,000",
      creationDate: "2024/01/15",
    },
    {
      id: 14,
      no: 14,
      employeeId: "4567890",
      fullName: "Rashid",
      title: "Warning",
      category: "Performance Issue",
      total: "0",
      creationDate: "2024/01/20",
    },
    {
      id: 15,
      no: 15,
      employeeId: "5678901",
      fullName: "Khadija",
      title: "Transfer",
      category: "Branch Change",
      total: "7,800,000",
      creationDate: "2024/01/25",
    },
  ];

  const tableColumns = [
    { key: "no", label: "No." },
    { key: "employeeId", label: "Employee ID" },
    { key: "fullName", label: "Full Name" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "total", label: "Total" },
    { key: "creationDate", label: "Creation Date" },
  ];

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
      <ModalIndividualOrder
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
  );
}
