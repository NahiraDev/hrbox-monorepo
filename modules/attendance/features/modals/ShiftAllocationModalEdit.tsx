import { AppButton, AppModal } from '@core/components';
import ShiftAllocationEdit from '@module/attendance/features/forms/ShiftAllocationEdit';
import { useModalContext } from '@core/context';
const ShiftAllocationModalEdit=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
      <AppModal.Body>
        <ShiftAllocationEdit/>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              onClick: () => closeModal('edit', 'ShiftAllocationModalEdit'),
              content: 'Cancel',
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              type: 'submit',
              size: 'md',
              radius: 'lg',
              className: 'text-white',
              content: 'Submit Again',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
  )
}
export default ShiftAllocationModalEdit;
