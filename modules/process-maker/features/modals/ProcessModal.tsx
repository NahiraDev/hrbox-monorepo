import { useTranslation } from 'react-i18next';

import { AppButton, AppModal, FormProvider, useModal, withModal } from '../../../../core/';
import { formValidationProcess, handleSubmitProcess, initialValuesProcess, ProcessForm } from '../forms';

const ProcessModal = () => {
  const { t } = useTranslation();

  return (
    <AppModal size="4xl" title="Process Modal">
      <AppModal.Body>
        <FormProvider
          initialValues={initialValuesProcess}
          validationSchema={formValidationProcess}
          onSubmitAsync={async (values: any) => {
            handleSubmitProcess(values);
          }}
        >
          <ProcessForm />
        </FormProvider>
      </AppModal.Body>
      {/*<div className="flex flex-col gap-[24px]">*/}
      {/*  /!*<InputGrid columns={1}>*!/*/}
      {/*  <div>*/}
      {/*    <AppInput*/}
      {/*      props={{*/}
      {/*        type: 'text',*/}
      {/*        label: t('title'),*/}
      {/*        name: 'title',*/}
      {/*        formik: formik,*/}
      {/*        disabled: disabledForm,*/}
      {/*        placeholder: t('describe_title'),*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <AppAutoComplete*/}
      {/*      props={{*/}
      {/*        type: 'Select',*/}
      {/*        label: t('type'),*/}
      {/*        name: 'type',*/}
      {/*        formik: formik,*/}
      {/*        disabled: disabledForm,*/}
      {/*        placeholder: t('choose_sth'),*/}
      {/*        data: [*/}
      {/*          { Id: 1, Name: 'Tehran' },*/}
      {/*          { Id: 2, Name: 'rasht' },*/}
      {/*        ],*/}
      {/*        valueKey: 'Id',*/}
      {/*        displayKey: 'Name',*/}
      {/*        className: `border-[1px] border-[#DCF0F9] rounded-[12px] ${disabledForm ? 'bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)] dark:bg-[linear-gradient(90deg,rgb(1,16,26)_5%,rgb(2,44,61)_50%,rgb(1,16,26)_95%)]' : ''}  `,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <AppAutoComplete*/}
      {/*      props={{*/}
      {/*        type: 'text',*/}
      {/*        label: t('action_type'),*/}
      {/*        name: 'Action_Type',*/}
      {/*        placeholder: t('action_type'),*/}
      {/*        formik: formik,*/}
      {/*        disabled: disabledForm,*/}
      {/*        className: `border-[1px] border-[#DCF0F9] rounded-[12px] ${disabledForm ? 'bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)] dark:bg-[linear-gradient(90deg,rgb(1,16,26)_5%,rgb(2,44,61)_50%,rgb(1,16,26)_95%)]' : ''}  `,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <AppAutoComplete*/}
      {/*      props={{*/}
      {/*        type: 'text',*/}
      {/*        label: t('implementation_of_workflow'),*/}
      {/*        name: 'workflowImplementation',*/}
      {/*        placeholder: t('choose_sth'),*/}
      {/*        formik: formik,*/}
      {/*        disabled: disabledForm,*/}
      {/*        className: `border-[1px] border-[#DCF0F9] rounded-[12px] ${disabledForm ? 'bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)]' : ''}  `,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <AppAutoComplete*/}
      {/*      props={{*/}
      {/*        type: 'text',*/}
      {/*        label: t('cartable_start_type'),*/}
      {/*        name: 'cartableStartType',*/}
      {/*        formik: formik,*/}
      {/*        disabled: disabledForm,*/}
      {/*        placeholder: t('choose_sth'),*/}
      {/*        className: `border-[1px] border-[#DCF0F9] rounded-[12px] ${disabledForm ? 'bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)]' : ''}  `,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  /!*</InputGrid>*!/*/}
      {/*  <div className=" flex flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">*/}
      {/*    <div className="py-[12px] px-[24px] ">*/}
      {/*      <p>{t('is_notification_of_steps_on')}</p>*/}
      {/*    </div>*/}
      {/*    <div className="flex items-center justify-between gap-[8px]">*/}
      {/*      <CheckboxGroup>*/}
      {/*        <AppCheckBox*/}
      {/*          props={{*/}
      {/*            disabled: disabledForm,*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      </CheckboxGroup>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <AppTextArea*/}
      {/*      props={{*/}
      {/*        label: t('descriptions'),*/}
      {/*        name: 'textarea',*/}
      {/*        formik: formik,*/}
      {/*        disabled: disabledForm,*/}
      {/*        placeholder: t('descriptions'),*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              className: 'bg-[rgba(0,0,0,0)] ',
              text: t('cancel'),
            }}
          />
          <AppButton
            props={{
              className: 'px-[12px] py-[6px] bg-[#0A9AD7] dark:bg-[#0D4D6A] rounded-[8px] text-white ',
              type: 'submit',
              text: t('submit'),
            }}
          />{' '}
        </div>
      </AppModal.Footer>
    </AppModal>
  );
};

ProcessModal.useModal = () => useModal();
export default withModal(ProcessModal);
