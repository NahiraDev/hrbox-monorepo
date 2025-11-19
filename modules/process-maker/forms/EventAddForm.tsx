import { Form } from '@heroui/react';
import { AppAutoComplete, AppInput } from '@UIKit/components';
import * as Yup from 'yup';
import { useFormContext } from '@core/providers/FormProvider';

export const initialValuesEventAdd = {
  title: null,
  related_forms: null,
  undertaking: null,
};
export const formValidationEventAdd = Yup.object().shape({
  title: Yup.string().required(),
  related_forms: Yup.string().required(),
  undertaking: Yup.string().required(),
});
export const handleSubmitEventAdd = (values: any) => {
  return {
    title: values.title,
    related_forms: values.related_forms,
    undertaking: values.undertaking,
  };
};

export const EventAddForm = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormContext();

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-[24px]">
        <div>
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-row">
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
              <AppAutoComplete
                props={{
                  type: 'text',
                  label: 'related_forms',
                  name: 'related_forms',
                  error: touched.related_forms && errors.related_forms,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
            </div>{' '}
            <div>
              <AppAutoComplete
                props={{
                  type: 'text',
                  label: 'undertaking',
                  name: 'undertaking',
                  error: touched.undertaking && errors.undertaking,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
            </div>
            {/*<div>*/}
            {/*  {showModal ? (*/}
            {/*    <div className="gap-[8px] flex flex-col">*/}
            {/*      <div className="px-[12px] py-[8px] border-[1px] border-[rgba(220,240,249,0.40)] rounded-[8px] flex rgba(220, 240, 249, 0.40)">*/}
            {/*        <div className="flex flex-row justify-between w-[95%]">*/}
            {/*          <div className="">1.</div>*/}
            {/*          <div className="flex flex-col gap-[24px] w-[718px]">*/}
            {/*            <div className="flex flex-row gap-[155px] pr-[108px] w-[100%] ">*/}
            {/*              <div className="flex flex-row gap-[32px]">*/}
            {/*                <div className="flex gap-[10px]">*/}
            {/*              <span>*/}
            {/*                <Firstline />*/}
            {/*              </span>*/}
            {/*                  <span>{t("title")}:</span>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                  <p>{t("review")}</p>*/}
            {/*                </div>*/}
            {/*              </div>{" "}*/}
            {/*              <div className="flex flex-row gap-[32px]">*/}
            {/*                <div className="flex gap-[10px]">*/}
            {/*              <span>*/}
            {/*                <Settings />*/}
            {/*              </span>*/}
            {/*                  <span>{t("type")}:</span>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                  <p>{t("rejection")}</p>*/}
            {/*                </div>*/}
            {/*              </div>{" "}*/}
            {/*            </div>*/}
            {/*            <div className="flex flex-row gap-[36px] pr-[104px]">*/}
            {/*              <div className="flex flex-row gap-[32px]">*/}
            {/*                <div className="flex gap-[10px]">*/}
            {/*              <span>*/}
            {/*                <User />*/}
            {/*              </span>*/}
            {/*                  <span>{t("undertaking")}:</span>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                  <p>Zahra Pakniyat</p>*/}
            {/*                </div>*/}
            {/*              </div>{" "}*/}
            {/*              <div className="flex flex-row gap-[32px]">*/}
            {/*                <div className="flex gap-[10px]">*/}
            {/*              <span>*/}
            {/*                <SecurityUser />*/}
            {/*              </span>*/}
            {/*                  <span>{t("veto_authority")}:</span>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                  <p>{t("yes")}</p>*/}
            {/*                </div>*/}
            {/*              </div>{" "}*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*      <div className="px-[12px] py-[8px] border-[1px] border-[rgba(220,240,249,0.40)] rounded-[8px] flex flex-row justify-between rgba(220, 240, 249, 0.40)">*/}
            {/*        <div className="flex flex-row justify-between w-[95%]">*/}
            {/*          <div className="">2.</div>*/}
            {/*          <div className="flex flex-col gap-[24px] w-[718px]">*/}
            {/*            <div className="flex flex-row gap-[155px] pr-[108px] w-[100%] ">*/}
            {/*              <div className="flex flex-row gap-[32px]">*/}
            {/*                <div className="flex gap-[10px]">*/}
            {/*              <span>*/}
            {/*                <Firstline />*/}
            {/*              </span>*/}
            {/*                  <span>{t("title")}:</span>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                  <p>{t("review")}</p>*/}
            {/*                </div>*/}
            {/*              </div>{" "}*/}
            {/*              <div className="flex flex-row gap-[32px]">*/}
            {/*                <div className="flex gap-[10px]">*/}
            {/*              <span>*/}
            {/*                <Settings />*/}
            {/*              </span>*/}
            {/*                  <span>{t("type")}:</span>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                  <p>{t("rejection")}</p>*/}
            {/*                </div>*/}
            {/*              </div>{" "}*/}
            {/*            </div>*/}
            {/*            <div className="flex flex-row gap-[36px] pr-[104px]">*/}
            {/*              <div className="flex flex-row gap-[32px]">*/}
            {/*                <div className="flex gap-[10px]">*/}
            {/*              <span>*/}
            {/*                <User />*/}
            {/*              </span>*/}
            {/*                  <span>{t("undertaking")}:</span>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                  <p>Zahra Pakniyat</p>*/}
            {/*                </div>*/}
            {/*              </div>{" "}*/}
            {/*              <div className="flex flex-row gap-[32px]">*/}
            {/*                <div className="flex gap-[10px]">*/}
            {/*              <span>*/}
            {/*                <SecurityUser />*/}
            {/*              </span>*/}
            {/*                  <span>{t("veto_authority")}:</span>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                  <p>{t("yes")}</p>*/}
            {/*                </div>*/}
            {/*              </div>{" "}*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  ) : (*/}
            {/*    <AppTablecustom*/}
            {/*      props={{*/}
            {/*        data: sampleData,*/}
            {/*        columns,*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*</div>*/}
          </div>
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
        </div>{' '}
        <div className="flex flex-row">
          <AppAutoComplete
            props={{
              type: 'text',
              label: 'related_forms',
              name: 'related_forms',
              error: touched.related_forms && errors.related_forms,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
          <AppAutoComplete
            props={{
              type: 'text',
              label: 'undertaking',
              name: 'undertaking',
              error: touched.undertaking && errors.undertaking,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        {/*<div>*/}
        {/*  /!*{showModal ? (*!/*/}
        {/*  /!*  <div className="gap-[8px] flex flex-col">*!/*/}
        {/*  /!*    <div className="px-[12px] py-[8px] border-[1px] border-[rgba(220,240,249,0.40)] rounded-[8px] flex rgba(220, 240, 249, 0.40)">*!/*/}
        {/*  /!*      <div className="flex flex-row justify-between w-[95%]">*!/*/}
        {/*  /!*        <div className="">1.</div>*!/*/}
        {/*  /!*        <div className="flex flex-col gap-[24px] w-[718px]">*!/*/}
        {/*  /!*          <div className="flex flex-row gap-[155px] pr-[108px] w-[100%] ">*!/*/}
        {/*  /!*            <div className="flex flex-row gap-[32px]">*!/*/}
        {/*  /!*              <div className="flex gap-[10px]">*!/*/}
        {/*  /!*                  <span>*!/*/}
        {/*  /!*                    <Firstline />*!/*/}
        {/*  /!*                  </span>*!/*/}
        {/*  /!*                <span>{t("title")}:</span>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*              <div>*!/*/}
        {/*  /!*                <p>{t("review")}</p>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*            </div>{" "}*!/*/}
        {/*  /!*            <div className="flex flex-row gap-[32px]">*!/*/}
        {/*  /!*              <div className="flex gap-[10px]">*!/*/}
        {/*  /!*                  <span>*!/*/}
        {/*  /!*                    <Settings />*!/*/}
        {/*  /!*                  </span>*!/*/}
        {/*  /!*                <span>{t("type")}:</span>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*              <div>*!/*/}
        {/*  /!*                <p>{t("rejection")}</p>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*            </div>{" "}*!/*/}
        {/*  /!*          </div>*!/*/}
        {/*  /!*          <div className="flex flex-row gap-[36px] pr-[104px]">*!/*/}
        {/*  /!*            <div className="flex flex-row gap-[32px]">*!/*/}
        {/*  /!*              <div className="flex gap-[10px]">*!/*/}
        {/*  /!*                  <span>*!/*/}
        {/*  /!*                    <User />*!/*/}
        {/*  /!*                  </span>*!/*/}
        {/*  /!*                <span>{t("undertaking")}:</span>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*              <div>*!/*/}
        {/*  /!*                <p>Zahra Pakniyat</p>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*            </div>{" "}*!/*/}
        {/*  /!*            <div className="flex flex-row gap-[32px]">*!/*/}
        {/*  /!*              <div className="flex gap-[10px]">*!/*/}
        {/*  /!*                  <span>*!/*/}
        {/*  /!*                    <SecurityUser />*!/*/}
        {/*  /!*                  </span>*!/*/}
        {/*  /!*                <span>{t("veto_authority")}:</span>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*              <div>*!/*/}
        {/*  /!*                <p>{t("yes")}</p>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*            </div>{" "}*!/*/}
        {/*  /!*          </div>*!/*/}
        {/*  /!*        </div>*!/*/}
        {/*  /!*      </div>*!/*/}
        {/*  /!*    </div>*!/*/}
        {/*  /!*    <div className="px-[12px] py-[8px] border-[1px] border-[rgba(220,240,249,0.40)] rounded-[8px] flex flex-row justify-between rgba(220, 240, 249, 0.40)">*!/*/}
        {/*  /!*      <div className="flex flex-row justify-between w-[95%]">*!/*/}
        {/*  /!*        <div className="">2.</div>*!/*/}
        {/*  /!*        <div className="flex flex-col gap-[24px] w-[718px]">*!/*/}
        {/*  /!*          <div className="flex flex-row gap-[155px] pr-[108px] w-[100%] ">*!/*/}
        {/*  /!*            <div className="flex flex-row gap-[32px]">*!/*/}
        {/*  /!*              <div className="flex gap-[10px]">*!/*/}
        {/*  /!*                  <span>*!/*/}
        {/*  /!*                    <Firstline />*!/*/}
        {/*  /!*                  </span>*!/*/}
        {/*  /!*                <span>{t("title")}:</span>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*              <div>*!/*/}
        {/*  /!*                <p>{t("review")}</p>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*            </div>{" "}*!/*/}
        {/*  /!*            <div className="flex flex-row gap-[32px]">*!/*/}
        {/*  /!*              <div className="flex gap-[10px]">*!/*/}
        {/*  /!*                  <span>*!/*/}
        {/*  /!*                    <Settings />*!/*/}
        {/*  /!*                  </span>*!/*/}
        {/*  /!*                <span>{t("type")}:</span>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*              <div>*!/*/}
        {/*  /!*                <p>{t("rejection")}</p>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*            </div>{" "}*!/*/}
        {/*  /!*          </div>*!/*/}
        {/*  /!*          <div className="flex flex-row gap-[36px] pr-[104px]">*!/*/}
        {/*  /!*            <div className="flex flex-row gap-[32px]">*!/*/}
        {/*  /!*              <div className="flex gap-[10px]">*!/*/}
        {/*  /!*                  <span>*!/*/}
        {/*  /!*                    <User />*!/*/}
        {/*  /!*                  </span>*!/*/}
        {/*  /!*                <span>{t("undertaking")}:</span>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*              <div>*!/*/}
        {/*  /!*                <p>Zahra Pakniyat</p>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*            </div>{" "}*!/*/}
        {/*  /!*            <div className="flex flex-row gap-[32px]">*!/*/}
        {/*  /!*              <div className="flex gap-[10px]">*!/*/}
        {/*  /!*                  <span>*!/*/}
        {/*  /!*                    <SecurityUser />*!/*/}
        {/*  /!*                  </span>*!/*/}
        {/*  /!*                <span>{t("veto_authority")}:</span>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*              <div>*!/*/}
        {/*  /!*                <p>{t("yes")}</p>*!/*/}
        {/*  /!*              </div>*!/*/}
        {/*  /!*            </div>{" "}*!/*/}
        {/*  /!*          </div>*!/*/}
        {/*  /!*        </div>*!/*/}
        {/*  /!*      </div>*!/*/}
        {/*  /!*    </div>*!/*/}
        {/*  /!*  </div>*!/*/}
        {/*  /!*) : (*!/*/}
        {/*  /!*  <AppTablecustom*!/*/}
        {/*  /!*    props={{*!/*/}
        {/*  /!*      data: sampleData,*!/*/}
        {/*  /!*      columns,*!/*/}
        {/*  /!*    }}*!/*/}
        {/*  /!*  />*!/*/}
        {/*  /!*)}*!/*/}
        {/*</div>*/}
      </div>
    </Form>
  );
};

