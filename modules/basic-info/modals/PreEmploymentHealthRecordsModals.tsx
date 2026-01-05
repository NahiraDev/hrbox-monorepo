import {
  AppAutoComplete,
  AppButton, AppCheckBox, AppDatePicker,
  AppInput,
  AppModal,
  AppTextArea, FormField
} from "@hrbox/uikit/components";

import React  from "react";
import { useFormContext, useModalContext } from "@hrbox/core/providers";


const PreEmploymentHealthRecordsModals = () => {

  const {  errors, touched } =
    useFormContext();

  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;


  return (
      <AppModal.Body>
        <div className="flex flex-col gap-y-6 p-4">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <FormField
              formMode={currentType}
              label="Type"
              name="Type"
              component={AppAutoComplete}
              helperText={touched.Type && errors.Type}
            />
            <FormField
              formMode={currentType}
              label="Drug Addiction"
              name="Drug"
              component={AppAutoComplete}
              helperText={touched.Drug && errors.Drug}
            />
            <FormField
              formMode={currentType}
              label="Smoking"
              name="Smoking"
              component={AppAutoComplete}
              helperText={touched.Smoking && errors.Smoking}
            />
             <FormField
              formMode={currentType}
              label="Blood Type"
              name="Blood"
              component={AppAutoComplete}
              helperText={touched.Blood && errors.Blood}
            />
            <FormField
              formMode={currentType}
              label="Gastrointestinal Disease"
              name="Gastrointestinal"
              component={AppAutoComplete}
              helperText={touched.Gastrointestinal && errors.Gastrointestinal}
            />
            <FormField
              formMode={currentType}
              label="Alcohol Consumption"
              name="Alcohol"
              component={AppAutoComplete}
              helperText={touched.Alcohol && errors.Alcohol}
            />
            <FormField
              formMode={currentType}
              label="Musculoskeletal Disease"
              name="Musculoskeletal"
              component={AppAutoComplete}
              helperText={touched.Musculoskeletal && errors.Musculoskeletal}
            />
            <FormField
              formMode={currentType}
              label="Mental Health Condition"
              name="Mental"
              component={AppAutoComplete}
              helperText={touched.Mental && errors.Mental}
            />
            <FormField
              formMode={currentType}
              label="Blood Sugar Level"
              name="Blood"
              component={AppAutoComplete}
              helperText={touched.Blood && errors.Blood}
            />
             <FormField
              formMode={currentType}
              label="Vitamin D Level"
              name="Vitamin"
              component={AppAutoComplete}
              helperText={touched.Vitamin && errors.Vitamin}
            />
            <FormField
              formMode={currentType}
              label="Blood Pressure"
              name="Blood"
              component={AppAutoComplete}
              helperText={touched.Blood && errors.Blood}
            />
            <FormField
              formMode={currentType}
              label="Liver Enzyme Status"
              name="Liver"
              component={AppAutoComplete}
              helperText={touched.Liver && errors.Liver}
            />
            <FormField
              formMode={currentType}
              label="Audiometry "
              name="Audiometry "
              component={AppAutoComplete}
              helperText={touched.Audiometry  && errors.Audiometry }
            />
            <FormField
              formMode={currentType}
              label="Breath Test"
              name="Breath"
              component={AppAutoComplete}
              helperText={touched.Breath && errors.Breath}
            />
            <FormField
              formMode={currentType}
              label="Vision Test"
              name="Vision"
              component={AppAutoComplete}
              helperText={touched.Vision && errors.Vision}
            />
            <FormField
              formMode={currentType}
              label="ECG"
              name="ECG"
              component={AppAutoComplete}
              helperText={touched.ECG && errors.ECG}
            />
            <FormField
              formMode={currentType}
              label="Blood Lipid Level"
              name="Blood"
              component={AppAutoComplete}
              helperText={touched.Blood && errors.Blood}
            />
             <FormField
              formMode={currentType}
              label="Blood Iron Level"
              name="Blood"
              component={AppAutoComplete}
              helperText={touched.Blood && errors.Blood}
            />
            <FormField
              formMode={currentType}
              label="Attached File"
              name="Attached"
              component={AppAutoComplete}
              helperText={touched.Attached && errors.Attached}
            />
            <FormField
              formMode={currentType}
              label="Date"
              name="Date"
              component={AppDatePicker}
              helperText={touched.Date && errors.Date}
            />
          </div>
          <FormField
            formMode={currentType}
            label="Descriptions and Achievements"
            name="Descriptions"
            component={AppTextArea}
            helperText={touched.Descriptions && errors.Descriptions}
          />

        </div>
        <div className="bg-primary-50 flex items-center justify-between py-5 px-3 rounded-lg">
          <span className="text-sm font-semibold text-secondary-1000">Does it require treatment?</span>
          <div className="flex items-center justify-around ">
            <AppCheckBox
            />
            <AppCheckBox
            />
          </div>
        </div>
      </AppModal.Body>

  );
};

export default PreEmploymentHealthRecordsModals;
