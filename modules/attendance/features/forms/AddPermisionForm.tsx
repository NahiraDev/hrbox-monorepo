import { Form } from '@heroui/react';
import { AppAutoComplete, AppInput } from '@core/components';

const AddPermisionForm = () => {
  return (
    <>
      <Form className="gap-6">
        <div className="flex flex-row !w-full gap-x-9 justify-between ">
          <div className="w-full">
            <AppInput
              props={{
                type: 'text',
                label: 'From Time',
                name: 'title',
                size: 'md',
                variant:"bordered",
                className: '!w-[100%] !rounded-xl !border !border-[#DCF0F9]',
                labelClassName:'!text-sm !font-semibold font-inter ',
                placeHolderClass:'!text-sm !font-semibold !text-[#999]',
              }}
            />
          </div>
          <div className="w-full">
            <AppInput
              props={{
                type: 'text',
                label: 'To Time',
                variant:"bordered",
                name: 'title',
                className: 'w-full !rounded-xl !border !border-[#DCF0F9]',
                labelClassName:'!text-sm !font-semibold font-inter ',
                placeHolderClass:'!text-sm !font-semibold !text-[#999]',
              }}
            />
          </div>
        </div>{' '}
        <div className="flex flex-row w-full justify-between gap-x-9 ">
          <div className='w-[48%]'>
            <AppAutoComplete
              props={{
                type: 'text',
                label: 'Choose Type',
                name: 'title',
                size: 'md',
                variant:"bordered",
                className: '!w-ful ',
              }}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default AddPermisionForm;
