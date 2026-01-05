import { Form, Radio, RadioGroup } from "@heroui/react";
import {
  AppAutoComplete,
  AppRadio,
  AppTextArea,
} from "@hrbox/uikit/components";
import { Scan } from "iconsax-reactjs";
import * as Yup from "yup";
import {
  FormProvider,
  useFormContext,
} from "@hrbox/core/providers/FormProvider";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useModalContext } from "@hrbox/core/providers";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const FaceAllocationForm = () => {
  const { t } = useTranslation();
  const { values, errors, handleSubmit } = useFormContext();
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  useEffect(() => {
    console.log("values Face", values);
    console.log("errors Face", errors);
  }, [errors, values]);
  return (
    <>
      <form id="face-allocation-form" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-7">
          <FormField
            name="type"
            component={AppRadio}
            formMode={currentType}
            options={[
              { value: "person", label: t("person") },
              { value: "group", label: t("group") },
              { value: "job_title", label: t("job_title") },
            ]}
            className="flex! flex-row!"
          />
          <div className="flex flex-row justify-between gap-10">
            <div className="w-full">
              <FormField
                formMode={currentType}
                name="ChooseShift"
                label={t("choose_face_recognition_assignment")}
                component={AppAutoComplete}
                variant="solid"
                aria-label="ChooseShift"
                data={[{ id: "Administrative", name: "Administrative" }]}
              />
            </div>
            <div className="w-full">
              <FormField
                formMode={currentType}
                name="FormDate"
                label={t("form_date")}
                component={AppAutoComplete}
                variant="solid"
                aria-label="FormDate"
                data={[{ id: "2025/01/10", name: "2025/01/10" }]}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between gap-10">
            <div className="w-full">
              <FormField
                formMode={currentType}
                name="organization"
                label={t("organizations")}
                component={AppAutoComplete}
                variant="solid"
                aria-label="organization"
                data={[{ id: "Zahra Pakniyat", name: "Zahra Pakniyat" }]}
              />
            </div>
            {(values && values?.type === "person") ||
            (values && values?.type === "group") ? (
              <div className="w-full">
                <FormField
                  formMode={currentType}
                  name="Department"
                  label={t("department")}
                  component={AppAutoComplete}
                  variant="solid"
                  aria-label="Department"
                  data={[
                    { id: "It", name: "It" },
                    { id: "technical", name: "technical" },
                  ]}
                />
              </div>
            ) : (
              <div className="w-full">
                <FormField
                  formMode={currentType}
                  name="JobTitle"
                  label={t("job_title")}
                  component={AppAutoComplete}
                  variant="solid"
                  aria-label="JobTitle"
                  data={[{ id: "Developer", name: "Developer" }]}
                />
              </div>
            )}
          </div>
          {values && values?.type === "person" && (
            <div className="flex flex-row justify-between gap-10">
              <div className="w-full">
                <FormField
                  formMode={currentType}
                  name="Employee"
                  label={t("employee")}
                  component={AppAutoComplete}
                  variant="solid"
                  aria-label="Employee"
                  data={[
                    { id: "Ali Rezaei", name: "Ali Rezaei" },
                    { id: "Moho", name: "Moho" },
                  ]}
                />
              </div>
              <div className="w-full"></div>
            </div>
          )}

          <div className="w-full">
            <FormField
              formMode={currentType}
              name="Description"
              label={t("descriptions")}
              component={AppTextArea}
              varint="solid"
              aria-label="Description"
            />
          </div>
        </div>
        <Scan color="gray" size={90} className="absolute bottom-2 left-0 rtl:right-0" />
      </form>
    </>
  );
};
export default FaceAllocationForm;
