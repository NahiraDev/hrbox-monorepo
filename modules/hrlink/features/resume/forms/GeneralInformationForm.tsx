import { Form } from '@heroui/react';
import { useFormContext } from '@core/context';
import { useTranslation } from 'react-i18next';

import { AppAutoComplete, AppDatePicker, AppInput, AppTextArea } from '@core/components';
import {genderOptions, maritalStatusOptions} from '@core/helpers';
import * as Yup from 'yup';

export const initialValuesGeneralInformation = {
  FirstName: '',
  LastName: '',
  NationalCode: '',
  MilitaryStatusId: '',
  MaritalStatus: '',
  BirthDate: '',
  Address: '',
  AddressCityId: '',
  Gender: '',
  OtherSocials: '',
  Biography: '',
  UserjobGroup: '',
  UserJobCategory: '',
  RequestedSalary: '',
};

export const formValidationGeneralInformation = Yup.object().shape({
  FirstName: Yup.string(),
  LastName: Yup.string(),
  NationalCode: Yup.string(),
  MilitaryStatusId: Yup.string(),
  MaritalStatus: Yup.string(),
  BirthDate: Yup.string(),
  Address: Yup.string(),
  Gender: Yup.string(),
  OtherSocials: Yup.string(),
  Biography: Yup.string(),
  UserjobGroup: Yup.string(),
  UserJobCategory: Yup.string(),
  RequestedSalary: Yup.string(),
});

export const handleSubmitGeneralInformation = (values: any) => {
  return {
    FirstName: values.FirstName,
    LastName: values.LastName,
    NationalCode: values.NationalCode,
    MilitaryStatusId: values.MilitaryStatusId,
    MaritalStatus: values.MaritalStatus,
    BirthDate: values.BirthDate,
    Address: values.Address,
    Gender: values.Gender,
    OtherSocials: values.OtherSocials,
    Biography: values.Biography,
    UserjobGroup: values.UserjobGroup,
    UserJobCategory: values.UserJobCategory,
    RequestedSalary: values.RequestedSalary,
  };
};

export const GeneralInformationForm = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormContext();
  const { t } = useTranslation();
  const lang = 'en';
  return (
    <Form className="w-full flex flex-col gap-6" id="edit-general-information" onSubmit={handleSubmit}>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: t('first_name'),
              name: 'FirstName',
              onChange: handleChange,
              onBlur: handleBlur,
              error: touched.FirstName && errors.FirstName,
              value: values.FirstName,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: t('last_name'),
              name: 'LastName',
              onChange: handleChange,
              onBlur: handleBlur,
              error: touched.LastName && errors.LastName,
              value: values.LastName,
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: t('national_code'),
              name: 'NationalCode',
              onChange: handleChange,
              onBlur: handleBlur,
              error: touched.NationalCode && errors.NationalCode,
              value: values.NationalCode,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppDatePicker
            props={{
              label: t('date_of_birth'),
              name: 'BirthDate',
              onChange: handleChange,
              onBlur: handleBlur,
              error: touched.BirthDate && errors.BirthDate,
              value: values.BirthDate,
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'gender',
              label: t('gender'),
              displayKey: `label.${lang}`,
              valueKey: 'key',
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.Gender,
              error: touched.Gender && errors.Gender,
              data: genderOptions,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'MaritalStatus',
              label: t('marital_status'),
              displayKey: `label.${lang}`,
              valueKey: 'id',
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.MaritalStatus,
              error: touched.MaritalStatus && errors.MaritalStatus,
              data: maritalStatusOptions,
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'MilitaryStatusId',
              label: 'Military Status',
              displayKey: 'Namde',
              valueKey: 'Id',
              data: [],
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.MilitaryStatusId,
              error: touched.MilitaryStatusId && errors.MilitaryStatusId,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'AddressCityId',
              label: 'city',
              displayKey: 'Name',
              valueKey: 'Id',
              data: [],
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.AddressCityId,
              error: touched.AddressCityId && errors.AddressCityId,
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: t('address'),
              name: 'Address',
              error: touched.Address && errors.Address,
              value: values.Address,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: t('minimum_salary'),
              name: 'RequestedSalary',
              onChange: handleChange,
              onBlur: handleBlur,
              error: touched.RequestedSalary && errors.RequestedSalary,
              value: values.RequestedSalary,
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'UserJobCategory',
              label: t('working_category'),
              valueKey: 'Id',
              displayKey: 'Name',
              data: [],
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.UserJobCategory,
              error: touched.UserJobCategory && errors.UserJobCategory,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'UserjobGroup',
              label: t('organizational_category'),
              displayKey: 'Name',
              valueKey: 'Id',
              data: [],
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.UserjobGroup,
              error: touched.UserjobGroup && errors.UserjobGroup,
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: t('social_media_links'),
              name: 'OtherSocials',
              onChange: handleChange,
              onBlur: handleBlur,
              error: errors.OtherSocials,
              value: values.OtherSocials,
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-full">
          <AppTextArea
            props={{
              label: 'Biography',
              name: 'Biography',
              onChange: handleChange,
              onBlur: handleBlur,
              error: errors.Biography,
              value: values.Biography,
            }}
          />
        </div>
      </div>
    </Form>
  );
};
