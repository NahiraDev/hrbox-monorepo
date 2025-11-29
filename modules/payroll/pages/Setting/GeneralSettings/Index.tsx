import { useTranslation } from "react-i18next";
import { Accordion, AccordionItem } from "@heroui/react";

import { SettingLayout } from "@/pages/Setting/Layout.tsx";
import PageIndexTabs from "@/pages/Setting/PageIndexTabs.tsx";
import InitialSettings from "@/pages/Setting/GeneralSettings/InitialSettings.tsx";
import EidSettings from "@/pages/Setting/GeneralSettings/EidSettings.tsx";
import GeneralCompensationSettings from "@/pages/Setting/GeneralSettings/GeneralCompensationSettings.tsx";
import { AppSwitch } from "@/components/AppSwitch.tsx";
import { AppInput } from "@/components/AppInput.tsx";
import PageTabs from "@/pages/Setting/GeneralSettings/PageTabs.tsx";
import PageHeader from "@/components/PageHeader.tsx";

export default function Index() {
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
            <div className="grid grid-cols-4 gap-4 h-full">
              <div className="overflow-auto">
                <InitialSettings props={{}} />
              </div>
              <div className="overflow-auto">
                <EidSettings props={{}} />
              </div>
              <div className="overflow-auto">
                <GeneralCompensationSettings
                  props={{
                    children: (
                      <div className="flex flex-col gap-4 mt-4">
                        <div className="bg-surface dark:bg-surface-150 p-3 rounded-4">
                          <AppSwitch
                            props={{
                              children: (
                                <p className="text-secondary-1000 dark:text-white">
                                  {t("automaticOrderIssuance")}
                                </p>
                              ),
                            }}
                          />
                        </div>
                        <div className="bg-surface dark:bg-surface-150 p-3 rounded-4">
                          <AppSwitch
                            props={{
                              children: (
                                <p className="text-secondary-1000 dark:text-white">
                                  {t("issuanceOfYearsOfServiceOrder")}
                                </p>
                              ),
                            }}
                          />
                        </div>
                        <div className="bg-surface dark:bg-surface-150 p-3 rounded-4">
                          <Accordion className="p-0">
                            <AccordionItem
                              aria-label={t("issuanceOfChildAllowanceOrder")}
                              classNames={{
                                title:
                                  "text-sm text-secondary-1000 dark:text-white",
                              }}
                              startContent={<AppSwitch props={{}} />}
                              title={t("issuanceOfChildAllowanceOrder")}
                            >
                              <div className="flex justify-between items-center text-sm text-secondary-1000 dark:text-white w-full">
                                <p className="flex-1">
                                  {t("maximumNoChildren")}
                                </p>
                                <AppInput
                                  props={{
                                    classNames: {
                                      inputWrapper: "shadow-lg !bg-info-1000",
                                      base: "w-1/3",
                                      input: "text-center",
                                    },
                                  }}
                                />
                              </div>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </div>
                    ),
                  }}
                />
              </div>
              <div>
                <GeneralCompensationSettings props={{}} />
              </div>
            </div>
          </>
        ),
      }}
    />
  );
}
