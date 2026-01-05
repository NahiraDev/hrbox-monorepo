import {
  AppAutoComplete,
  AppButton, AppDatePicker,
  AppInput,
  AppModal,
  AppTextArea, FormField
} from "@hrbox/uikit/components";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { useFormContext } from "@hrbox/core/providers";

export const RelativesModal = () => {

  const { openModal } = useModalContext();

  const { errors, touched } = useFormContext<any>();
  const { getOpenModal } = useModalContext();

  const currentType = getOpenModal()?.type;


  return (
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <FormField
              formMode={currentType}
              label="First Name"
              name="First"
              component={AppInput}
              helperText={touched?.First && errors?.First}
            />

            <FormField
              formMode={currentType}
              label="Last Name"
              name="Last"
              component={AppInput}
              helperText={touched?.Last && errors?.Last}
            />

            <FormField
              formMode={currentType}
              label="National ID"
              name="National"
              component={AppInput}
              helperText={touched?.National && errors?.National}
            />

            <FormField
              formMode={currentType}
              label="Education"
              name="Education"
              component={AppAutoComplete}
              helperText={touched?.Education && errors?.Education}
            />
            <FormField
              formMode={currentType}
              label="Mobile"
              name="Mobile"
              component={AppInput}
              helperText={touched?.Mobile && errors?.Mobile}
            />
            <FormField
              formMode={currentType}
              label="Date of Birth"
              name="Date"
              component={AppDatePicker}
              helperText={touched?.Date && errors?.Date}
            />
          </div>
            <FormField
              formMode={currentType}
              label="Descriptions and Achievements"
              name="Descriptions"
              component={AppTextArea}
              helperText={touched?.Descriptions && errors?.Descriptions}
            />
        </div>
      </AppModal.Body>
  );
};
