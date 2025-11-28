import { Form } from "@heroui/react";
import { FormField } from "@hrbox/uikit/components/FormField";
import { AppAutoComplete } from "@hrbox/uikit/components";
import * as Yup from "yup";
import { useFormContext, useModalContext } from "@hrbox/core/providers";

export const initialValuesAction = {
  Type: null,
  Title: null,
  Level: null,
  Duration: null,
  CenterName: null,
  Year: null,
  FromNumber: null,
  ToNumber: null,
};
export const formValidationAction = Yup.object().shape({
  Type: Yup.string().required(),
  Title: Yup.string().required(),
  Level: Yup.string().required(),
  Duration: Yup.string().required(),
  CenterName: Yup.string().required(),
  Year: Yup.string().required(),
  FromNumber: Yup.string().required(),
  ToNumber: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  return {
    Type: values.title,
    Title: values.type,
    Level: values.ChooseIp,
    Duration: values.FromDate,
    CenterName: values.organization,
    Year: values.Department,
    FromNumber: values.FromNumber,
    ToNumber: values.ToNumber,
  };
};

export const CourseForm = () => {
  const { errors, touched } = useFormContext();

  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  return (
    <Form>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField
          name="Type"
          label="Type"
          helperText={touched.Type && errors.Type}
          formMode={currentType}
        />
        <FormField
          name="Title"
          label="Title"
          helperText={touched.Title && errors.Title}
          formMode={currentType}
        />
        <FormField
          name="Level"
          label="Level"
          helperText={touched.Level && errors.Level}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="Duration (Hours)"
          label="Duration (Hours)"
          component={AppAutoComplete}
          helperText={touched.Duration && errors.Duration}
          formMode={currentType}
        />
        <FormField
          name="Center Name"
          label="Center Name"
          component={AppAutoComplete}
          helperText={touched.CenterName && errors.CenterName}
          formMode={currentType}
        />
        <FormField
          name="Year"
          label="Year"
          component={AppAutoComplete}
          helperText={touched.Year && errors.Year}
          formMode={currentType}
        />
      </div>

      <div>
        <FormField
          name="From Number"
          label="From Number"
          helperText={touched.FromNumber && errors.FromNumber}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="To Number"
          label="To Number"
          helperText={touched.ToNumber && errors.ToNumber}
          component={AppAutoComplete}
          formMode={currentType}
        />
      </div>
    </Form>
  );
};
