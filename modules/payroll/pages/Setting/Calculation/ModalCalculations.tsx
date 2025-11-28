import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Calculator } from "iconsax-react";

import { AppInput } from "@/components/AppInput.tsx";
import { AppTextArea } from "@/components/AppTextArea.tsx";
import ComputationalCoefficientsShowMode from "@/pages/Setting/Calculation/ComputationalCoefficientsShowMode.tsx";
import InputGrid from "@/components/InputGrid.tsx";
import { AppAutoComplete } from "@/components/AppAutoComplete.tsx";
import AppDatePicker from "@/components/DatePicker/DatePicker.tsx";
import CalculationComputationalCoefficients from "@/pages/Setting/Calculation/CalculationComputationalCoefficients.tsx";

export default function ModalGroupOrder({
  isOpen,
  onOpenChange,
  isShowMode,
  isEditMode,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  isShowMode: boolean;
  isEditMode: boolean;
}) {
  const formik = useFormik({
    initialValues: {
      title: "",
      entireOrganization: "",
      department: "",
      jobTitle: "",
      people: "",
      organizations: "",
      effectiveDate: "",
      descriptions: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("title Required"),
      entireOrganization: Yup.string().required("entireOrganization Required"),
      department: Yup.string().required("department Required"),
      jobTitle: Yup.string().required("jobTitle Required"),
      people: Yup.string().required("people Required"),
      organizations: Yup.string().required("organizations Required"),
      effectiveDate: Yup.string().required("effectiveDate Required"),
      descriptions: Yup.string().required("descriptions Required"),
    }),
    onSubmit: () => {
      onOpenChange();
    },
  });
  const { t } = useTranslation();
  const [checkBoxaValue, setCheckBoxaValue] =
    useState<string>("entireOrganization");

  type CoefficientItem = {
    title: string;
    tax: "Has" | "Has Not";
    insurance: "Has" | "Has Not";
    eleman: string;
    coefficient: number;
    fixedNumber: string;
    years: "Has" | "Has Not";
    calculationInEid: "Has" | "Has Not";
  };

  const DUMMY_DATA: CoefficientItem[] = [
    {
      title: "Overtime",
      tax: "Has",
      insurance: "Has",
      eleman: "None",
      coefficient: 2,
      fixedNumber: "14,000,000 Rial",
      years: "Has",
      calculationInEid: "Has",
    },
    {
      title: "Night Shift",
      tax: "Has Not",
      insurance: "Has",
      eleman: "Plus",
      coefficient: 1.5,
      fixedNumber: "12,500,000 Rial",
      years: "Has Not",
      calculationInEid: "Has",
    },
    {
      title: "Holiday Bonus",
      tax: "Has",
      insurance: "Has Not",
      eleman: "Minus",
      coefficient: 3,
      fixedNumber: "20,000,000 Rial",
      years: "Has",
      calculationInEid: "Has Not",
    },
    {
      title: "Attendance Award",
      tax: "Has",
      insurance: "Has",
      eleman: "Plus",
      coefficient: 2.2,
      fixedNumber: "18,000,000 Rial",
      years: "Has",
      calculationInEid: "Has",
    },
  ];

  const peopleOptions = [
    { value: "1", label: "Alice Johnson" },
    { value: "2", label: "Bob Smith" },
    { value: "3", label: "Carol Davis" },
    { value: "4", label: "David Lee" },
    { value: "5", label: "Eva Green" },
  ];
  const jobTitleOptions = [
    { value: "1", label: "Software Engineer" },
    { value: "2", label: "Project Manager" },
    { value: "3", label: "Data Analyst" },
    { value: "4", label: "HR Specialist" },
    { value: "5", label: "Finance Officer" },
  ];
  const departmentOptions = [
    { value: "1", label: "Engineering" },
    { value: "2", label: "Human Resources" },
    { value: "3", label: "Finance" },
    { value: "4", label: "Marketing" },
    { value: "5", label: "Sales" },
  ];
  const organizationOptions = [
    { value: "1", label: "Entire Organization" },
    { value: "2", label: "Headquarters" },
    { value: "3", label: "Regional Office" },
    { value: "4", label: "Branch A" },
    { value: "5", label: "Branch B" },
  ];

  const selectMap: any = {
    entireOrganization: {
      label: t("entireOrganization"),
      name: "entireOrganization",
      error: formik.errors.entireOrganization,
      data: organizationOptions,
    },
    department: {
      label: t("department"),
      name: "departments",
      error: formik.errors.department,
      data: departmentOptions,
    },
    position: {
      label: t("jobTitle"),
      name: "jobTitle",
      error: formik.errors.jobTitle,
      data: jobTitleOptions,
    },
    people: {
      label: t("personPeople"),
      name: "people",
      error: formik.errors.people,
      data: peopleOptions,
    },
  };

  const selectProps: any = selectMap[checkBoxaValue];

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      className="w-full max-w-[90%]"
      isOpen={isOpen}
      placement="top"
      size="4xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="bg-white dark:bg-[#01101a4d] shadow-md shadow-[rgba(8,14,28,0.22)] dark:shadow-secondary-600 backdrop-blur-[40px] p-12 aria-[modal]:!rounded-6">
        {(onClose) => (
          <div className="flex flex-col gap-8">
            <ModalHeader className="flex flex-col gap-1 !p-0">
              <div className="flex justify-between items-center">
                <div className="bg-primary dark:bg-surface-primary shadow-shadow-light-tight/1 rounded-4 flex items-center gap-2 px-3 py-1.5 w-fit">
                  <Calculator color="#ffffff" />
                  <span className="text-white font-normal text-xl">
                    {isEditMode
                      ? t("editAttendanceOrganizationalCalculations")
                      : isShowMode
                        ? t("showAttendanceOrganizationalCalculations")
                        : t("addNewAttendanceOrganizationalCalculations")}
                  </span>
                </div>
                <Button
                  className="!min-w-fit !rounded-0 w-6 h-6 !p-0"
                  variant="light"
                  onPress={onClose}
                >
                  <svg
                    fill="none"
                    height="25"
                    viewBox="0 0 24 25"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.6465 6.14648C17.8173 5.97563 18.0813 5.95387 18.2754 6.08203L18.3535 6.14648C18.5244 6.31735 18.5461 6.58131 18.418 6.77539L18.3535 6.85352L12.707 12.5L18.3535 18.1465C18.5488 18.3417 18.5488 18.6583 18.3535 18.8535C18.1583 19.0488 17.8417 19.0488 17.6465 18.8535L12 13.207L6.35352 18.8535C6.18265 19.0244 5.91869 19.0461 5.72461 18.918L5.64648 18.8535C5.47563 18.6827 5.45387 18.4187 5.58203 18.2246L5.64648 18.1465L11.293 12.5L5.64648 6.85352C5.47562 6.68265 5.45387 6.41869 5.58203 6.22461L5.64648 6.14648C5.81735 5.97562 6.08131 5.95387 6.27539 6.08203L6.35352 6.14648L12 11.793L17.6465 6.14648Z"
                      fill="#04070E"
                      stroke="#666666"
                    />
                  </svg>
                </Button>
              </div>
            </ModalHeader>
            <ModalBody className="!p-0">
              <Form
                className="w-full flex flex-col gap-6"
                onSubmit={formik.handleSubmit}
              >
                <InputGrid columns={3}>
                  <div className="col-span-full col-start-1 col-end-2">
                    <AppInput
                      props={{
                        label: t("title"),
                        required: false,
                        error: formik.errors.title,
                        name: "title",
                        placeholder: t("describeTitle"),
                        type: "text",
                        value: formik.values.title,
                        formik: formik,
                        isShowMode,
                      }}
                    />
                  </div>
                  <div className="w-full col-span-full">
                    <RadioGroup
                      className="w-full"
                      classNames={{
                        wrapper: "flex flex-row justify-between",
                      }}
                      defaultValue="entireOrganization"
                      isDisabled={isShowMode}
                    >
                      <Radio
                        classNames={{
                          label: "dark:text-white",
                          wrapper:
                            "after:dark:!bg-surface-200 dark:!border-surface-200",
                          control:
                            "dark:!bg-surface-200 dark:!border-surface-200",
                        }}
                        value="entireOrganization"
                        onChange={() => setCheckBoxaValue("entireOrganization")}
                      >
                        {t("entireOrganization")}
                      </Radio>
                      <Radio
                        classNames={{
                          label: "dark:text-white",
                          wrapper:
                            "after:dark:!bg-surface-200 dark:!border-surface-200",
                          control:
                            "dark:!bg-surface-200 dark:!border-surface-200",
                        }}
                        value="department"
                        onChange={() => setCheckBoxaValue("department")}
                      >
                        {t("department")}
                      </Radio>
                      <Radio
                        classNames={{
                          label: "dark:text-white",
                          wrapper:
                            "after:dark:!bg-surface-200 dark:!border-surface-200",
                          control:
                            "dark:!bg-surface-200 dark:!border-surface-200",
                        }}
                        value="jobTitle"
                        onChange={() => setCheckBoxaValue("jobTitle")}
                      >
                        {t("jobTitle")}
                      </Radio>
                      <Radio
                        classNames={{
                          label: "dark:text-white",
                          wrapper:
                            "after:dark:!bg-surface-200 dark:!border-surface-200",
                          control:
                            "dark:!bg-surface-200 dark:!border-surface-200",
                        }}
                        value="people"
                        onChange={() => setCheckBoxaValue("people")}
                      >
                        {t("people")}
                      </Radio>
                    </RadioGroup>
                  </div>
                  <div>
                    {selectProps && (
                      <AppAutoComplete
                        props={{
                          label: selectProps.label,
                          required: false,
                          error: selectProps.error,
                          name: selectProps.name,
                          placeholder: t("describeText"),
                          type: "text",
                          formik: formik,
                          data: selectProps.data,
                          isShowMode,
                        }}
                      />
                    )}
                  </div>

                  <div>
                    <AppDatePicker
                      props={{
                        label: t("effectiveDate"),
                        name: "effectiveDate",
                        isShowMode,
                      }}
                    />
                  </div>

                  <div className="col-span-2">
                    <AppTextArea
                      props={{
                        label: t("descriptions"),
                        required: true,
                        error: formik.errors.descriptions,
                        name: "descriptions",
                        type: "text",
                        value: formik.values.descriptions,
                        formik: formik,
                        isShowMode,
                      }}
                    />
                  </div>
                </InputGrid>
                {isShowMode ? (
                  <ComputationalCoefficientsShowMode
                    props={{
                      data: DUMMY_DATA,
                    }}
                  />
                ) : (
                  <CalculationComputationalCoefficients />
                )}{" "}
              </Form>
            </ModalBody>
            {!isShowMode && (
              <ModalFooter className={`!p-0 flex items-end`}>
                <div className="flex gap-3">
                  <Button
                    className="text-xl font-normal rounded-3"
                    color="default"
                    variant="light"
                    onPress={onClose}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    className="bg-primary dark:bg-surface-200 text-xl font-normal text-white rounded-3"
                    onPress={onClose}
                  >
                    {isEditMode ? t("saveChanges") : t("submit")}
                  </Button>
                </div>
              </ModalFooter>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
