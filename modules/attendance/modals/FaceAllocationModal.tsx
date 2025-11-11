import { AppButton, AppModal } from '@UIKit/components';
import { FormProvider } from '@core/providers/FormProvider';
import { useModalContext } from '@core/providers/ModalProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@module/attendance/features/forms/FaceAllocationForm';
import FaceAllocationForm from '@module/attendance/features/forms/FaceAllocationForm';
const FaceAllocationModal=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('confirm', 'FaceAllocation');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <FaceAllocationForm/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              onClick: () => closeModal('confirm', 'FaceAllocation'),
              content: 'Cancel',
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              type: 'submit',
              size: 'md',
              radius: 'lg',
              form:'face-allocation-form',
              className: 'text-white',
              content: 'Submit',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
  )
}
export default FaceAllocationModal;
