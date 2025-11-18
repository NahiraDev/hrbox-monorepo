import { AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import { useModalContext } from '@hrbox/core/providers/ModalProvider'

import {formValidationAction, handleSubmitAction} from '@hrbox/modules/attendance/forms/ShiftAllocationShowForm';
import ShiftAllocationShowForm from '@hrbox/modules/attendance/forms/ShiftAllocationShowForm';
const ShiftAllocationShow=()=>{
  const {closeModal}=useModalContext();
  return(
    <>
        <ShiftAllocationShowForm/>
    </>
  )
}
export default ShiftAllocationShow;
