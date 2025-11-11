import { AppModal } from '@UIKit/components';
import { useModalContext } from '@core/providers/ModalProvider';
import { FormProvider } from '@core/providers/FormProvider';
import  {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@module/attendance/features/forms/IpAllocationEdit';
import IpAllocationShowForm from '@module/attendance/features/forms/IpAllocationShowForm';
const IpAllocationShow=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('view', 'IpAllocationShow');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <IpAllocationShowForm/>
        </FormProvider>
      </AppModal.Body>
    </>
  )
}
export default IpAllocationShow;
