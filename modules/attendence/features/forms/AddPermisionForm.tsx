import { Form } from '@heroui/react';
import { AppInput } from 'core/components';

const AddPermisionForm=()=>{
  return(
    <>
    <Form>
      <div className="flex flex-row w-full justify-between">
        <AppInput
          props={{
            type: 'text',
            label: 'Please enter the time. ',
            name: 'title',
            // value: values.title,
            // error: touched.title && errors.title,
            // onChange: handleChange,
            // onBlur: handleBlur,
          }}
        />
        <AppInput
          props={{
            type: 'text',
            label: 'Please enter the time. ',
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
  )
}
export default AddPermisionForm;
