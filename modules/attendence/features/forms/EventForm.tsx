import { AppInput } from 'core/components/index';
import { useFormContext } from 'core/context';
import * as Yup from 'yup';
import { Form } from '@heroui/react';

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
      <AppInput
        props={{
          type: 'text',
          label: 'Please enter the time. ',
          name: 'title',
          value: values.title,
          error: touched.title && errors.title,
          onChange: handleChange,
          onBlur: handleBlur,
        }}
      />
    </Form>
  );
};
