import { Building, TickSquare } from 'iconsax-reactjs';
import { specificInformation } from '@module/basic-info/app/mock';

import { BasicInfoLayout } from '@hrbox/modules/basic-info/components';

const SpecificInformation = () => {
  return (
    <BasicInfoLayout
      content={
        <div className="p-4">
          <div className="flex items-center gap-1 text-xl text-[#080E1C] font-semibold">
            <Building size="26" />
            <span>Organization-Specific Information</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4">
            {specificInformation.map((user, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-white via-sky-100 to-white w-full border-1 border-[#DDEEFA] flex items-center justify-between p-4 rounded-2xl"
              >
                <div className="flex items-center gap-1 font-light ">
                  <TickSquare size='16'/>
                  <span>Do you have any food allergies?</span>
                </div>
                <div className='font-semibold'>
                  <span>{user.answer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default SpecificInformation;
