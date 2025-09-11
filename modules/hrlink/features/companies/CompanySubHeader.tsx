import { AppButton, AppSearchInput } from 'core/components';
import { Buildings, DeviceMessage, Heart, Setting4 } from 'iconsax-react';

const CompanySubHeader = () =>{
  return(
    <div className="flex justify-between">
      <div className="flex gap-2">
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'md',
            // onPress: () => navigate('/company/all-companies'),
            content: (
              <>
                <Buildings className="text-secondary-400" size="22" />
                <span className="text-secondary-400 text-xl font-normal">All Companies</span>
              </>
            ),
          }}
        />
        <AppButton
          props={{
            color: 'secondary',
            size: 'md',
            radius: 'md',
            content: (
              <>
                <DeviceMessage className="text-white" size="22" />
                <span className="text-white text-xl font-normal">Requested</span>
              </>
            ),
          }}
        />
        <AppButton
          props={{
            color: 'secondary',
            size: 'md',
            radius: 'md',
            // onPress: ()=>navigate('/company/favorites'),
            content: (
              <>
                <Heart className="text-secondary-400" size="22" />
                <span className="text-secondary-400 text-xl font-normal">Followed</span>
              </>
            ),
          }}
        />
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-2">
          <AppSearchInput placeholder="Education" onSearch={(query) => console.log(query)} />
        </div>
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'md',
            isIconOnly: true,
            content: <Setting4 className="text-secondary-1000" />,
          }}
        />
      </div>
    </div>
  )
}

export default CompanySubHeader
