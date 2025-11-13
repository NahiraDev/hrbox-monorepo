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
    <>
      <AppModal.Body>
        <FormProvider  formId='ShiftAllocation-form' enableCache clearCacheOnSubmit onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('confirm', 'ShiftAllocation');
        }} initialValues={} validationSchema={formValidationAction}>
        <ShiftAllocationForm/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
              color= 'white'
              size= 'md'
              radius= 'lg'
              onPress= {() => closeModal('confirm', 'ShiftAllocation')}
              content= 'Cancel'
          />
          <AppButton
              color= 'primary'
              size= 'md'
              radius= 'lg'
              className= 'text-white'
              content= 'Submit'
          />
        </div>
      </AppModal.Footer>
    </>
  )
}
export default ShiftAllocationModal;
