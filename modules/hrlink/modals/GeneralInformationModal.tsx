import { FormProvider } from '@hrbox/core/providers/FormProvider';
import {
  formValidationGeneralInformation, GeneralInformationForm, handleSubmitGeneralInformation,
  initialValuesGeneralInformation
} from "@hrbox/modules/hrlink/forms/GeneralInformationForm";
import { useEditGeneralSettingMutation } from '../apis/Setting';

export const GeneralInformationModal = () =>{
  // WARNING: this is not the correct endpoint
  const [ editGeneralInfo, { error: errorEditingGeneralInfo }] = useEditGeneralSettingMutation();

  return(
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
  )
}
