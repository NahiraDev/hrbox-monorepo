import { FormField } from "@hrbox/uikit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Form } from "@heroui/react";
import * as Yup from "yup";
import { useFormContext, useModalContext } from "@hrbox/core/providers";

export const initialValuesAction = {
  DegreeLevel: null,
  EducationalInstitution: null,
  UniversityType: null,
  FieldOfStudy: null,
  ThesisTitle: null,
  GPA: null,
  FromYear: null,
  ToYear: null,
  Province: null,
};
export const formValidationAction = Yup.object().shape({
  DegreeLevel: Yup.string().required(),
  EducationalInstitution: Yup.string().required(),
  UniversityType: Yup.string().required(),
  FieldOfStudy: Yup.string().required(),
  ThesisTitle: Yup.string().required(),
  GPA: Yup.string().required(),
  FromYear: Yup.string().required(),
  ToYear: Yup.string().required(),
  Province: Yup.string().required(),
  Type: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  return {
    DegreeLevel: values.DegreeLevel,
    EducationalInstitution: values.EducationalInstitution,
    UniversityType: values.UniversityType,
    FieldOfStudy: values.FieldofStudy,
    ThesisTitle: values.ThesisTitle,
    GPA: values.GPA,
    FromYear: values.FromYear,
    ToYear: values.ToYear,
    Province: values.Province,
    Type: values.Type,
  };
};
const EducationForm = () => {
  const { handleSubmit } = useFormContext();
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  return (
    <Form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField
          name="Degree Level"
          label="Degree Level"
          component={AppAutoComplete}
        />
        <FormField
          name="Educational Institution"
          label="Educational Institution"
          component={AppAutoComplete}
        />
        <FormField
          name="University Type"
          label="University Type"
          component={AppAutoComplete}
        />
        <FormField
          name="Field of Study"
          label="Field of Study"
          component={AppAutoComplete}
        />
        <FormField
          name="Thesis Title"
          label="Thesis Title"
          component={AppAutoComplete}
        />
        <FormField name="GPA" label="GPA" />
        <FormField
          name="From Year"
          label="From Year"
          component={AppAutoComplete}
        />
        <FormField name="To Year" label="To Year" component={AppAutoComplete} />
        <FormField
          name="Province"
          label="Province"
          component={AppAutoComplete}
        />
      </div>
      <div>
        <FormField name="Type" label="Type" component={AppTextArea} />
      </div>
    </Form>
  );
};
