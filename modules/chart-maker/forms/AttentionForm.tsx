import {Form} from '@heroui/react';
import {departmentUnit} from '@hrbox/modules/chart-maker/app/mock';
import {FormField} from "@hrbox/uikit/components/FormField";
import * as Yup from 'yup';
import {AppAutoComplete} from "@hrbox/uikit/components/AppAutoComplete";

export const initialValuesForm = {
    CurrentPassWord: '',
    NewPassWord: '',
    RepeatPassWord: '',
};

export const formValidationError = Yup.object().shape({
    CurrentPassWord: Yup.string().required('Current password is required'),
    NewPassWord: Yup.string()
        .required('New password is required')
        .min(6, 'New password must be at least 6 characters'),
    RepeatPassWord: Yup.string()
        .oneOf([Yup.ref('newPass')], 'Passwords must match')
        .required('Please confirm your new password'),
});

export const handleChangePasswordSubmit = (values: any) => {
    return {
        CurrentPassWord: values.CurrentPassWord,
        NewPassWord: values.NewPassWord,
        RepeatPassWord: values.RepeatPassWord,
    };
};

export const AttentionForm = () => {
    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <FormField
                label='Job Title'
                data={departmentUnit}
                name='JobTitle'
                component={AppAutoComplete}
            />
        </Form>
    );
};
