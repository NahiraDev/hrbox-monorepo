import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import ShiftAllocationForm, {
  formValidationAction,
  handleSubmitAction,
} from '@hrbox/modules/attendance/forms/ShiftAllocationForm';

const ShiftAllocationModal=()=>{
  const {closeModal}=useModalContext();
  return( 
          <ShiftAllocationForm />
  )
}
export default ShiftAllocationModal;
