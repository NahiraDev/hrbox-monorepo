import { Form , Radio, RadioGroup } from '@heroui/react';
import { AppAutoComplete, AppTextArea } from '@hrbox/uikit/components';
import { Scan } from 'iconsax-reactjs';
import * as Yup from 'yup';
import {useFormContext} from "@hrbox/core/providers/FormProvider";

export const initialValuesAction = {
  title: null,
  type: 'Person',
  ChooseFaceRecognitionAssignment: null,
  FromDate: null,
  organization: null,
  Department: null,
  Employee: null,
  Description: null,
  JobTitle: null,
}
export const formValidationAction = Yup.object().shape({
  title: Yup.string().required(),
  type: Yup.string().required(),
  ChooseFaceRecognitionAssignment: Yup.string().required(),
  FromDate: Yup.string().required(),
  organization: Yup.string().required(),
  Department: Yup.string().required(),
  JobTitle: Yup.string().required(),
  Employee: Yup.string().required(),
  Description: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  console.log(values.title);
  console.log(values.type);
  console.log(values.ChooseShift);
  console.log(values.FromDate);
  console.log(values.organization);
  console.log(values.Employee);
  console.log(values.Description);
  return {
    title: values.title,
    type: values.type,
    ChooseFaceRecognitionAssignment: values.ChooseFaceRecognitionAssignment,
    FromDate: values.FromDate,
    organization: values.organization,
    Department: values.Department,
    JobTitle: values.JobTitle,
    Employee: values.Employee,
    Description: values.Description,
  };
};

const FaceAllocationForm=()=>{
  const { values, errors, touched, handleChange, handleBlur, handleSubmit,setFieldValue } = useFormContext();

  return(
    <>
        <Form id="face-allocation-form" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-7">
          <RadioGroup name='type' classNames={{base:'w-full flex justify-between',wrapper:'w-full flex justify-between'}}
                      defaultValue='Person' orientation='horizontal' value={values.type} onValueChange={(value) => setFieldValue('type', value)}  >
            <Radio value="Person" classNames={{wrapper:'border-2 border-primary'}} >Person</Radio>
            <Radio value="Group" classNames={{wrapper:'border-2 border-primary'}}>Group</Radio>
            <Radio value="JobTitle" classNames={{wrapper:'border-2 border-primary'}}>Job Title</Radio>
          </RadioGroup>
          <div className='flex flex-row justify-between gap-10'>
            <div className='w-full'>
            <AppAutoComplete props={{
              label:'Choose Face Recognition Assignment',
              name:'ChooseFaceRecognitionAssignment',
              value:values.ChooseFaceRecognitionAssignment,
              error: touched.ChooseFaceRecognitionAssignment && errors.ChooseFaceRecognitionAssignment,
              onChange: handleChange,
              onBlur: handleBlur,
            }}/>
            </div>
            <div className='w-full'>
            <AppAutoComplete props={{
              label:'From Date',
              name:'FromDate',
              value:values.FromDate,
              error: touched.FromDate && errors.FromDate,
              onChange: handleChange,
              onBlur: handleBlur,
            }}/>
            </div>
          </div>
          <div className='flex flex-row justify-between gap-10'>
            <div className='w-full'>
            <AppAutoComplete props={{
              label:'Organization',
              name:'organization',
              value:values.organization,
              error: touched.organization && errors.organization,
              onChange: handleChange,
              onBlur: handleBlur,
            }}/>
            </div>
            {values.type==='Person' || values.type==='Group' ? (
                <div className='w-full'>
              <AppAutoComplete props={{
                label:'Department',
                name:'Department',
                value:values.Department,
                error: touched.Department && errors.Department,
                onChange: handleChange,
                onBlur: handleBlur,
              }}/>
                </div>
            ):(
              <div className='w-full'>
              <AppAutoComplete props={{
                label:'Job Title',
                name:'JobTitle',
                value:values.JobTitle,
                error: touched.JobTitle && errors.JobTitle,
                onChange: handleChange,
                onBlur: handleBlur,
              }}/>
              </div>
            )}

          </div>
          {values.type==='Person'&& (
            <div className='flex flex-row justify-between gap-10'>
                <div className='w-full'>
              <AppAutoComplete props={{
                label:'Employee',
                name:'Employee',
                value:values.Employee,
                error: touched.Employee && errors.Employee,
                onChange: handleChange,
                onBlur: handleBlur,
              }}/>
              </div>
              <div className='w-full'>
              </div>
            </div>
          )}

          <div className="w-full">
            <AppTextArea props={{
              label:'Description',
              className:'border border-[#DEE1E8] rounded-xl ',
              name:'Description',
              variant:'bordered',
              value:values.Description,
              error: touched.Description && errors.Description,
              onChange: handleChange,
              onBlur: handleBlur,
              placeHolderClass:'placeholder:text-sm placeholder:text-secondary-400',
            }}/>
          </div>
        </div>
        <Scan color='gray' size={90} className='absolute bottom-2 left-0'/>
      </Form>
    </>
  );
}
export default FaceAllocationForm;
