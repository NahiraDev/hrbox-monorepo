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

import { AppInput } from "../../components/AppInput.tsx";

import { Candle } from "@/icons/Candle.tsx";
import ComputationalCoefficients from "@/pages/JudgmentIssued/ComputationalCoefficients.tsx";
import { AppAutoComplete } from "@/components/AppAutoComplete.tsx";
import InputGrid from "@/components/InputGrid.tsx";
import AppDatePicker from "@/components/DatePicker/DatePicker.tsx";
import { AppTextArea } from "@/components/AppTextArea.tsx";
import ComputationalCoefficientsShowMode from "@/pages/JudgmentIssued/ComputationalCoefficientsShowMode.tsx";

export default function ModalIndividualOrder({
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
      organizations: "",
      departmentsUnits: "",
      person: "",
      name: "",
      types: "",
      effectiveDate: "",
      Insurance: "",
      taxBranch: "",
      category: "",
      descriptions: "",
      changing: "false",
      notChanging: "true",
    },
    validationSchema: Yup.object({
      descriptions: Yup.string().required("Descriptions Required"),
      title: Yup.string().required("title Required"),
      organizations: Yup.string().required("organizations Required"),
      departmentsUnits: Yup.string().required("departmentsUnits Required"),
      person: Yup.string().required("person Required"),
      name: Yup.string().required("name Required"),
      types: Yup.string().required("types Required"),
      effectiveDate: Yup.string().required("effectiveDate Required"),
      Insurance: Yup.string().required("Insurance Required"),
      taxBranch: Yup.string().required("taxBranch Required"),
      category: Yup.string().required("category Required"),
    }),
    onSubmit: () => {
      // onOpenChange();
      console.log("submitted");
    },
  });
  const { t } = useTranslation();
  const [changing, setChanging] = useState<string>("false");
  const [taxChanging, setTaxChanging] = useState<string>("false");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanging(e.target.value);
  };

  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaxChanging(e.target.value);
  };
  const DUMMY_DATA = [
    {
      id: 1,
      no: 1,
      list: 1,
      primeNumber: 1000000,
      eleman: 1,
      coefficient: 1.23,
      fixedNumber: 42,
      calculationInEid: true,
      years: true,
    },
    {
      id: 2,
      no: 2,
      list: 2,
      primeNumber: 1000000,
      eleman: 2,
      coefficient: 2.5,
      fixedNumber: 17,
      calculationInEid: false,
      years: false,
    },
    {
      id: 3,
      no: 3,
      list: 3,
      primeNumber: 1000000,
      eleman: 3,
      coefficient: 3.14,
      fixedNumber: 99,
      calculationInEid: true,
      years: false,
    },
    {
      id: 4,
      no: 4,
      list: 4,
      primeNumber: 1000000,
      eleman: 4,
      coefficient: 4.8,
      fixedNumber: 21,
      calculationInEid: true,
      years: false,
    },
    {
      id: 5,
      no: 5,
      list: 5,
      primeNumber: 1000000,
      eleman: 5,
      coefficient: 5.67,
      fixedNumber: 88,
      calculationInEid: true,
      years: true,
    },
  ];

  const DUMMY_ORGANIZATIONS = [
    {
      id: 1,
      label: "Global Health Organization",
      abbreviation: "GHO",
      type: "Non-Profit",
    },
    {
      id: 2,
      label: "International Tech Alliance",
      abbreviation: "ITA",
      type: "Corporate",
    },
    {
      id: 3,
      label: "Green Future Initiative",
      abbreviation: "GFI",
      type: "NGO",
    },
    {
      id: 4,
      label: "Urban Planning Council",
      abbreviation: "UPC",
      type: "Government",
    },
    {
      id: 5,
      label: "Education for All Foundation",
      abbreviation: "EFAF",
      type: "Non-Profit",
    },
    {
      id: 6,
      label: "Cybersecurity Standards Board",
      abbreviation: "CSB",
      type: "Consortium",
    },
    {
      id: 7,
      label: "Open Research Network",
      abbreviation: "ORN",
      type: "Academic",
    },
    {
      id: 8,
      label: "Sustainable Agriculture Union",
      abbreviation: "SAU",
      type: "NGO",
    },
    {
      id: 9,
      label: "Clean Energy Co.",
      abbreviation: "CEC",
      type: "Corporate",
    },
    {
      id: 10,
      label: "World Infrastructure Bank",
      abbreviation: "WIB",
      type: "Government",
    },
  ];

  const DUMMY_DEPARTMENTS = [
    {
      id: 101,
      label: "Human Resources",
      code: "HR",
      category: "Administrative",
    },
    {
      id: 102,
      label: "Finance & Accounting",
      code: "FIN",
      category: "Administrative",
    },
    {
      id: 103,
      label: "Research & Development",
      code: "R&D",
      category: "Technical",
    },
    {
      id: 104,
      label: "Information Technology",
      code: "IT",
      category: "Technical",
    },
    {
      id: 105,
      label: "Marketing & Communications",
      code: "MKT",
      category: "Operational",
    },
    { id: 106, label: "Legal Affairs", code: "LEGAL", category: "Support" },
    { id: 107, label: "Customer Support", code: "CS", category: "Operational" },
    { id: 108, label: "Procurement", code: "PRC", category: "Administrative" },
    {
      id: 109,
      label: "Facilities Management",
      code: "FM",
      category: "Support",
    },
    {
      id: 110,
      label: "Training & Development",
      code: "TD",
      category: "HR-Related",
    },
  ];

  const DUMMY_PERSONS = [
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

  const DUMMY_NAMES = [
    {
      id: 1,
      label: "Employment Termination Notice",
      code: "ETN-001",
      type: "Directive",
    },
    {
      id: 2,
      label: "Salary Adjustment Order",
      code: "SAO-045",
      type: "Instruction",
    },
    {
      id: 3,
      label: "Internal Transfer Request",
      code: "ITR-012",
      type: "Request",
    },
    {
      id: 4,
      label: "Work From Home Approval",
      code: "WFH-100",
      type: "Approval",
    },
    { id: 5, label: "Performance Review Memo", code: "PRM-034", type: "Memo" },
    {
      id: 6,
      label: "Training Assignment",
      code: "TA-076",
      type: "Instruction",
    },
    {
      id: 7,
      label: "Disciplinary Action Form",
      code: "DAF-021",
      type: "Ruling",
    },
    {
      id: 8,
      label: "Leave Extension Approval",
      code: "LEA-088",
      type: "Approval",
    },
    {
      id: 9,
      label: "New Equipment Requisition",
      code: "NER-059",
      type: "Request",
    },
    {
      id: 10,
      label: "Temporary Role Assignment",
      code: "TRA-030",
      type: "Instruction",
    },
  ];

  const DUMMY_INSURANCE = [
    {
      id: 1,
      label: "Standard Health Plan",
      provider: "BlueCare",
      category: "Health",
      code: "SHP-001",
    },
    {
      id: 2,
      label: "Comprehensive Medical",
      provider: "United Assurance",
      category: "Health",
      code: "CMP-002",
    },
    {
      id: 3,
      label: "Basic Dental Coverage",
      provider: "DentaPlus",
      category: "Dental",
      code: "BDC-003",
    },
    {
      id: 4,
      label: "Vision Secure Plan",
      provider: "EyeSure",
      category: "Vision",
      code: "VSP-004",
    },
    {
      id: 5,
      label: "Life Insurance – Gold",
      provider: "LifeTrust",
      category: "Life",
      code: "LIG-005",
    },
    {
      id: 6,
      label: "Accident Coverage Basic",
      provider: "SafeSteps",
      category: "Accident",
      code: "ACB-006",
    },
    {
      id: 7,
      label: "Maternity Enhanced Plan",
      provider: "CareFirst",
      category: "Health",
      code: "MEP-007",
    },
    {
      id: 8,
      label: "Retirement Benefit Package",
      provider: "SecureAge",
      category: "Retirement",
      code: "RBP-008",
    },
    {
      id: 9,
      label: "Employee Wellness Coverage",
      provider: "FitPlus",
      category: "Wellness",
      code: "EWC-009",
    },
    {
      id: 10,
      label: "International Travel Insurance",
      provider: "GlobalSure",
      category: "Travel",
      code: "ITI-010",
    },
  ];

  const DUMMY_TAX_BRANCH = [
    { id: 1, label: "Central Headquarters" },
    { id: 2, label: "Northern Region Branch" },
    { id: 3, label: "Southern District Office" },
    { id: 4, label: "Eastern Support Center" },
    { id: 5, label: "Western Administrative Hub" },
    { id: 6, label: "Capital City Branch" },
    { id: 7, label: "Rural Outreach Unit" },
    { id: 8, label: "International Coordination Office" },
    { id: 9, label: "Special Investigations Division" },
    { id: 10, label: "Public Services Office" },
  ];

  const DUMMY_CATEGORY = [
    { id: 1, label: "Administrative" },
    { id: 2, label: "Financial" },
    { id: 3, label: "Technical" },
    { id: 4, label: "Legal" },
    { id: 5, label: "Human Resources" },
    { id: 6, label: "Procurement" },
    { id: 7, label: "Operations" },
    { id: 8, label: "IT & Systems" },
    { id: 9, label: "Health & Safety" },
    { id: 10, label: "Marketing & Communications" },
  ];

  const DUMMY_TYPES = [
    { id: 1, label: "Directive" },
    { id: 2, label: "Instruction" },
    { id: 3, label: "Request" },
    { id: 4, label: "Approval" },
    { id: 5, label: "Memo" },
    { id: 6, label: "Ruling" },
    { id: 7, label: "Notice" },
    { id: 8, label: "Agreement" },
    { id: 9, label: "Report" },
    { id: 10, label: "Certificate" },
  ];

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      className={`${changing === "true" ? "w-full max-w-[90%]" : "w-full max-w-[50%]"} `}
      isOpen={isOpen}
      placement="top"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="bg-white dark:bg-info-1000 shadow-md shadow-[rgba(8,14,28,0.22)] dark:shadow-secondary-600 backdrop-blur-[40px] p-12 aria-[modal]:!rounded-6">
        {(onClose) => (
          <div className="flex flex-col gap-8">
            <ModalHeader className="flex flex-col gap-1 !p-0">
              <div className="flex justify-between items-center">
                <div className="bg-primary dark:bg-surface-primary shadow-shadow-light-tight/1 rounded-4 flex items-center gap-2 px-3 py-1.5 w-fit">
                  <Candle color="#ffffff" />
                  <span className="text-white font-normal text-xl">
                    {isEditMode
                      ? t("editIndividualOrder")
                      : isShowMode
                        ? t("showIndividualOrder")
                        : t("addNewIndividualOrder")}
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
                <InputGrid columns={changing === "true" ? 3 : 2}>
                  <div>
                    <AppInput
                      props={{
                        label: t("title"),
                        required: false,
                        error: formik.errors.title,
                        name: "title",
                        placeholder: t("describeTitle"),
                        isShowMode,
                        type: "text",
                        value: formik.values.title,
                        formik: formik,
                      }}
                    />
                  </div>

                  <div>
                    <AppAutoComplete
                      props={{
                        data: DUMMY_ORGANIZATIONS,
                        label: t("organizations"),
                        placeholder: t("organizations"),
                        classNames: {
                          selectorButton: `${isShowMode && "!hidden"}`,
                        },
                        isShowMode,
                      }}
                    />
                  </div>

                  <div>
                    <AppAutoComplete
                      props={{
                        data: DUMMY_DEPARTMENTS,
                        label: t("departmentsUnits"),
                        placeholder: t("departmentsUnits"),
                        classNames: {
                          selectorButton: `${isShowMode && "!hidden"}`,
                        },
                        isShowMode,
                      }}
                    />
                  </div>

                  <div>
                    <AppAutoComplete
                      props={{
                        data: DUMMY_PERSONS,
                        label: t("person"),
                        placeholder: t("person"),
                        classNames: {
                          selectorButton: `${isShowMode && "!hidden"}`,
                        },
                        isShowMode,
                      }}
                    />
                  </div>

                  <div>
                    <AppAutoComplete
                      props={{
                        data: DUMMY_NAMES,
                        label: t("name"),
                        placeholder: t("name"),
                        classNames: {
                          selectorButton: `${isShowMode && "!hidden"}`,
                        },
                        isShowMode,
                      }}
                    />
                  </div>

                  <div>
                    <AppDatePicker
                      props={{
                        label: t("effectiveDate"),
                        isShowMode,
                      }}
                    />
                  </div>

                  <div>
                    <AppAutoComplete
                      props={{
                        data: DUMMY_CATEGORY,
                        label: t("category"),
                        placeholder: t("category"),
                        classNames: {
                          selectorButton: `${isShowMode && "!hidden"}`,
                        },
                        isShowMode,
                      }}
                    />
                  </div>

                  <div>
                    <AppAutoComplete
                      props={{
                        data: DUMMY_TAX_BRANCH,
                        label: t("taxBranch"),
                        placeholder: t("taxBranch"),
                        classNames: {
                          selectorButton: `${isShowMode && "!hidden"}`,
                        },
                        isShowMode,
                      }}
                    />
                  </div>

                  <div>
                    <AppAutoComplete
                      props={{
                        data: DUMMY_TYPES,
                        label: t("types"),
                        placeholder: t("types"),
                        classNames: {
                          selectorButton: `${isShowMode && "!hidden"}`,
                        },
                        isShowMode,
                      }}
                    />
                  </div>

                  <div>
                    <AppAutoComplete
                      props={{
                        data: DUMMY_INSURANCE,
                        label: t("insurance"),
                        placeholder: t("insurance"),
                        classNames: {
                          selectorButton: `${isShowMode && "!hidden"}`,
                        },
                        isShowMode,
                      }}
                    />
                  </div>

                  <div className={changing && "col-span-2"}>
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
                <div className="flex gap-14 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <RadioGroup
                      classNames={{
                        wrapper: "w-full flex flex-nowrap",
                      }}
                      isDisabled={isShowMode}
                      orientation="horizontal"
                      value={changing}
                      onChange={handleChange}
                    >
                      <div className="flex gap-1 w-1/2">
                        <Radio
                          checked={changing === "true"}
                          classNames={{
                            wrapper:
                              "after:dark:!bg-surface-200 !dark:!border-surface-200",
                            control:
                              "dark:!bg-surface-200 !dark:!border-surface-200",
                            label: "dark:text-white",
                          }}
                          value="true"
                        >
                          {t("changing")}
                        </Radio>
                      </div>
                      <div className="flex gap-1 w-1/2">
                        <Radio
                          checked={changing === "false"}
                          classNames={{
                            wrapper:
                              "after:dark:!bg-surface-200 !dark:!border-surface-200",
                            control:
                              "dark:!bg-surface-200 !dark:!border-surface-200",
                            label: "dark:text-white",
                          }}
                          value="false"
                        >
                          {t("notChanging")}
                        </Radio>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {changing === "true" &&
                  (isShowMode ? (
                    <ComputationalCoefficientsShowMode
                      props={{
                        data: DUMMY_DATA,
                      }}
                    />
                  ) : (
                    <ComputationalCoefficients
                      props={{
                        data: DUMMY_DATA,
                      }}
                    />
                  ))}
              </Form>
            </ModalBody>
            <ModalFooter
              className={`!p-0 flex items-end ${changing === "true" ? "justify-between" : ""}`}
            >
              {changing === "true" && (
                <div className="flex flex-col gap-3 w-full">
                  <h4 className="text-secondary-400 dark:text-secondary-0 font-bold">
                    {t("tax")}:
                  </h4>
                  <div>
                    <RadioGroup
                      classNames={{
                        wrapper: "w-full flex flex-nowrap",
                      }}
                      defaultValue={taxChanging && "false"}
                      isDisabled={isShowMode}
                      orientation="horizontal"
                      onChange={handleTaxChange}
                    >
                      <div className="flex gap-1 w-1/2">
                        <Radio
                          classNames={{
                            label: "dark:text-white",
                            wrapper:
                              "after:dark:!bg-surface-200 !dark:!border-surface-200",
                            control:
                              "dark:!bg-surface-200 !dark:!border-surface-200",
                          }}
                          value="false"
                        >
                          {t("noEditTax")}
                        </Radio>
                      </div>
                      <div className="flex gap-1 w-1/2">
                        <Radio
                          classNames={{
                            label: "dark:text-white",
                            wrapper:
                              "after:dark:!bg-surface-200 !dark:!border-surface-200",
                            control:
                              "dark:!bg-surface-200 !dark:!border-surface-200",
                          }}
                          value="true"
                        >
                          {t("editTax")}
                        </Radio>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}
              {!isShowMode && (
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
              )}
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
