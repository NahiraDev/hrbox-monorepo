import { FormField } from "@hrbox/uikit/components/FormField";
import { AppAutoComplete, AppDatePicker, AppTextArea } from "@hrbox/uikit/components";
import * as Yup from "yup";
import { useFormContext, useModalContext } from "@hrbox/core/providers";

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
  DescriptionSandAchievements: null,
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
  DescriptionSandAchievements: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
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
    DescriptionSandAchievements: values.DescriptionsandAchievements,
  };
};
const PreEmploymentHealthRecords = () => {
  const { touched, errors, handleSubmit, handleReset } = useFormContext();
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <FormField
          name="Type"
          label="Type"
          component={AppAutoComplete}
          helperText={touched.Type && errors.Type}
          formMode={currentType}
        />
        <FormField
          name="DrugAddiction"
          label="Drug Addiction"
          helperText={touched.DrugAddiction && errors.DrugAddiction}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="Smoking"
          label="Smoking"
          helperText={touched.Smoking && errors.Smoking}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="BloodType"
          label="Blood Type"
          helperText={touched.BloodType && errors.BloodType}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="GastrointestinalDisease"
          label="Gastrointestinal Disease"
          helperText={
            touched.GastrointestinalDisease && errors.GastrointestinalDisease
          }
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="AlcoholConsumption"
          label="Alcohol Consumption"
          helperText={touched.AlcoholConsumption && errors.AlcoholConsumption}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="MusculoskeletalDisease"
          label="Musculoskeletal Disease"
          helperText={
            touched.MusculoskeletalDisease && errors.MusculoskeletalDisease
          }
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="MentalHealthCondition"
          label="Mental Health Condition"
          helperText={
            touched.MentalHealthCondition && errors.MentalHealthCondition
          }
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="BloodSugarLevel"
          label="Blood Sugar Level"
          helperText={touched.BloodSugarLevel && errors.BloodSugarLevel}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="VitaminDLevel"
          label="Vitamin D Level"
          helperText={touched.VitaminDLevel && errors.VitaminDLevel}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="BloodPressure"
          label="Blood Pressure"
          helperText={touched.BloodPressure && errors.BloodPressure}
          component={AppAutoComplete}
          formMode={currentType}
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
        <FormField name="Date" label="Date" component={AppDatePicker} />
      </div>

      <div>
        <FormField
          name="Descriptions and Achievements"
          label="Descriptions and Achievements"
          component={AppTextArea}
        />
      </div>
    </form>
  );
};
