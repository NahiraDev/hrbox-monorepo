import { Button } from '@heroui/button';
import { Form } from '@heroui/react';
import { Link21 } from 'iconsax-react';

export const AwardModal = () =>{
  return(
    <AppModal
      footer={
        <div>
          <Button
            className="text-xl font-normal"
            color="default"
            variant="light"
            onPress={() => setOpenCreateModal(false)}
          >
            Close
          </Button>
          <Button
            className="bg-secondary-400 text-xl font-normal text-white"
            form="create-award-form"
            type="submit"
          >
            Submit
          </Button>
        </div>
      }
      header={
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div className="bg-secondary-400 shadow-shadow-light-tight/1 rounded-4 flex gap-2 px-3 py-1.5 w-fit">
              <CupStar
                props={{
                  color: '#fff',
                }}
              />
              <span className="text-white font-normal text-xl">Add Achievements and accolades</span>
            </div>
          </div>
        </div>
      }
      isOpen={openCreateModal}
      size="3xl"
      onClose={() => setOpenCreateModal(false)}
    >

    </AppModal>
  )
}
