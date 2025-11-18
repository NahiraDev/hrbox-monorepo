import { AppButton, AppModal } from '@hrbox/uikit/components';
import ShiftAllocationEdit from '@hrbox/modules/attendance/forms/ShiftAllocationEdit';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import {useModalContext} from '@hrbox/core/providers/ModalProvider'
import {
  formValidationAction,
  handleSubmitAction,
} from '@hrbox/modules/attendance/forms/ShiftAllocationEdit';
const ShiftAllocationModalEdit=()=>{
  const {closeModal, getModalData}=useModalContext();
  const rowData=getModalData('edit','ShiftAllocationModalEdit');
  const initialValues = {
    type: rowData.type || 'Person'||null,
    ChooseShift: rowData.ChooseShift || null,
    FromDate: rowData.FromDate || null,
    organization: rowData.organization || null,
    Department: rowData.Department || null,
    Employee: rowData.Employee || null,
    Description: rowData.Description || null,
    JobTitle: rowData.JobTitle || null}

  console.log(initialValues);
  return(
    <>
          <ShiftAllocationEdit/>
    </>
  )
}
export default ShiftAllocationModalEdit;
