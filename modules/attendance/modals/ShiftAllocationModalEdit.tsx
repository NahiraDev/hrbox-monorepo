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
      <AppModal.Body>
        <FormProvider  formId='ShiftAllocation-form' enableCache clearCacheOnSubmit onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('edit', 'ShiftAllocationModalEdit');
        }} initialValues={initialValues} validationSchema={formValidationAction}>
          <ShiftAllocationEdit/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
              color= 'white'
              size= 'md'
              radius= 'lg'
              onPress= {() => closeModal('edit', 'ShiftAllocationModalEdit')}
              content= 'Cancel'
          />
          <AppButton
              color= 'primary'
              size= 'md'
              radius= 'lg'
              className= 'text-white'
              content= 'Submit Again'
          />
        </div>
      </AppModal.Footer>
    </>
  )
}
export default ShiftAllocationModalEdit;
