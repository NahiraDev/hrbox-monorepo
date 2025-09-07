import * as Yup from 'yup';

export const initialValuesSpouse = {
  FirstName: null,
  LastName: null,
  NationalID: null,
  Education: null,
  Mobile: null,
  DateOfBirth: null,
  Descriptions: null,
};

export const formValidationSpouse = Yup.object().shape({
  FirstName: Yup.string().required(),
  LastName: Yup.string().required(),
  NationalID: Yup.string().required(),
  Education: Yup.string().required(),
  Mobile: Yup.number().required(),
  DateOfBirth: Yup.number().required(),
  Descriptions: Yup.string().required(),


});

export const handleSubmitSpouse = (values: any) => {
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
