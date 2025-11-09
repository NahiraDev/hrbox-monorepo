import { AppAutoComplete, AppInput } from '~/UIKit/components';
import { SearchNormal1 } from 'iconsax-react';
import { useFormContext } from '@core/providers/FormProvider';
import { useState } from 'react';
import { Form, Slider } from "@heroui/react";
import { useAppSelector } from "@core/redux/hooks";

export const JobFilterForm = () => {
  const [salaryValue, setSalaryValue] = useState<any>([100, 300]);
  const { values, errors, touched, handleSubmit } =
    useFormContext();
  const lang = useAppSelector((state:any) => state.language);
  return (
    <Form className='w-full flex flex-col gap-6' onSubmit={handleSubmit}>
      <div className='w-full'>
        <AppInput
          props={{
            label: 'Describe text',
            required: true,
            startContent: <SearchNormal1 />,
            error: errors.search_sth,
            name: 'Search Sth',
            type: 'text',
          }}
        />
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <AppAutoComplete
          props={{
            name: 'firstname',
            label: 'Location',
            displayKey: `label.${lang}`,
            error: touched.search_sth && errors.search_sth,
            data: [],
          }}
        />
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <AppAutoComplete
          props={{
            name: 'firstname',
            label: 'Job Category',
            displayKey: `label.${lang}`,
            error: touched.search_sth && errors.search_sth,
            data: [],
          }}
        />
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <AppAutoComplete
          props={{
            name: 'firstname',
            label: 'Sort by',
            required: true,
            displayKey: `label.${lang}`,
            error: touched.search_sth && errors.search_sth,
            data: [],
          }}
        />
      </div>
      <div className='flex flex-col gap-3 w-full'>
        <span className='text-secondary-1000 text-sm font-inter leading-5 font-medium'>
          Set the salary
        </span>
        <div className='flex flex-col gap-2 w-full h-full max-w-md items-start justify-center'>
          <Slider
            className='max-w-md'
            classNames={{
              filler: '!bg-secondary-400',
              thumb:
                '!bg-secondary-400 after:bg-primary-400 !w-4 !h-4 after:!w-3 after:!h-3',
              track: '!h-1',
            }}
            formatOptions={{
              style: 'currency',
              currency: 'IRR',
            }}
            label=' '
            maxValue={30000000}
            minValue={18000000}
            step={10}
            value={salaryValue}
            onChange={val => {
              if (Array.isArray(val)) {
                setSalaryValue(val);
              }
            }}
          />
          <p className='text-default-500 font-medium text-small'>
            {Array.isArray(salaryValue) &&
              salaryValue.map(b => `${b}`).join(' – ')}
          </p>
        </div>
      </div>
    </Form>
  );
};
