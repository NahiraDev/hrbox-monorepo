import { AppButton, AppSearchInput } from '@core/components';
import { Add, ArrowLeft2, Hierarchy3 } from 'iconsax-react';
import { useModalContext } from '@core/context';
interface AllocationSubheaderProps {
  name: string;
  subheaderIcon: React.ComponentType<any>;
  modalComponent: React.ComponentType;
}
const AllocationSubheader = ({
 name,
 subheaderIcon: SubheaderIcon,
 modalComponent: ModalComponent
}:AllocationSubheaderProps) => {
  const {openModal} = useModalContext();
  const handlerOpenModal=()=>{
    openModal('confirm',name,<ModalComponent/>, null,'2xl','Add New One',<Hierarchy3 color="white"/>)
  }
  return(
    <>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row gap-3 items-center">
          <span><ArrowLeft2/></span>
          <AppButton props={{
            content:name,
            size:'sm',
            className:'bg-primary-400 text-white',
            startContent:<span><SubheaderIcon/></span>,
          }}/>
        </div>
        <div className="flex flex-row gap-2.5">
          <AppSearchInput />
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              startContent: <Add />,
              className: 'border-1 border-primary',
              onClick:handlerOpenModal,
                content:'Add New One',
            }}
          />
        </div>
      </div>
    </>
  )
}
export default AllocationSubheader;
