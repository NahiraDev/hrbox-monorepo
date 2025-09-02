import { AppModal } from "../../../../core/components/AppModal";
import React from "react";
import {
  Firstline,
  SecurityUser,
  Settings,
  User,
} from "iconsax-react";
import { useTranslation } from "react-i18next";
import { AppInput } from "../../../../core/components/AppInput";
import { AppAutoComplete } from "../../../../core/components/AppAutoComplete";
import { AppButton } from "../../../../core/components/AppButton";
import AppTablecustom from "@/components/AppTablecustom.tsx";
import { useFormik } from "formik";

interface AddEventProps {
  isOpen: boolean;
  onClose: () => void;
  headerText: string;
  buttonText: string;
  disabled?: boolean;
  showFooter?: boolean;
  showModal?: boolean;
  onSubmit?: (values: MyFormValues) => void;
  data?: Partial<MyFormValues>;
}
interface MyFormValues {
  name: string;
  title?: string;
  type?: number;
  newBuiltForms?: string;
  workflowImplementation?: string;
  cartableStartType?: string;
  description?: string;
  notification?: number;
  processModal?: number;
}
export const AddEventModal: React.FC<AddEventProps> = ({
  isOpen,
  buttonText,
  onSubmit,
  data,
  disabled = false,
  showFooter = true,
  showModal = false,
}) => {
  const { t, i18n } = useTranslation();
  const sampleData = [
    {
      id: 1,
      Title: t("review"),
      Type: t("confimation"),
      Undertaking: t("zahra_pakniyat"),
    },
    {
      id: 2,
      Title: t("review"),
      Type: t("confimation"),
      Undertaking: t("zahra_pakniyat"),
    },
  ];
  const columns = [
    { key: "id", label: t("id") },
    { key: "Title", label: t("title") },
    { key: "Type", label: t("type") },
    { key: "Undertaking", label: t("undertaking") },
    { key: "VetoAuthority", label: t("veto_authority") },
  ];
  const formik = useFormik<MyFormValues>({
    initialValues: {
      name: data?.name || data?.title || "",
      title: data?.title || "",
      newBuiltForms: data?.newBuiltForms || "",
      workflowImplementation: data?.workflowImplementation || "",
      cartableStartType: data?.cartableStartType || "",
      description: data?.description || "",
      processModal: 1,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit?.(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <AppModal
        isOpen={isOpen}
        size={"4xl"}
      >
        <AppModal.Body>
          <div className="flex flex-col gap-[24px]">
            <InputGrid columns={2}>
              <div>
                <AppInput
                  props={{
                    type: "text",
                    label: t("title"),
                    name: "title",
                    disabled: disabled,
                    formik: formik,
                    placeholder: t("choose_sth."),
                    className: `border-[1px] border-[#DCF0F9] rounded-[12px] ${disabled ? "bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)]" : ""}  `,
                  }}
                />
              </div>{" "}
              <div>
                <AppAutoComplete
                  props={{
                    type: "text",
                    label: t("related_forms"),
                    name: "related_forms",
                    placeholder: t("choose_sth."),
                    data: [
                      { Id: 1, Name: "Tehran" },
                      { Id: 2, Name: "rasht" },
                    ],
                    valueKey: "Id",
                    displayKey: "Name",
                    className: `border-[1px] border-[#DCF0F9] rounded-[12px] ${disabled ? "bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)]" : ""}  `,
                    disabled: disabled,
                  }}
                />
              </div>{" "}
              <div>
                <AppAutoComplete
                  props={{
                    type: "text",
                    label: t("undertaking"),
                    name: "undertaking",
                    placeholder: t("choose_sth."),
                    data: [
                      { Id: 1, Name: "Tehran" },
                      { Id: 2, Name: "rasht" },
                    ],
                    valueKey: "Id",
                    displayKey: "Name",
                    className: `border-[1px] border-[#DCF0F9] rounded-[12px] ${disabled ? "bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)]" : ""}  `,
                    disabled: disabled,
                  }}
                />
              </div>
            </InputGrid>
            <div>
              {showModal ? (
                <div className="gap-[8px] flex flex-col">
                  <div className="px-[12px] py-[8px] border-[1px] border-[rgba(220,240,249,0.40)] rounded-[8px] flex rgba(220, 240, 249, 0.40)">
                    <div className="flex flex-row justify-between w-[95%]">
                      <div className="">1.</div>
                      <div className="flex flex-col gap-[24px] w-[718px]">
                        <div className="flex flex-row gap-[155px] pr-[108px] w-[100%] ">
                          <div className="flex flex-row gap-[32px]">
                            <div className="flex gap-[10px]">
                            <span>
                              <Firstline />
                            </span>
                              <span>{t("title")}:</span>
                            </div>
                            <div>
                              <p>{t("review")}</p>
                            </div>
                          </div>{" "}
                          <div className="flex flex-row gap-[32px]">
                            <div className="flex gap-[10px]">
                            <span>
                              <Settings />
                            </span>
                              <span>{t("type")}:</span>
                            </div>
                            <div>
                              <p>{t("rejection")}</p>
                            </div>
                          </div>{" "}
                        </div>
                        <div className="flex flex-row gap-[36px] pr-[104px]">
                          <div className="flex flex-row gap-[32px]">
                            <div className="flex gap-[10px]">
                            <span>
                              <User />
                            </span>
                              <span>{t("undertaking")}:</span>
                            </div>
                            <div>
                              <p>Zahra Pakniyat</p>
                            </div>
                          </div>{" "}
                          <div className="flex flex-row gap-[32px]">
                            <div className="flex gap-[10px]">
                            <span>
                              <SecurityUser />
                            </span>
                              <span>{t("veto_authority")}:</span>
                            </div>
                            <div>
                              <p>{t("yes")}</p>
                            </div>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-[12px] py-[8px] border-[1px] border-[rgba(220,240,249,0.40)] rounded-[8px] flex flex-row justify-between rgba(220, 240, 249, 0.40)">
                    <div className="flex flex-row justify-between w-[95%]">
                      <div className="">2.</div>
                      <div className="flex flex-col gap-[24px] w-[718px]">
                        <div className="flex flex-row gap-[155px] pr-[108px] w-[100%] ">
                          <div className="flex flex-row gap-[32px]">
                            <div className="flex gap-[10px]">
                            <span>
                              <Firstline />
                            </span>
                              <span>{t("title")}:</span>
                            </div>
                            <div>
                              <p>{t("review")}</p>
                            </div>
                          </div>{" "}
                          <div className="flex flex-row gap-[32px]">
                            <div className="flex gap-[10px]">
                            <span>
                              <Settings />
                            </span>
                              <span>{t("type")}:</span>
                            </div>
                            <div>
                              <p>{t("rejection")}</p>
                            </div>
                          </div>{" "}
                        </div>
                        <div className="flex flex-row gap-[36px] pr-[104px]">
                          <div className="flex flex-row gap-[32px]">
                            <div className="flex gap-[10px]">
                            <span>
                              <User />
                            </span>
                              <span>{t("undertaking")}:</span>
                            </div>
                            <div>
                              <p>Zahra Pakniyat</p>
                            </div>
                          </div>{" "}
                          <div className="flex flex-row gap-[32px]">
                            <div className="flex gap-[10px]">
                            <span>
                              <SecurityUser />
                            </span>
                              <span>{t("veto_authority")}:</span>
                            </div>
                            <div>
                              <p>{t("yes")}</p>
                            </div>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <AppTablecustom
                  props={{
                    data: sampleData,
                    columns,
                  }}
                />
              )}
            </div>
          </div>
        </AppModal.Body>
        <AppModal.Footer>
          {
            showFooter && (
              <div className="flex flex-row justify-end gap-[30px]">
                <AppButton
                  props={{
                    className: "bg-[rgba(0,0,0,0)] ",
                    text: t("cancel"),
                  }}
                />
                <AppButton
                  props={{
                    className:
                      "px-[12px] py-[6px] gap-[6px] bg-[#0A9AD7] dark:bg-[#0D4D6A] rounded-[8px] text-white ",
                    type: "submit",
                    text: t(buttonText),
                    onClick: () => {
                      formik.handleSubmit();
                    },
                  }}
                />
              </div>
            )
          }
        </AppModal.Footer>
      </AppModal>
    </form>
  );
};
