import * as Yup from 'yup';
import { Form } from '@heroui/react';
import { useLazyEducationGetFieldsQuery, useLazyFetchCityQuery } from '@module/hrlink/features/common';
import { useLazyFetchUniversityQuery } from '@module/hrlink/features/resume/apis';
import { useEffect } from 'react';

import { AppAutoComplete, AppDatePicker, AppInput, useFormContext } from '../../../../../core';
import { Degree, FieldOfStudyType } from '../../../../../mock';

export const initialValuesEducation = {
  UniversityId: null,
  FieldOfStudy: null,
  thesisTitle: '',
  Degree: null,
  PlaceOfStudy: null,
  Gpa: null,
  UniversityType: null,
  StartDate: null,
  EndDate: null,
};

export const formValidationEducation = Yup.object().shape({
  UniversityId: Yup.string().required(),
  FieldOfStudy: Yup.string().required(),
  thesisTitle: Yup.string().required(),
  Degree: Yup.string().required(),
  PlaceOfStudy: Yup.string().required(),
  Gpa: Yup.string().required(),
  UniversityType: Yup.string().required(),
  StartDate: Yup.string().required(),
  EndDate: Yup.string().required(),
});

export const handleSubmitEducation = (values: any) => {
  return {
    UniversityId: values.UniversityId,
    FieldOfStudy: values.FieldOfStudy,
    thesisTitle: values.thesisTitle,
    Degree: values.thesisTitle,
    PlaceOfStudy: values.thesisTitle,
    Gpa: values.thesisTitle,
    UniversityType: values.thesisTitle,
    StartDate: values.thesisTitle,
    EndDate: values.thesisTitle,
  };
};

export const EducationForm = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormContext();
  const [fetchCity, { isLoading: cityIsLoading, data: cityData }] = useLazyFetchCityQuery();
  const [educationGetField, { isLoading: educationGetFieldIsLoading, data: educationGetFieldData }] =
    useLazyEducationGetFieldsQuery();
  const [fetchUniversity, { isLoading: universityIsLoading, data: universityData }] = useLazyFetchUniversityQuery();

  useEffect(() => {
    fetchCity({});
    educationGetField({});
    fetchUniversity({});
  }, []);

  return (
    <Form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              name: 'Gpa',
              label: 'GPA',
              error: touched.Gpa && errors.Gpa,
              value: values.Gpa,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: 'Thesis title',
              name: 'thesisTitle',
              error: touched.thesisTitle && errors.thesisTitle,
              value: values.thesisTitle,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'Grade',
              label: 'Degree',
              value: values.Degree,
              error: touched.Degree && errors.Degree,
              onChange: handleChange,
              onBlur: handleBlur,
              displayKey: 'name',
              data: Degree,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'UniversityType',
              label: 'University Type',
              displayKey: 'name',
              value: values.UniversityType,
              onChange: handleChange,
              onBlur: handleBlur,
              error: touched.UniversityType && errors.UniversityType,
              data: FieldOfStudyType,
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'FieldOfStudy',
              label: 'Field Of Study',
              displayKey: 'Name',
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.FieldOfStudy,
              error: touched.FieldOfStudy && errors.FieldOfStudy,
              data: !universityIsLoading && universityData,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'UniversityId',
              label: 'Place of Study',
              displayKey: 'Name',
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.UniversityId,
              error: touched.UniversityId && errors.UniversityId,
              data: !educationGetFieldIsLoading && educationGetFieldData,
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'City',
              label: 'City',
              displayKey: 'Name',
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.City,
              error: touched.City && errors.City,
              data: !cityIsLoading && cityData,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2" />
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppDatePicker
            props={{
              label: 'Start Date',
              name: 'StartDate',
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.StartDate,
              error: touched.StartDate && errors.StartDate,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppDatePicker
            props={{
              label: 'End Date',
              name: 'EndDate',
              onChange: handleChange,
              onBlur: handleBlur,
              value: values.EndDate,
              error: touched.EndDate && errors.EndDate,
            }}
          />
        </div>
      </div>
    </Form>
  );
};
