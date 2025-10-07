import { Form } from '@heroui/react';
import { AppAutoComplete, AppInput } from '@core/components';

const AddPermisionForm = () => {
  return (
    <>
      <Form className="gap-6">
        <div className="flex flex-row w-full justify-between gap- ">
          <AppInput
            props={{
              type: 'text',
              label: 'From Time',
              name: 'title',
              size: 'md',
              variant:"solid",
              className: 'w-full',
              // value: values.title,
              // error: touched.title && errors.title,
              // onChange: handleChange,
              // onBlur: handleBlur,
            }}
          />
          <AppInput
            props={{
              type: 'text',
              label: 'To Time',
              name: 'title',
              className: 'w-full',

              // value: values.title,
              // error: touched.title && errors.title,
              // onChange: handleChange,
              // onBlur: handleBlur,
            }}
          />
        </div>{' '}
        <div className="flex flex-row w-full justify-between">
          <AppAutoComplete
            props={{
              type: 'text',
              label: 'Choose Type',
              name: 'title',
              // value: values.title,
              // error: touched.title && errors.title,
              // onChange: handleChange,
              // onBlur: handleBlur,
            }}
          />
        </div>
      </Form>
    </>
  );
};

export default AddPermisionForm;
