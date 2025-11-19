import {
    ArrowDown,
  ArrowDown2,
  Building,
  Buildings,
  Buildings2,
  Calendar,
  ExportSquare,
  People,
  Profile,
  Profile2User,
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
      <EventModal />, 
      {
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
              content="Personal attendance calendar"
            />

            <AppButton
              color={isTrafficCalender ? "primary" : "white"}
              size="md"
              radius="lg"
              className={isTrafficCalender ? "text-white" : "text-black"}
              startContent={<People size={18} />}
              onPress={() => navigate({ to: "/attendance/traffic-calender" })}
              content="Group attendance calendar"
            />
          </div>
          <div className="flex flex-row gap-3">
            <FormField
              name="month"
              component={AppDropDown}
                title= "Month"
                items= {months}
                size="md"
              radius="lg"
                className= "border-1 border-primary px-3 py-2 gap-2 rounded-lg"
                startIcon={<Calendar size={22} />}
                endIcon={<ArrowDown2 size={20} />}
            />
            <FormField
              name="year"
              component={AppDropDown}
                title= "Year"
                item= {years}
                className= "border-1 border-primary px-3 py-2 gap-2 rounded-lg"
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
              content="Export"
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
              <div>
                <p className="text-sm font-open-sans">Zahra Pakniyat</p>
              </div>
            </div>

            <div className="flex flex-row gap-3">
              <FormField
                name="person"
                component={AppDropDown}
                  title="Person"
                  item= {months}
                  className= "border-1 border-primary px-3 py-2 gap-2 rounded-lg"
                  startIcon={<Profile size={22} />}
                  endIcon={<ArrowDown2 size={20} />}
              />
              <FormField
                name="department"
                component={AppDropDown}
                  title= "Department/Unit"
                  item= {months}
                  className= "border-1 border-primary px-3 py-2 gap-2 rounded-lg"
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
