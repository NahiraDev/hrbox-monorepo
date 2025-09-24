import { AppButton, AppModal } from 'core/components';
import { FormProvider, useModalContext } from 'core/context';
import AddPermisionForm from '@module/attendence/features/forms/AddPermisionForm';

const AddPermisionTime=()=>{
  const {closeModal} = useModalContext();
  return(
    <>
      <AppModal.Body>
        <FormProvider onSubmitAsync={''} initialValues={""}>
          <AddPermisionForm/>
        </FormProvider>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              onClick: () => closeModal('confirm', 'AddPermisionTime'),
              content: 'Cancel',
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              type: 'submit',
              size: 'md',
              radius: 'lg',
              content: 'Submit Again',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
  )
}
export default AddPermisionTime
