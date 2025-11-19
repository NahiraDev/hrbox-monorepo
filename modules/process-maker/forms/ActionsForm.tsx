import {CheckboxGroup, Form} from '@heroui/react';
import {Add, Message, Notification, Sms} from 'iconsax-reactjs';
import * as Yup from 'yup';
import {useFormContext} from '@hrbox/core/providers/FormProvider';
import {AppCheckBox} from '@hrbox/uikit/components';

import {AppAutoComplete, AppInput, AppTextArea} from '@hrbox/uikit/components';
import {FormField} from "@hrbox/uikit/components/FormField";
import {useTranslation} from "react-i18next";

export const initialValuesAction = {
    title: null,
    type: null,
    actionType: null,
    workflowImplementation: null,
    textarea: null,
    depatment: null,
    FullName: null,
    NationalCode: null,
    PhoneNum: null,
    descriptionexporter: null,
    Authority: null,
    processType: null,
    organization: null,
    signature: null,
    notification: null,
    eecipient: null,
    referrer: null,
};
export const formValidationAction = Yup.object().shape({
    title: Yup.string().required(),
    type: Yup.string().required(),
    actionType: Yup.string().required(),
    workflowImplementation: Yup.string().required(),
    textarea: Yup.string().required(),
    depatment: Yup.string().required(),
    FullName: Yup.string().required(),
    NationalCode: Yup.string().required(),
    PhoneNum: Yup.string().required(),
    descriptionexporter: Yup.string().required(),
    Authority: Yup.string().required(),
    processType: Yup.string().required(),
    organization: Yup.string().required(),
    signature: Yup.string().required(),
    notification: Yup.string().required(),
    eecipient: Yup.string().required(),
    referrer: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
    return {
        title: values.title,
        type: values.type,
        actionType: values.actionType,
        workflowImplementation: values.workflowImplementation,
        textarea: values.textarea,
        depatment: values.depatment,
        FullName: values.FullName,
        NationalCode: values.NationalCode,
        PhoneNum: values.PhoneNum,
        descriptionexporter: values.descriptionexporter,
        Authority: values.Authority,
        processType: values.processType,
        organization: values.organization,
        signature: values.signature,
        notification: values.notification,
        eecipient: values.eecipient,
        referrer: values.referrer,
    };
};
export const ActionsForm = () => {
    const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormContext();
    const {t} = useTranslation()

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[24px]">
                <div className="flex flex-row">
                    <FormField
                        type='text'
                        label={t("title")}
                        name='title'
                        helperText={touched.title && errors.title}
                    />
                    <FormField
                        label={t("type")}
                        name='type'
                        helperText={touched.type && errors.type}
                        component={AppAutoComplete}
                    />
                </div>
                <div className="flex flex-row">
                    <FormField
                        label={t("action_type")}
                        name='actionType'
                        helperText={touched.actionType && errors.actionType}
                        component={AppAutoComplete}
                    />
                    <FormField
                        label={t("implementation_of_workflow")}
                        name='workflowImplementation'
                        helperText={touched.workflowImplementation && errors.workflowImplementation}
                        component={AppAutoComplete}
                    />
                </div>
                <div
                    className=" flex items-center flex-row justify-between w-full bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-lg">
                    <div className="w-[320px] gap-2">
                        <CheckboxGroup>
                            <FormField
                                label={t("veto_authority")}
                                name='Authority'
                                component={AppCheckBox}
                                children={(
                                    <>
                                        <span>Yes</span>
                                        <span>No</span>
                                    </>
                                )}
                            />
                        </CheckboxGroup>
                    </div>
                </div>
                <div>
                    <FormField
                        label="descriptions"
                        name='textarea'
                        component={AppTextArea}
                        helperText={touched.textarea && errors.textarea}
                    />
                </div>
                {values.ActionType === 'sign' && (
                    <>
                        <div className="">
                            <FormField
                                label={t("sign_type")}
                                name='processType'
                                helperText={touched.processType && errors.processType}
                                component={AppCheckBox}
                                children={(
                                    <>
                                        <option>constant</option>
                                        <option>duringtheprocess</option>
                                        <option>duringtheissued</option>
                                    </>
                                )}
                            />
                        </div>
                    </>
                )}
                {values.processType === 'duringtheprocess' && (
                    <div
                        className=" flex items-center flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">
                        <div className="w-[320px] gap-[8px]">
                            <FormField
                                label={t('add_an_employee_outside_the_organization')}
                                name='organization'
                                helperText={touched.processType && errors.processType}
                                component={AppCheckBox}
                                children={(
                                    <>
                                        <option>yes</option>
                                        <option>no</option>
                                    </>
                                )}
                            />
                            <AppCheckBox
                                props={{
                                    name: 'organization',
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
                )}
                {(values.processType === 'constant' ||
                    values.processType === 'duringtheprocess' ||
                    values.processType === 'duringtheissued' ||
                    values.ActionType === 'sign') && (
                    <div
                        className=" flex items-center flex-row justify-between w-[100%] bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-[8px]">
                        <div className="  w-[398px] pr-[60px] gap-[8px]">
                            <FormField
                                label={t("type_of_signature")}
                                name="signature"
                                component={AppCheckBox}
                                children={(
                                    <>
                                        <option>Hrbox Sign</option>
                                        <option>Digital Sign</option>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                )}
                {(values.processType === 'constant' ||
                    values.processType === 'duringtheprocess' ||
                    values.processType === 'duringtheissued') && (
                    <>
                        <div className="flex flex-row">
                            <FormField
                                label={t('organization')}
                                name="organization"
                                helperText={touched.organization && errors.organization}
                            />
                            <FormField
                                label={t('depatment')}
                                name='depatment'
                                helperText={touched.depatment && errors.depatment}
                            />
                        </div>
                        <div className="p-[16px] w-full">
                            <div className="flex flex-row gap-[40px] w-full justify-between py-[12px] w-full  ">
                                <div className="flex">
                                    <p>actioners</p>
                                </div>
                                <div className="flex">
                                    <FormField
                                        label={t('full_name')}
                                        name="FullName"
                                        helperText={touched.FullName && errors.FullName}
                                        component={AppAutoComplete}
                                    />
                                </div>
                                <div className="flex">
                                    <FormField
                                        type="number"
                                        label={t('national_code')}
                                        name="NationalCode"
                                        error={touched.NationalCode && errors.NationalCode}
                                    />
                                </div>
                                <div className="flex">
                                    <FormField
                                        type='number'
                                        label='phone_num'
                                        name='PhoneNum'
                                        error={touched.PhoneNum && errors.PhoneNum}
                                    />
                                </div>
                                <button
                                    className="rounded-[4px] flex items-center justify-center border-[1px] border-[#0A9AD7] w-[32px] h-[32px] p-[6px]">
                                    <Add/>
                                </button>
                            </div>
                        </div>
                    </>
                )}
                <p>notification</p>
                <div className=" w-full">
                    <FormField
                        component={AppCheckBox}
                        name="notification"
                        children={(
                            <>
                                <option>Default</option>
                                <option>Customization</option>
                            </>
                        )}
                    />

                    {/*{custom ? (*/}
                    <div className="flex flex-col gap-[6px] ">
                        <div
                            className="flex flex-row bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-4 ">
                            <div className="flex py-3 mt-3 mb-[41px] ml-6 mr-[53px]">
                                <AppCheckBox
                                    props={{
                                        name: 'eecipient',
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
                                <button
                                    className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                                    <Notification/>
                                </button>
                                {' '}
                                <button
                                    className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                                    <Sms/>
                                </button>
                                {' '}
                                <button
                                    className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                                    <Message/>
                                </button>
                            </div>
                        </div>
                        {' '}
                        <div
                            className="flex flex-row bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-4 ">
                            <div className="flex py-3 mt-3 mb-[41px] ml-6 mr-[53px]">
                                <AppCheckBox
                                    props={{
                                        name: 'employee',
                                        children: (
                                            <>
                                                <option>Eecipient</option>
                                            </>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="flex mx-auto mt-[13px] mb-[11px] w-full">
                                <AppTextArea
                                name: 'descriptionexporter',
                                error: touched.descriptionexporter && errors.descriptionexporter,
                                onChange: handleChange,
                                onBlur: handleBlur,
                                />
                            </div>
                            <div className="flex flex-row gap-2 mt-3 mb-11 mr-6 ml-[38px]">
                                <button
                                    className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                                    <Notification/>
                                </button>
                                {' '}
                                <button
                                    className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                                    <Sms/>
                                </button>
                                {' '}
                                <button
                                    className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                                    <Message/>
                                </button>
                            </div>
                        </div>
                        {' '}
                        <div
                            className="flex flex-row bg-[rgba(220,240,249,0.40)] dark:bg-[rgba(4,66,92,0.60)] rounded-4 ">
                            <div className="flex py-3 mt-3 mb-[41px] ml-6 mr-[53px]">
                                <FormField
                                    name='referrer'
                                    component={AppCheckBox}
                                    children={(
                                        <>
                                            <option>Referrer</option>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="flex mx-auto mt-[13px] mb-[11px] w-full">
                                <FormField
                                    name="descriptionexporter"
                                    component={AppTextArea}
                                    helperText={touched.descriptionexporter && errors.descriptionexporter}
                                />
                            </div>
                            <div className="flex flex-row gap-2 mt-3 mb-11 mr-6 ml-[38px]">
                                <button
                                    className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                                    <Notification/>
                                </button>
                                {' '}
                                <button
                                    className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                                    <Sms/>
                                </button>
                                {' '}
                                <button
                                    className="bg-white dark:bg-[#01101A] flex pt-[10.5px] pr-[10px] pb-[9.5px] pl-[10px] rounded-4 w-10 h-10 items-center">
                                    <Message/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="px-[24px] py-[12px] bg-[rgba(220,240,249,0.40)] dark:bg-[#rgba(4,66,92,0.60)] rounded-[8px]">
                        <p>
                            In this case, if the ability to notify the exporter is active at the start stage, all stages
                            and statuses
                            of the process will be automatically notified to the exporter. If needed, change the text of
                            this
                            notification from the settings section.
                        </p>
                    </div>
                </div>
            </div>
        </Form>
    );
};

