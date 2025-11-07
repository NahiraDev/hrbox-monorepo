import { AppButton, AppModal } from '@core/components';
import { FormProvider, useModalContext } from '@core/context';
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
