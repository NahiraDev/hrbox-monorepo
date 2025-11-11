import { AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@module/attendance/features/forms/FaceAllocationEdit';
import FaceAllocationShowForm from '@module/attendance/features/forms/FaceAllocationShowForm';
const FaceAllocationShow=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('view', 'FaceAllocationShow');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <FaceAllocationShowForm/>
        </FormProvider>
      </AppModal.Body>
    </>
  )
}
export default FaceAllocationShow;
