import { AppAutoComplete, AppButton, AppInput, AppModal, FormField } from "@hrbox/uikit/components";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { useFormContext } from "@hrbox/core/providers";

export const FilterCalenderModal = () => {

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormContext();

  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;

  return (
      <AppModal.Body>

          <FormField
            formMode={currentType}
            label="Select Unit "
            name="select"
            component={AppAutoComplete}
            helperText={touched.select && errors.select}
          />
         <FormField
            formMode={currentType}
            label="Search by Name or Position"
            name="Search"
            component={AppInput}
            helperText={touched.Search && errors.Search}
          />
         <FormField
            formMode={currentType}
            label=" Personnel Code"
            name="Personnel"
            component={AppInput}
            helperText={touched.Personnel && errors.Personnel}
          />
         <FormField
            formMode={currentType}
            label="National Code"
            name="National"
            component={AppInput}
            helperText={touched.National && errors.National}
          />

      </AppModal.Body>
  );
};


