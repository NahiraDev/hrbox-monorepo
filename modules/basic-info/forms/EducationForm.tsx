import { FormField } from "@hrbox/uikit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
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
  const { touched, errors, handleSubmit, handleReset } = useFormContext();
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField
          name="Degree Level"
          label="Degree Level"
          helperText={touched.DegreeLevel && errors.DegreeLevel}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="Educational Institution"
          label="Educational Institution"
          helperText={
            touched.EducationalInstitution && errors.EducationalInstitution
          }
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="University Type"
          label="University Type"
          helperText={touched.UniversityType && errors.UniversityType}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="Field of Study"
          label="Field of Study"
          helperText={touched.FieldOfStudy && errors.FieldOfStudy}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="Thesis Title"
          label="Thesis Title"
          helperText={touched.ThesisTitle && errors.ThesisTitle}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="GPA"
          label="GPA"
          helperText={touched.GPA && errors.GPA}
          formMode={currentType}
        />
        <FormField
          name="From Year"
          label="From Year"
          helperText={touched.FromYear && errors.FromYear}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="To Year"
          label="To Year"
          helperText={touched.ToYear && errors.ToYear}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="Province"
          label="Province"
          helperText={touched.Province && errors.Province}
          component={AppAutoComplete}
          formMode={currentType}
        />
      </div>
      <div>
        <FormField
          name="Type"
          label="Type"
          helperText={touched.Type && errors.Type}
          component={AppTextArea}
          formMode={currentType}
        />
      </div>
    </form>
  );
};
