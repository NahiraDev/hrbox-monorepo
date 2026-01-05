import {
  AppAutoComplete,
  AppButton, AppDatePicker, AppInput,
  AppModal,
  AppTextArea, FormField
} from "@hrbox/uikit/components";
import { Add } from "iconsax-reactjs";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { Avatar } from "@heroui/react";
import { useFormContext } from "@hrbox/core/providers";

export const OrganizationLocationModal = () => {
  const { openModal } = useModalContext();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormContext();

  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;


  return (
      <AppModal.Body>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex gap-3">
            <div>
              <Avatar
                size="lg"
                radius="sm"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-secondary-1000">
                Location Photo
              </span>
              <AppButton
                props={{
                  size: "xs",
                  radius: "sm",
                  color: "white",
                  variant: "solid",
                  isIconOnly: true,
                  onPress: () => openModal("edit", undefined),
                  content: (
                    <div className="flex items-center gap-1">
                      <Add className="text-primary-600" size="20" />
                      <span className="text-primary-600 text-sm">
                        Add Photo
                      </span>
                    </div>
                  ),
                }}
              />
            </div>
          </div>
          <FormField
             formMode={currentType}
            label="Location Title"
            name="LocationTitle"
            component={AppInput}
            helperText={touched.LocationTitle && errors.LocationTitle}
          />
          <FormField
             formMode={currentType}
            label="URL"
            name="URL"
            component={AppInput}
            helperText={touched.URL && errors.URL}
          />

       <FormField
            formMode={currentType}
            label="Province"
            name="Province"
            component={AppAutoComplete}
            helperText={touched.Province && errors.Province}
          />
          <FormField
             formMode={currentType}
            label="City"
            name="City"
            component={AppAutoComplete}
            helperText={touched.City && errors.City}
          />
                <FormField
                   formMode={currentType}
            label="HR Manager"
            name="HRManager"
            component={AppInput}
            helperText={touched.HRManager && errors.HRManager}
          />
        </div>
        <div>
          <FormField
             formMode={currentType}
            label="Address"
            name="Address"
            component={AppTextArea}
            helperText={touched.Address && errors.Address}
          />
          <FormField
             formMode={currentType}
          label="Descriptions"
          name="Descriptions"
          component={AppTextArea}
          helperText={touched.Descriptions && errors.Descriptions}
        />
        </div>
      </AppModal.Body>

  );
};
