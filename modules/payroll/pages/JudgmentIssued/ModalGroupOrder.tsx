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

import { AppTextArea } from "@/components/AppTextArea.tsx";
import { Candle } from "@/icons/Candle.tsx";
import ComputationalCoefficientsShowMode from "@/pages/JudgmentIssued/ComputationalCoefficientsShowMode.tsx";
import ComputationalCoefficients from "@/pages/JudgmentIssued/ComputationalCoefficients.tsx";
import InputGrid from "@/components/InputGrid.tsx";
import AppDatePicker from "@/components/DatePicker/DatePicker.tsx";

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
      types: "",
      effectiveDate: "",
      taxBranch: "",
      descriptions: "",
      changing: "",
      notChanging: "",
      insurance: "",
      entireOrganization: "",
      department: "",
      position: "",
      people: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("title Required"),
      types: Yup.string().required("types Required"),
      effectiveDate: Yup.string().required("effectiveDate Required"),
      taxBranch: Yup.string().required("taxBranch Required"),
      descriptions: Yup.string().required("descriptions Required"),
      changing: Yup.string().required("changing Required"),
      notChanging: Yup.string().required("notChanging Required"),
      insurance: Yup.string().required("insurance Required"),
      entireOrganization: Yup.string().required("entireOrganization Required"),
      department: Yup.string().required("department Required"),
      position: Yup.string().required("position Required"),
      people: Yup.string().required("people Required"),
    }),
    onSubmit: () => {
      onOpenChange();
    },
  });
  const { t } = useTranslation();
  const [changing, setChanging] = useState<string>("false");
  const [taxChanging, setTaxChanging] = useState<string>("false");
  const [checkBoxaValue, setCheckBoxaValue] =
    useState<string>("entireOrganization");
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

  const inputMap: any = {
    entireOrganization: {
      label: t("entireOrganization"),
      name: "entireOrganization",
      error: formik.errors.entireOrganization,
      value: formik.values.entireOrganization,
    },
    department: {
      label: t("department"),
      name: "departments",
      error: formik.errors.department,
      value: formik.values.department,
    },
    position: {
      label: t("position"),
      name: "position",
      error: formik.errors.position,
      value: formik.values.position,
    },
    people: {
      label: t("personPeople"),
      name: "people",
      error: formik.errors.people,
      value: formik.values.people,
    },
  };

  const inputProps: any = inputMap[checkBoxaValue];

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      className={`${changing === "true" ? "w-full max-w-[90%]" : "w-full max-w-[50%]"} `}
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
                  <Candle color="#ffffff" />
                  <span className="text-white font-normal text-xl">
                    {isEditMode
                      ? t("editGroupOrder")
                      : isShowMode
                        ? t("showGroupOrder")
                        : t("addNewGroupOrder")}
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
                        value="position"
                        onChange={() => setCheckBoxaValue("position")}
                      >
                        {t("position")}
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
                    {inputProps && (
                      <AppInput
                        props={{
                          label: inputProps.label,
                          required: false,
                          error: inputProps.error,
                          name: inputProps.name,
                          placeholder: t("describeText"),
                          type: "text",
                          value: inputProps.value,
                          formik: formik,
                          isShowMode,
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <AppInput
                      props={{
                        label: t("types"),
                        required: false,
                        error: formik.errors.types,
                        name: "types",
                        placeholder: t("describeText"),
                        type: "text",
                        value: formik.values.types,
                        formik: formik,
                        isShowMode,
                      }}
                    />
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
                  <div>
                    <AppInput
                      props={{
                        label: t("insurance"),
                        required: false,
                        error: formik.errors.insurance,
                        name: "insurance",
                        placeholder: t("describeText"),
                        type: "text",
                        value: formik.values.insurance,
                        formik: formik,
                        isShowMode,
                      }}
                    />
                  </div>
                  <div>
                    <AppInput
                      props={{
                        label: t("taxBranch"),
                        required: false,
                        error: formik.errors.taxBranch,
                        name: "taxBranch",
                        placeholder: t("describeText"),
                        type: "text",
                        value: formik.values.taxBranch,
                        formik: formik,
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
                            label: "dark:text-white",
                            wrapper:
                              "after:dark:!bg-surface-200 dark:!border-surface-200",
                            control:
                              "dark:!bg-surface-200 dark:!border-surface-200",
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
                            label: "dark:text-white",
                            wrapper:
                              "after:dark:!bg-surface-200 dark:!border-surface-200",
                            control:
                              "dark:!bg-surface-200 dark:!border-surface-200",
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
                        groupOrder: true,
                      }}
                    />
                  ) : (
                    <ComputationalCoefficients
                      props={{
                        data: DUMMY_DATA,
                      }}
                    />
                  ))}{" "}
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
                      orientation="horizontal"
                      onChange={handleTaxChange}
                    >
                      <div className="flex gap-1 w-1/2">
                        <Radio
                          classNames={{
                            label: "dark:text-white",
                            wrapper:
                              "after:dark:!bg-surface-200 dark:!border-surface-200",
                            control:
                              "dark:!bg-surface-200 dark:!border-surface-200",
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
                              "after:dark:!bg-surface-200 dark:!border-surface-200",
                            control:
                              "dark:!bg-surface-200 dark:!border-surface-200",
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
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
