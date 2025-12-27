import { AppTable } from '@hrbox/uikit/components';
import { Allocatio } from '@hrbox/modules/attendance/app/mock';
import { useState } from 'react';
import { useModal } from '@hrbox/core/hooks';
import { ModalSize, ModalType } from '@hrbox/core/providers';
import IpAllocationModal from '@hrbox/modules/attendance/modals/IpAllocationModal';

const IpAllocation=()=>{
  const [data,setData]=useState(Allocatio);
  const modal=useModal();
    const handleRowClick=()=>{
      modal.open(
      ModalType.VIEW,
      "ip-allocation",
      <IpAllocationModal/>,
      {
        isForm: true,
        submitLabel: "Submit Again",
        cancelLabel: "Cancel",
        formConfig:{
          formId: "ip-form",
        }
      },
      ModalSize['3XL'],
    );
  }
  return(
    <><div className="h-full w-full flex flex-col ">
    <AppTable
      data={data}
      showStatus={true}
      hasPagination={true}
      onRowClick={handleRowClick} 
    />
      </div>
    </>
  )
}
export default IpAllocation;
