import { Add, Message, Notification, Sms } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { AppModal } from '../../../../core/components/AppModal';
import { AppButton } from '../../../../core/components/AppButton';
import { AppInput } from '../../../../core/components/AppInput';
import { AppAutoComplete } from '../../../../core/components/AppAutoComplete';
import AppCheckBox from '../../../../core/components/AppCheckBox';
import { AppTextArea } from '../../../../core/components/AppTextArea';

import AppTablecustom from '@/components/AppTablecustom.tsx';

interface ActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  showFooter?: boolean;
  disabledForm?: boolean;
  data?: Partial<MyFormValues>;
  headerText?: string;
}
interface MyFormValues {
  name: string;
  title?: string;
  type?: number;
  newBuiltForms?: string;
  workflowImplementation?: string;
  cartableStartType?: string;
  ActionType?: string;
  description?: string;
  notification?: number;
  processType: string;
  Notification: string | number;
  signature: string | number;
  organization: string | number;
  Authority: string | number;
}
export const AddActionsModall: React.FC<ActionsModalProps> = ({
  isOpen,
  onClose,
  showFooter = true,
  disabledForm = false,
  data,
}) => {
  const formik = useFormik<MyFormValues>({
    initialValues: {
      name: data?.title || '',
      ActionType: data?.title || '',
      processType: '',
      newBuiltForms: data?.newBuiltForms || '',
      workflowImplementation: data?.workflowImplementation || '',
      cartableStartType: data?.cartableStartType || '',
      description: data?.description || '',
      Notification: 1,
      signature: 1,
      organization: 1,
      Authority: 1,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { t, i18n } = useTranslation();
  const [custom, setCustom] = useState(false);
  const sampleData = [
    {
      id: 1,
      FullName: 'Process A',
      PhoneNum: 'Process A',
    },
    {
      id: 2,
      FullName: 'Process A',
      PhoneNum: 'Process A',
    },
  ];
  const columns = [
    { key: 'id', label: t('id') },
    { key: 'FullName', label: t('Full Name') },
    { key: 'PhoneNum', label: t('Phone Num.') },
  ];

  useEffect(() => {
    if (formik.values.ActionType !== 'sign') {
      formik.setFieldValue('processType', '');
    }
  }, [formik.values.ActionType]);

  useEffect(() => {
    if (formik.values.Notification === 2) {
      setCustom(true);
    } else {
      setCustom(false);
    }
  }, [formik.values.Notification]);

  return (
    <AppModal isOpen={isOpen} size={'4xl'} onClose={onClose}>
      <AppModal.Body>
        <div className="flex flex-col gap-[24px]">
          <div>
            <AppInput
              props={{
                type: 'text',
                label: t('title'),
                name: 'title',
                formik: formik,
                disabled: disabledForm,
              }}
            />
          </div>
          <div>
            <AppAutoComplete
              props={{
                type: 'Select',
                label: t('type'),
                name: 'type',
                formik: formik,
                disabled: disabledForm,

                data: [
                  { Id: 1, Name: 'Tehran' },
                  { Id: 2, Name: 'rasht' },
                ],
                valueKey: 'Id',
                displayKey: 'Name',
                className: 'border-[1px] border-[#DCF0F9] rounded-[12px]' + ' ',
              }}
            />
          </div>
          <div>
            <AppAutoComplete
              props={{
                type: 'text',
                label: t('action_type'),
                name: 'ActionType',
                data: [
                  { Id: 'normal', Name: 'Normal' },
                  { Id: 'sign', Name: 'Sign' },
                ],
                formik: formik,
                disabled: disabledForm,
                className: 'border-[1px] border-[#DCF0F9] rounded-[12px]',
              }}
            />
          </div>
          <div>
            <AppAutoComplete
              props={{
                type: 'text',
                label: t('implementation_of_workflow'),
                name: 'workflowImplementation',
                formik: formik,
                disabled: disabledForm,
                className: 'border-[1px] border-[#DCF0F9] rounded-[12px]',
              }}
            />
          </div>
          <div className=" flex items-center flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">
            <div className="py-[12px] px-[24px] ">
              <p>{t('veto_authority')}</p>
            </div>
            <div className="w-[320px]  gap-[8px]">
              <AppCheckBox
                disabled={disabledForm}
                formik={formik}
                multiple={false}
                name="Authority"
                options={[
                  { id: 1, label: 'yes' },
                  { id: 2, label: 'no' },
                ]}
              />
            </div>
          </div>
          <div>
            <AppTextArea
              props={{
                label: t('descriptions'),
                name: 'textarea',
                formik: formik,
                disabled: disabledForm,
              }}
            />
          </div>
          {formik.values.ActionType === 'sign' && (
            <>
              <div>
                <p>Sign Type:</p>
              </div>
              <div className="">
                <AppCheckBox
                  disabled={disabledForm}
                  formik={formik}
                  multiple={false}
                  name="processType"
                  options={[
                    { id: 'constant', label: 'constant' },
                    { id: 'duringtheprocess', label: 'duringtheprocess' },
                    { id: 'duringtheissued', label: 'duringtheissued' },
                  ]}
                />
              </div>
            </>
          )}
          {formik.values.processType === 'duringtheprocess' && !custom && (
            <div className=" flex items-center flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">
              <div className="py-[12px] px-[24px] ">
                <p>{t('add_an_employee_outside_the_organization  ')}</p>
              </div>
              <div className="w-[320px]  gap-[8px]">
                <AppCheckBox
                  disabled={disabledForm}
                  formik={formik}
                  multiple={false}
                  name="organization"
                  options={[
                    { id: 1, label: 'yes' },
                    { id: 2, label: 'no' },
                  ]}
                />
              </div>
            </div>
          )}
          {(formik.values.processType === 'constant' ||
            formik.values.processType === 'duringtheprocess' ||
            formik.values.processType === 'duringtheissued' ||
            formik.values.ActionType === 'sign') && (
            <div className=" flex items-center flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">
              <div className="py-[12px] px-[24px] ">
                <p>{t('type_of_signature  ')}</p>
              </div>
              <div className="  w-[398px] pr-[60px]  gap-[8px]">
                <AppCheckBox
                  disabled={disabledForm}
                  formik={formik}
                  multiple={false}
                  name="signature"
                  options={[
                    { id: 1, label: 'Hrbox Sign' },
                    { id: 2, label: 'Digital Sign' },
                  ]}
                />
              </div>
            </div>
          )}
          {(formik.values.processType === 'constant' ||
            formik.values.processType === 'duringtheprocess' ||
            formik.values.processType === 'duringtheissued') && (
            <>
              <InputGrid columns={2}>
                <div>
                  <AppInput
                    props={{
                      type: 'text',
                      label: t('organization'),
                      name: 'title',
                      formik: formik,
                      disabled: disabledForm,
                    }}
                  />
                </div>
                <div>
                  <AppInput
                    props={{
                      type: 'text',
                      label: t('depatment'),
                      name: 'title',
                      formik: formik,
                      disabled: disabledForm,
                    }}
                  />
                </div>
              </InputGrid>
              <div className="p-[16px] w-full">
                <div className="flex flex-row gap-[40px] w-full justify-between py-[12px] w-full  ">
                  <div className="flex">
                    <p>{t('actioners')}</p>
                  </div>
                  <div className="flex">
                    <AppAutoComplete
                      props={{
                        type: 'text',
                        label: t('full_name'),
                        name: 'Full Name',
                        formik: formik,
                        disabled: disabledForm,
                        className: 'border-[1px] border-[#DCF0F9] rounded-[12px]',
                      }}
                    />
                  </div>
                  <div className="flex">
                    <AppAutoComplete
                      props={{
                        type: 'number',
                        label: t('national_code'),
                        name: 'National Code',
                        formik: formik,
                        disabled: disabledForm,
                        className: 'border-[1px] border-[#DCF0F9] rounded-[12px]',
                      }}
                    />
                  </div>
                  <div className="flex">
                    <AppAutoComplete
                      props={{
                        type: 'number',
                        label: t('phone_num'),
                        name: 'Phone Num.',
                        formik: formik,
                        disabled: disabledForm,
                        className: 'border-[1px] border-[#DCF0F9] rounded-[12px]',
                      }}
                    />
                  </div>
                  <button className="rounded-[4px] flex items-center justify-center border-[1px] border-[#0A9AD7] w-[32px] h-[32px] p-[6px]">
                    <Add />
                  </button>
                </div>
                <AppTablecustom
                  props={{
                    data: sampleData,
                    columns,
                  }}
                />
              </div>
            </>
          )}
          <p>{t('notification')}</p>
          <div className=" w-full">
            <AppCheckBox
              formik={formik}
              name="Notification"
              options={[
                { id: 1, label: 'Default' },
                { id: 2, label: 'Customization' },
              ]}
            />
          </div>
          {custom ? (
            <div className="flex flex-col gap-[6px] ">
              <div className="flex flex-row bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-4 ">
                <div className="flex py-3 mt-3 mb-[41px] ml-6 mr-[53px]">
                  <AppCheckBox formik={formik} name="exporter" options={[{ id: 1, label: 'Exporter' }]} />
                </div>
                <div className="flex mx-auto mt-[13px] mb-[11px] w-full">
                  <AppTextArea
                    props={{
                      formik: { formik },
                      placeholder: 'Descriptions',
                      name: 'descriptionexporter',
                    }}
                  />
                </div>
                <div className="flex flex-row gap-2 mt-3 mb-11 mr-6 ml-[38px]">
                  <button className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                    <Notification />
                  </button>{' '}
                  <button className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                    <Sms />
                  </button>{' '}
                  <button className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                    <Message />
                  </button>
                </div>
              </div>{' '}
              <div className="flex flex-row bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-4 ">
                <div className="flex py-3 mt-3 mb-[41px] ml-6 mr-[53px]">
                  <AppCheckBox formik={formik} name="eecipient" options={[{ id: 1, label: 'Eecipient' }]} />
                </div>
                <div className="flex mx-auto mt-[13px] mb-[11px] w-full">
                  <AppTextArea
                    props={{
                      formik: { formik },
                      placeholder: 'Descriptions',
                      name: 'descriptionexporter',
                    }}
                  />
                </div>
                <div className="flex flex-row gap-2 mt-3 mb-11 mr-6 ml-[38px]">
                  <button className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                    <Notification />
                  </button>{' '}
                  <button className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                    <Sms />
                  </button>{' '}
                  <button className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                    <Message />
                  </button>
                </div>
              </div>{' '}
              <div className="flex flex-row bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-4 ">
                <div className="flex py-3 mt-3 mb-[41px] ml-6 mr-[53px]">
                  <AppCheckBox formik={formik} name="referrer" options={[{ id: 1, label: 'Referrer' }]} />
                </div>
                <div className="flex mx-auto mt-[13px] mb-[11px] w-full">
                  <AppTextArea
                    props={{
                      formik: { formik },
                      placeholder: 'Descriptions',
                      name: 'descriptionexporter',
                    }}
                  />
                </div>
                <div className="flex flex-row gap-2 mt-3 mb-11 mr-6 ml-[38px]">
                  <button className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                    <Notification />
                  </button>{' '}
                  <button className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                    <Sms />
                  </button>{' '}
                  <button className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                    <Message />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-[24px] py-[12px] bg-[rgba(220,240,249,0.40)] dark:bg-[#rgba(4,66,92,0.60)] rounded-[8px]">
              <p>
                In this case, if the ability to notify the exporter is active at the start stage, all stages and
                statuses of the process will be automatically notified to the exporter. If needed, change the text of
                this notification from the settings section.
              </p>
            </div>
          )}
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
                className: 'px-[12px] py-[6px] gap-[6px] bg-[#0A9AD7] dark:bg-[#0D4D6A] rounded-[8px] text-white ',
                type: 'submit',
                text: t('submit'),
              }}
            />
          </div>
        )}
      </AppModal.Footer>
    </AppModal>
  );
};
