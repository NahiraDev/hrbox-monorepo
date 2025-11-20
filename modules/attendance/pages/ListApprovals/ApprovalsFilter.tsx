import { AppAutoComplete, AppButton } from '@hrbox/uikit/components';
import '../../app/index.css'
import { FormProvider } from '@hrbox/core/providers';
import { FormField } from '@hrbox/uikit/components/FormField';
const ApprovalsFilter=()=>{
  const filterList=[
    'Request Type',
    'Issuer',
    'From Date',
    'To Date',
    'Request Number',
    'Status',
    'Request Number',
    'Status',
    'Request Number',
    'Status',
    'Request Number',
    'Status',
    'Request Number',
    'Status',
  ]
    const headerInitialValues = {
    month: "",
    year: "",
    person: "",
    department: "",
  };
  return(
    <>
    <FormProvider 
       formId="calenderHeader"
          initialValues={headerInitialValues}
          validationSchema={{}}
          enableCache={false}
          >
      <div className="flex flex-col w-[22%] h-full rounded-xl pr-2 pl-3 py-3 gap-4 ">
        <div className='flex flex-col gap-4 pr-3 overflow-y-scroll max-h-[600px] custom-scroll-approvals'>
          {filterList.map((item,index)=>{
            return (
              <FormField
              key={index}
              name={item}
              label={item}
              component={AppAutoComplete}
              labelClassName='!text-sm !font-semibold'
              />
            )
          })}
        </div>
        <div className="flex justify-end">
          <AppButton
            color="primary"
            size="sm"
            radius='sm'
            className='text-white mr-[30px]'
            content='Search'
         />
        </div>
      </div>
      </FormProvider>
    </>
  )
}

export default ApprovalsFilter;
