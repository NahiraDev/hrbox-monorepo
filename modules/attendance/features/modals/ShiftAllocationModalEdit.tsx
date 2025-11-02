import { AppButton, AppModal } from '@core/components';
import ShiftAllocationEdit from '@module/attendance/features/forms/ShiftAllocationEdit';
import { FormProvider, useModalContext } from '@core/context';
import {
  formValidationAction,
  handleSubmitAction,
} from '@module/attendance/features/forms/ShiftAllocationEdit';
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
        <FormProvider onSubmitAsync={async(values:any)=>{
          handleSubmitAction(values);
          closeModal('edit', 'ShiftAllocationModalEdit');
        }} initialValues={initialValues} validationSchema={formValidationAction}>
          <ShiftAllocationEdit/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              onClick: () => closeModal('edit', 'ShiftAllocationModalEdit'),
              content: 'Cancel',
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              type: 'submit',
              size: 'md',
              radius: 'lg',
              className: 'text-white',
              form:'shift-allocation-edit',
              content: 'Submit Again',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
  )
}
export default ShiftAllocationModalEdit;
