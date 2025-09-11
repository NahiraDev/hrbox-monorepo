import { AppAutoComplete, AppButton, AppSwitch } from 'core/components';
import { Edit, UserRemove, VolumeHigh } from 'iconsax-react';
import { Form } from '@heroui/react';
import { useState } from 'react';
import * as Yup from 'yup';

import { JobOffersIcon } from '../../../icons';
import { companyPeopleOptions } from '../../../../../mock';
import { useFormContext } from '../../../../../core';

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

export const GeneralSettingForm = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormContext();
  const [showGeneralSettingButton, setShowGeneralSettingButton] = useState<boolean>(false);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex justify-between border-b-1 border-neutral-100 dark:border-neutral-700 pb-1.5 w-full">
        <span className="text-secondary-900 dark:text-white text-xl font-normal leading-normal">General Setting</span>
        <div className="flex gap-1.5">
          <AppButton
            props={{
              size: 'md',
              color: 'info',
              content: (
                <>
                  <UserRemove className="" size="16" />
                  <span className="text-secondary-1000 text-base">Deactivate Account</span>
                </>
              ),
            }}
          />
          <AppButton
            props={{
              size: 'md',
              color: 'white',
              isIconOnly: true,
              onPress: () => setShowGeneralSettingButton(!showGeneralSettingButton),
              content: <Edit className="text-secondary-1000" size="18" />,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-4 px-6">
        <div className="bg-secondary-400 !h-10 !rounded-md px-3 py-1.5 w-fit flex gap-2 items-center">
          <VolumeHigh className="text-white" size="22" />
          <span className="text-white text-xl font-normal leading-normal">Notifications</span>
        </div>

        <div className="flex flex-col gap-3 px-5">
          <AppSwitch
            props={{
              size: 'sm',
              color: 'danger',
              label: 'Email',
              name: 'NotificationByEmail',
              onChange: handleChange,
              onBlur: handleBlur,
              isSelected: values.NotificationByEmail,
              error: touched.NotificationByEmail && errors.NotificationByEmail,
              values: values.NotificationByEmail,
            }}
          />
          <AppSwitch
            props={{
              size: 'sm',
              color: 'danger',
              label: 'SMS',
              name: 'NotificationBySms',
              onChange: handleChange,
              onBlur: handleBlur,
              isSelected: values.NotificationBySms,
              error: touched.NotificationBySms && errors.NotificationBySms,
              values: values.NotificationBySms,
            }}
          />
          <AppSwitch
            props={{
              size: 'sm',
              color: 'danger',
              label: 'Panel',
              name: 'NotificationByPanel',
              onChange: handleChange,
              onBlur: handleBlur,
              isSelected: values.NotificationByPanel,
              error: touched.NotificationByPanel && errors.NotificationByPanel,
              values: values.NotificationByPanel,
            }}
          />
        </div>

        <div className="bg-secondary-400 !h-10 !rounded-md shadow-light-tight/1 px-3 py-1.5 w-fit flex gap-2 items-center">
          <JobOffersIcon color="#fff" />
          <span className="text-white text-xl">Offers</span>
        </div>

        <div className="flex flex-col gap-3">
          <AppSwitch
            props={{
              size: 'sm',
              color: 'danger',
              label: 'Offer my resume to previous companies',
              name: 'AdaptationWithOldCompanies',
              onChange: handleChange,
              onBlur: handleBlur,
              isSelected: values.AdaptationWithOldCompanies,
              error: touched.AdaptationWithOldCompanies && errors.AdaptationWithOldCompanies,
              values: values.AdaptationWithOldCompanies,
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <AppAutoComplete
            props={{
              name: 'AdaptationWithCompanyPersonal',
              label: 'Resume for Small Companies',
              placeholder: 'Please Select Resume For Small Companies ...',
              displayKey: 'label',
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.AdaptationWithCompanyPersonal,
              error: touched.AdaptationWithCompanyPersonal && errors.AdaptationWithCompanyPersonal,
              data: companyPeopleOptions,
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <AppAutoComplete
            props={{
              displayKey: 'Name',
              name: 'AdaptationWithCurrentCompanies',
              label: 'Resume for Selected Industries',
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.AdaptationWithCurrentCompanies,
              error: touched.AdaptationWithCurrentCompanies && errors.AdaptationWithCurrentCompanies,
              data: [],
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <AppAutoComplete
            props={{
              name: 'AdaptationWithOldCompanies',
              label: 'Resume for Selected Companies',
              placeholder: 'Please Select Companies ...',
              displayKey: 'label',
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.AdaptationWithOldCompanies,
              error: touched.AdaptationWithOldCompanies && errors.AdaptationWithOldCompanies,
              data: companyPeopleOptions,
            }}
          />
        </div>
        <div className="flex gap-7 justify-end">
          {showGeneralSettingButton && (
            <>
              <AppButton
                props={{
                  size: 'md',
                  color: 'light',
                  content: 'Cancel',
                }}
              />
              <AppButton
                props={{
                  size: 'md',
                  color: 'secondary',
                  content: 'Save Changes',
                  type: 'submit',
                }}
              />
            </>
          )}
        </div>
      </div>
    </Form>
  );
};
