import { AppTable } from '@root/core';
import { Allocatio } from '@module/attendance/app/mock';

const FaceAllocation=()=>{
  return(
    <>
      <div className="h-full w-full flex flex-col ">
    <AppTable
      data={Allocatio}
      hasPagination={true}
    />
      </div>
    </>
  )
}
export default FaceAllocation;
