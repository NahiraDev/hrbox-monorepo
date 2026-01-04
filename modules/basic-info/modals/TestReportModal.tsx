import { AppAutoComplete, AppInput, AppModal, FormField } from "@hrbox/uikit/components";
import { TickSquare } from "iconsax-reactjs";
import React from "react";
import { useFormContext, useModalContext } from "@hrbox/core/providers";

export const TestReportModal = () => {

  const {  errors, touched } =
    useFormContext();

  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;


  return (
    <AppModal.Body>
      <div className="grid grid-cols-2 gap-10">
        <FormField
          formMode={currentType}
          label="Title"
          name="Title"
          component={AppInput}
          helperText={touched.Title && errors.Title}
        />
        <FormField
          formMode={currentType}
          label="Type"
          name="Type"
          component={AppAutoComplete}
          helperText={touched.Type && errors.Type}
        />
        <FormField
          formMode={currentType}
          label="Full name"
          name="name"
          component={AppInput}
          helperText={touched.name && errors.name}
        />
        <FormField
          formMode={currentType}
          label="Test Grad"
          name="Test"
          component={AppAutoComplete}
          helperText={touched.Test && errors.Test}
        />

      </div>
    </AppModal.Body>
  );
};
