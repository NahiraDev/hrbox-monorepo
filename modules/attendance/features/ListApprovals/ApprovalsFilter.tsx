import { AppAutoComplete, AppButton } from '@root/core';
import '../../app/index.css'
const ApprovalsFilter=()=>{
  return(
    <>
      <div className="flex flex-col w-[15%] h-full border-1 border-primary rounded-xl bg-[#DCF0F9] pr-2 pl-3 py-3 gap-4 ">
        <div className='flex flex-col gap-4 pr-1 overflow-y-scroll max-h-[600px] custom-scroll-approvals'>
          <AppAutoComplete props={{
            label:'Request Type',
            className:'gap-1 shadow-sm'
          }}/>
          <AppAutoComplete props={{
            label:'Request Type',
            className:'gap-1 shadow-sm'
          }}/>
          <AppAutoComplete props={{
            label:'Request Type',
            className:'gap-1 shadow-sm'
          }}/>
          <AppAutoComplete props={{
            label:'Request Type',
            className:'gap-1 shadow-sm'
          }}/>
          <AppAutoComplete props={{
            label:'Request Type',
            className:'gap-1 shadow-sm'
          }}/>
          <AppAutoComplete props={{
            label:'Request Type',
            className:'gap-1 shadow-sm'
          }}/>
          <AppAutoComplete props={{
            label:'Request Type',
            className:'gap-1 shadow-sm'
          }}/>
          <AppAutoComplete props={{
            label:'Request Type',
            className:'gap-1'
          }}/>
          <AppAutoComplete props={{
            label:'Request Type',
            className:'gap-1 shadow-sm'
          }}/>
          <AppAutoComplete props={{
            label:'Request Type',
            className:'gap-1 shadow-sm'
          }}/>
          <AppAutoComplete props={{
            label:'Request Type',
            className:'gap-1 shadow-sm'
          }}/>
          <AppAutoComplete props={{
            label:'Request Type',
            className:'gap-1 shadow-sm'
          }}/>
        </div>
        <div className="flex justify-end">
          <AppButton props={{
            color:"primary",
            size:"md",
            className:'text-white mr-3',
            content:'Search',
          }} />
        </div>
      </div>
    </>
  )
}

export default ApprovalsFilter;
