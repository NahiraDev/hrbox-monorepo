import { Form } from '@heroui/react';
import { departmentUnit } from '@mock/chart-maker';

import { AppAutoComplete } from '../../../../core';
import * as Yup from 'yup';

export const initialValuesForm = {
  CurrentPassWord: '',
  NewPassWord: '',
  RepeatPassWord: '',
};

export const formValidationError = Yup.object().shape({
  CurrentPassWord: Yup.string().required('Current password is required'),
  NewPassWord: Yup.string()
    .required('New password is required')
    .min(6, 'New password must be at least 6 characters'),
  RepeatPassWord: Yup.string()
    .oneOf([Yup.ref('newPass')], 'Passwords must match')
    .required('Please confirm your new password'),
});

export const handleChangePasswordSubmit = (values: any) => {
  return {
    CurrentPassWord: values.CurrentPassWord,
    NewPassWord: values.NewPassWord,
    RepeatPassWord: values.RepeatPassWord,
  };
};

export const AttentionForm = () => {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <AppAutoComplete
        props={{
          label: 'Job Title',
          data: departmentUnit,
          name: 'JobTitle',
          value: values.JobTitle,
        }}
      />
    </Form>
  );
};
