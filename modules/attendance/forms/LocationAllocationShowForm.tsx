import { Form , Radio, RadioGroup } from '@heroui/react';
import { AppAutoComplete, AppTextArea } from "@UIKit/components";
import { Location } from 'iconsax-reactjs';
import * as Yup from 'yup';
import {useFormContext} from "@core/providers/FormProvider";

export const initialValuesAction = {
  title: null,
  type: 'Person',
  ChooseLocation: null,
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
  ChooseLocation: Yup.string().required(),
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
    ChooseLocation: values.ChooseLocation,
    FromDate: values.FromDate,
    organization: values.organization,
    Department: values.Department,
    JobTitle: values.JobTitle,
    Employee: values.Employee,
    Description: values.Description,
  };
};

const LocationAllocationShowForm=()=>{
  const { values, errors, touched, handleChange, handleBlur, handleSubmit,setFieldValue } = useFormContext();

  return(
    <>
      <Form id="location-allocation-form" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-7">
          <RadioGroup name='type' isDisabled={true} classNames={{base:'w-full flex justify-between',wrapper:'w-full flex justify-between'}}
                      defaultValue='Person' orientation='horizontal' value={values.type} onValueChange={(value) => setFieldValue('type', value)}  >
            <Radio value="Person" classNames={{wrapper:'border-2 border-primary'}} >Person</Radio>
            <Radio value="Group" classNames={{wrapper:'border-2 border-primary'}}>Group</Radio>
            <Radio value="JobTitle" classNames={{wrapper:'border-2 border-primary'}}>Job Title</Radio>
          </RadioGroup>
          <div className='flex flex-row justify-between gap-10'>
            <div className='w-full'>
            <AppAutoComplete props={{
              label:'Choose Location',
              name:'ChooseLocation',
              value:values.ChooseLocation,
              error: touched.ChooseLocation && errors.ChooseLocation,
              onChange: handleChange,
              onBlur: handleBlur,
              isDisabled:true,
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
              isDisabled:true,
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
              isDisabled:true,
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
                isDisabled:true,
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
                isDisabled:true,
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
                isDisabled:true,
              }}/>
              </div>
              <div className='w-full'></div>
            </div>
        )}

          <div className="w-full">
            <AppTextArea props={{
              label:'Description',
              className:'border border-[#DEE1E8] rounded-xl z-999 bg-gradient-to-r from-white via-[#EEF9FF] to-white',
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
        <Location color='gray' size={90} className='absolute bottom-2 left-0'/>
      </Form>
    </>
  );
}
export default LocationAllocationShowForm;
