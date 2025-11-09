import * as Yup from 'yup';
import { Form } from '@heroui/react';
import { useFormContext } from '@hrbox/core/providers/FormProvider';
import { AppAutoComplete, AppDatePicker, AppInput } from '@hrbox/uikit/components';

export const initialValuesExperience = {
  Id: null,
  Title: '',
  CompanyName: '',
  DescriptionAndAchievements: '',
  ResionsOfQuit: '',
  SalaryRecieved: null,
  City: null,
  Industry: null,
  OccupationalGroup: null,
  TypeOfCooperation: null,
  YearBegin: null,
  YearEnd: null,
  MonthEnd: null,
  MonthBegin: null,
  DayEnd: null,
  DayBegin: null,
  FileId: null,
};

export const formValidationExperience = Yup.object().shape({
  Title: Yup.string().required(),
  CompanyName: Yup.string().required(),
  DescriptionAndAchievements: Yup.string().required(),
  ResionsOfQuit: Yup.string().required(),
  SalaryRecieved: Yup.string().required(),
  City: Yup.string().required(),
  Industry: Yup.string().required(),
  OccupationalGroup: Yup.string().required(),
  TypeOfCooperation: Yup.string().required(),
  YearBegin: Yup.string().required(),
  YearEnd: Yup.string().required(),
  MonthEnd: Yup.string().required(),
  MonthBegin: Yup.string().required(),
  DayEnd: Yup.string().required(),
  DayBegin: Yup.string().required(),
  FileId: Yup.string().required(),
});

export const handleSubmitExperience = (values: any) => {
  return {
    Title: values.Title,
    CompanyName: values.CompanyName,
    DescriptionAndAchievements: values.DescriptionAndAchievements,
    ResionsOfQuit: values.ResionsOfQuit,
    SalaryRecieved: values.SalaryRecieved,
    City: values.City,
    Industry: values.Industry,
    OccupationalGroup: values.OccupationalGroup,
    TypeOfCooperation: values.TypeOfCooperation,
    YearBegin: values.YearBegin,
    YearEnd: values.YearEnd,
    MonthEnd: values.MonthEnd,
    MonthBegin: values.MonthBegin,
    DayEnd: values.DayEnd,
    DayBegin: values.DayBegin,
    FileId: values.FileId,
  };
};


export const ExperienceForm = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormContext();

  return(
    <Form
      className="w-full flex flex-col gap-6"
      id="add-experience-form"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: 'Title',
              name: 'Title',
              type: 'text',
              onChange: handleChange,
              onBlur: handleBlur,
              error: touched.Title && errors.Title,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: 'Company Name',
              name: 'CompanyName',
              error: errors.CompanyName,
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'IndustryId',
              label: 'Industry',
              displayKey: 'Name',
              valueKey: 'Id',
              error:
                touched.IndustryId &&
                errors.IndustryId,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: 'Salary received',
              error: errors.Salary,
              name: 'Salary',
              type: 'text',
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppDatePicker
            props={{
              label: 'Start Date',
              error: errors.StartDate,
              name: 'StartDate',
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppDatePicker
            props={{
              label: 'End Date',
              error: errors.EndDate,
              name: 'EndDate',
            }}
          />
        </div>
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-1/2 relative z-[9999]">
          <AppAutoComplete
            props={{
              name: 'PlaceId',
              label: 'City',
              displayKey: `Name`,
              valueKey: 'Id',
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppAutoComplete
            props={{
              name: 'JobGroupId',
              label: 'Occupational group',
              displayKey: 'Name',
              valueKey: 'Id',
            }}
          />
        </div>
      </div>
      {/*<div className="flex gap-14 w-full">*/}
      {/*  <div className="flex flex-col gap-1 w-1/2">*/}
      {/*    <AppInput*/}
      {/*      props={{*/}
      {/*        label: 'Descriptions and Achievements',*/}
      {/*        required: true,*/}
      {/*        error: formikCreateExperience.errors.Achievements,*/}
      {/*        name: 'Achievements',*/}
      {/*        type: 'text',*/}
      {/*        value: formikCreateExperience.values.Achievements,*/}
      {/*        formik: formikCreateExperience,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-col gap-1 w-1/2">*/}
      {/*    <AppAutoComplete*/}
      {/*      props={{*/}
      {/*        name: 'TypeOfActivity',*/}
      {/*        label: 'Type of cooperation',*/}
      {/*        placeholder: 'Please Select Type Of Cooperation ...',*/}
      {/*        required: true,*/}
      {/*        value: formikCreateExperience.values.TypeOfActivity,*/}
      {/*        displayKey: 'Name',*/}
      {/*        valueKey: 'Id',*/}
      {/*        formik: formikCreateExperience,*/}
      {/*        error:*/}
      {/*          formikCreateExperience.touched.TypeOfActivity &&*/}
      {/*          formikCreateExperience.errors.TypeOfActivity,*/}
      {/*        data: experienceData.typeOfActivity,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="flex gap-14 w-full">*/}
      {/*  <div className="flex flex-col gap-1 w-full">*/}
      {/*    <AppTextArea*/}
      {/*      props={{*/}
      {/*        label: 'Resoins of Quit',*/}
      {/*        required: true,*/}
      {/*        error: formikCreateExperience.errors.StopCooperatingReason,*/}
      {/*        name: 'StopCooperatingReason',*/}
      {/*        placeholder: 'Please Enter Resins of Quit ...',*/}
      {/*        type: 'text',*/}
      {/*        value: formikCreateExperience.values.StopCooperatingReason,*/}
      {/*        formik: formikCreateExperience,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </Form>
  )
}
