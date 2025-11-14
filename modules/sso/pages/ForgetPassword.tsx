import {FormProvider} from '@hrbox/core/providers';

import {useSendOtpMutation} from '@module/sso/apis/Auth';
import {
    ForgetPasswordFlow,
    initialValuesForgetPassword,
    validationSchemaForgetPassword
} from '@module/sso/forms/ForgetPasswordForm';

const ForgetPassword = () => {
    const [sendCode] = useSendOtpMutation();
    const handleFormSubmit = (values: any) => {
        return {
            UsernameOrMobile: values.UsernameOrMobile,
        };
    };

    return (
        <FormProvider
            formId="ForgetPassword"
            initialValues={initialValuesForgetPassword}
            validationSchema={validationSchemaForgetPassword}
            onSubmitAsync={async (values: any) => {
                await sendCode(handleFormSubmit(values)).unwrap();
            }}
        >
            <ForgetPasswordFlow/>
        </FormProvider>
    );
};

export default ForgetPassword;
