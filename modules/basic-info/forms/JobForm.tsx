import { FormField } from "@hrbox/uikit/components/FormField";
import {
  AppAutoComplete,
  AppSwitch,
  AppTextArea,
} from "@hrbox/uikit/components";
import * as Yup from "yup";
import { useFormContext, useModalContext } from "@hrbox/core/providers";

export const initialValuesJobForm = {
  Title: null,
  Company: null,
  StartDate: null,
  SalaryReceived: null,
  Industry: null,
  Province: null,
  JobGroup: null,
  DescriptionSandAchievements: null,
};
export const formValidationJobForm = Yup.object().shape({
  Title: Yup.string().required(),
  Company: Yup.string().required(),
  StartDate: Yup.string().required(),
  SalaryReceived: Yup.string().required(),
  Industry: Yup.string().required(),
  Province: Yup.string().required(),
  JobGroup: Yup.string().required(),
  DescriptionSandAchievements: Yup.string().required(),
});
export const handleSubmitJobForm = (values: any) => {
  return {
    Title: values.Title,
    Company: values.Company,
    StartDate: values.StartDate,
    SalaryReceived: values.SalaryReceived,
    Industry: values.Industry,
    Province: values.Province,
    JobGroup: values.JobGroup,
    DescriptionSandAchievements: values.DescriptionsandAchievements,
  };
};

const JobForm = () => {
  const { touched, errors, handleSubmit, handleReset } = useFormContext();
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField
          name="Title"
          label="Title"
          helperText={touched.Title && errors.Title}
          formMode={currentType}
        />
        <FormField
          name="Company"
          label="Company"
          helperText={touched.Company && errors.Company}
        />
        <FormField
          name="StartDate"
          label="Start Date"
          component={AppAutoComplete}
          helperText={touched.StartDate && errors.StartDate}
        />
        <FormField
          name="SalaryReceived"
          label="Salary Received"
          helperText={touched.SalaryReceived && errors.SalaryReceived}
        />
        <FormField
          name="Industry"
          label="Industry"
          component={AppAutoComplete}
          helperText={touched.Industry && errors.Industry}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField
          name="Province"
          label="Province"
          component={AppAutoComplete}
          helperText={touched.Province && errors.Province}
        />
        <FormField
          name="JobGroup"
          label="Job Group"
          component={AppAutoComplete}
          helperText={touched.JobGroup && errors.JobGroup}
        />
        <AppSwitch />
      </div>
      <div>
        <FormField
          name="DescriptionSandAchievements"
          label="Descriptions and Achievements"
          component={AppTextArea}
          helperText={
            touched.DescriptionSandAchievements &&
            errors.DescriptionSandAchievements
          }
        />
      </div>
    </form>
  );
};
