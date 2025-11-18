import { AppButton, AppPageTitle, AppSearchInput } from '@hrbox/uikit/components';
import { Add, ArrowLeft2, Hierarchy3 } from 'iconsax-reactjs';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import React from 'react';
interface AllocationSubheaderProps {
  modalComponent: React.ComponentType;
  title: string;
  icon: React.ReactNode;
}
const AllocationSubheader = ({
                               modalComponent: ModalComponent,
                               title,
                               icon
                             }: AllocationSubheaderProps) => {
  const {openModal} = useModalContext();
  const handlerOpenModal=()=>{
    openModal('confirm',title,<ModalComponent/>, null,'3xl','Add New One',<Hierarchy3 color="white"/>)
  }
  return(
    <>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row gap-3 items-center">
          <span><ArrowLeft2/></span>
          <AppPageTitle title={title} icon={icon}/>
        </div>
        <div className="flex flex-row gap-2.5">
          <AppSearchInput/>
          <AppButton
              color= 'white'
              size= 'md'
              radius= 'sm'
              startContent= {<Add size={22} />}
              className= 'border-1 border-primary'
              onPress={handlerOpenModal}
                content='Add New One'
            
          />
        </div>
      </div>
    </>
  )
}
export default AllocationSubheader;
