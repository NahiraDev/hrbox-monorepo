import { FormField } from "@HRBox/UIKit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@HRBox/UIKit/components";
import { Form } from "@heroui/react";
import * as Yup from "yup";
export const initialValuesAction = {
  Type : null,
  DrugAddiction : null,
  Smoking : null,
  BloodType: null,
  GastrointestinalDisease : null,
  AlcoholConsumption : null,
  MusculoskeletalDisease : null,
  MentalHealthCondition : null,
  BloodSugarLevel : null,
  VitaminDLevel : null,
  BloodPressure : null,
  LiverEnzymeStatus : null,
  Audiometry : null,
  BreathTest : null,
  VisionTest : null,
  ECG : null,
  BloodLipidLevel : null,
  BloodIronLevel : null,
  Date : null,
  DescriptionsandAchievements : null,
};
export const formValidationAction = Yup.object().shape({
  title: Yup.string().required(),
  type: Yup.string().required(),
  ChooseIp: Yup.string().required(),
  FromDate: Yup.string().required(),
  organization: Yup.string().required(),
  Department: Yup.string().required(),
  JobTitle: Yup.string().required(),
  Employee: Yup.string().required(),
  Description: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.title);
  console.log(values.type);
  console.log(values.ChooseShift);
  console.log(values.FromDate);
  console.log(values.organization);
  console.log(values.Employee);
  console.log(values.Description);
  return {
    title: values.title,
    type: values.type,
    ChooseIp: values.ChooseIp,
    FromDate: values.FromDate,
    organization: values.organization,
    Department: values.Department,
    JobTitle: values.JobTitle,
    Employee: values.Employee,
    Description: values.Description,
  };
};
const PreEmploymentHealthRecords = () => {
  return(
    <Form>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField name="Type" label='Type' component={AppAutoComplete} />
        <FormField name="Drug Addiction" label='Drug Addiction'  component={AppAutoComplete}/>
        <FormField name="Smoking" label='Smoking' component={AppAutoComplete} />
        <FormField name="Blood Type" label='Blood Type' component={AppAutoComplete} />
        <FormField name="Gastrointestinal Disease" label='Gastrointestinal Disease' component={AppAutoComplete} />
        <FormField name="Alcohol Consumption" label='Alcohol Consumption' component={AppAutoComplete} />
        <FormField name="Musculoskeletal Disease" label='Musculoskeletal Disease' component={AppAutoComplete} />
        <FormField name="Mental Health Condition" label='Mental Health Condition' component={AppAutoComplete} />
        <FormField name="Blood Sugar Level" label='Blood Sugar Level' component={AppAutoComplete} />
        <FormField name="Vitamin D Level" label='Vitamin D Level' component={AppAutoComplete} />
        <FormField name="Blood Pressure " label='Blood Pressure ' component={AppAutoComplete} />
        <FormField name="Liver Enzyme Status" label='Liver Enzyme Status' component={AppAutoComplete} />
        <FormField name="Audiometry " label='Audiometry ' component={AppAutoComplete} />
        <FormField name="Breath Test" label='Breath Test' component={AppAutoComplete} />
        <FormField name="Vision Test" label='Vision Test' component={AppAutoComplete} />
        <FormField name="ECG" label='ECG' component={AppAutoComplete} />
        <FormField name="Blood Lipid Level" label='Blood Lipid Level' component={AppAutoComplete} />
        <FormField name="Blood Iron Level" label='Blood Iron Level' component={AppAutoComplete} />
        {/*we dont have Attached File*/}
        <FormField name="Date" label='Date' component={AppAutoComplete} />
      </div>

      <div>
        <FormField  name="Descriptions and Achievements" label='Descriptions and Achievements' component={AppTextArea} />
      </div>
    </Form>
  )
}