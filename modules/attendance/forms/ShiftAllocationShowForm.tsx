import {Form, Radio, RadioGroup} from '@heroui/react';
import { AppAutoComplete, AppTextArea } from '@hrbox/uikit/components';
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
  JobTitle: null,
}
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

const ShiftAllocationShowForm=()=>{
  const { values, errors, touched, handleChange, handleBlur, handleSubmit,setFieldValue } = useFormContext();
  return(
    <>
      <Form id="shift-allocation-form" onSubmit={handleSubmit}>
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
              label:'Choose Shift',
              name:'ChooseShift',
              variant:'bordered',
              value:values.ChooseShift,
              error: touched.ChooseShift && errors.ChooseShift,
              onChange: handleChange,
              onBlur: handleBlur,
              isDisabled:true,
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
              isDisabled:true,
            }}/>
            </div>
          </div>
          <div className='flex flex-row justify-between w-full gap-10'>
            <div className='w-full'>
            <AppAutoComplete props={{
              label:'Organization',
              name:'organization',
              variant:'bordered',
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
                variant:'bordered',
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
                isDisabled:true,
              }}/>
              </div>
              <div className='w-full'></div>
            </div>
        )}

          <div className="w-full">
            <AppTextArea props={{
              label:'Description',
              className:'border border-[#DEE1E8] rounded-xl !z-9999 bg-gradient-to-r from-white via-[#EEF9FF] to-white ',
              name:'Description',
              variant:'bordered',
              value:values.Description,
              error: touched.Description && errors.Description,
              onChange: handleChange,
              onBlur: handleBlur,
              placeHolderClass:'placeholder:text-sm placeholder:text-secondary-400',
              isDisabled:true,
            }}/>
          </div>
        </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88" fill="none" className='absolute bottom-2 left-2 -z-1 '>
        <path d="M33 88.0002H3.66667C2.69421 88.0002 1.76158 87.6139 1.07394 86.9262C0.386308 86.2386 0 85.306 0 84.3335C0 83.361 0.386308 82.4284 1.07394 81.7408C1.76158 81.0531 2.69421 80.6668 3.66667 80.6668H33C33.9725 80.6668 34.9051 81.0531 35.5927 81.7408C36.2804 82.4284 36.6667 83.361 36.6667 84.3335C36.6667 85.306 36.2804 86.2386 35.5927 86.9262C34.9051 87.6139 33.9725 88.0002 33 88.0002ZM25.6667 73.3335H3.66667C2.69421 73.3335 1.76158 72.9472 1.07394 72.2596C0.386308 71.5719 0 70.6393 0 69.6668C0 68.6944 0.386308 67.7617 1.07394 67.0741C1.76158 66.3865 2.69421 66.0002 3.66667 66.0002H25.6667C26.6391 66.0002 27.5718 66.3865 28.2594 67.0741C28.947 67.7617 29.3333 68.6944 29.3333 69.6668C29.3333 70.6393 28.947 71.5719 28.2594 72.2596C27.5718 72.9472 26.6391 73.3335 25.6667 73.3335ZM18.3333 58.6668H3.66667C2.69421 58.6668 1.76158 58.2805 1.07394 57.5929C0.386308 56.9053 0 55.9726 0 55.0002C0 54.0277 0.386308 53.0951 1.07394 52.4074C1.76158 51.7198 2.69421 51.3335 3.66667 51.3335H18.3333C19.3058 51.3335 20.2384 51.7198 20.9261 52.4074C21.6137 53.0951 22 54.0277 22 55.0002C22 55.9726 21.6137 56.9053 20.9261 57.5929C20.2384 58.2805 19.3058 58.6668 18.3333 58.6668ZM47.6667 87.8352C46.6942 87.8784 45.7444 87.5336 45.0261 86.8766C44.3079 86.2196 43.8801 85.3041 43.8368 84.3317C43.7936 83.3592 44.1384 82.4094 44.7954 81.6911C45.4524 80.9729 46.3679 80.5451 47.3403 80.5018C54.2793 79.8669 60.8938 77.2679 66.409 73.0093C71.9241 68.7507 76.1116 63.0087 78.481 56.4559C80.8505 49.9031 81.3037 42.8109 79.7876 36.0098C78.2715 29.2087 74.8489 22.9805 69.9206 18.0545C64.9924 13.1285 58.7625 9.70875 51.9608 8.1958C45.159 6.68284 38.0669 7.1393 31.5153 9.51173C24.9636 11.8842 19.2235 16.0743 14.9674 21.5914C10.7113 27.1086 8.11538 33.7242 7.48367 40.6635C7.44033 41.1431 7.30296 41.6094 7.07939 42.0359C6.85582 42.4624 6.55044 42.8407 6.18068 43.1492C5.81091 43.4577 5.38401 43.6903 4.92435 43.8338C4.46468 43.9773 3.98125 44.0288 3.50167 43.9855C3.02208 43.9422 2.55572 43.8048 2.12923 43.5812C1.70273 43.3577 1.32444 43.0523 1.01597 42.6825C0.707491 42.3127 0.474866 41.8858 0.331373 41.4262C0.18788 40.9665 0.13633 40.4831 0.179667 40.0035C1.20226 28.7223 6.53621 18.2701 15.0712 10.8226C23.6062 3.37509 34.6846 -0.493854 46.0004 0.0211206C57.3161 0.536095 67.9973 5.39531 75.8205 13.5873C83.6438 21.7792 88.0063 32.6727 88 44.0002C88.0562 54.9941 83.9719 65.6063 76.5596 73.7259C69.1473 81.8454 58.9502 86.8773 47.9967 87.8205C47.8867 87.8315 47.773 87.8352 47.6667 87.8352ZM44 22.0002C43.0275 22.0002 42.0949 22.3865 41.4073 23.0741C40.7196 23.7617 40.3333 24.6944 40.3333 25.6668V44.0002C40.3335 44.9725 40.72 45.905 41.4077 46.5925L52.4077 57.5925C53.0992 58.2604 54.0254 58.63 54.9868 58.6216C55.9482 58.6133 56.8678 58.2277 57.5477 57.5478C58.2275 56.868 58.6131 55.9484 58.6215 54.987C58.6298 54.0256 58.2602 53.0994 57.5923 52.4078L47.6667 42.4822V25.6668C47.6667 24.6944 47.2804 23.7617 46.5927 23.0741C45.9051 22.3865 44.9725 22.0002 44 22.0002Z" fill="#05587A"/>
      </svg>
      </Form>
    </>
  );
}
export default ShiftAllocationShowForm;
