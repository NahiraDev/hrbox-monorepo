import { AppTable } from '@UIKit/components';
import { Allocatio } from '@module/attendance/app/mock';
import { Hierarchy3 } from 'iconsax-reactjs';
import { useState } from 'react';
import { useModalContext } from 'core/context';
import FaceAllocationModalEdit from '@module/attendance/features/modals/FaceAllocationModalEdit';
import FaceAllocationShow from '@module/attendance/features/modals/FaceAllocationShow';
const FaceAllocation=()=>{
  const [data,setData]=useState(Allocatio);
  const {openModal} = useModalContext();
  const handleDeleteRow=(row,index)=>{
    setData(prevData => prevData.filter((_, i) => i !== index))
  }
  const handleRowClick=(row,index)=>{
    openModal('view','FaceAllocationShow',<FaceAllocationShow/>,row,'3xl','Face Recognition Assignment',<Hierarchy3 color="white"/>);
  }
  return(
    <>
      <div className="h-full w-full flex flex-col ">
    <AppTable
      data={data}
      showStatus={true}
      hasPagination={true}
      pageSize={8}
      onDelete={(row,index)=>handleDeleteRow(row,index)}
      onRowClick={(row,index)=>handleRowClick(row,index)}
      onEdit={()=> openModal('edit','FaceAllocationModalEdit',<FaceAllocationModalEdit/>,null,'3xl','Edit Face Recognition Assignment',<Hierarchy3 color="white"/>)}
    />
      </div>
    </>
  )
}
export default FaceAllocation;
