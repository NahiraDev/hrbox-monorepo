import { Form } from '@heroui/react';
import { Add, Message, Notification, Sms } from 'iconsax-reactjs';
import * as Yup from 'yup';

import { AppAutoComplete, AppInput, AppTextArea } from '@hrbox/uikit/components';
import { useFormContext } from '@hrbox/core/providers/FormProvider';
import { AppCheckBox } from '@hrbox/uikit/components';

export const initialValuesPoint = {
  title: null,
  type: null,
  actionType: null,
  description: null,
  organization: null,
  depatment: null,
  full_name: null,
  phone_num: null,
  national_code: null,
  descriptionexporter: null,
};
export const formValidationPoint = Yup.object().shape({
  title: Yup.string().required(),
  type: Yup.string().required(),
  actionType: Yup.string().required(),
  description: Yup.string().required(),
  organization: Yup.string().required(),
  depatment: Yup.string().required(),
  full_name: Yup.string().required(),
  phone_num: Yup.string().required(),
  national_code: Yup.string().required(),
  descriptionexporter: Yup.string().required(),
});
export const handleSubmitPoint = (values: any) => {
  return {
    title: values.title,
    type: values.type,
    actionType: values.actionType,
    description: values.description,
    organization: values.organization,
    depatment: values.depatment,
    full_name: values.full_name,
    phone_num: values.phone_num,
    national_code: values.national_code,
    descriptionexporter: values.descriptionexporter,
  };
};
export const PointForm = () => {
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
              error: touched.title && errors.title,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
          <AppInput
            props={{
              type: 'text',
              label: 'type',
              name: 'type',
              error: touched.type && errors.type,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div>
          <AppAutoComplete
            props={{
              type: 'Select',
              label: 'actionType',
              name: 'actionType',
              error: touched.actionType && errors.actionType,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div className=" flex items-center flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">
          <div className="py-[12px] px-[24px] ">
            <p>Veto Authority?</p>
          </div>
          <div className="w-[320px] gap-[8px]">
            <AppCheckBox
              props={{
                children: (
                  <>
                    <option>yes</option>
                    <option>no</option>
                  </>
                ),
              }}
            />
          </div>
        </div>
        <div>
          <AppTextArea
            props={{
              label: 'descriptions',
              name: 'description',
              error: touched.description && errors.description,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div className=" flex items-center flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">
          <div className="py-[12px] px-[24px] ">
            <p>Type of signature:</p>
          </div>
          <div className="  w-[398px] pr-[60px]  gap-[8px]">
            <AppCheckBox
              props={{
                children: (
                  <>
                    <option>Hrbox Sign</option>
                    <option>Digital Sign</option>
                  </>
                ),
              }}
            />
          </div>
        </div>
        <div className="flex flex-row" >
          <AppInput
            props={{
              type: 'text',
              label: 'Organization',
              name: 'organization',
              error: touched.organization && errors.organization,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
          <AppInput
            props={{
              type: 'text',
              label: 'Depatment',
              name: 'depatment',
              error: touched.depatment && errors.depatment,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div className="p-[16px] w-full">
          <div className="flex flex-row gap-[40px] w-full justify-between py-[12px] w-full  ">
            <div className="flex">
              <p>Actioners:</p>
            </div>
            <div className="flex flex-row">
              <AppAutoComplete
                props={{
                  type: 'text',
                  label: 'full_name',
                  name: 'full_name',
                  error: touched.full_name && errors.full_name,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
              <AppAutoComplete
                props={{
                  type: 'number',
                  label: 'national_code',
                  name: 'national_code',
                  error: touched.national_code && errors.national_code,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
              <AppAutoComplete
                props={{
                  type: 'number',
                  label: 'phone_num',
                  name: 'phone_num',
                  error: touched.phone_num && errors.phone_num,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
            </div>
            <button className="rounded-[4px] flex items-center justify-center border-[1px] border-[#0A9AD7] w-[32px] h-[32px] p-[6px]">
              <Add />
            </button>
          </div>
          {/*{formik.values.type === 'Submit for signature' && !disabledForm ? (*/}
          {/*  <AppTablecustom*/}
          {/*    props={{*/}
          {/*      data: sampleData,*/}
          {/*      columns,*/}
          {/*    }}*/}
          {/*  />*/}
          {/*) : null}*/}
          {/*{disabledForm ? (*/}
          {/*  <>*/}
          {/*    <div className="gap-[8px] flex flex-col">*/}
          {/*      <div className="px-[12px] py-[8px] border-[1px] border-[rgba(220,240,249,0.40)] dark:border-[1px] dark:border-[rgba(4,66,92,0.60)] dark:bg-[linear-gradient(90deg,rgb(1,16,26)_5%,rgb(2,44,61)_50%,rgb(1,16,26)_95%)] rounded-[8px] flex flex-row justify-between rgba(220, 240, 249, 0.40) bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)] ">*/}
          {/*        <div className="">1.</div>*/}
          {/*        <div className="flex flex-col gap-[24px]">*/}
          {/*          <div className="flex flex-row gap-[80px] pr-[108px]">*/}
          {/*            <div className="flex flex-row gap-[32px]">*/}
          {/*              <div className="flex gap-[10px]">*/}
          {/*                <span>*/}
          {/*                  <User />*/}
          {/*                </span>*/}
          {/*                <span>{t('full_name')}</span>*/}
          {/*              </div>*/}
          {/*              <div>*/}
          {/*                <p>Zahra Pakniyat</p>*/}
          {/*              </div>*/}
          {/*            </div>{' '}*/}
          {/*            <div className="flex flex-row gap-[32px]">*/}
          {/*              <div className="flex gap-[10px]">*/}
          {/*                <span>*/}
          {/*                  <CallCalling />*/}
          {/*                </span>*/}
          {/*                <span>{t('veto_authority')}:</span>*/}
          {/*              </div>*/}
          {/*              <div>*/}
          {/*                <p>0912***2224</p>*/}
          {/*              </div>*/}
          {/*            </div>{' '}*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      <div className="px-[12px] py-[8px] border-[1px] border-[rgba(220,240,249,0.40)] dark:border-[1px] dark:border-[rgba(4,66,92,0.60)] dark:bg-[linear-gradient(90deg,rgb(1,16,26)_5%,rgb(2,44,61)_50%,rgb(1,16,26)_95%)] rounded-[8px] flex flex-row justify-between rgba(220, 240, 249, 0.40) bg-[linear-gradient(90deg,rgba(255,255,255,1)_5%,rgba(238,249,255,1)_48%,rgba(255,255,255,1)_95%)] ">*/}
          {/*        <div className="">2.</div>*/}
          {/*        <div className="flex flex-col gap-[24px]">*/}
          {/*          <div className="flex flex-row gap-[80px] pr-[108px]">*/}
          {/*            <div className="flex flex-row gap-[32px]">*/}
          {/*              <div className="flex gap-[10px]">*/}
          {/*                <span>*/}
          {/*                  <User />*/}
          {/*                </span>*/}
          {/*                <span>{t('full_name')}</span>*/}
          {/*              </div>*/}
          {/*              <div>*/}
          {/*                <p>Zahra Pakniyat</p>*/}
          {/*              </div>*/}
          {/*            </div>{' '}*/}
          {/*            <div className="flex flex-row gap-[32px]">*/}
          {/*              <div className="flex gap-[10px]">*/}
          {/*                <span>*/}
          {/*                  <CallCalling />*/}
          {/*                </span>*/}
          {/*                <span>{t('veto_authority')}:</span>*/}
          {/*              </div>*/}
          {/*              <div>*/}
          {/*                <p>0912***2224</p>*/}
          {/*              </div>*/}
          {/*            </div>{' '}*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </>*/}
          {/*) : null}*/}
        </div>
        <p>notifications</p>
        <div className=" w-full">
          <AppCheckBox
            props={{
              children: (
                <>
                  <option>Default</option>
                  <option>Customization</option>
                </>
              ),
            }}
          />
        </div>
        {values.notifications === 2 && (
          <div className="flex flex-col gap-[6px] ">
            <div className="flex flex-row bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-4 ">
              <div className="flex py-3 mt-3 mb-[41px] ml-6 mr-[53px]">
                <AppCheckBox
                  props={{
                    children: (
                      <>
                        <option>Exporter</option>
                      </>
                    ),
                  }}
                />
              </div>
              <div className="flex mx-auto mt-[13px] mb-[11px] w-full">
                <AppTextArea
                  props={{
                    name: 'descriptionexporter',
                    error: touched.descriptionexporter && errors.descriptionexporter,
                    onChange: handleChange,
                    onBlur: handleBlur,
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
                  props={{
                    children: (
                      <>
                        <option>Exporter</option>
                      </>
                    ),
                  }}
                />
              </div>
              <div className="flex mx-auto mt-[13px] mb-[11px] w-full">
                <AppTextArea
                  props={{
                    name: 'descriptionexporter',
                    error: touched.descriptionexporter && errors.descriptionexporter,
                    onChange: handleChange,
                    onBlur: handleBlur,
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
                  props={{
                    children: (
                      <>
                        <option>Referrer</option>
                      </>
                    ),
                  }}
                />
              </div>
              <div className="flex mx-auto mt-[13px] mb-[11px] w-full">
                <AppTextArea
                  props={{
                    name: 'descriptionexporter',
                    error: touched.descriptionexporter && errors.descriptionexporter,
                    onChange: handleChange,
                    onBlur: handleBlur,
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
    </Form>
  );
};

