import { CheckboxGroup, Form } from '@heroui/react';
import AppCheckBox from 'core/components/AppCheckBox';
import * as Yup from 'yup';

import { AppAutoComplete, AppInput, AppTextArea, useFormContext } from '../../../../core';

export const initialValuesProcess = {
  title: null,
  related_forms: null,
  Action_Type: null,
  workflowImplementation: null,
  cartableStartType: null,
  textarea: null,
};
export const formValidationProcess = Yup.object().shape({
  title: Yup.string().required(),
  related_forms: Yup.string().required(),
  Action_Type: Yup.string().required(),
  workflowImplementation: Yup.string().required(),
  cartableStartType: Yup.string().required(),
  textarea: Yup.string().required(),
});
export const handleSubmitProcess = (values: any) => {
  return {
    title: values.title,
    related_forms: values.related_forms,
    Action_Type: values.Action_Type,
    workflowImplementation: values.workflowImplementation,
    cartableStartType: values.cartableStartType,
    textarea: values.textarea,
  };
};

export const ProcessForm = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormContext();

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-[24px]">
        <div className="flex-row flex">
          <AppInput
            props={{
              type: 'text',
              label: 'title',
              name: 'title',
              value: values.title,
              error: touched.title && errors.title,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
          <AppAutoComplete
            props={{
              type: 'Select',
              label: 'type',
              name: 'type',
              value: values.type,
              error: touched.type && errors.type,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div className="flex flex-row">
          <AppAutoComplete
            props={{
              type: 'text',
              label: 'action_type',
              name: 'Action_Type',
              value: values.Action_Type,
              error: touched.Action_Type && errors.Action_Type,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
          <AppAutoComplete
            props={{
              type: 'text',
              label: 'implementation_of_workflow',
              name: 'workflowImplementation',
              value: values.workflowImplementation,
              error: touched.workflowImplementation && errors.workflowImplementation,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div>
          <AppAutoComplete
            props={{
              type: 'text',
              label: 'cartable_start_type',
              name: 'cartableStartType',
              value: values.cartableStartType,
              error: touched.cartableStartType && errors.cartableStartType,
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
              <AppCheckBox
                props={{
                  children: (
                    <>
                      <option>0</option>
                    </>
                  ),
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
