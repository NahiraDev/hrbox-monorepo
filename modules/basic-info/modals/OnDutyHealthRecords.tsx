import {
  AppAutoComplete,
  AppButton, AppCheckBox,
  AppInput,
  AppModal,
  AppTextArea, FormField
} from "@hrbox/uikit/components";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { useFormContext } from "@hrbox/core/providers";
import React from "react";

const OnDutyHealthRecords = () => {
  const {  errors, touched } =
    useFormContext();

  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;

  return (
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <FormField
              formMode={currentType}
              label="Title"
              name="Title"
              component={AppInput}
              helperText={touched.Title && errors.Title}
            />
            <FormField
              formMode={currentType}
              label="Amount"
              name="Amount"
              component={AppAutoComplete}
              helperText={touched.Amount && errors.Amount}
            />
            <FormField
              formMode={currentType}
              label="Attached File"
              name="Attached"
              component={AppAutoComplete}
              helperText={touched.Attached && errors.Attached}
            />
          </div>
          <div className="bg-primary-50 flex items-center justify-between py-5 px-3 rounded-lg ">
          <span className="text-sm font-semibold text-secondary-1000">Does it require treatment?</span>
          <div className="flex items-center justify-around ">
            <AppCheckBox
            />
            <AppCheckBox
            />
          </div>
        </div>
        </div>

      </AppModal.Body>
  );
};

export default OnDutyHealthRecords;
