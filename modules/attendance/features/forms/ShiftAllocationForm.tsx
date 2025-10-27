import { Form } from '@heroui/react';
import { Radio, RadioGroup } from '@heroui/radio';
import { AppAutoComplete, AppTextArea, useFormContext } from '@root/core';
import { TimerStart } from 'iconsax-react';
import * as Yup from 'yup';

export const initialValuesAction = {
  title: null,
  type: 'Person',
  ChooseShift: null,
  FromDate: null,
  organization: null,
  Department: null,
  Employee: null,
  Description: null,
}
export const formValidationAction = Yup.object().shape({
  title: Yup.string().required(),
  type: Yup.string().required(),
  ChooseShift: Yup.string().required(),
  FromDate: Yup.string().required(),
  organization: Yup.string().required(),
  Department: Yup.string().required(),
  Employee: Yup.string().required(),
  Description: Yup.string().required(),
});
export const handleSubmitAction = (values: any) => {
  return {
    title: values.title,
    type: values.type,
    ChooseShift: values.ChooseShift,
    FromDate: values.FromDate,
    organization: values.organization,
    Department: values.Department,
    Employee: values.Employee,
    Description: values.Description,
  };
};

const ShiftAllocationForm=()=>{
  const { values, errors, touched, handleChange, handleBlur, handleSubmit,setFieldValue } = useFormContext();

  return(
    <>
      <Form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-7">
          <RadioGroup name='type' classNames={{base:'w-full flex justify-between',wrapper:'w-full flex justify-between'}}
                      defaultValue='Person' orientation='horizontal' value={values.type} >
            <Radio value="Person" classNames={{wrapper:'border-2 border-primary'}} >Person</Radio>
            <Radio value="Group" classNames={{wrapper:'border-2 border-primary'}}>Group</Radio>
            <Radio value="Job Title" classNames={{wrapper:'border-2 border-primary'}}>Job Title</Radio>
          </RadioGroup>
          <div className='flex flex-row justify-between'>
            <AppAutoComplete props={{
              label:'Choose Shift',
              name:'ChooseShift',
              value:values.ChooseShift,
              error: touched.ChooseShift && errors.ChooseShift,
              onChange: handleChange,
              onBlur: handleBlur,
            }}/>
            {values.type==='Person'&& (
            <AppAutoComplete props={{
              label:'From Date',
              name:'FromDate',
              value:values.FromDate,
              error: touched.FromDate && errors.FromDate,
              onChange: handleChange,
              onBlur: handleBlur,
            }}/>
            )}
          </div>
          <div className='flex flex-row justify-between'>
            <AppAutoComplete props={{
              label:'Organization',
              name:'Organization',
              value:values.Organization,
              error: touched.Organization && errors.Organization,
              onChange: handleChange,
              onBlur: handleBlur,
            }}/>
            <AppAutoComplete props={{
              label:'Department',
              name:'Department',
              value:values.Department,
              error: touched.Department && errors.Department,
              onChange: handleChange,
              onBlur: handleBlur,
            }}/>
          </div>
          <div className='flex flex-row justify-between'>
            <AppAutoComplete props={{
              label:'Employee',
              name:'Employee',
              value:values.Employee,
              error: touched.Employee && errors.Employee,
              onChange: handleChange,
              onBlur: handleBlur,
            }}/>
          </div>
          <div className="w-full">
            <AppTextArea props={{
              label:'Descriptions',
              className:'border border-[#DEE1E8]',
              name:'Descriptions',
              value:values.Descriptions,
              error: touched.Descriptions && errors.Descriptions,
              onChange: handleChange,
              onBlur: handleBlur,
            }}/>
          </div>
        </div>
        <TimerStart color='gray' size={90} className='absolute bottom-2 left-0'/>
      </Form>
    </>
  );
}
export default ShiftAllocationForm;
