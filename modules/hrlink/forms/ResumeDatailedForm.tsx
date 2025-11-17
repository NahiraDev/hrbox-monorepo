import { AppAutoComplete, AppButton, AppSwitch } from '@hrbox-monorepo/UIKit/components';
import { FormModal } from '@hrbox/uikit/components/FormModal'
import { Edit, UserRemove, VolumeHigh } from 'iconsax-reactjs';
import { Form } from '@heroui/react';
import { useState } from 'react';
import * as Yup from 'yup';

import { companyPeopleOptions } from '@hrbox-monorepo/modules/hrlink/app/mock';
import { useFormContext } from '@hrbox-monorepo/core/providers/FormProvider';
import { FormField } from '@hrbox/uikit/components/FormField';

export const initialValuesEditGeralSetting = {
  NotificationByEmail: true,
  NotificationBySms: true,
  NotificationByPanel: true,
  AdaptationWithOldCompanies: true,
  AdaptationWithCurrentCompanies: true,
  AdaptationWithLowerSalary: true,
  AdaptationWithCompanyPersonalMax: 0,
  AdaptationWithCompanyPersonalMin: 0,
  AdaptationDistanceLimit: 0,
};

export const validationErrorEditGeneralSetting = Yup.object().shape({
  NotificationByEmail: Yup.boolean().required(),
  NotificationBySms: Yup.boolean().required(),
  NotificationByPanel: Yup.boolean().required(),

  AdaptationWithOldCompanies: Yup.boolean().required(),
  AdaptationWithCurrentCompanies: Yup.boolean().required(),
  AdaptationWithLowerSalary: Yup.boolean().required(),

  AdaptationWithCompanyPersonalMax: Yup.number()
    .required('Panel status is required')
    .oneOf([0, 1], 'Invalid panel status'),

  AdaptationWithCompanyPersonalMin: Yup.number()
    .oneOf(
      companyPeopleOptions.map((opt: { id: any }) => opt.id),
      'Invalid company size option',
    )
    .required('Company size is required'),

  AdaptationDistanceLimit: Yup.number().min(0, 'Must be at least 0').required('Required'),
});

export const ResumeDatailedForm = () => {
  const { 
    values, errors, touched, handleChange, handleBlur, handleSubmit 
  } = useFormContext();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
        <AppButton
          onPress={() => setOpen(true)}
          variant="primary"
          startContent={<Edit />}
          content="Edit General Settings"
        />

      {/* Your form — FormModal will use this Formik context */}
      <Form onSubmit={handleSubmit}>
              <FormField
        name="NotificationByEmail"
        label="Email Notifications"
        type="checkbox"
        component={AppSwitch} // custom UI component
      />

      <FormField
        name="AdaptationWithCompanyPersonalMin"
        label="Min Company Size"
        component={AppAutoComplete}
        options={companyPeopleOptions}
      />

      <FormField
        name="AdaptationDistanceLimit"
        label="Distance Limit (KM)"
        type="number"
      />

      <AppButton
        type="submit"
        variant="primary"
        content="Save Settings"
      />

      </Form>
    </>
  );
};