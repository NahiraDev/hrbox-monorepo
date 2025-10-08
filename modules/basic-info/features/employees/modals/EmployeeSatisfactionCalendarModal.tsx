import { AppButton, AppDeleteModal, AppModal } from '@core/components';
import { Add, People, Trash } from 'iconsax-react';
import { Avatar } from '@heroui/react';
import { RelativesModal } from '@module/basic-info/features/employees/modals/RelativesModal';

const EmployeeSatisfactionCalendarModal = () => {
  return (

    <AppModal.Body>
      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="flex flex-col gap-2 items-center justify-center shadow-sm p-2 rounded-lg  ">
          <Avatar/>
          <span>
         name
       </span>
          <AppButton
            props={{
              size: 'xs',
              radius: 'sm',
              color: 'white',
              variant: 'solid',
              isIconOnly: true,
              // onPress: () => openModal('edit',"",<RelativesModal/> , undefined, 'xl',"Relatives",<People className='text-white'/>),
              className: 'bg-white border-1 border-primary-400 p-2',
              content: <span>Mentor</span>,
            }}
          />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center shadow-sm p-2 rounded-lg  ">
          <Avatar/>
          <span>
         name
       </span>
          <AppButton
            props={{
              size: 'xs',
              radius: 'sm',
              color: 'white',
              variant: 'solid',
              isIconOnly: true,
              // onPress: () => openModal('edit',"",<RelativesModal/> , undefined, 'xl',"Relatives",<People className='text-white'/>),
              className: 'bg-white border-1 border-primary-400 p-2',
              content: <span>Mentor</span>,
            }}
          />
        </div><div className="flex flex-col gap-2 items-center justify-center shadow-sm p-2 rounded-lg  ">
        <Avatar/>
        <span>
         name
       </span>
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            color: 'white',
            variant: 'solid',
            isIconOnly: true,
            // onPress: () => openModal('edit',"",<RelativesModal/> , undefined, 'xl',"Relatives",<People className='text-white'/>),
            className: 'bg-white border-1 border-primary-400 p-2',
            content: <span>Mentor</span>,
          }}
        />
      </div><div className="flex flex-col gap-2 items-center justify-center shadow-sm p-2 rounded-lg  ">
        <Avatar/>
        <span>
         name
       </span>
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            color: 'white',
            variant: 'solid',
            isIconOnly: true,
            // onPress: () => openModal('edit',"",<RelativesModal/> , undefined, 'xl',"Relatives",<People className='text-white'/>),
            className: 'bg-white border-1 border-primary-400 p-2',
            content: <span>Mentor</span>,
          }}
        />
      </div><div className="flex flex-col gap-2 items-center justify-center shadow-sm p-2 rounded-lg  ">
        <Avatar/>
        <span>
         name
       </span>
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            color: 'white',
            variant: 'solid',
            isIconOnly: true,
            // onPress: () => openModal('edit',"",<RelativesModal/> , undefined, 'xl',"Relatives",<People className='text-white'/>),
            className: 'bg-white border-1 border-primary-400 p-2',
            content: <span>Mentor</span>,
          }}
        />
      </div><div className="flex flex-col gap-2 items-center justify-center shadow-sm p-2 rounded-lg  ">
        <Avatar/>
        <span>
         name
       </span>
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            color: 'white',
            variant: 'solid',
            isIconOnly: true,
            // onPress: () => openModal('edit',"",<RelativesModal/> , undefined, 'xl',"Relatives",<People className='text-white'/>),
            className: 'bg-white border-1 border-primary-400 p-2',
            content: <span>Mentor</span>,
          }}
        />
      </div><div className="flex flex-col gap-2 items-center justify-center shadow-sm p-2 rounded-lg  ">
        <Avatar/>
        <span>
         name
       </span>
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            color: 'white',
            variant: 'solid',
            isIconOnly: true,
            // onPress: () => openModal('edit',"",<RelativesModal/> , undefined, 'xl',"Relatives",<People className='text-white'/>),
            className: 'bg-white border-1 border-primary-400 p-2',
            content: <span>Mentor</span>,
          }}
        />
      </div><div className="flex flex-col gap-2 items-center justify-center shadow-sm p-2 rounded-lg  ">
        <Avatar/>
        <span>
         name
       </span>
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            color: 'white',
            variant: 'solid',
            isIconOnly: true,
            // onPress: () => openModal('edit',"",<RelativesModal/> , undefined, 'xl',"Relatives",<People className='text-white'/>),
            className: 'bg-white border-1 border-primary-400 p-2',
            content: <span>Mentor</span>,
          }}
        />
      </div>
      </div>

    </AppModal.Body>
)
};

export default EmployeeSatisfactionCalendarModal;
