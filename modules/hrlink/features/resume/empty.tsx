import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
 Form } from "@heroui/react";
import { Button } from "@heroui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Personalcard } from "iconsax-react";

import { ResumeLayout } from "@/pages/Resume/Layout.tsx";
import { AppButton } from "@/components/AppButton.tsx";
import EmptyResumeGif from "@/assets/img/empty-resume.gif";
import { AppInput } from "@/components/AppInput.tsx";

const ResumeEmpty = () => {
  const { t } = useTranslation();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      firstname: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required(),
    }),
    onSubmit: () => {},
  });

  return (
    <ResumeLayout
      props={{
        children: (
          <div className="mx-auto w-full h-[calc(100%-132px)]">
            <div className="grid grid-cols-4 h-full items-center bg-white shadow-shadow-light-tight/1 rounded-[14px]">
              <div />
              <div className="col-span-2">
                <span className="font-normal text-black block text-base">
                  Your resume has not yet been submitted.
                </span>
                <span className="font-normal text-black block text-base">
                  Please click the &#39;Create&#39; button to enter and complete
                  your resume.
                </span>
                <div className="text-center">
                  <AppButton
                    props={{
                      text: "Create Resume",
                      variant: "light",
                      onClick: onOpen,
                      className:
                        "text-black text-base font-semibold p-2 shadow-shadow-light-tight/1 rounded-4 mt-6",
                    }}
                  />
                </div>
                <div className="flex justify-center">
                  <Image src={EmptyResumeGif} />
                </div>
              </div>
              <div />
            </div>
            <Modal
              backdrop="blur"
              classNames={{
                closeButton:
                  "right-5 top-5 hover:!bg-transparent zoom-[1.5] !p-0 scale-150 active:!bg-transparent",
              }}
              isOpen={isOpen}
              size="4xl"
              onOpenChange={onOpenChange}
            >
              <ModalContent className="rounded-[12px] bg-white/30 shadow-md backdrop-blur-[40px] p-12">
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <div className="bg-secondary-400 shadow-shadow-light-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">
                          <Personalcard className="text-white" size="22" />
                          <span className="text-white font-normal text-xl">
                            Add General Informations
                          </span>
                        </div>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        className="w-full flex flex-col gap-6"
                        onSubmit={formik.handleSubmit}
                      >
                        <div className="flex gap-14 w-full">
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("first_name"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("last_name"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-14 w-full">
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("national_code"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("date_of_birth"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-14 w-full">
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("gender"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("marital_status"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-14 w-full">
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("military_service_status"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("city"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-14 w-full">
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("address"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("minimum_salary"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-14 w-full">
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("working_category"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("organizational_category"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-14 w-full">
                          <div className="flex flex-col gap-1 w-1/2">
                            <AppInput
                              props={{
                                label: t("social_media_links"),
                                required: true,
                                error: formik.errors.firstname,
                                name: "firstname",
                                placeholder: "",
                                type: "text",
                                value: formik.values.firstname,
                                formik: formik,
                              }}
                            />
                          </div>
                        </div>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        className="text-xl font-normal"
                        color="default"
                        variant="light"
                        onPress={onClose}
                      >
                        Close
                      </Button>
                      <Button
                        className="bg-secondary-400 text-xl font-normal text-white"
                        onPress={onClose}
                      >
                        Save Changes
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        ),
      }}
    />
  );
};

export default ResumeEmpty;
