import { AppAutoComplete, AppButton } from '@root/core';
import '../../app/index.css'
const ApprovalsFilter=()=>{
  const filterList=[
    'Request Type',
    'Issuer',
    'From Date',
    'To Date',
    'Request Number',
    'Status',
  ]
  return(
    <>
      <div className="flex flex-col w-[22%] h-full rounded-xl pr-2 pl-3 py-3 gap-4 ">
        <div className='flex flex-col gap-4 pr-3 overflow-y-scroll max-h-[600px] custom-scroll-approvals'>
          {filterList.map((item)=>{
            return (
              <AppAutoComplete props={{
                variant:'bordered',
                label:item,
                labelClassName:'!text-sm !font-semibold',
              }}/>
            )
          })}
        </div>
        <div className="flex justify-end">
          <AppButton props={{
            color:"primary",
            size:"sm",
            radius:'sm',
            className:'text-white mr-[30px]',
            content:'Search',
          }} />
        </div>
      </div>
    </>
  )
}

export default ApprovalsFilter;
