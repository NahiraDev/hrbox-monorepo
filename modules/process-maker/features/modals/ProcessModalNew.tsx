import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import AppCheckbox from 'core/components/AppCheckbox';
import { CheckboxGroup } from '@heroui/react';

import AppModal from '../../../../core/components/AppModal';

// import InputGrid from '../../../../core/components/Input';
import AppInput from '../../../../core/components/AppInput.tsx';
import AppAutoComplete from '../../../../core/components/AppAutoComplete.tsx';
import AppButton from '../../../../core/components/AppButton.tsx';
import AppTextArea from '../../../../core/components/AppTextArea.tsx';

interface AddProcessModalProps {
  isOpen: boolean;
  headerText?: string;
  showFooter?: boolean;
  disabledForm?: boolean;
  onSubmit?: (values: any) => void;
  data?: Partial<MyFormValues>;
  buttonText?: string;
}

interface MyFormValues {
  name: string;
  title?: string;
  catrgoryProcess?: string;
  status?: string;
  processbuilder?: string;
}

export const ProceeModalNew: React.FC<AddProcessModalProps> = ({
  isOpen,
  showFooter = true,
  disabledForm,
  buttonText,
  data,
}) => {
  const formik = useFormik<MyFormValues>({
    initialValues: {
      name: data?.title || '',
      catrgoryProcess: data?.catrgoryProcess || '',
      status: data?.status || '',
      processbuilder: data?.processbuilder || '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { i18n, t } = useTranslation();

  return (
    <form onSubmit={formik.handleSubmit}>
      <AppModal size="4xl">
        <AppModal.Body>
          <div className="flex flex-col gap-[24px]">
            <div>
              <AppInput
                props={{
                  type: 'text',
                  label: t('title'),
                  name: 'title',
                }}
              />
            </div>
            <div>
              <AppInput
                props={{
                  type: 'text',
                  label: t('type'),
                  name: 'type',
                  className: `border-[1px] border-[#DCF0F9] rounded-[12px] ${disabledForm ? 'bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)] dark:bg-[linear-gradient(90deg,rgb(1,16,26)_5%,rgb(2,44,61)_50%,rgb(1,16,26)_95%)]' : ''}  `,
                }}
              />
            </div>
            <div>
              <AppAutoComplete
                props={{
                  type: 'text',
                  label: t('Process_Builder'),
                  name: 'processbuilder',
                  placeholder: t('catrgory_process'),
                  formik: formik,
                  disabled: disabledForm,
                  data: [
                    { Id: 1, Name: 'Bpmn2' },
                    { Id: 2, Name: 'Workflow' },
                  ],
                  valueKey: 'Id',
                  displayKey: 'Name',
                  className: `border-[1px] border-[#DCF0F9] rounded-[12px] ${disabledForm ? 'bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)] dark:bg-[linear-gradient(90deg,rgb(1,16,26)_5%,rgb(2,44,61)_50%,rgb(1,16,26)_95%)]' : ''}  `,
                }}
              />
            </div>
            <div>
              <AppAutoComplete
                props={{
                  type: 'text',
                  label: t('category_process'),
                  name: 'category_process',
                  placeholder: t('Category Process'),
                  formik: formik,
                  disabled: disabledForm,
                  data: [
                    { Id: 1, Name: 'Active' },
                    { Id: 2, Name: 'InActive' },
                  ],
                  valueKey: 'Id',
                  displayKey: 'Name',
                  className: `border-[1px] border-[#DCF0F9] rounded-[12px] ${disabledForm ? 'bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)]' : ''}  `,
                }}
              />
            </div>
            <div className=" flex flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">
              <div className="py-[12px] px-[24px] ">
                <p>{t('is_notification_of_steps_on')}</p>
              </div>
              <div className="flex items-center justify-between gap-[8px]">
                <CheckboxGroup>
                  <AppCheckbox
                    props={{
                      disabled: disabledForm,
                    }}
                  />
                </CheckboxGroup>
              </div>
            </div>
            <div>
              <AppTextArea
                props={{
                  label: t('descriptions'),
                  name: 'textarea',
                  formik: formik,
                  disabled: disabledForm,
                  placeholder: t('descriptions'),
                }}
              />
            </div>
          </div>
        </AppModal.Body>
        <AppModal.Footer>
          {showFooter && (
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
                  type: 'Submit',
                  text: t(`${buttonText}`),
                }}
              />{' '}
            </div>
          )}
        </AppModal.Footer>
      </AppModal>
    </form>
  );
};
