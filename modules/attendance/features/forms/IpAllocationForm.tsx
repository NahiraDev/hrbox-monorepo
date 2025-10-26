import { Form } from '@heroui/react';
import { Radio, RadioGroup } from '@heroui/radio';


const IpAllocationForm=()=>{
  return(
    <>
      <Form>
        <div className="flex flex-row justify-between w-full">
            <RadioGroup classNames={{base:'w-full flex justify-between',wrapper:'w-full flex justify-between'}} orientation='horizontal'>
              <Radio value="Person" classNames={{wrapper:'border-2 border-primary'}} >Person</Radio>
              <Radio value="Group" classNames={{wrapper:'border-2 border-primary'}}>Group</Radio>
              <Radio value="Job Title" classNames={{wrapper:'border-2 border-primary'}}>Job Title</Radio>
            </RadioGroup>
        </div>
      </Form>
    </>
  )
}
export default IpAllocationForm
