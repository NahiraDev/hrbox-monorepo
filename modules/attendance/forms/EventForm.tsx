import { useFormContext, useModalContext } from '@hrbox/core/providers';

import { FormField } from '@hrbox/uikit/components/FormField';
import { AppInput } from '@hrbox/uikit/components';
import { useTranslation } from 'react-i18next';


export const EventForm = () => {
  const {t}=useTranslation();
  const {getOpenModal}=useModalContext();
  const currentType=getOpenModal()?.type;
    const {handleSubmit , errors } = useFormContext();
    
  return (
    <form id='event-form' onSubmit={handleSubmit}>
      <div className='w-full'>
      <FormField name='title' label={t('please_enter_the_time')} type='text' formMode={currentType} component={AppInput}  />
      </div>
    </form>
  );
};
