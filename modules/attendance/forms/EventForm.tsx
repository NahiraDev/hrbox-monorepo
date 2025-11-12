import { useFormContext } from '@hrbox/core/providers';
import * as Yup from 'yup';
import { Form } from '@heroui/react';
import { FormField } from '@hrbox/uikit/components/FormField';

export const initialValuesEvent = {
  title: null,
};

export const formValidationEvent = Yup.object().shape({
  title: Yup.string().required(),
});

export const handleSubmitEvent = (values: any) => {
  return {
    title: values.title,
  };
};

export const EventForm = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormContext();

  return (
    <Form onSubmit={handleSubmit}>
      <FormField name='title' label='Please enter the time.' type='text'  />
    </Form>
  );
};
