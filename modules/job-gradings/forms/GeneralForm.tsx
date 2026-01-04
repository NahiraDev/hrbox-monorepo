import { Form } from "@heroui/react";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Scan } from "iconsax-reactjs";
import * as Yup from "yup";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useModalContext } from "@hrbox/core/providers";
import ColorPicker from "@hrbox/uikit/components/ColorPicker";

import {
  GRADE_OPTIONS,
  GROUP_OPTIONS,
  FROM_POINTS_OPTIONS,
  TO_POINTS_OPTIONS,
  GRADE_COLORS,
} from "../app/mock";
import { useEffect } from "react";

export const initialValuesAction = {
  Grade: "",
  Grouping: "",
  fromPoints: "",
  toPoints: "",
  gradeColor: "",
  Description: "",
};

export const formValidationAction = Yup.object({
  Grade: Yup.string().required(),
  Grouping: Yup.string().required(),
  fromPoints: Yup.string().required(),
  toPoints: Yup.string().required(),
  Description: Yup.string().required(),
});

export const handleSubmitAction = (values: any) => {
  console.log("GENERAL SUBMIT:", values);
};

const GeneralForm = () => {
  const { handleSubmit, setFieldValue, values } = useFormContext();
  useEffect(() => {
  if (Object.values(values).some(Boolean)) {
    console.log("FORM HAS DATA:", values);
  }
}, [values]);
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;

  return (
    <Form id="general-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <FormField
          formMode={currentType}
          name="Grade"
          label="Grade"
          component={AppAutoComplete}
          data={GRADE_OPTIONS}
        />

        <FormField
          formMode={currentType}
          name="Grouping"
          label="Group"
          component={AppAutoComplete}
          data={GROUP_OPTIONS}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            formMode={currentType}
            name="fromPoints"
            label="From"
            component={AppAutoComplete}
            data={FROM_POINTS_OPTIONS}
          />
          <FormField
            formMode={currentType}
            name="toPoints"
            label="To"
            component={AppAutoComplete}
            data={TO_POINTS_OPTIONS}
          />
        </div>

        <ColorPicker
          colors={GRADE_COLORS}
          value={values.gradeColor}
          onChange={(c) => setFieldValue("gradeColor", c)}
        />

        <FormField
          formMode={currentType}
          name="Description"
          label="Description"
          component={AppTextArea}
        />
      </div>

      <Scan color="gray" size={80} className="absolute bottom-2 left-2" />
    </Form>
  );
};

export default GeneralForm;
