import { AppButton, AppModal } from '@hrbox/uikit/components';
import { FormProvider } from '@hrbox/core/providers/FormProvider';
import {
  formValidationGeneralInformation, GeneralInformationForm, handleSubmitGeneralInformation,
  initialValuesGeneralInformation
} from "@hrbox/modules/hrlink/forms/GeneralInformationForm";

export const GeneralInformationModal = () =>{
  return(
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
            <GeneralInformationForm />
          </FormProvider>
        </AppModal.Body>
      </>
    // </AppModal>
  )
}
