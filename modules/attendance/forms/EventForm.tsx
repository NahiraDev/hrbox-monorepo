import { FormProvider, useFormContext, useModalContext } from '@hrbox/core/providers';
import * as Yup from 'yup';
import { Form } from '@heroui/react';
import { FormField } from '@hrbox/uikit/components/FormField';
import { AppInput } from '@hrbox/uikit/components';
import { useTranslation } from 'react-i18next';

export const initialValuesEvent = {
  title: '',
};

export const formValidationEvent = Yup.object().shape({
  title: Yup.string().required(),
});

export const handleSubmitEvent = (values: any) => {
  console.log(values);
  
  return {
    title: values.title,
  };
};

export const EventForm = () => {
  const {t}=useTranslation();
  const {getOpenModal}=useModalContext();
  const currentType=getOpenModal()?.type;


  return (
    <FormProvider formId='event-form' initialValues={initialValuesEvent} onSubmit={handleSubmitEvent} >
    <Form id='event-form'>
      <div className='w-full'>
      <FormField name='title' label={t('please_enter_the_time')} type='text' formMode={currentType} component={AppInput}  />
      </div>
    </Form>
    </FormProvider>
  );
};
