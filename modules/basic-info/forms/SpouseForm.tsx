import * as Yup from 'yup';
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import {FormField} from "@hrbox/uikit/components/FormField";

export const initialValuesSpouseForm = {
  FirstName: null,
  LastName: null,
  NationalID: null,
  Education: null,
  Mobile: null,
  DateOfBirth: null,
  Descriptions: null,
};

export const formValidationSpouseForm = Yup.object().shape({
  FirstName: Yup.string().required(),
  LastName: Yup.string().required(),
  NationalID: Yup.string().required(),
  Education: Yup.string().required(),
  Mobile: Yup.number().required(),
  DateOfBirth: Yup.number().required(),
  Descriptions: Yup.string().required(),


});

export const handleSubmitSpouseForm = (values: any) => {
  return {
    FirstName: values.FirstName,
    LastName: values.LastName,
    NationalID: values.NationalID,
    Education: values.Education,
    Mobile: values.Mobile,
    DateOfBirth: values.DateOfBirth,
    Descriptions: values.Descriptions,
  };
};


export const SpouseForm = () =>{
    const {values , errors , touched} = useFormContext()
    return (
        <div className="flex flex-col gap-y-6">
            <div className="grid grid-cols-2 gap-y-6 gap-x-10">
                <FormField
                    label="First Name"
                    name="FirstName"
                    helperText={touched.FirstName && errors.FirstName}
                />
                <FormField
                    label="Last Name"
                    name="LastName"
                    helperText={touched.LastName && errors.LastName}
                />
                <FormField
                    label="National ID"
                    name="NationalID"
                    helperText={touched.NationalID && errors.NationalID}
                />
                <FormField
                    label="Education"
                    name="Education"
                    helperText={touched.Education && errors.Education}
                />

                <FormField
                    label="Mobile"
                    name="Mobile"
                    helperText={touched.Mobile && errors.Mobile}
                />

                <FormField
                    label="Date of Birth"
                    name="DateOfBirth"
                    helperText={touched.DateOfBirth && errors.DateOfBirth}
                />
            </div>
            <div>
                <FormField
                    label="Descriptions and Achievements"
                    name="Descriptions"
                    helperText={touched.Descriptions && errors.Descriptions}
                />
            </div>
        </div>
    )
}