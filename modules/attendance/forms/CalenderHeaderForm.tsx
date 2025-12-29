import {
  ArrowDown2,
  Buildings2,
  Calendar,
  ExportSquare,
  People,
  Profile,
} from "iconsax-reactjs";

import { AppDropDown } from "@hrbox/uikit/components/AppDropDown";
import { AppButton } from "@hrbox/uikit/components";
import { FormField } from "@hrbox/uikit/components/FormField";

import { Avatar } from "@heroui/react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useModal } from "@hrbox/core/hooks";

import { EventModal } from "@hrbox/modules/attendance/modals/EventModal";
import {
  formValidationEvent,
  initialValuesEvent,
  handleSubmitEvent,
} from "@hrbox/modules/attendance/forms/EventForm";
import { ModalSize, ModalType } from "@hrbox/core/providers/ModalProvider";
import { useTranslation } from "react-i18next";
import { ReportPersonnal } from "../app/mock";
import { useMemo } from "react";
import { useFormContext } from "@hrbox/core/providers/FormProvider";

export const CalenderHeaderForm = () => {
  const navigate = useNavigate<any>();
  const location = useLocation();
  const modal = useModal();
  const { t } = useTranslation();
  const { handleSubmit, values, setFieldValue } = useFormContext();

  const isTrafficCalender = location.pathname === "/attendance/traffic-calender";

  // ============= STATIC: تمام 12 ماه =============
  const allMonths = [
    { key: "01", label: "January" },
    { key: "02", label: "February" },
    { key: "03", label: "March" },
    { key: "04", label: "April" },
    { key: "05", label: "May" },
    { key: "06", label: "June" },
    { key: "07", label: "July" },
    { key: "08", label: "August" },
    { key: "09", label: "September" },
    { key: "10", label: "October" },
    { key: "11", label: "November" },
    { key: "12", label: "December" },
  ];

  // ============= STATIC: آخرین 4 سال =============
  const allYears = [
    { key: "2025", label: "2025" },
    { key: "2024", label: "2024" },
    { key: "2023", label: "2023" },
    { key: "2022", label: "2022" },
  ];

  // ============= DYNAMIC: افراد از داده‌ها =============
  const uniquePersons = useMemo(() => {
    const persons = new Set<string>();
    ReportPersonnal.forEach((record) => {
      persons.add(record.person);
    });
    return Array.from(persons)
      .sort()
      .map((person) => ({
        key: person,
        label: person,
      }));
  }, []);

  // ============= DYNAMIC: بخش‌ها از داده‌ها =============
  const uniqueDepartments = useMemo(() => {
    const departments = new Set<string>();
    ReportPersonnal.forEach((record) => {
      departments.add(record.department);
    });
    return Array.from(departments)
      .sort()
      .map((department) => ({
        key: department,
        label: department,
      }));
  }, []);

  const handleOpenEventModal = () => {
    modal.open(
      ModalType.CREATE,
      "event-form",
      <EventModal />,
      {
        isForm: true,
        submitLabel: "ذخیره",
        cancelLabel: "لغو",
        formConfig: {
          initialValues: initialValuesEvent,
          validationSchema: formValidationEvent,
          formId: "event-form",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitEvent(values);
            modal.close(ModalType.CREATE, "event-form");
          },
        },
      },
      ModalSize.MD
    );
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFieldValue(fieldName, value);
  };

    const getMonthLabel = (monthKey: string) => {
    return allMonths.find((m) => m.key === monthKey)?.label || "";
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row gap-3">
            <AppButton
              color={isTrafficCalender ? "white" : "primary"}
              size="md"
              radius="lg"
              startContent={<Profile size={18} />}
              className={isTrafficCalender ? "text-black" : "text-white"}
              onPress={() =>
                navigate({ to: "/attendance/attendance-calender" })
              }
              content={t("Personal_attendance_calendar")}
            />

            <AppButton
              color={isTrafficCalender ? "primary" : "white"}
              size="md"
              radius="lg"
              className={isTrafficCalender ? "text-white" : "text-black"}
              startContent={<People size={18} />}
              onPress={() => navigate({ to: "/attendance/traffic-calender" })}
              content={t("group_attendance_calendar")}
            />
          </div>
          <div className="flex flex-row gap-3">
              <FormField
              name="month"
              component={AppDropDown}
               title={
                values.month
                  ? `${getMonthLabel(values.month)}`
                  : t("month")
              }
              items={allMonths}
              valueKey="key"
              labelKey="label"
              onChange={(value: any) => handleFieldChange("month", value)}
              size="md"
              radius="lg"
               onSelectionChange={(value: any) =>
                handleFieldChange("month", value)
              }
              startIcon={<Calendar size={22} />}
              endIcon={<ArrowDown2 size={20} />}
            />

           <FormField
              name="year"
              component={AppDropDown}
                title={
                values.year
                  ? `${values.year}`
                  : t("year")
              }
              items={allYears}
              valueKey="key"
              labelKey="label"
              onChange={(value: any) => handleFieldChange("year", value)}
              size="md"
              radius="lg"
              startIcon={<Calendar size={22} />}
              endIcon={<ArrowDown2 size={20} />}
            />

            <AppButton
              color="white"
              size="md"
              variant="solid"
              radius="lg"
              className="shadow-none border-1 border-primary"
              startContent={<ExportSquare size={20} />}
              onPress={handleOpenEventModal}
              content={t("export")}
            />
          </div>
        </div>
        {isTrafficCalender && (
          <div className="flex flex-row items-center justify-between mt-3">
            <div className="flex flex-row items-center gap-3">
              <Avatar
                className="w-10 h-10"
                radius="md"
                src="/images/profile.png"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-open-sans">Zahra Pakniyat</p>
                <div className="py-0.5 px-1 rounded-md border border-[#DCF0F9] bg-[#DCF0F940]">
                  <p className="text-primary text-[10px] text-center ">
                    UiUx Designer
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-3">
              <FormField
                name="person"
                component={AppDropDown}
                title={
                  values.person?`${values.person}`:t("person")
                }
                items={uniquePersons}
                className="border-1 border-primary px-3 py-2 gap-2 rounded-lg"
                valueKey="key"
                onChange={(value: any) =>
                  handleFieldChange("person", value)
                }
                startIcon={<Profile size={22} />}
                endIcon={<ArrowDown2 size={20} />}
              />
              <FormField
                name="department"
                component={AppDropDown}
                title={
                  values.department?`${values.department}`:t("department/unit")
                }
                items={uniqueDepartments}
                valueKey="key"
                onChange={(value: any) =>
                  handleFieldChange("department", value)
                }
                className="border-1 border-primary px-3 py-2 gap-2 rounded-lg"
                startIcon={<Buildings2 size={22} />}
                endIcon={<ArrowDown2 size={20} />}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};