import { AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider'

import {
  formValidationAction,
  handleSubmitAction,
  initialValuesAction,
} from '@hrbox/modules/attendance/forms/ShiftAllocationShowForm';
import ShiftAllocationShowForm from '@hrbox/modules/attendance/forms/ShiftAllocationShowForm';
const ShiftAllocationShow=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('view', 'ShiftShowModal');
        }} initialValues={initialValuesAction} validationSchema={formValidationAction}>
        <ShiftAllocationShowForm/>
        </FormProvider>
      </AppModal.Body>
    </>
  )
}
export default ShiftAllocationShow;
