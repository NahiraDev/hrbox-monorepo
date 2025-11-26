import { FormField } from "@hrbox/uikit/components/FormField";
import { AppAutoComplete, AppTextArea } from "@hrbox/uikit/components";
import { Form } from "@heroui/react";
import * as Yup from "yup";
export const initialValuesHealthDuty = {
  Type: null,
  DrugAddiction: null,
  Smoking: null,
  BloodType: null,
  GastrointestinalDisease: null,
  AlcoholConsumption: null,
  MusculoskeletalDisease: null,
  MentalHealthCondition: null,
  BloodSugarLevel: null,
  VitaminDLevel: null,
  BloodPressure: null,
  LiverEnzymeStatus: null,
  Audiometry: null,
  BreathTest: null,
  VisionTest: null,
  ECG: null,
  BloodLipidLevel: null,
  BloodIronLevel: null,
  Date: null,
  DescriptionsandAchievements: null,
};
export const formValidationHealthDuty = Yup.object().shape({
  Type: Yup.string().required(),
  DrugAddiction: Yup.string().required(),
  Smoking: Yup.string().required(),
  BloodType: Yup.string().required(),
  GastrointestinalDisease: Yup.string().required(),
  AlcoholConsumption: Yup.string().required(),
  MusculoskeletalDisease: Yup.string().required(),
  MentalHealthCondition: Yup.string().required(),
  BloodSugarLevel: Yup.string().required(),
  VitaminDLevel: Yup.string().required(),
  BloodPressure: Yup.string().required(),
  LiverEnzymeStatus: Yup.string().required(),
  Audiometry: Yup.string().required(),
  BreathTest: Yup.string().required(),
  VisionTest: Yup.string().required(),
  ECG: Yup.string().required(),
  BloodLipidLevel: Yup.string().required(),
  BloodIronLevel: Yup.string().required(),
  Date: Yup.string().required(),
  DescriptionsandAchievements: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.Type);
  console.log(values.DrugAddiction);
  console.log(values.Smoking);
  console.log(values.BloodType);
  console.log(values.GastrointestinalDisease);
  console.log(values.AlcoholConsumption);
  console.log(values.MusculoskeletalDisease);
  console.log(values.MentalHealthCondition);
  console.log(values.BloodSugarLevel);
  console.log(values.VitaminDLevel);
  console.log(values.BloodPressure);
  console.log(values.LiverEnzymeStatus);
  console.log(values.Audiometry);
  console.log(values.BreathTest);
  console.log(values.VisionTest);
  console.log(values.ECG);
  console.log(values.BloodLipidLevel);
  console.log(values.BloodIronLevel);
  console.log(values.Date);
  console.log(values.DescriptionsandAchievements);
  return {
    Type: values.Type,
    DrugAddiction: values.DrugAddiction,
    Smoking: values.Smoking,
    BloodType: values.BloodType,
    GastrointestinalDisease: values.GastrointestinalDisease,
    AlcoholConsumption: values.AlcoholConsumption,
    MusculoskeletalDisease: values.MusculoskeletalDisease,
    MentalHealthCondition: values.MentalHealthCondition,
    BloodSugarLevel: values.BloodSugarLevel,
    VitaminDLevel: values.VitaminDLevel,
    BloodPressure: values.BloodPressure,
    LiverEnzymeStatus: values.LiverEnzymeStatus,
    Audiometry: values.Audiometry,
    BreathTest: values.BreathTest,
    VisionTest: values.VisionTest,
    ECG: values.ECG,
    BloodLipidLevel: values.BloodLipidLevel,
    BloodIronLevel: values.BloodIronLevel,
    Date: values.Date,
    DescriptionsandAchievements: values.DescriptionsandAchievements,
  };
};
const PreEmploymentHealthRecords = () => {
  return (
    <Form>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField name="Type" label="Type" component={AppAutoComplete} />
        <FormField
          name="Drug Addiction"
          label="Drug Addiction"
          component={AppAutoComplete}
        />
        <FormField name="Smoking" label="Smoking" component={AppAutoComplete} />
        <FormField
          name="Blood Type"
          label="Blood Type"
          component={AppAutoComplete}
        />
        <FormField
          name="Gastrointestinal Disease"
          label="Gastrointestinal Disease"
          component={AppAutoComplete}
        />
        <FormField
          name="Alcohol Consumption"
          label="Alcohol Consumption"
          component={AppAutoComplete}
        />
        <FormField
          name="Musculoskeletal Disease"
          label="Musculoskeletal Disease"
          component={AppAutoComplete}
        />
        <FormField
          name="Mental Health Condition"
          label="Mental Health Condition"
          component={AppAutoComplete}
        />
        <FormField
          name="Blood Sugar Level"
          label="Blood Sugar Level"
          component={AppAutoComplete}
        />
        <FormField
          name="Vitamin D Level"
          label="Vitamin D Level"
          component={AppAutoComplete}
        />
        <FormField
          name="Blood Pressure "
          label="Blood Pressure "
          component={AppAutoComplete}
        />
        <FormField
          name="Liver Enzyme Status"
          label="Liver Enzyme Status"
          component={AppAutoComplete}
        />
        <FormField
          name="Audiometry "
          label="Audiometry "
          component={AppAutoComplete}
        />
        <FormField
          name="Breath Test"
          label="Breath Test"
          component={AppAutoComplete}
        />
        <FormField
          name="Vision Test"
          label="Vision Test"
          component={AppAutoComplete}
        />
        <FormField name="ECG" label="ECG" component={AppAutoComplete} />
        <FormField
          name="Blood Lipid Level"
          label="Blood Lipid Level"
          component={AppAutoComplete}
        />
        <FormField
          name="Blood Iron Level"
          label="Blood Iron Level"
          component={AppAutoComplete}
        />
        {/*we dont have Attached File*/}
        <FormField name="Date" label="Date" component={AppAutoComplete} />
      </div>

      <div>
        <FormField
          name="Descriptions and Achievements"
          label="Descriptions and Achievements"
          component={AppTextArea}
        />
      </div>
    </Form>
  );
};
