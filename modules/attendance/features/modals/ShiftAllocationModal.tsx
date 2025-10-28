import { AppButton, AppModal } from '@core/components';
import ShiftAllocationEdit from '@module/attendance/features/forms/ShiftAllocationEdit';
import { FormProvider, useModalContext } from '@core/context';
import ShiftAllocationForm, {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@module/attendance/features/forms/ShiftAllocationForm';
const ShiftAllocationModal=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('confirm', 'ShiftAllocationModal');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <ShiftAllocationForm/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              onClick: () => closeModal('confirm', 'ShiftAllocationModal'),
              content: 'Cancel',
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              type: 'submit',
              size: 'md',
              radius: 'lg',
              form:'shift-allocation-form',
              className: 'text-white',
              content: 'Submit',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
  )
}
export default ShiftAllocationModal;
