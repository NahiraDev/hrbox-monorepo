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
      // onSubmitAsync={handleSubmit}
      validationSchema={formValidationAction}
    >
      {/* <AppModal
        type="confirm"
        name="ShiftAllocation"
        title="تخصیص شیفت"
        size="lg"
        // onSubmit={handleSubmit}
        // onCancel={handleCancel}
        submitLabel="تایید"
        cancelLabel="انصراف"
      > */}
          <ShiftAllocationForm />
      {/* </AppModal> */}
    </FormProvider>
  )
}
export default ShiftAllocationModal;
