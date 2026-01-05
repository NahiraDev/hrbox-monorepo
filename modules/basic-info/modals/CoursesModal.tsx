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
// import { AppRadio } from "@hrbox/uikit/components/AppRadio";

const CoursesModal = () => {

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
            label="Type"
            name="Type"
            component={AppAutoComplete}
            helperText={touched.Type && errors.Type}
          />
          <FormField
            formMode={currentType}
            label="Title"
            name="Title"
            component={AppInput}
            helperText={touched.Title && errors.Title}
          />
          <FormField
            formMode={currentType}
            label="Level"
            name="Level"
            component={AppAutoComplete}
            helperText={touched.Level && errors.Level}
          />
          <FormField
            formMode={currentType}
            label="Duration (Hours)"
            name="Duration"
            component={AppAutoComplete}
            helperText={touched.Duration && errors.Duration}
          />
          <FormField
            formMode={currentType}
            label="Center Name"
            name="Center"
            component={AppInput}
            helperText={touched.Center && errors.Center}
          />
          <FormField
            formMode={currentType}
            label="Year"
            name="Year"
            component={AppAutoComplete}
            helperText={touched.Year && errors.Year}
          />
          <FormField
            formMode={currentType}
            label="Upload portfolio"
            name="Upload"
            // component={AppUpload}
            helperText={touched.Upload && errors.Upload}
          />
        </div>
        <div className='flex flex-col gap-4.5'>
          <span className='text-sm text-secondary-1000 font-bold'>Grade value type</span>
            <div className="flex items-center justify-between">
              {/*<AppRadio name={} options={}/>*/}
            </div>
          <div className="flex items-center gap-[52px]">
            <FormField
              formMode={currentType}
              label="From Number"
              name="From"
              component={AppAutoComplete}
              helperText={touched.From && errors.From}
            />
            <FormField
              formMode={currentType}
              label="To Number"
              name="To"
              component={AppAutoComplete}
              helperText={touched.To && errors.To}
            />
          </div>
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

export default CoursesModal;
