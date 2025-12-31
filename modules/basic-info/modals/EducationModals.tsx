import {
  AppAutoComplete,
  AppButton, AppDatePicker,
  AppInput,
  AppModal,
  AppTextArea, FormField
} from "@hrbox/uikit/components";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import React from "react";
import { useFormContext } from "@hrbox/core/providers";

const EducationModals = () => {

  const { openModal } = useModalContext();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormContext();

  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;



  return (
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <FormField
              formMode={currentType}
              label="Degree Level"
              name="Degree"
              component={AppAutoComplete}
              helperText={touched.Degree && errors.Degree}
            />
            <FormField
              formMode={currentType}
              label="Educational Institution"
              name="Educational"
              component={AppAutoComplete}
              helperText={touched.Educational && errors.Educational}
            />
            <FormField
              formMode={currentType}
              label="University Type"
              name="University"
              component={AppAutoComplete}
              helperText={touched.University && errors.University}
            />
            <FormField
              formMode={currentType}
              label="Field of Study"
              name="Field"
              component={AppAutoComplete}
              helperText={touched.Field && errors.Field}
            />
            <FormField
              formMode={currentType}
              label="Thesis Title"
              name="Thesis"
              component={AppAutoComplete}
              helperText={touched.Thesis && errors.Thesis}
            />

            <FormField
              formMode={currentType}
              label="GPA"
              name="GPA"
              component={AppInput}
              helperText={touched.GPA && errors.GPA}
            />
            <FormField
              formMode={currentType}
              label="From Year"
              name="From"
              component={AppDatePicker}
              helperText={touched.From && errors.From}
            />
            <FormField
              formMode={currentType}
              label="To Year"
              name="To"
              component={AppDatePicker}
              helperText={touched.To && errors.To}
            />
           <FormField
              formMode={currentType}
              label="Province"
              name="Province"
              component={AppAutoComplete}
              helperText={touched.Province && errors.Province}
            />
          </div>
          <div>
            <FormField
              formMode={currentType}
              label="Descriptions*"
              name="Descriptions"
              component={AppTextArea}
              helperText={touched.Descriptions && errors.Descriptions}
            />
          </div>
        </div>
      </AppModal.Body>
  );
};

export default EducationModals;
