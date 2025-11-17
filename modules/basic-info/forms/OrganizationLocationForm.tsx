import { AppAutoComplete, AppButton, AppModal, AppTextArea } from '@hrbox/UIKit/components';
import { Add } from 'iconsax-reactjs';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import { Avatar } from '@heroui/react';
import { FormField } from "@HRBox/UIKit/components/FormField";
import * as Yup from "yup";
export const initialValuesAction = {
  LocationTitle : null,
  URL : null,
  Province : null,
  City: null,
  HRManager : null,
  Address : null,
  Descriptions : null,
};
export const formValidationAction = Yup.object().shape({
  LocationTitle: Yup.string().required(),
  URL: Yup.string().required(),
  Province: Yup.string().required(),
  City: Yup.string().required(),
  HRManager: Yup.string().required(),
  Address: Yup.string().required(),
  Descriptions: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.LocationTitle);
  console.log(values.URL);
  console.log(values.Province);
  console.log(values.City);
  console.log(values.HRManager);
  console.log(values.Address);
  console.log(values.Descriptions);
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
  const { openModal } = useModalContext();

  return (
    <>
      <AppModal.Body>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex gap-3">
            <div>
              <Avatar size="lg" radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-secondary-1000">Location Photo</span>
              <AppButton
                props={{
                  size: 'xs',
                  radius: 'sm',
                  color: 'white',
                  variant: 'solid',
                  isIconOnly: true,
                  onPress: () => '',
                  content: (
                    <div className='flex items-center gap-1'>
                      <Add className="text-primary-600" size="20" />
                      <span className="text-primary-600 text-sm">Add Photo</span>
                    </div>
                  ),
                }}
              />
            </div>
          </div>
            <FormField name="Location Title" label='Location Title' component={AppAutoComplete}/>
            <FormField name="URL" label='URL' component={AppAutoComplete}/>
            <FormField name="Province" label='Province' component={AppAutoComplete}/>
            <FormField name="City" label='City' component={AppAutoComplete}/>
            <FormField name="HR Manager" label='HR Manager' component={AppAutoComplete}/>
            <FormField name="Address" label='Address' component={AppTextArea}/>
            <FormField name="Descriptions" label='Descriptions' component={AppTextArea}/>
        </div>
      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            onPress: () => '',
            content: <span>Cancel</span>,
            className:
              'text-Secondary-1000 py-1.5 px-3 text-xl rounded-lg hover:!bg-red-500 hover:text-white transition-all duration-200',
          }}
        />
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            onPress: () => console.log('a'),
            content: <span>Save Changes</span>,
            className: 'bg-primary text-white py-1.5 px-3 text-xl rounded-lg ',
          }}
        />
      </AppModal.Footer>
    </>
  );
};
