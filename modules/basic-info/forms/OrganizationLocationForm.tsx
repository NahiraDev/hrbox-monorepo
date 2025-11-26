import {
  AppAutoComplete,
  AppButton,
  AppTextArea,
} from "@hrbox/uikit/components";
import { Add } from "iconsax-reactjs";
import { Avatar } from "@heroui/react";
import { FormField } from "@hrbox/uikit/components/FormField";
import * as Yup from "yup";
import { useFormContext, useModalContext } from "@hrbox/core/providers";

export const initialValuesOrganizationLocation = {
  LocationTitle: null,
  URL: null,
  Province: null,
  City: null,
  HRManager: null,
  Address: null,
  Descriptions: null,
};
export const formValidationOrganizationLocation = Yup.object().shape({
  LocationTitle: Yup.string().required(),
  URL: Yup.string().required(),
  Province: Yup.string().required(),
  City: Yup.string().required(),
  HRManager: Yup.string().required(),
  Address: Yup.string().required(),
  Descriptions: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  return {
    LocationTitle: values.LocationTitle,
    URL: values.URL,
    Province: values.Province,
    City: values.City,
    HRManager: values.HRManager,
    Address: values.Address,
    Descriptions: values.Descriptions,
  };
};
export const OrganizationLocationModal = () => {
  const { touched, errors, handleSubmit, handleReset } = useFormContext();
  const { getOpenModal } = useModalContext();
  const currentType = getOpenModal()?.type;
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
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
              size="xs"
              radius="sm"
              color="white"
              variant="solid"
              isIconOnly
              content={
                <div className="flex items-center gap-1">
                  <Add className="text-primary-600" size="20" />
                  <span className="text-primary-600 text-sm">Add Photo</span>
                </div>
              }
            />
          </div>
        </div>
        <FormField
          name="LocationTitle"
          label="Location Title"
          component={AppAutoComplete}
          helperText={touched.LocationTitle && errors.LocationTitle}
          formMode={currentType}
        />
        <FormField
          name="URL"
          label="URL"
          helperText={touched.URL && errors.URL}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="Province"
          label="Province"
          component={AppAutoComplete}
          helperText={touched.Province && errors.Province}
          formMode={currentType}
        />
        <FormField
          name="City"
          label="City"
          helperText={touched.City && errors.City}
          component={AppAutoComplete}
          formMode={currentType}
        />
        <FormField
          name="HRManager"
          label="HR Manager"
          component={AppAutoComplete}
          helperText={touched.HRManager && errors.HRManager}
          formMode={currentType}
        />
        <FormField
          name="Address"
          label="Address"
          helperText={touched.Address && errors.Address}
          component={AppTextArea}
          formMode={currentType}
        />
        <FormField
          name="Descriptions"
          label="Descriptions"
          component={AppTextArea}
          helperText={touched.Descriptions && errors.Descriptions}
          formMode={currentType}
        />
      </div>
    </form>
  );
};
