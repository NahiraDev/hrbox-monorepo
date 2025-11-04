import { AppAutoComplete, AppButton, AppInput, AppModal } from '@core/components';
import { Autocomplete, Avatar } from '@heroui/react';
import { useModalContext } from '@root/core';

const FilterCalenderModal = () => {
  const { openModal } = useModalContext();
  return (
<>

    <AppModal.Body>
      <div className="flex flex-col gap-6">
      <AppAutoComplete
        props={{
          className: ' border border-[#DCF0F9]',
          label: 'Select Unit',
          size: 'lg',
          color: 'primary',
          radius: 'lg',
        }}
      />
      <AppInput
        props={{
          className: ' border border-[#DCF0F9]',
          label: 'Search by Name or Position',
          value:"Name or Position",
          size: 'lg',
          color: 'primary',
          radius: 'lg',
        }}
      />
      <AppInput
        props={{
          className: ' border border-[#DCF0F9]',
          label: ' Personnel Code',
          size: 'lg',
          value:" Personnel Code",
          color: 'primary',
          radius: 'lg',
        }}
      />
      <AppInput
      props={{
        className: ' border border-[#DCF0F9]',
        label: 'National Code',
        size: 'lg',
        value:"National Code",
        color: 'primary',
        radius: 'lg',
      }}
    />
      </div>
    </AppModal.Body>
  <AppModal.Footer>
      <AppButton
        props={{
          radius: 'sm',
          variant: 'light',
          // onPress: () => openModal('delete', undefined),
          content: <span>Cancel</span>,
          className:
            'py-2 px-4 !text-lg rounded-lg text-secondary-800 !font-medium hover:!bg-red-500 hover:text-white transition-all duration-200',
        }}
      />
      <AppButton
        props={{
          size: 'xs',
          radius: 'sm',
          variant: 'light',
          onPress: () => console.log('a'),
          content: <span>Submit</span>,
          className: 'bg-primary text-white py-2 px-4  !text-xl rounded-lg ',
        }}
      />
  </AppModal.Footer>
      </>
  );
};

export default FilterCalenderModal;
