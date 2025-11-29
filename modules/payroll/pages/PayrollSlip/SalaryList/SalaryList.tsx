import { Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/PageHeader.tsx";
import AppTable from "@/components/AppTable.tsx";
import { PayrollSlipLayout } from "@/pages/PayrollSlip/Layout.tsx";
import SalaryListTabs from "@/pages/PayrollSlip/SalaryList/SalaryListTabs.tsx";
import { routeUrls } from "@/routes";

export default function SalaryList() {
  const navigate = useNavigate();
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
    { key: "photo", label: "Photo" },
    { key: "personnelID", label: "Personnel ID" },
    { key: "name", label: "Name" },
    { key: "company", label: "Company" },
    { key: "position", label: "Position" },
    { key: "dateOfEmployment", label: "Date of Employment" },
  ];
  const DUMMY_DATA = [
    {
      no: 1,
      photo: "https://picsum.photos/200",
      personnelID: "1212344",
      name: "Z.P",
      company: "HRBOX",
      position: "Designer",
      dateOfEmployment: "2023/10/11",
    },
    {
      no: 2,
      photo: "https://picsum.photos/200",
      personnelID: "1212344",
      name: "Z.P",
      company: "HRBOX",
      position: "Designer",
      dateOfEmployment: "2023/10/11",
    },
    {
      no: 3,
      photo: "https://picsum.photos/200",
      personnelID: "1212344",
      name: "Z.P",
      company: "HRBOX",
      position: "Designer",
      dateOfEmployment: "2023/10/11",
    },
    {
      no: 4,
      photo: "https://picsum.photos/200",
      personnelID: "1212344",
      name: "Z.P",
      company: "HRBOX",
      position: "Designer",
      dateOfEmployment: "2023/10/11",
    },
    {
      no: 5,
      photo: "https://picsum.photos/200",
      personnelID: "1212344",
      name: "Z.P",
      company: "HRBOX",
      position: "Designer",
      dateOfEmployment: "2023/10/11",
    },
    {
      no: 6,
      photo: "https://picsum.photos/200",
      personnelID: "1212344",
      name: "Z.P",
      company: "HRBOX",
      position: "Designer",
      dateOfEmployment: "2023/10/11",
    },
    {
      no: 7,
      photo: "https://picsum.photos/200",
      personnelID: "1212344",
      name: "Z.P",
      company: "HRBOX",
      position: "Designer",
      dateOfEmployment: "2023/10/11",
    },
    {
      no: 8,
      photo: "https://picsum.photos/200",
      personnelID: "1212344",
      name: "Z.P",
      company: "HRBOX",
      position: "Designer",
      dateOfEmployment: "2023/10/11",
    },
  ];

  function navigateToCalculationDetails(id: number) {
    navigate(routeUrls.paySlipList + "/" + id);
  }
  const tableProps = {
    data: DUMMY_DATA,
    columns: tableColumns,
    customCell: (col: any, row: any) => {
      if (col.key === "photo") {
        return (
          <Image
            alt={row.name}
            className="w-7 h-7 rounded-[5px] object-cover"
            classNames={{
              wrapper: "mx-auto",
            }}
            src={row.photo}
          />
        );
      }

      return row[col.key];
    },
    onOpenShowDialog: (rowId: number) => {
      navigateToCalculationDetails(rowId);
    },
    hasPagination: true,
    noActions: true,
  };

  return (
    <PayrollSlipLayout
      props={{
        children: (
          <>
            <PageHeader
              props={{
                children: (
                  <SalaryListTabs
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
