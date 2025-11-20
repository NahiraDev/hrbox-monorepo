import {Form} from '@heroui/react';
import {AppAutoComplete, AppInput} from '@hrbox/uikit/components';
import * as Yup from 'yup';
import {useFormContext} from '@hrbox/core/providers/FormProvider';
import {FormField} from "@hrbox/uikit/components/FormField";

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
    const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormContext();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[24px]">
                <div>
                    <div className="flex flex-col gap-[24px]">
                        <div className="flex flex-row">
                            <FormField
                                label='title'
                                name='title'
                                helperText={touched.title && errors.title}
                            />
                            <FormField
                                label='related_forms'
                                name='related_forms'
                                error={touched.related_forms && errors.related_forms}
                                component={AppAutoComplete}
                            />
                        </div>
                        <div>
                            <FormField
                                label='undertaking'
                                name='undertaking'
                                component={AppAutoComplete}
                                error={touched.undertaking && errors.undertaking}
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
                    <FormField
                        label='title'
                        name='title'
                        helperText={touched.title && errors.title}
                    />
                </div>
                {' '}
                <div className="flex flex-row">
                    <FormField
                        label='related_forms'
                        name='related_forms'
                        component={AppAutoComplete}
                        helperText={touched.related_forms && errors.related_forms}
                    />
                    <FormField
                        label='undertaking'
                        name='undertaking'
                        component={AppAutoComplete}
                        helperText={touched.undertaking && errors.undertaking}
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

