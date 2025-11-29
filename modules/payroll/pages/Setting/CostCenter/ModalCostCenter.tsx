import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Money4 } from "iconsax-react";

import { AppInput } from "@/components/AppInput.tsx";
import { AppAutoComplete } from "@/components/AppAutoComplete.tsx";
import InputGrid from "@/components/InputGrid.tsx";
import { AppTextArea } from "@/components/AppTextArea.tsx";

export default function ModalCostCenter({
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
      organizationName: "",
      departmentUnit: "",
      costCenterCode: "",
      descriptions: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("title Required"),
      organizationName: Yup.string().required("organizationName Required"),
      departmentUnit: Yup.string().required("departmentUnit Required"),
      costCenterCode: Yup.string().required("costCenterCode Required"),
      descriptions: Yup.string().required("descriptions Required"),
    }),
    onSubmit: () => {
      // onOpenChange();
      console.log("submitted");
    },
  });
  const { t } = useTranslation();

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

  const DUMMY_COST_CENTER_CODE = [
    { id: 1, label: "1001 - Human Resources" },
    { id: 2, label: "1002 - Finance Department" },
    { id: 3, label: "1003 - IT Services" },
    { id: 4, label: "1004 - Marketing & Communications" },
    { id: 5, label: "1005 - Research & Development" },
    { id: 6, label: "1006 - Procurement & Logistics" },
    { id: 7, label: "1007 - Legal Affairs" },
    { id: 8, label: "1008 - Facilities Management" },
    { id: 9, label: "1009 - Customer Support" },
    { id: 10, label: "1010 - Executive Management" },
  ];

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      isOpen={isOpen}
      placement="top"
      size="4xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="bg-white dark:bg-info-1000 shadow-md shadow-[rgba(8,14,28,0.22)] dark:shadow-secondary-600 backdrop-blur-[40px] p-12 aria-[modal]:!rounded-6">
        {(onClose) => (
          <div className="flex flex-col gap-8">
            <ModalHeader className="flex flex-col gap-1 !p-0">
              <div className="flex justify-between items-center">
                <div className="bg-primary dark:bg-surface-primary shadow-shadow-light-tight/1 rounded-4 flex items-center gap-2 px-3 py-1.5 w-fit">
                  <Money4 color="#ffffff" />
                  <span className="text-white font-normal text-xl">
                    {isEditMode
                      ? t("editNewCostCenters")
                      : isShowMode
                        ? t("showNewCostCenters")
                        : t("addNewCostCenters")}
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
                <InputGrid columns={2}>
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
                        data: DUMMY_COST_CENTER_CODE,
                        label: t("costCenterCode"),
                        placeholder: t("costCenterCodeText"),
                        classNames: {
                          selectorButton: `${isShowMode && "!hidden"}`,
                        },
                        isShowMode,
                      }}
                    />
                  </div>

                  <div className={"col-span-2"}>
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
              </Form>
            </ModalBody>
            <ModalFooter className={`!p-0 flex items-end`}>
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
