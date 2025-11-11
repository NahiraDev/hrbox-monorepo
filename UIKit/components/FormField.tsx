import React from 'react';
import { AppInput } from './AppInput';
import { useFormContext } from '@hrbox/core/providers/FormProvider';

interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  type?: string;
  helperText?: any;
  component?: React.ComponentType<any>;
  [key: string]: any;
}

export const FormField: React.FC<FormFieldProps> = ({
                                                      name,
                                                      label,
                                                      required,
                                                      type = 'text',
                                                      helperText,
                                                      component: Component,
                                                      ...rest
                                                    }) => {
  const { values, errors, touched, setFieldValue, setFieldTouched, formMode } =
    useFormContext();

  const value = values?.[name] || '';
  const error = touched?.[name] && errors?.[name] ? String(errors[name]) : undefined;

  const handleChange = (e: any) => {
    // Handle both events and direct values
    const newValue = e?.target?.value !== undefined ? e.target.value : e;
    setFieldValue(name, newValue);
  };

  const handleBlur = () => {
    setFieldTouched(name, true);
  };

  if (Component) {
    return (
      <Component
        name={name}
        label={label}
        required={required}
        formMode={formMode}
        value={value}
        selectedKey={value}
        error={error}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={helperText}
        {...rest}
      />
    );
  }

  return (
    <AppInput
      name={name}
      label={label}
      required={required}
      type={type}
      formMode={formMode}
      value={value}
      error={error}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      onBlur={(e) => {
        setFieldTouched(name, true);
      }}
      helperText={helperText}
      {...rest}
    />
  );
};
