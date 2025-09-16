import { CheckboxGroup, Form } from '@heroui/react';
import * as Yup from 'yup';

import { AppAutoComplete, AppInput, AppTextArea, useFormContext } from '../../../../core';
import AppCheckbox from '../../../../core/components/AppCheckBox';

export const initialValuesNewOne = {
  title: '',
  type: '',
  processbuilder: '',
  category_process: '',
  textarea: '',
  processModal: '',
};
export const formValidationNewOne = Yup.object().shape({
  title: Yup.string().required(),
  type: Yup.string().required(),
  processbuilder: Yup.string().required(),
  category_process: Yup.string().required(),
  textarea: Yup.string().required(),
  processModal: Yup.string().required(),
});
export const handleSubmitNewOne = (values: any) => {
  return {
    title: values.title,
    type: values.type,
    processbuilder: values.processbuilder,
    category_process: values.category_process,
    textarea: values.textarea,
    processModal: values.processModal,
  };
};
export const NewOneForm = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormContext();

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-[24px]">
        <div>
          <AppInput
            props={{
              error: touched.title && errors.title,
              label: 'title',
              name: 'title',
              value: values.title,
              onBlur: handleBlur,
              onChange: handleChange,
            }}
          />
        </div>
        <div>
          <AppInput
            props={{
              error: touched.type && errors.type,
              label: 'type',
              name: 'type',
              value: values.type,
              onBlur: handleBlur,
              onChange: handleChange,
            }}
          />
        </div>
        <div>
          <AppAutoComplete
            props={{
              type: 'text',
              label: 'Process_Builder',
              name: 'processbuilder',
              value: values.processbuilder,
              error: touched.processbuilder && errors.processbuilder,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div>
          <AppAutoComplete
            props={{
              type: 'text',
              label: 'category_process',
              name: 'category_process',
              value: values.category_process,
              error: touched.category_process && errors.category_process,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div className=" flex flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">
          <div className="py-[12px] px-[24px] ">
            <p>is_notification_of_steps_on</p>
          </div>
          <div className="flex items-center justify-between gap-[8px]">
            <CheckboxGroup>
              <AppCheckbox
                props={{
                  name: 'processModal',
                  isSelected: values.is_notification_of_steps_on,
                  onChange: handleChange,
                  children: 'Notify me',
                }}
              />
            </CheckboxGroup>
          </div>
        </div>
        <div>
          <AppTextArea
            props={{
              label: 'descriptions',
              name: 'textarea',
              value: values.textarea,
              error: touched.textarea && errors.textarea,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
      </div>
    </Form>
  );
};
