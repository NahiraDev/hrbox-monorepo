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

import { FormProvider, useFormContext } from "@hrbox/core/providers";
import { Form } from "formik";

import { Avatar } from "@heroui/react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useModal } from "@hrbox/core/hooks";

import { EventModal } from "@hrbox/modules/attendance/modals/EventModal";
import {
  formValidationEvent,
  initialValuesEvent,
  handleSubmitEvent,
} from "@hrbox/modules/attendance/forms/EventForm";
import {
  ModalSize,
  ModalType,
  useModalActions,
  useModalContext,
} from "@hrbox/core/providers/ModalProvider";

export const CalenderHeaderForm = () => {
  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    setSubmitting,
    setErrors,
  } = useFormContext();
  const navigate = useNavigate<any>();
  const location = useLocation();
  const modal = useModal();

  const isTrafficCalender =
    location.pathname === "/attendance/traffic-calender";

  const years = [
    { key: "2025", label: "2025" },
    { key: "2024", label: "2024" },
    { key: "2023", label: "2023" },
  ];

  const months = [
    { key: "January", label: "January" },
    { key: "February", label: "February" },
    { key: "March", label: "March" },
  ];

  const headerInitialValues = {
    month: "",
    year: "",
    person: "",
    department: "",
  };

   const handleOpenEventModal = () => {
    modal.open(
      ModalType.CREATE,
      "event-form",
      <EventModal />, // ✅ فقط component - بدون wrapper
      {
        // ✅ اینجا config برای GlobalModalRenderer
        isForm: true,
        title: "افزودن رویداد",
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
            // ✅ بعد از submit، modal رو ببند
            modal.close(ModalType.CREATE, "event-form");
          },
        },
      },
      ModalSize.MD
    );
  };

  return (
    <form>
      <div className="w-full flex flex-col">
        {/* ======== بخش بالا ======== */}
        <div className="w-full flex flex-row justify-between">
          {/* دکمه‌ها */}
          <div className="flex flex-row gap-3">
            <AppButton
              color={isTrafficCalender ? "white" : "primary"}
              size="md"
              radius="sm"
              startContent={<Profile size={18} />}
              className={isTrafficCalender ? "text-black" : "text-white"}
              onPress={() =>
                navigate({ to: "/attendance/attendance-calender" })
              }
              content="Personal attendance calendar"
            />

            <AppButton
              color={isTrafficCalender ? "primary" : "white"}
              size="md"
              radius="sm"
              className={isTrafficCalender ? "text-white" : "text-black"}
              startContent={<People size={18} />}
              onPress={() => navigate({ to: "/attendance/traffic-calender" })}
              content="Group attendance calendar"
            />
          </div>

          {/* ماه و سال */}
          <div className="flex flex-row gap-3">
            {/* MONTH */}
            <FormField
              name="month"
              label="Month"
              component={AppDropDown}
              props={{
                title: "Month",
                item: months,
              }}
            />

            {/* YEAR */}
            <FormField
              name="year"
              label="Year"
              component={AppDropDown}
              props={{
                title: "Year",
                item: years,
              }}
            />

            <AppButton
              color="white"
              size="md"
              variant="solid"
              radius="lg"
              className="shadow-none border-1 border-primary"
              startContent={<ExportSquare size={20} />}
              onPress={handleOpenEventModal}
              content="Export"
            />
          </div>
        </div>

        {/* ======== بخش پایین ======== */}
        {isTrafficCalender && (
          <div className="flex flex-row items-center justify-between mt-4">
            <div className="flex flex-row items-center gap-3">
              <Avatar
                className="w-10 h-10"
                radius="md"
                src="/images/profile.png"
              />
              <div>
                <p className="text-sm font-open-sans">Zahra Pakniyat</p>
              </div>
            </div>

            <div className="flex flex-row gap-3">
              {/* PERSON */}
              <FormField
                name="person"
                label="Person"
                component={AppDropDown}
                props={{
                  title: "Person",
                  item: months,
                }}
              />

              {/* DEPARTMENT */}
              <FormField
                name="department"
                label="Department/Unit"
                component={AppDropDown}
                props={{
                  title: "Department/Unit",
                  item: months,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
