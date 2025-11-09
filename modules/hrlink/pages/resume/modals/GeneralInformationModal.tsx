import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import {
  GeneralInformationForm,
  formValidationGeneralInformation,
  initialValuesGeneralInformation,
} from '@module/hrlink/features/resume/forms';

export const GeneralInformationModal = () =>{
  return(
    // <AppModal title="Add General Informations" icon={<Personalcard className="text-white" size="22" />} size="xl">
      <>
        <AppModal.Body>
          <FormProvider
          formId="general-information-form"
            initialValues={initialValuesGeneralInformation}
            validationSchema={formValidationGeneralInformation}
            onSubmitAsync={async (values: any) => {
              // await createGeneralInformation(handleSubmitGeneralInformation(values)).unwrap();
            }}
          >
              <></>
            {/*<GeneraGeneralInformationModallInformationForm />*/}
          </FormProvider>
        </AppModal.Body>
        <AppModal.Footer>
          <AppButton
            props={{
              color: 'default',
              size: 'md',
              radius: 'md',
              content:'Cancel',
            }}
          />
          <AppButton
            props={{
              color: 'secondary',
              type: 'submit',
              size: 'md',
              radius: 'md',
              content:'Save Changes',
            }}
          />
        </AppModal.Footer>
      </>
    // </AppModal>
  )
}
