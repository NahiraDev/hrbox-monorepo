import { Form } from "@heroui/react";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Scan } from "iconsax-reactjs";
import * as Yup from "yup";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useModalContext } from "@hrbox/core/providers";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ColorPicker from "@hrbox/uikit/components/ColorPicker";
import { GRADE_COLORS } from "../app/mock";

export const initialValuesAction = {
  index_title: null,
  Select_Group: null,
  type: null,
  weight: null,
  creation_date: null,
  Department: null,
  Employee: null,
  Description: null,
};
export const formValidationAction = Yup.object().shape({
  index_title: Yup.string().required(),
  Select_Group: Yup.string().required(),
  type: Yup.string().required(),
  weight: Yup.string().required(),
  creation_date: Yup.string().required(),

  Description: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.title);
  console.log(values.type);
  console.log(values.Description);
  return {
    index_title: values.index_title,
    Select_Group: values.Group,
    type: values.type,
    weight: values.weight,
    Description: values.Description,
  };
};

const GeneralForm = () => {
  const { t } = useTranslation();
   const [color, setColor] = useState<string>("");
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormContext();
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  return (
    <>
      <Form id="face-allocation-form" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-7">
          <div className="flex flex-row justify-between gap-10">
            <div className="w-full">
              <FormField
                formMode={currentType}
                name="Grade title"
                label={t("Grade_title")}
                component={AppAutoComplete}
              />
            </div>
            <div className="w-full">
              <FormField
                formMode={currentType}
                name="Select_Group"
                label={t("Select_Group")}
                component={AppAutoComplete}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between gap-10">
            <div className="w-full">
              <FormField
                formMode={currentType}
                name="of points"
                label={t("of_points")}
                component={AppAutoComplete}
              />
            </div>

            <div className="w-full">
              <FormField
                formMode={currentType}
                name="up_to_points"
                label={t("up_to_points")}
                component={AppAutoComplete}
              />
            </div>
          </div>
          {/* PALETTE */}
          <ColorPicker
            colors={GRADE_COLORS}
            value={color}
            onChange={setColor}
          />

          <div className="w-full ">
            <FormField
              formMode={currentType}
              name="Description"
              label={t("descriptions")}
              component={AppTextArea}
            />
          </div>
        </div>
        <Scan color="gray" size={90} className="absolute bottom-2 left-0" />
      </Form>
    </>
  );
};
export default GeneralForm;
