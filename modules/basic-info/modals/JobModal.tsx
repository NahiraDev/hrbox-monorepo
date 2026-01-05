import React from "react";
import {
  AppButton,
  AppInput,
  AppModal,
  AppCheckBox,
  AppSwitch,
  AppTextArea, AppDatePicker, AppAutoComplete
} from "@hrbox/uikit/components";
import {useModal} from "@hrbox/core/hooks";
import {FormField} from "@hrbox/uikit/components/FormField";
import { useFormContext, useModalContext } from "@hrbox/core/providers";

export const JobModalProps = {
        title:"",
        department: "",
        type: "",
        startDate: "",
        salary: "",
        description: "",
}



export default function JobModal() {

  const { close } = useModal();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormContext();

  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;


  return (
    <div className="">
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            <FormField
              formMode={currentType}
              label="Title"
              name="Title"
              component={AppInput}
              helperText={touched.Title && errors.Title}
            />
            <FormField
              formMode={currentType}
              label="Company "
              name="Company "
              component={AppInput}
              helperText={touched.Company  && errors.Company }
            />
            <FormField
              formMode={currentType}
              label="Start Date "
              name="Start "
              component={AppDatePicker}
              helperText={touched.Start  && errors.Start }
            />
            <FormField
              formMode={currentType}
              label="Salary Received "
              name="Salary "
              component={AppInput}
              helperText={touched.Salary  && errors.Salary }
            />
            <FormField
              formMode={currentType}
              label="Industry "
              name="Industry "
              component={AppAutoComplete}
              helperText={touched.Industry  && errors.Industry }
            />
          </div>
          <div className="bg-surface-50 flex items-center justify-between py-5 px-3 rounded-lg">
            <span>I am still working at this company</span>
            <div className="flex items-center justify-around w-[315px]">
              <AppCheckBox
              />
              <AppCheckBox
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            <FormField
              formMode={currentType}
              label="Upload Work Sample "
              name="Upload "
              // component={AppUpload}
              helperText={touched.Upload  && errors.Upload }
            />
            <FormField
              formMode={currentType}
              label="Province "
              name="Province "
              component={AppAutoComplete}
              helperText={touched.Province  && errors.Province }
            />
            <FormField
              formMode={currentType}
              label="Job Group "
              name="Job "
              component={AppAutoComplete}
              helperText={touched.Job  && errors.Job }
            />
            <AppSwitch/>
          </div>
          <FormField
            formMode={currentType}
            label="Descriptions and Achievements "
            name="Descriptions "
            component={AppTextArea}
            helperText={touched.Descriptions  && errors.Descriptions }
          />
        </div>
      </AppModal.Body>

    </div>
  );
}
