import { AppButton, AppModal } from '@hrbox/uikit/components';
import { Setting4 } from 'iconsax-react';

export const JobFilterModal = () =>{
  return(
    <AppModal
      title="Filter"
      icon={<Setting4 className="text-white" size="22" />}
      size="xl"
    >
      <AppModal.Body>

      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            color: 'secondary',
            size: 'md',
            radius: 'sm',
            content:'Save Changes',
          }}
        />
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'sm',
            content:'Cancel',
          }}
        />
      </AppModal.Footer>
    </AppModal>
  )
}
