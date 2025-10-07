import { AppInput } from '@core/components';
import "../../app/index.css";
import { InfoCircle } from 'iconsax-react';
const Comprehensivereport = () => {
  return (
    <>
      <div className="flex w-[15%] flex-col items-center h-full bg-[#DDEEFA] rounded-xl border-1 border-primary p-3 ">
        <div className="w-full justify-start">
          <h1 className="text-base font-semibold ">Comprehensive report</h1>
        </div>
        <div className="overflow-y-scroll custom-scroll ">
        <div className="flex flex-col justify-center gap-4 p- mt-[14px] mr-2.5 ">
          <AppInput
            props={{
              label: 'Total Daily Working Hours',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)] placeholder:text-red-400 placeholder:text-sm",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />{' '}
          <AppInput
            props={{
              size: 'sm',
              label: 'Shift overtime',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />{' '}
          <AppInput
            props={{
              label: 'Work on a holiday',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />{' '}
          <AppInput
            props={{
              label: 'Remaining leave until today',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />{' '}
          <AppInput
            props={{
              label:'Total hourly attendance hours',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />{' '}
          <AppInput
            props={{
              label: 'Approved overtime',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />{' '}
          <AppInput
            props={{
              label: 'Working on a confirmed holiday\n',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />{' '}
          <AppInput
            props={{
              label: 'Remaining leave this month\n',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />{' '}
          <AppInput
            props={{
              label: 'Fingerprint attendance',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />{' '}
          <AppInput
            props={{
              label: 'Unapproved overtime',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />
          <AppInput
            props={{
              label: 'Working on a holiday is not approved',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />
          <AppInput
            props={{
              label: 'Daily leave used',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />
          <AppInput
            props={{
              label: 'Attendance and absence system (IP/GPS)',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />   <AppInput
            props={{
              label: 'Work on Friday',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />   <AppInput
            props={{
              label: 'absence',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />   <AppInput
            props={{
              label: 'Hourly leave used',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />   <AppInput
            props={{
              label: 'Total hourly attendance hours',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />   <AppInput
            props={{
              label: 'Approved overtime',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />   <AppInput
            props={{
              label: 'Working on a confirmed holiday',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />   <AppInput
            props={{
              label: 'Remaining leave this month',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label: 'Manual human resources attendance',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label: 'Work confirmed on Friday',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label: 'Lack of working hours',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label: 'Daily mission/task',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label: 'Number of attendance deficiencies',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label: 'Work not confirmed on Friday',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label:'Delay in arrival',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label: 'Hourly mission/task',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label: 'Night shift work',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label:'Hourly mission',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label: 'Night overtime',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label:'Approved night overtime (closed)',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label:'Unapproved night overtime (closed)',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label:'Approved night overtime (Friday)',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          /><AppInput
            props={{
              label:'Unconfirmed night overtime (Friday)',
              size: 'sm',
              className:"bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)]",
              endContent:<span>
                <InfoCircle color="#FD8F02"/>
              </span>,
            }}
          />
        </div>
        </div>
      </div>
    </>
  );
};

export default Comprehensivereport;
