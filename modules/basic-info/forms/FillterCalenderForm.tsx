import { AppAutoComplete } from "@hrbox/uikit/components";
import { FormField } from "@hrbox/uikit/components/FormField";
import * as Yup from "yup";
import { useFormContext, useModalContext } from "@hrbox/core/providers";

export const initialValuesAction = {
  EducationalInstitution: null,
  SearchByNameOrPosition: null,
  PersonnelCode: null,
  NationalCode: null,
};
export const formValidationAction = Yup.object().shape({
  EducationalInstitution: Yup.string().required(),
  SearchByNameOrPosition: Yup.string().required(),
  PersonnelCode: Yup.string().required(),
  NationalCode: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  return {
    EducationalInstitution: values.EducationalInstitution,
    SearchByNameOrPosition: values.SearchByNameOrPosition,
    PersonnelCode: values.PersonnelCode,
    NationalCode: values.NationalCode,
  };
};
const FilterCalenderModal = () => {
  const { touched, errors, handleSubmit, handleReset } = useFormContext();
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField
          name="EducationalInstitution"
          label="Educational Institution"
          helperText={
            touched.EducationalInstitution && errors.EducationalInstitution
          }
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="SearchByNameOrPosition"
          label="Search by Name or Position"
          helperText={
            touched.SearchByNameOrPosition && errors.SearchByNameOrPosition
          }
          formMode={currentType}
        />
        <FormField
          name="PersonnelCode"
          label="Personnel Code"
          helperText={touched.PersonnelCode && errors.PersonnelCode}
          formMode={currentType}
        />
        <FormField
          name="NationalCode"
          label="National Code"
          helperText={touched.NationalCode && errors.NationalCode}
          formMode={currentType}
        />
      </div>
    </form>
  );
};

export default FilterCalenderModal;
