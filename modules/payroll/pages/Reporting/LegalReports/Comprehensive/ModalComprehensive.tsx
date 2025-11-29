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

import { AppInput } from "@/components/AppInput.tsx";
import InputGrid from "@/components/InputGrid.tsx";
import { Plus } from "@/icons/Plus.tsx";
import AppDatePicker from "@/components/DatePicker/DatePicker.tsx";

export default function ModalComprehensive({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const formik = useFormik({
    initialValues: {
      name: "",
      personalCode: "",
      startDate: "",
      sortBy: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name Required"),
      personalCode: Yup.string().required("personalCode Required"),
      startDate: Yup.string().required("startDate Required"),
      sortBy: Yup.string().required("sortBy Required"),
    }),
    onSubmit: () => {
      // onOpenChange();
      console.log("submitted");
    },
  });
  const { t } = useTranslation();

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
                  <Plus color="#ffffff" />
                  <span className="text-white font-normal text-xl">
                    {t("creatReport")}
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
                        label: t("name"),
                        required: false,
                        error: formik.errors.name,
                        name: "name",
                        placeholder: t("describeText"),
                        type: "text",
                        value: formik.values.name,
                        formik: formik,
                      }}
                    />
                  </div>
                  <div>
                    <AppInput
                      props={{
                        label: t("personalCode"),
                        required: false,
                        error: formik.errors.personalCode,
                        name: "personalCode",
                        placeholder: t("describeText"),
                        type: "text",
                        value: formik.values.personalCode,
                        formik: formik,
                      }}
                    />
                  </div>
                  <div>
                    <AppDatePicker
                      props={{
                        label: t("startDate"),
                      }}
                    />
                  </div>
                  <div>
                    <AppInput
                      props={{
                        label: t("sortBy"),
                        required: false,
                        error: formik.errors.sortBy,
                        name: "sortBy",
                        placeholder: t("describeText"),
                        type: "text",
                        value: formik.values.sortBy,
                        formik: formik,
                      }}
                    />
                  </div>
                </InputGrid>
              </Form>
            </ModalBody>
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
                  {t("creat")}
                </Button>
              </div>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
