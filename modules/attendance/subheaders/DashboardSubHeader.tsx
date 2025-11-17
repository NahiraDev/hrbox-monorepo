import { AppButton } from '@hrbox/uikit/components';
import { Add, Chart, SearchNormal, Setting4 } from 'iconsax-reactjs';

const DashboardSubHeader = () => {
  return (
    <>
      <div className="flex flex-row-reverse justify-between ">
        <div className="flex flex-row-reverse gap-2">
          <AppButton
              color= 'white'
              size='md'
              radius= 'sm'
              content= 'Add new One'
              className='border-1 border-primary'
              startContent= {<Add/>}
          />
          <AppButton
              color= 'white'
              radius= 'sm'
              size= 'md'
              className= 'border-1 border-primary'
              content= {<Setting4 />}
          />
          <AppButton
              color= 'white'
              size= 'md'
              radius= 'sm'
              className= 'border-1 border-primary'
              content= {<SearchNormal />}
          />
        </div>
        <div className="flex">
          <AppButton
              color= ''
              size= 'md'
              radius= 'sm'
              content= 'Dashboard'
              className= 'text-white bg-primary-panel '
              startContent= {<Chart />}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardSubHeader;
