import { Form } from "@heroui/react";
import { Radio, RadioGroup } from "@heroui/react";
import { useFormContext, useModalContext } from "@hrbox/core/providers";
import {
  AppAutoComplete,
  AppRadio,
  AppTextArea,
} from "@hrbox/uikit/components";
import { FormField } from "@hrbox/uikit/components/FormField";
import { TimerStart } from "iconsax-reactjs";
import * as Yup from "yup";
import { useEffect } from "react";
import { useModal } from "@hrbox/core/hooks";
import { useTranslation } from "react-i18next";

const ShiftAllocationForm = () => {
  const { t } = useTranslation();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormContext();

  useEffect(() => {
    console.log("Errors-shift:", errors);
    console.log("Values-shift:", values);
  }, [errors, values]);

  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;

  return (
    <form id="shift-allocation" onSubmit={handleSubmit}>
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
              name="ChooseShift"
              label={t("choose_shift")}
              component={AppAutoComplete}
              formMode={currentType}
              variant="solid"
              aria-label="ChooseShift"
              helperText={touched.ChooseShift && errors.ChooseShift}
              data={[{ id: "Administrative", name: "Administrative" }]}
            />
          </div>
          <div className="w-full">
            <FormField
              name="FormDate"
              label={t("form_date")}
              component={AppAutoComplete}
              formMode={currentType}
              variant="solid"
              aria-label="FormDate"
              helperText={touched.FormDate && errors.FormDate}
              data={[{ id: "2025/01/10", name: "2025/01/10" }]}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between gap-10">
          <div className="w-full">
            <FormField
              name="organization"
              label={t("organizations")}
              component={AppAutoComplete}
              formMode={currentType}
              variant="solid"
              aria-label="organization"
              helperText={touched.organization && errors.organization}
              data={[{ id: "Zahra Pakniyat", name: "Zahra Pakniyat" }]}
            />
          </div>
          {(values && values?.type === "person") ||
          (values && values?.type === "group") ? (
            <div className="w-full">
              <FormField
                name="Department"
                label={t("department")}
                component={AppAutoComplete}
                formMode={currentType}
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
                name="JobTitle"
                label={t("job_title")}
                component={AppAutoComplete}
                formMode={currentType}
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
                name="Employee"
                label={t("employee")}
                component={AppAutoComplete}
                formMode={currentType}
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
            name="Description"
            label={t("descriptions")}
            component={AppTextArea}
            formMode={currentType}
            variant="solid"
            aria-label="Description"
          />
        </div>
      </div>
      <TimerStart
        color="gray"
        size={90}
        className="absolute bottom-2 left-0 z-0 rtl:right-0"
      />
    </form>
  );
};
export default ShiftAllocationForm;
