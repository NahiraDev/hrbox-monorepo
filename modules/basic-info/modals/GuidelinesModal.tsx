import {
  AppAutoComplete,
  AppModal
, FormField
} from "@hrbox/uikit/components";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import React from "react";
import { useFormContext } from "@hrbox/core/providers";

const GuidelinesModal = () => {

  const {  errors, touched } =
    useFormContext();

  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;

  return (
    <AppModal.Body>
          <FormField
            formMode={currentType}
            label="Form"
            name="Form"
            component={AppAutoComplete}
            helperText={touched.Form && errors.Form}
          />
    </AppModal.Body>
  );
};

export default GuidelinesModal;
