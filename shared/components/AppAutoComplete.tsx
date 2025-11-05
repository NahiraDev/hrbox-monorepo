import type { Key } from 'react';

import { Autocomplete, AutocompleteItem } from '@heroui/react';

const getValueByPath = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
};

export const AppAutoComplete = ({ props }: { props: any }) => {
  const {
    name,
    label,
    required = false,
    data = [],
    displayKey = 'Name',
    valueKey = 'Id',
    formik,
    error,
  } = props;

  const labelId = `${name}-label`;
  const selectedValue = formik?.values?.[name];
  const selectedItem = data.find((item: any) => String(item[valueKey]) === String(selectedValue));
  const selectedKey = selectedItem ? String(selectedItem[valueKey]) : null;

  const handleSelectionChange = (key: Key | null) => {
    if (!formik || typeof formik.setFieldValue !== 'function') return;
    formik.setFieldValue(name, key ?? '');
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-secondary-1000 text-sm font-semibold leading-5" id={labelId}>
          {label} {required && '*'}
        </label>
      )}

      <Autocomplete
        aria-labelledby={label ? labelId : undefined}
        className="custom-autocomplete"
        selectedKey={selectedKey}
        variant="flat"
        onSelectionChange={handleSelectionChange}
      >
        {data.map((option: any) => {
          const key = option[valueKey];
          const displayLabel = getValueByPath(option, displayKey) || '';

          return <AutocompleteItem key={key}>{displayLabel}</AutocompleteItem>;
        })}
      </Autocomplete>

      {error && <span className="text-xs text-danger-500 mt-1">{error}</span>}
    </div>
  );
};
