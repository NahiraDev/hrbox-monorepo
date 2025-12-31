import {
  AppAutoComplete,
  AppInput,
  AppModal,
  AppTextArea,
  FormField,
} from "@hrbox/uikit/components";

import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { useFormContext } from "@hrbox/core/providers";

const AchivementsModals = () => {
  const { errors, touched } = useFormContext<any>();
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
            helperText={touched?.Title && errors?.Title}
          />

          <FormField
            formMode={currentType}
            label="Year"
            name="Year"
            component={AppAutoComplete}
            helperText={touched?.Year && errors?.Year}
          />

          <FormField
            formMode={currentType}
            label="Month"
            name="Month"
            component={AppAutoComplete}
            helperText={touched?.Month && errors?.Month}
          />

          <FormField
            formMode={currentType}
            label="Upload Documents"
            name="Upload"
            helperText={touched?.Upload && errors?.Upload}
          />
        </div>

        <FormField
          formMode={currentType}
          label="Descriptions"
          name="Descriptions"
          component={AppTextArea}
          helperText={touched?.Descriptions && errors?.Descriptions}
        />
      </div>
    </AppModal.Body>
  );
};

