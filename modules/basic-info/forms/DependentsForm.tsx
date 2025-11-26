import { FormField } from "@hrbox/uikit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Form } from "@heroui/react";
import * as Yup from "yup";
import {useFormContext, useModalContext} from "@hrbox-monorepo/core/providers";

export const initialValuesAction = {
  FirstName: null,
  LastName: null,
  NationalID: null,
  Education: null,
  Mobile: null,
  DateOfBirth: null,
  Relation: null,
  DescriptionSandAchievements: null,
};
export const formValidationAction = Yup.object().shape({
  FirstName: Yup.string().required(),
  LastName: Yup.string().required(),
  NationalID: Yup.string().required(),
  Education: Yup.string().required(),
  Mobile: Yup.string().required(),
  DateOfBirth: Yup.string().required(),
  Relation: Yup.string().required(),
  DescriptionSandAchievements: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  return {
    FirstName: values.FirstName,
    LastName: values.LastName,
    NationalID: values.NationalID,
    Education: values.Education,
    Mobile: values.Mobile,
    DateOfBirth: values.DateOfBirth,
    Relation: values.Relation,
    DescriptionSandAchievements:values.DescriptionSandAchievements
  };
};
const DependentsForm = () => {
    const { errors, touched  , handleSubmit} =
        useFormContext();
    const { getOpenModal } = useModalContext();
    const currentType = getOpenModal()?.type;
  return (
    <Form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField name="First Name" label="First Name" helperText={touched.FirstName && errors.FirstName} formMode={currentType}/>
        <FormField name="Last Name" label="Last Name" helperText={touched.LastName && errors.LastName} formMode={currentType}/>
        <FormField name="National ID" label="National ID" helperText={touched.NationalID && errors.NationalID} formMode={currentType}/>
        <FormField name="Education" label="Education" helperText={touched.Education && errors.Education} formMode={currentType}/>
        <FormField name="Mobile'" label="Mobile" helperText={touched.Mobile && errors.Mobile} formMode={currentType}/>
        <FormField
          name="Date of Birth"
          label="Date of Birth"
          helperText={touched.DateOfBirth && errors.DateOfBirth}
          formMode={currentType}
          component={AppAutoComplete}
        />
        <FormField
          name="Relation"
          label="Relation"
          helperText={touched.Relation && errors.Relation}
          formMode={currentType}
          component={AppAutoComplete}
        />
      </div>

      <div>
        <FormField
          name="Descriptions and Achievements"
          label="Descriptions and Achievements"
          helperText={touched.DescriptionSandAchievements && errors.DescriptionSandAchievements}
          formMode={currentType}
          component={AppTextArea}
        />
      </div>
    </Form>
  );
};
