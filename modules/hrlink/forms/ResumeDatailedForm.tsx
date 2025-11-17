import { AppAutoComplete, AppButton, AppSwitch } from '@hrbox-monorepo/UIKit/components';
import { FormModal } from '@hrbox/uikit/components/FormModal'
import { Edit, UserRemove, VolumeHigh } from 'iconsax-reactjs';
import { Form } from '@heroui/react';
import { useState } from 'react';
import * as Yup from 'yup';

import { companyPeopleOptions } from '@hrbox-monorepo/modules/hrlink/app/mock';
import { useFormContext } from '@hrbox-monorepo/core/providers/FormProvider';
import { FormField } from '@hrbox/uikit/components/FormField';
import { iranProvinces } from './options';

export const initialValuesResume = {
  firstName: "",
  lastName: "",
  nationalCode: "",
  birthDate: "",
  maritalStatus: "",
  gender: "",
  militaryStatus: "",
  orgCategory: "",
  minSalary: "",
  workingCategory: "",
  nationality: "",
  country: "",
  city: "",
  address: "",
};


export const resumeValidation = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),

  nationalCode: Yup.string()
    .matches(/^\d{10}$/, "Must be 10 digits")
    .required("Required"),

  birthDate: Yup.date().required("Required"),

  maritalStatus: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  militaryStatus: Yup.string().required("Required"),
  orgCategory: Yup.string().required("Required"),
  minSalary: Yup.number().required("Required"),
  workingCategory: Yup.string().required("Required"),

  nationality: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  city: Yup.string().required("Required"),

  address: Yup.string().required("Required"),
});

export const maritalStatusOptions = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
];

export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const militaryStatusOptions = [
  { label: "Completed", value: "completed" },
  { label: "Exempt", value: "exempt" },
  { label: "Not Completed", value: "not_completed" },
];

export const orgCategoryOptions = [
  { label: "Private", value: "private" },
  { label: "Government", value: "government" },
  { label: "NGO", value: "ngo" },
];

export const workingCategoryOptions = [
  { label: "Full-time", value: "fulltime" },
  { label: "Part-time", value: "parttime" },
  { label: "Contract", value: "contract" },
];

export const nationalityOptions = [
  { label: "Iran", value: "iran" },
  { label: "Turkey", value: "turkey" },
  { label: "USA", value: "usa" },
];

export const countryOptions = [
  { label: "Iran", value: "iran" },
  { label: "Turkey", value: "turkey" },
  { label: "USA", value: "usa" },
];

export const cityOptions = [
  { label: "Tehran", value: "tehran" },
  { label: "Istanbul", value: "istanbul" },
  { label: "New York", value: "newyork" },
];


// const mappedProvinces = iranProvinces.map(p => ({
//   ...p,
//   display: p.label.fa,
// }));


export const ResumeDetailedForm = () => {
  const { handleSubmit } = useFormContext();

  return (
    <Form onSubmit={handleSubmit} className="grid grid-cols-4 gap-6 h-full">
      <div className="col-span-3 flex flex-col gap-4">
        <FormField name="firstName" label="First Name" />
        <FormField name="lastName" label="Last Name" />
        <FormField name="nationalCode" label="National Code" />
        <FormField name="dateOfBirth" label="Date of Birth" type="date" />
        <FormField
          name="maritalStatus"
          label="Marital Status"
          component={AppAutoComplete}
          options={maritalStatusOptions}
        />
<FormField
  name="province"
  label="Province"
  component={AppAutoComplete}   // tell FormField to use your Autocomplete
  data={iranProvinces}          // your static options
  displayKey="label.fa"          // what the user sees
  valueKey="value"               // what gets stored in the form
/>
        <FormField
          name="militaryStatus"
          label="Military Status"
          component={AppAutoComplete}
          options={militaryStatusOptions}
        />
        <FormField name="organizationalCategory" label="Organizational Category" />
        <FormField name="minimumSalary" label="Minimum Salary" type="number" />
        <FormField name="workingCategory" label="Working Category" />
        <FormField name="nationality" label="Nationality" />
        <FormField name="country" label="Country" />
        <FormField
          name="city"
          label="City"
          component={AppAutoComplete}
          options={iranProvinces}
        />
        <FormField name="address" label="Address" />

        <AppButton type="submit" content="Save" variant="primary" />
      </div>
    </Form>
  );
};