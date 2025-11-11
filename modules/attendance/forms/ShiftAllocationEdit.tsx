import { Form } from '@heroui/react';
import { Radio, RadioGroup } from '@heroui/react';
import { useFormContext } from '@hrbox/core';
import { AppAutoComplete, AppTextArea }from '@UIKit/components';
import { TimerStart } from 'iconsax-reactjs';
import * as Yup from 'yup';

export const formValidationAction = Yup.object().shape({
  title: Yup.string().required(),
  type: Yup.string().required(),
  ChooseShift: Yup.string().required(),
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
    ChooseShift: values.ChooseShift,
    FromDate: values.FromDate,
    organization: values.organization,
    Department: values.Department,
    JobTitle: values.JobTitle,
    Employee: values.Employee,
    Description: values.Description,
  };
};

const ShiftAllocationEdit=()=>{
  const { values, errors, touched, handleChange, handleBlur, handleSubmit,setFieldValue } = useFormContext();
  console.log(values,'vvvvv');
  return(
    <>
      <Form id="shift-allocation-edit" onSubmit={handleSubmit}>
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
              label:'Choose Shift',
              name:'ChooseShift',
              variant:'bordered',
              value:values.ChooseShift,
              error: touched.ChooseShift && errors.ChooseShift,
              onChange: handleChange,
              onBlur: handleBlur,
            }}/>
            </div>
            <div className='w-full'>
            <AppAutoComplete props={{
              label:'From Date',
              name:'FromDate',
              variant:'bordered',
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
              variant:'bordered',
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
                variant:'bordered',
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
                variant:'bordered',
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
                variant:'bordered',
                value:values.Employee,
                error: touched.Employee && errors.Employee,
                onChange: handleChange,
                onBlur: handleBlur,
              }}/>
              </div>
              <div className='w-full'></div>
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
        <TimerStart color='gray' size={90} className='absolute bottom-2 left-0'/>
      </Form>
    </>
  );
}
export default ShiftAllocationEdit;
