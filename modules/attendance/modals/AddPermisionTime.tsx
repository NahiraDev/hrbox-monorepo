import { AppButton, AppModal } from '@hrbox/uikit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import {FormProvider} from "@hrbox/core/providers/FormProvider"
import AddPermisionForm from '@hrbox/modules/attendance/forms/AddPermisionForm';

const AddPermisionTime=()=>{
  const {closeModal} = useModalContext();
  return(
    <>
          <AddPermisionForm/>
    </>
  )
}
export default AddPermisionTime
