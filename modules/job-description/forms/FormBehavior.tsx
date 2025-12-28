import { Form } from "@heroui/react";
import { FormProvider } from "../../../core/providers";
import { AppAutoComplete, AppButton, FormField } from "../../../UIKit/components";
import * as Yup from "yup";
import { Add } from "iconsax-reactjs";
export const initialValuesAction = {
  reviewofPrevious: null,
};
export const formValidationAction = Yup.object().shape({
  reviewofPrevious: Yup.string().required()
});
export const handleSubmitAction = (values: any) => {
  console.log(values.reviewofPrevious);
  return {
    reviewofPrevious: values.reviewofPrevious,
  };
};
const FormBehavior = () => {
    return ( <>
    <FormProvider formId="behavior-form" initialValues={initialValuesAction} onSubmit={(values)=>handleSubmitAction(values)} >
        <Form id="behavior-form">
        <div className=" flex flex-row items-center px-4 py-3 gap-3">
            <FormField
            name="reviewofPrevious"
            component={AppAutoComplete}
            />
            <AppButton 
            content={<Add size={20} />}
            variant="bordered"
            size=""
            className="p-1.5"
            color="primary"
            />
        </div>
        </Form>
    </FormProvider>
    </> );
}
 
export default FormBehavior;