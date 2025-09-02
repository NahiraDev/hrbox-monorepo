import { AppModal } from '../../../../core/components/AppModal';
import { Add, CallCalling, Hierarchy3, Message, Notification, Sms, User } from 'iconsax-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../../../../core/components/AppButton';
// import InputGrid from '@/components/InputGrid.tsx';
import { AppInput } from '../../../../core/components/AppInput';
import { AppAutoComplete } from '../../../../core/components/AppAutoComplete';
import AppCheckBox from '../../../../core/components/AppCheckbox';
import { AppTextArea } from '../../../../core/components/AppTextArea';
import { useFormik } from 'formik';
import AppTable from '../../../../core/components/AppTable';

interface AddPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  showFooter?: boolean;
  disabledForm?: boolean;
  data?: Partial<MyFormValues>;
}
interface MyFormValues {
  title?: string;
  type?: string;
  newBuiltForms?: string;
  phone_num?: string;
  national_code?: string;
  full_name?: string;
  organization?: string;
  depatment?: string;
  signature?: string;
  authority?: string;
  description?: string;
  notifications?: number;
  referrer?: number;
  exporter?: number;
  eecipient?: number;
}
export const AddPointModall: React.FC<AddPointModalProps> = ({
  isOpen,
  onClose,
  showFooter = true,
  disabledForm = false,
  data,
}) => {
  const formik = useFormik<MyFormValues>({
    initialValues: {
      title: data?.title || '',
      type: data?.type || '',
      notifications: 2,
      newBuiltForms: data?.newBuiltForms || '',
      phone_num: data?.phone_num || '',
      national_code: data?.national_code || '',
      full_name: data?.full_name || '',
      organization: data?.organization || '',
      depatment: data?.depatment || '',
      signature: 1,
      authority: data?.authority || '',
      description: data?.description || '',
      referrer: 1,
      exporter: 1,
      eecipient: 1,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { t, i18n } = useTranslation();
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
  return (
    <AppModal
      header={
        <div className="">
          <button
            className={`py-[6px] px-[12px] bg-[#0A9AD7] dark:bg-[#0D4D6A] rounded-[8px] text-[20px] text-white flex items-center ${i18n.language === 'en' ? 'flex-row' : 'flex-row-reverse'} `}
          >
            <span className={`${i18n.language === 'en' ? 'mr-[8px]' : 'ml-[8px]'} `}>
              <Hierarchy3 />
            </span>
            <span>{t('add_action')}</span>
          </button>
        </div>
      }
      footer={
        showFooter && (
          <div className="flex flex-row justify-end gap-[30px]">
            <AppButton
              props={{
                className: 'bg-[rgba(0,0,0,0)] ',
                text: t('cancel'),
              }}
            />
            <AppButton
              props={{
                className:
                  'px-[12px] py-[6px] gap-[6px] bg-[#0A9AD7] dark:bg-[#0D4D6A] rounded-[8px] text-white ',
                type: 'submit',
                text: t('submit'),
              }}
            />
          </div>
        )
      }
      isOpen={isOpen}
      onClose={onClose}
      size={'4xl'}
    >
      <div className="flex flex-col gap-[24px]">
        <InputGrid columns={1}>
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
            <AppInput
              props={{
                type: 'text',
                label: t('type'),
                name: 'type',
                formik: formik,
                disabled: disabledForm,
                value: disabledForm ? 'Submit for signature' : formik.values.type,
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
        </InputGrid>
        <div className=" flex items-center flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">
          <div className="py-[12px] px-[24px] ">
            <p>{t('Veto Authority?  ')}</p>
          </div>
          <div className="  w-[320px]  gap-[8px]">
            <AppCheckBox
              multiple={false}
              disabled={disabledForm}
              formik={formik}
              name="authority"
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
              name: 'description',
              formik: formik,
              disabled: disabledForm,
            }}
          />
        </div>
        <div className=" flex items-center flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">
          <div className="py-[12px] px-[24px] ">
            <p>{t('Type of signature:  ')}</p>
          </div>
          <div className="  w-[398px] pr-[60px]  gap-[8px]">
            <AppCheckBox
              multiple={false}
              disabled={disabledForm}
              formik={formik}
              name="signature"
              options={[
                { id: 1, label: 'Hrbox Sign' },
                { id: 2, label: 'Digital Sign' },
              ]}
            />
          </div>
        </div>
        <InputGrid columns={2}>
          <div>
            <AppInput
              props={{
                type: 'text',
                label: t('Organization'),
                name: 'organization',
                formik: formik,
                disabled: disabledForm,
              }}
            />
          </div>
          <div>
            <AppInput
              props={{
                type: 'text',
                label: t('Depatment'),
                name: 'depatment',
                formik: formik,
                disabled: disabledForm,
              }}
            />
          </div>
        </InputGrid>
        <div className="p-[16px] w-full">
          <div className="flex flex-row gap-[40px] w-full justify-between py-[12px] w-full  ">
            <div className="flex">
              <p>Actioners:</p>
            </div>
            <div className="flex">
              <AppAutoComplete
                props={{
                  type: 'text',
                  label: t('full_name'),
                  name: 'full_name',
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
                  name: 'national_code',
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
                  name: 'phone_num.',
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
          {formik.values.type === 'Submit for signature' && !disabledForm ? (
            <AppTablecustom
              props={{
                data: sampleData,
                columns,
              }}
            />
          ) : null}
          {disabledForm ? (
            <>
              <div className="gap-[8px] flex flex-col">
                <div className="px-[12px] py-[8px] border-[1px] border-[rgba(220,240,249,0.40)] dark:border-[1px] dark:border-[rgba(4,66,92,0.60)] dark:bg-[linear-gradient(90deg,rgb(1,16,26)_5%,rgb(2,44,61)_50%,rgb(1,16,26)_95%)] rounded-[8px] flex flex-row justify-between rgba(220, 240, 249, 0.40) bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)] ">
                  <div className="">1.</div>
                  <div className="flex flex-col gap-[24px]">
                    <div className="flex flex-row gap-[80px] pr-[108px]">
                      <div className="flex flex-row gap-[32px]">
                        <div className="flex gap-[10px]">
                          <span>
                            <User />
                          </span>
                          <span>{t('full_name')}</span>
                        </div>
                        <div>
                          <p>Zahra Pakniyat</p>
                        </div>
                      </div>{' '}
                      <div className="flex flex-row gap-[32px]">
                        <div className="flex gap-[10px]">
                          <span>
                            <CallCalling />
                          </span>
                          <span>{t('veto_authority')}:</span>
                        </div>
                        <div>
                          <p>0912***2224</p>
                        </div>
                      </div>{' '}
                    </div>
                  </div>
                </div>
                <div className="px-[12px] py-[8px] border-[1px] border-[rgba(220,240,249,0.40)] dark:border-[1px] dark:border-[rgba(4,66,92,0.60)] dark:bg-[linear-gradient(90deg,rgb(1,16,26)_5%,rgb(2,44,61)_50%,rgb(1,16,26)_95%)] rounded-[8px] flex flex-row justify-between rgba(220, 240, 249, 0.40) bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)] ">
                  <div className="">2.</div>
                  <div className="flex flex-col gap-[24px]">
                    <div className="flex flex-row gap-[80px] pr-[108px]">
                      <div className="flex flex-row gap-[32px]">
                        <div className="flex gap-[10px]">
                          <span>
                            <User />
                          </span>
                          <span>{t('full_name')}</span>
                        </div>
                        <div>
                          <p>Zahra Pakniyat</p>
                        </div>
                      </div>{' '}
                      <div className="flex flex-row gap-[32px]">
                        <div className="flex gap-[10px]">
                          <span>
                            <CallCalling />
                          </span>
                          <span>{t('veto_authority')}:</span>
                        </div>
                        <div>
                          <p>0912***2224</p>
                        </div>
                      </div>{' '}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <p>{t('notifications')}</p>
        <div className=" w-full">
          <AppCheckBox
            name="notifications"
            formik={formik}
            options={[
              { id: 1, label: 'Default' },
              { id: 2, label: 'Customization' },
            ]}
          />
        </div>
        {formik.values.notifications === 2 && (
          <div className="flex flex-col gap-[6px] ">
            <div className="flex flex-row bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-4 ">
              <div className="flex py-3 mt-3 mb-[41px] ml-6 mr-[53px]">
                <AppCheckBox
                  options={[{ id: 1, label: 'Exporter' }]}
                  formik={formik}
                  name="exporter"
                />
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
                <AppCheckBox
                  options={[{ id: 1, label: 'Eecipient' }]}
                  formik={formik}
                  name="eecipient"
                />
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
                <AppCheckBox
                  options={[{ id: 1, label: 'Referrer' }]}
                  formik={formik}
                  name="referrer"
                />
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
        )}
      </div>
    </AppModal>
  );
};
