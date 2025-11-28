import { useTranslation } from "react-i18next";
import { Tooltip } from "@heroui/tooltip";
import {
  Button,
  Image,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { DocumentDownload, Trash } from "iconsax-react";

import PageHeader from "@/components/PageHeader.tsx";
import { ReportsLayout } from "@/pages/Reporting/Layout.tsx";
import NoData from "@/components/NoData.tsx";
import PageTabs from "@/pages/Reporting/LegalReports/Eid/PageTabs.tsx";
import PageIndexTabs from "@/pages/Reporting/LegalReports/PageIndexTabs.tsx";
import AppTable from "@/components/AppTable.tsx";
import { CloseIcon } from "@/icons/CloseIcon.tsx";

export default function Index() {
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
    { key: "photo", label: "Photo" },
    { key: "employeeCode", label: "Employee Code" },
    { key: "fullName", label: "Full Name" },
    { key: "organizationName", label: "Organization Name" },
    { key: "branch", label: "Branch" },
    { key: "jobTitle", label: "Job Title" },
    { key: "dateOfEmployment", label: "Date Of Employment" },
    { key: "status", label: "Status" },
  ];

  const DUMMY_DATA = [
    {
      no: 1,
      photo: "https://picsum.photos/200",
      employeeCode: "1212344",
      fullName: "Abolfazl Abbaspour",
      organizationName: "HRBOX",
      branch: "Digi.S",
      jobTitle: "Front-end Developer",
      dateOfEmployment: "27 April",
      status: { daysLeft: 21, color: "green" },
    },
    {
      no: 2,
      photo: "https://picsum.photos/200",
      employeeCode: "1212344",
      fullName: "Abolfazl Abbaspour",
      organizationName: "HRBOX",
      branch: "Digi.S",
      jobTitle: "Front-end Developer",
      dateOfEmployment: "27 April",
      status: { daysLeft: 21, color: "green" },
    },
    {
      no: 3,
      photo: "https://picsum.photos/200",
      employeeCode: "1212344",
      fullName: "Abolfazl Abbaspour",
      organizationName: "HRBOX",
      branch: "Digi.S",
      jobTitle: "Front-end Developer",
      dateOfEmployment: "27 April",
      status: { daysLeft: 14, color: "orange" },
    },
    {
      no: 4,
      photo: "https://picsum.photos/200",
      employeeCode: "1212344",
      fullName: "Abolfazl Abbaspour",
      organizationName: "HRBOX",
      branch: "Digi.S",
      jobTitle: "Front-end Developer",
      dateOfEmployment: "27 April",
      status: { daysLeft: 14, color: "orange" },
    },
    {
      no: 5,
      photo: "https://picsum.photos/200",
      employeeCode: "1212344",
      fullName: "Abolfazl Abbaspour",
      organizationName: "HRBOX",
      branch: "Digi.S",
      jobTitle: "Front-end Developer",
      dateOfEmployment: "27 April",
      status: { daysLeft: 2, color: "red" },
    },
    {
      no: 6,
      photo: "https://picsum.photos/200",
      employeeCode: "1212344",
      fullName: "Abolfazl Abbaspour",
      organizationName: "HRBOX",
      branch: "Digi.S",
      jobTitle: "Front-end Developer",
      dateOfEmployment: "27 April",
      status: { daysLeft: 2, color: "red" },
    },
    {
      no: 7,
      photo: "https://picsum.photos/200",
      employeeCode: "1212344",
      fullName: "Abolfazl Abbaspour",
      organizationName: "HRBOX",
      branch: "Digi.S",
      jobTitle: "Front-end Developer",
      dateOfEmployment: "27 April",
      status: { daysLeft: 2, color: "red" },
    },
    {
      no: 8,
      photo: "https://picsum.photos/200",
      employeeCode: "1212344",
      fullName: "Abolfazl Abbaspour",
      organizationName: "HRBOX",
      branch: "Digi.S",
      jobTitle: "Front-end Developer",
      dateOfEmployment: "27 April",
      status: { daysLeft: 2, color: "red" },
    },
  ];

  const customActions = () => (
    <div className="flex gap-2 justify-center">
      <Tooltip className="flex justify-center" content={t("download")}>
        <Button className="!min-w-fit !p-0 !w-4 !h-4 !rounded-0 !bg-transparent">
          <span className="text-lg cursor-pointer">
            <DocumentDownload size="16" />
          </span>
        </Button>
      </Tooltip>
      <Tooltip className="flex justify-center" content={t("delete")}>
        <Button
          className="!min-w-fit !p-0 !w-4 !h-4 !rounded-0 !bg-transparent"
          onPress={onOpen}
        >
          <span className="text-lg cursor-pointer">
            <Trash size="16" />
          </span>
        </Button>
      </Tooltip>
    </div>
  );

  const tableProps = {
    data: DUMMY_DATA,
    columns: tableColumns,
    customActions,
    customCell: (col: any, row: any) => {
      if (col.key === "status") {
        const { daysLeft } = row[col.key];

        return (
          <span
            className={`px-2 py-1 rounded-4 text-white text-xs font-[400] whitespace-nowrap ${
              daysLeft > 15
                ? "bg-success-400"
                : daysLeft < 5
                  ? "bg-danger-400"
                  : "bg-warning-400"
            }`}
          >
            {daysLeft} {t("daysLeft")}
          </span>
        );
      }

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
  };

  return (
    <ReportsLayout
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
                              DUMMY_EMPLOYEES,
                              DUMMY_NAMELIST,
                              DUMMY_SORTS,
                            },
                          }}
                        />
                      ),
                    }}
                  />
                ),
              }}
            />
            <Modal
              hideCloseButton
              backdrop="blur"
              isOpen={isOpen}
              size="2xl"
              onOpenChange={onOpenChange}
            >
              <ModalContent className="rounded-[12px] bg-white dark:info-1000 border-1 border-danger p-12">
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col">
                      <div className="flex justify-between items-center w-full">
                        <div className="bg-danger flex gap-2 !rounded-4 !px-3 !py-1.5 items-center">
                          <Trash className="text-white" size="18" />
                          <span className="text-xl text-white font-normal leading-normal">
                            {t("wouldItBeAcceptableForYouToRemoveThis")}?
                          </span>
                        </div>
                        <Button
                          className="!w-6 !h-6 !p-0 !min-w-fit !rounded-0"
                          variant="light"
                          onPress={onClose}
                        >
                          <CloseIcon />
                        </Button>
                      </div>
                    </ModalHeader>
                    <ModalFooter>
                      <Button
                        className="text-secondary-800 !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit"
                        color="default"
                        variant="light"
                        onPress={onClose}
                      >
                        {t("cancel")}
                      </Button>
                      <Button
                        className="bg-danger text-white !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit"
                        onPress={() => {
                          onClose();
                        }}
                      >
                        {t("delete")}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            {DUMMY_DATA ? (
              <div className="w-full h-full rounded-4">
                <div className="h-full min-h-fit w-full">
                  <div className="flex gap-4 h-full min-h-fit">
                    <div className={`relative w-full`}>
                      <AppTable props={tableProps} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-main-light dark:bg-[rgba(4,66,92,0.60)] dark:border-surface-200 rounded-5 border border-primary">
                <div>
                  <NoData
                    props={{
                      message:
                        t("thereIsNoReportOnThisPage") +
                        ". " +
                        t("clickToCreateAReport"),
                    }}
                  />
                </div>
              </div>
            )}
          </>
        ),
      }}
    />
  );
}
