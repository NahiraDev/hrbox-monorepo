import React, { Key, ReactNode } from "react";
import { DynamicAddModal } from "@hrbox/modules/basic-info/modals/DynamicAddModal";
import { AppButton } from "@hrbox/uikit/components";
import {
  Add,
  Category,
  FolderCross,
  MessageEdit, SearchNormal1, Teacher,
  Trash
} from "iconsax-reactjs";
import { Listbox, ListboxItem } from "@heroui/react";
import { useEffect, useState, useRef } from "react";
import { AppTabs } from "@hrbox/uikit/components";
import { ModalSize, ModalType, useModalContext } from "@hrbox/core/providers/ModalProvider";
import Report from "@hrbox/modules/basic-info/components/Repport";
import { useLocation } from "react-use";
import { useNavigate } from "@tanstack/react-router";
import { Paths } from "../../paths";
import { OrganizationLocationModal } from "@hrbox/modules/basic-info/modals/OrganizationLocationModal";
import {
  formValidationOrganizationLocation,
  initialValuesOrganizationLocation
} from "@hrbox/modules/basic-info/forms/OrganizationLocationForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import { useModal } from "@hrbox/core/hooks";
import JobModal from "@hrbox/modules/basic-info/modals/JobModal";
import EducationModals from "@hrbox/modules/basic-info/modals/EducationModals";
import CoursesModal from "@hrbox/modules/basic-info/modals/CoursesModal";
import AchivementsModals from "@hrbox/modules/basic-info/modals/AchivementsModals";
import { formValidationRelative, initialValuesRelative } from "@hrbox/modules/basic-info/forms/RelativeForm";

interface TabItem {
  key: string;
  title: string;
  href?: string;
}

const EmployeesTab: TabItem[] = [
  {
    key: "personal-information",
    title: "Personal Information",
    href: Paths.BasicInfo.PersonalInformation,
  },
  { key: "documents", title: "Documents", href: Paths.BasicInfo.Documents },
  { key: "jobs", title: "Jobs", href: Paths.BasicInfo.Jobs },
  { key: "education", title: "Educations", href: Paths.BasicInfo.Educations },
  { key: "skills", title: "Skills", href: Paths.BasicInfo.Skills },
  { key: "courses", title: "Courses", href: Paths.BasicInfo.Courses },
  {
    key: "achievements",
    title: "Achievements",
    href: Paths.BasicInfo.Achievements,
  },
  { key: "dependents", title: "Dependents", href: Paths.BasicInfo.Dependents },
  {
    key: "organization-specific-information",
    title: "Organization-Specific Information",
    href: "/basic-info/organization-specific-information",
  },
  { key: "onboarding", title: "Onboarding", href: "/basic-info/onboarding" },
  { key: "offboarding", title: "Offboarding", href: "/basic-info/offboarding" },
  { key: "guidelines", title: "Guidelines", href: "/basic-info/guidelines" },
  { key: "test-report", title: "Test Report", href: "/basic-info/test-report" },
  { key: "contract-list", title: "Contract List", href: "/basic-info/contract-list" },
  { key: "request-list", title: "Request List", href: "/basic-info/request-list" },
  { key: "health-records", title: "Health Records", href: "/basic-info/health-records" },
];

const TABS_WITH_ADD_BUTTON = [
  "education",
  "skills",
  "courses",
  "achievements",
  "jobs",
];

const TABS_WITHOUT_BUTTONS = ["documents", "dependents"];

const ProfileActions = ({ openModal }: { openModal: any }) => (
  <div className="flex gap-1">
    <AppButton
      size="xs"
      radius="sm"
      color="white"
      variant="solid"
      className="p-1 bg-white hover:!bg-primary transition-all duration-200 w-7 h-7"
      content={
        <MessageEdit
          className="text-secondary-1000 group-hover:text-white"
          size={20}
        />
      }
    />
    <AppButton
      size="xs"
      radius="sm"
      variant="light"
      content={
        <Trash
          className="text-secondary-1000 group-hover:text-white"
          size={20}
        />
      }
      className="p-1 bg-white hover:!bg-red-500 transition-all duration-200 w-7 h-7"
    />
  </div>
);

export const AddButton = ({ tab }: AddButtonProps) => {
  const modal = useModal();

  const handleModalJob = (title: string) => {
    modal.open(
      ModalType.CREATE,
      "DynamicAddModal",
      <JobModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Category size={18}/> Software Management Details</div>,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesOrganizationLocation,
          validationSchema: formValidationOrganizationLocation,
          formId: "DynamicAddModal",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.VIEW, "DynamicAddModal");
          },
        },
      },
      ModalSize.XL,
    );
  };

  const handleModalEducation = (title: string) => {
    modal.open(
      ModalType.CREATE,
      "DynamicAddModal",
      <EducationModals />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Teacher size={20}/>Add New Education </div>,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesOrganizationLocation,
          validationSchema: formValidationOrganizationLocation,
          formId: "DynamicAddModal",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.VIEW, "DynamicAddModal");
          },
        },
      },
      ModalSize.XL,
    );
  };

  const handleModalCourses = (title: string) => {
    modal.open(
      ModalType.CREATE,
      "DynamicAddModal",
      <CoursesModal />,
      {
        isForm: true,
        title,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesOrganizationLocation,
          validationSchema: formValidationOrganizationLocation,
          formId: "DynamicAddModal",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.VIEW, "DynamicAddModal");
          },
        },
      },
      ModalSize.XL,
    );
  };

  const handleModalSkills = (title: string) => {
    modal.open(
      ModalType.VIEW,
      "DynamicAddModal",
      <Skills />,
      {
        isForm: true,
        title,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesOrganizationLocation,
          validationSchema: formValidationOrganizationLocation,
          formId: "DynamicAddModal",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.VIEW, "DynamicAddModal");
          },
        },
      },
      ModalSize.XL,
    );
  };

  const handleOpenAchivementsModals = () => {
    modal.open(
      ModalType.CREATE,
      " Documents",
      <AchivementsModals />,
      {
        isForm: true,
        title: "افزودن ",
        submitLabel: "ذخیره",
        cancelLabel: "لغو",
        formConfig: {
          initialValues: initialValuesRelative,
          validationSchema: formValidationRelative,
          formId: "award-form",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.CREATE, "award-form");
          },
        },
      },
      ModalSize.XL,
    );
  };

  const openAddAchievement = () => {
    handleOpenAchivementsModals("Add New Achievement");
  };

  const openAddSkill = () => {
    handleModalSkills("Add New Skill");
  };

  const openAddCourse = () => {
    handleModalCourses("Add New Course");
  };

  const openAddEducation = () => {
    handleModalEducation("Add New Education");
  };

  const openAddJob = () => {
    handleModalJob("Add New Job");
  };

  const addActionMap: Record<string, () => void> = {
    education: openAddEducation,
    skills: openAddSkill,
    courses: openAddCourse,
    achievements: openAddAchievement,
    jobs: openAddJob,
  };

  const handleOpenAddNewOneModals = () => {
    addActionMap[tab]?.();
  };

  return (
    <AppButton
      className="bg-white"
      size="md"
      radius="sm"
      onPress={handleOpenAddNewOneModals}
      content={
        <>
          <Add size={22} />
          <span>Add New One</span>
        </>
      }
    />
  );
};

const EndWorkButton = () => (
  <AppButton
    size="md"
    radius="lg"
    color="danger"
    content={
      <>
        <FolderCross size={22} />
        <span>End of Work Relationship</span>
      </>
    }
  />
);

export const BasicInfoLayout = ({ content }: { content: ReactNode }) => {
  const { openModal } = useModalContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(() => {
    const currentTab = EmployeesTab.find(
      (tab) => tab.href && pathname.includes(tab.href),
    );
    return currentTab?.key || "personal-information";
  });

  useEffect(() => {
    const currentTab = EmployeesTab.find(
      (tab) => tab.href && pathname.includes(tab.href),
    );
    if (currentTab) setSelectedTab(currentTab.key);
  }, [pathname]);

  const showRedButton = selectedTab === "personal-information";
  const showWhiteButton = TABS_WITH_ADD_BUTTON.includes(selectedTab);
  const hideButtons = TABS_WITHOUT_BUTTONS.includes(selectedTab);

  return (
    <div className="bg-[#DCF0F9]/20 border border-primary rounded-xl h-full ">
      <div className="bg-primary w-full rounded-t-xl px-4 pt-4">
        <div className="flex items-center justify-between gap-7">
          <div
            className="w-36 h-36 rounded-lg relative"
            style={{
              backgroundImage: `url('https://i.pravatar.cc/150?u=a04258a2462d826712d')`,
              backgroundSize: "cover",
            }}
          >
            <div className="absolute top-1 right-1">
              <ProfileActions openModal={openModal} />
            </div>
          </div>

          <div className="flex flex-col justify-between w-full gap-7">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-[28px] font-bold text-white">
                  Parisa Babie
                </span>
                <span className="text-xl text-white">Product Designer</span>
                <span className="text-xl text-white">
                  Place of Service:{" "}
                  <span className="font-bold">Headquarters Office</span>
                </span>
              </div>
              <div className="flex items-start gap-2">
                {!hideButtons && (
                  <>
                    {showRedButton && <EndWorkButton />}
                    {showWhiteButton && (
                      <AddButton tab={selectedTab} openModal={openModal} />
                    )}
                  </>
                )}
              </div>
            </div>

            <AppTabs
              fullWidth
              classNames={{
                base: "!p-0",
                tabList: "bg-transparent !p-0 rounded-none overflow-x-auto",
                cursor: "!rounded-b-none bg-[#F1F9FD]",
                panel: "p-0",
                tab: "!p-3 h-[46px] !rounded-0 whitespace-nowrap",
                tabContent:
                  "group-data-[selected=true]:!text-primary-panel text-white text-base font-semibold",
              }}
              color="default"
              radius="sm"
              selectedKey={selectedTab}
              size="xl"
              tabs={EmployeesTab}
              variant="solid"
              onSelectionChange={(key: string) => {
                setSelectedTab(key);
                const tab = EmployeesTab.find((t) => t.key === key);
                if (tab?.href) {
                  navigate(tab.href);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <div className="overflow-y-auto">
            <Report />
          </div>
        </div>
        <div className="col-span-10">{content}</div>
      </div>
    </div>
  );
};