import { AppButton, AppInput } from '@core/components';
import "../../app/index.css";
import { ArrowLeft2, ArrowRight2, InfoCircle } from 'iconsax-react';
import { Tooltip } from '@heroui/react';
import { isExpanded } from 'bpmn-js/lib/util/DiUtil';
const Comprehensivereport = ({ isExpanded  ,onToggle }) => {
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
    'Unconfirmed night overtime (Friday)',
    'Unconfirmed night overtime (Friday)',
  ];
  return (
    <>
      <div
        className={`bg-surface-50 flex h-full flex-col items-center rounded-xl p-3 font-sans ${isExpanded ? 'w-full' : 'border-primary w-[20%] border-1'} `}
      >
        <div className='flex w-full justify-start border-b border-neutral-100'>
          <p className='mb-1 !text-lg !font-bold !font-open-sans'>Comprehensive report</p>
          <AppButton
            props={{
              content: isExpanded ? <ArrowLeft2 size={14} /> : <ArrowRight2 size={14} />,
              size: 'xs',
              className:
                'flex items-center justify-center w-[24px] h-[28.381px] absolute right-13 top-63 shadow-sm ',
              isIconOnly: true,
              radius: 'full',
              onPress: onToggle,
            }}
          />
        </div>
        <div className='custom-scroll overflow-y-scroll pr-1 w-full'>
          <div
            className={
              isExpanded
                ? 'flex flex-wrap justify-between gap-x-14 gap-y-5 pt-4.5'
                : 'mt-[14px] mr-2.5 flex flex-col justify-center gap-4'
            }
          >
            {inputs.map((label, index) => (
              <div key={index} className={`relative ${isExpanded ? 'w-[20%]' : 'w-full'}`}>
                <AppInput
                  props={{
                    label: label,
                    size: 'lg',
                    radius:'lg',
                    placeHolderClass:'!text-xs !font-open-sans !text-secondary-400',
                    className:
                      'bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)] ',
                    labelClassName:'!text-xs !font-bold',
                    endContent: (
                      <Tooltip
                        classNames={{base:"z-999 flex w-[200px] flex-col gap-2 rounded-lg",content:"border border-orange-400"}}
                        content={
                          <div className='gap-2 p-2 rounded-lg'>
                            <div className='flex w-full flex-row gap-1'>
                              <span>
                                <InfoCircle color='#FD8F02' size={16} />
                              </span>
                              <p className='text-xs font-bold'>
                                Total Number of All Attendance Days This Month
                              </p>
                            </div>
                            <div>
                              <p className='text-secondary-1000 !text-sm'>
                                <span className='!text-xs !font-bold text-orange-400'>
                                  Note1:{' '}
                                </span>
                                Days without shifts are not included in this list.
                                <span className='!text-xs !font-bold text-orange-400'>
                                  Note2:{' '}
                                </span>
                                Monthly working hours refer to the total of attendance days +
                                official holidays + Fridays + leaves + daily missions.
                              </p>
                            </div>
                          </div>
                        }
                        placement={'bottom-end'}
                        offset={10}
                      >
                        <span className='cursor-pointer'>
                          <InfoCircle color='#FD8F02' size={18} />
                        </span>
                      </Tooltip>
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comprehensivereport;
