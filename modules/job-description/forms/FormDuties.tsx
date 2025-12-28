import { Form } from "@heroui/react";
import { FormProvider } from "../../../core/providers";
import { AppButton, FormField } from "../../../UIKit/components";
import * as Yup from "yup";
import { Add } from "iconsax-reactjs";
export const initialValuesAction = {
  RelatedTask: null,
  ExecutionPeriod: "Person",
  Competency: null,
  mportance: null,
  descriptionn: null
};
export const formValidationAction = Yup.object().shape({
  RelatedTask: Yup.string().required(),
  ExecutionPeriod: Yup.string().required(),
  Competency: Yup.string().required(),
  mportance: Yup.string().required(),
  description: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.RelatedTask);
  console.log(values.ExecutionPeriod);
  console.log(values.Competency);
  console.log(values.mportance);
  console.log(values.description);
  return {
    RelatedTask: values.RelatedTask,
    ExecutionPeriod: values.ExecutionPeriod,
    Competency: values.Competency,
    mportance: values.mportance,
    description: values.description,
  };
};
const FormDuties = () => {
  return (
    <>
      <FormProvider
        formId="form-duties"
        initialValues={initialValuesAction}
        onSubmit={(values) => handleSubmitAction(values)}
      >
        <Form id="form-duties">
            <div className="flex flex-col  w-[920px] gap-4">
          <div className="flex flex-row gap-14 w-full!">
            <div className="flex w-full! flex-2/4 items-center ">
              <FormField name="description" label="Descriptions" type="text" className="w-full!" containerClassName="w-full" />
            </div>
            <div className="flex w-full items-center flex-1/4">
              <FormField name="mportance" label="Degree of Importance" type="text"/>
            </div>
            <div className="w-full flex flex-1/4" >
            <AppButton
            content={<Add size={20} />}
            variant="bordered"
            size=""
            className="p-1.5 bg-white"
            color="primary"
            />
            </div>
            </div>
          <div className="flex flex-row gap-14 w-full py-3 ">
            <div className="flex w-full flex-1/4 ">
              <FormField name="Competency" label="Competency" type="text" className="w-full!" />
            </div>
            <div className="flex w-full flex-1/4 ">
              <FormField name="ExecutionPeriod" label="Execution Period" type="text" className="w-full!" />
            </div>
            <div className="flex w-full flex-2/4 ">
              <FormField name="RelatedTask" label="Related Task" type="text" className="w-full!" />
            </div>
            </div>
          </div>
        </Form>
      </FormProvider>
    </>
  );
};

export default FormDuties;
