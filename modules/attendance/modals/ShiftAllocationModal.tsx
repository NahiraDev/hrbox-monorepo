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
     <FormProvider
      formId="ShiftAllocation-form"
      enableCache
      clearCacheOnSubmit
      validationSchema={formValidationAction}
    > 
          <ShiftAllocationForm />
    </FormProvider>
  )
}
export default ShiftAllocationModal;
