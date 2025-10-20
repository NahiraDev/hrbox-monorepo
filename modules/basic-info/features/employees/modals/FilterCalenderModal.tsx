import { AppButton, AppInput, AppModal } from '@core/components';
import { Avatar } from '@heroui/react';
import { useModalContext } from '@root/core';

const FilterCalenderModal = () => {
  const { openModal } = useModalContext();
  return (
<>

    <AppModal.Body>
      <AppInput
        props={{
          className: ' border border-[#DCF0F9]',
          label: 'Educational Institution',
          size: 'lg',
          color: 'primary',
          radius: 'lg',
        }}
      />
      <AppInput
        props={{
          className: ' border border-[#DCF0F9]',
          label: 'Educational Institution',
          size: 'lg',
          color: 'primary',
          radius: 'lg',
        }}
      />
      <AppInput
        props={{
          className: ' border border-[#DCF0F9]',
          label: 'Educational Institution',
          size: 'lg',
          color: 'primary',
          radius: 'lg',
        }}
      />
      <AppInput
      props={{
        className: ' border border-[#DCF0F9]',
        label: 'Educational Institution',
        size: 'lg',
        color: 'primary',
        radius: 'lg',
      }}
    />
    </AppModal.Body>
  <AppModal.Footer>
    <AppButton
      props={{
        size: 'xs',
        radius: 'sm',
        variant: 'light',
        // onPress: () => openModal('delete', undefined),
        content: <span>Cancel</span>,
        className:
          'text-white py-1.5 px-3 text-xl rounded-lg !bg-red-500 hover:text-white transition-all duration-200',
      }}
    />
    <AppButton
      props={{
        size: 'xs',
        radius: 'sm',
        variant: 'light',
        onPress: () => console.log('a'),
        content: <span>Submit</span>,
        className: 'bg-primary text-white py-1.5 px-3 text-xl rounded-lg ',
      }}
    />
  </AppModal.Footer>
      </>
  );
};

export default FilterCalenderModal;
