import { AppButton, AppSearchInput } from '@core/components';
import { Buildings, DeviceMessage, Heart, Setting4 } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';

import { HRLinkPaths } from '@module/hrlink/app/paths';

const CompanySubHeader = (props: any) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'md',
            onPress: () => navigate(HRLinkPaths.AllCompanies),
            content: (
              <>
                <Buildings className="text-secondary-400" size="22" />
                <span className="text-secondary-400 text-xl">All Companies</span>
              </>
            ),
          }}
        />
        <AppButton
          props={{
            color: 'secondary',
            size: 'md',
            radius: 'md',
            onPress: () => navigate(HRLinkPaths.CompanyRequested),
            content: (
              <>
                <DeviceMessage className="text-white" size="22" />
                <span className="text-white text-xl">Requested</span>
              </>
            ),
          }}
        />
        <AppButton
          props={{
            color: 'secondary',
            size: 'md',
            radius: 'md',
            onPress: () => navigate(HRLinkPaths.CompanyFavorites),
            content: (
              <>
                <Heart className="text-secondary-400" size="22" />
                <span className="text-secondary-400 text-xl">Followed</span>
              </>
            ),
          }}
        />
      </div>
      <div className="flex gap-3">
        <AppSearchInput onSearch={props.onSearch} />
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
  );
};

export default CompanySubHeader;
