import { Form } from '@heroui/react';
import { Radio, RadioGroup } from '@heroui/radio';
import { AppAutoComplete, AppTextArea } from '@root/core';
import { BoxTime, Timer, TimerStart, TruckFast, TruckTime } from 'iconsax-react';

const ShiftAllocationEdit=()=>{
  return(
    <>
      <Form>
        <div className="flex flex-col w-full gap-7">
          <RadioGroup classNames={{base:'w-full flex justify-between',wrapper:'w-full flex justify-between'}} defaultValue='Person' orientation='horizontal'>
            <Radio value="Person" classNames={{wrapper:'border-2 border-primary'}} >Person</Radio>
            <Radio value="Group" classNames={{wrapper:'border-2 border-primary'}}>Group</Radio>
            <Radio value="Job Title" classNames={{wrapper:'border-2 border-primary'}}>Job Title</Radio>
          </RadioGroup>
          <div className='flex flex-row justify-between'>
            <AppAutoComplete props={{
              label:'Choose Shift',
            }}/>
            <AppAutoComplete props={{
              label:'From Date',
            }}/>
          </div>
          <div className='flex flex-row justify-between'>
            <AppAutoComplete props={{
              label:'Organization',
            }}/>
            <AppAutoComplete props={{
              label:'Department',
            }}/>
          </div>
          <div className='flex flex-row justify-between'>
            <AppAutoComplete props={{
              label:'Employee',
            }}/>
          </div>
          <div className="w-full">
            <AppTextArea props={{
              label:'Descriptions',
              className:'border border-[#DEE1E8]',
            }}/>
          </div>
        </div>
        <TimerStart color='gray' size={90} className='absolute bottom-2 left-0'/>
      </Form>
    </>
  );
}
export default ShiftAllocationEdit;
