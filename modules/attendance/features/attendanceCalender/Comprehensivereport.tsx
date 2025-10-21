import { AppInput } from '@core/components';
import "../../app/index.css";
import { InfoCircle } from 'iconsax-react';
import { useState } from 'react';
import { Tooltip } from '@heroui/react';
const Comprehensivereport = () => {
    const [hoveredInput,setHoveredInput]=useState(null);
  const inputs = [
    'Total Daily Working Hours',
    'Shift overtime',
    'Work on a holiday',
    'Remaining leave until today',
    'Total hourly attendance hours',
    'Approved overtime',
    'Working on a confirmed holiday',
    'Remaining leave this month',
    'Fingerprint attendance',
    'Unapproved overtime',
    'Working on a holiday is not approved',
    'Daily leave used',
    'Attendance and absence system (IP/GPS)',
    'Work on Friday',
    'absence',
    'Hourly leave used',
    'Manual human resources attendance',
    'Work confirmed on Friday',
    'Lack of working hours',
    'Daily mission/task',
    'Number of attendance deficiencies',
    'Work not confirmed on Friday',
    'Delay in arrival',
    'Hourly mission/task',
    'Night shift work',
    'Hourly mission',
    'Night overtime',
    'Approved night overtime (closed)',
    'Unapproved night overtime (closed)',
    'Approved night overtime (Friday)',
    'Unconfirmed night overtime (Friday)'
  ];
  return (
    <>
      <div className='border-primary flex h-full w-[20%] flex-col items-center rounded-xl border-1 bg-surface-50 p-3 font-sans'>
        <div className='w-full justify-start'>
          <h1 className='text-base font-semibold'>Comprehensive report</h1>
        </div>
        <div className='custom-scroll overflow-y-scroll'>
          <div className='p- mt-[14px] mr-2.5 flex flex-col justify-center gap-4'>
            {inputs.map((label, index) => (
              <div key={index} className="relative">
                <AppInput
                props={{
                  label: label,
                  size: 'sm',
                  className:
                    'bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)] placeholder:text-red-400 placeholder:text-sm',
                  endContent: (
                    <Tooltip content={
                      <div className='flex w-[200px] z-999 absolute flex-col gap-2 rounded-lg border border-orange-400 bg-white p-2'>
                        <div className='flex w-full flex-row gap-1'>
              <span>
              <InfoCircle color='#FD8F02' />
              </span>
                          <p className='text-xs font-semibold'>
                            Total Number of All Attendance Days This Month
                          </p>
                        </div>
                        <div>
                          <p className='text-secondary-1000 !text-sm !font-medium'>
                            <span className='!text-sm !font-normal text-orange-400'>Note1: </span>
                            Days without shifts are not included in this list.
                            <span className='!text-sm !font-normal text-orange-400'>Note2: </span>
                            Monthly working hours refer to the total of attendance days + official holidays +
                            Fridays + leaves + daily missions.
                          </p>
                        </div>
                      </div>
                    } placement="left-end">
                       <span>
                      <InfoCircle color='#FD8F02' />
                    </span>
                    </Tooltip>
                  ),
                }}
              />
            {/*{hoveredInput === index && (*/}
            {/*  <div className='flex w-[200px] z-999 absolute flex-col gap-2 rounded-lg border border-orange-400 bg-white p-2'>*/}
            {/*  <div className='flex w-full flex-row gap-1'>*/}
            {/*  <span>*/}
            {/*  <InfoCircle color='#FD8F02' />*/}
            {/*  </span>*/}
            {/*  <p className='text-xs font-semibold'>*/}
            {/*  Total Number of All Attendance Days This Month*/}
            {/*  </p>*/}
            {/*  </div>*/}
            {/*  <div>*/}
            {/*  <p className='text-secondary-1000 !text-sm !font-medium'>*/}
            {/*  <span className='!text-sm !font-normal text-orange-400'>Note1: </span>*/}
            {/*  Days without shifts are not included in this list.*/}
            {/*  <span className='!text-sm !font-normal text-orange-400'>Note2: </span>*/}
            {/*  Monthly working hours refer to the total of attendance days + official holidays +*/}
            {/*  Fridays + leaves + daily missions.*/}
            {/*  </p>*/}
            {/*  </div>*/}
            {/*  </div>*/}
            {/*  )}*/}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comprehensivereport;
