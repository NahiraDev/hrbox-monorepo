import { AppButton } from 'core/components';
import { Buildings, Heart, Medal } from 'iconsax-react';
import { JobOffersIcon } from '@module/hrlink/icons';
import { Shared } from '@module/hrlink/features/common';
import { useNavigate } from 'react-router-dom';
import { HRLinkPaths } from '@module/hrlink/app/paths';

const CompanyInformationSubHeader = () =>{
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <AppButton
          props={{
            color: 'secondary',
            size: 'md',
            radius: 'md',
            onPress: () => navigate(HRLinkPaths.CompanyInformation),
            content: (
              <>
                <Buildings className="text-white" size="22" />
                <span className="text-white text-xl font-normal">General Info</span>
              </>
            ),
          }}
        />
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'md',
            onPress: () => navigate(HRLinkPaths.CompanyJobOffers),
            content: (
              <>
                <JobOffersIcon color="#fff" />
                <span className="text-secondary-400 text-xl font-normal">Offers</span>
              </>
            ),
          }}
        />
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'md',
            onPress: () => navigate(HRLinkPaths.Events),
            content: (
              <>
                <Medal className="text-secondary-400" size="22" />
                <span className="text-secondary-400 text-xl font-normal">Events</span>
              </>
            ),
          }}
        />
      </div>
      <div className="flex gap-3">
        <Shared />
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'md',
            content: <span className="text-secondary-1000 text-xl">Complete the job form</span>,
          }}
        />
        <AppButton
          props={{
            color: 'secondary',
            size: 'md',
            radius: 'md',
            content: (
              <>
                <Heart className="text-white" size="22" />
                <span className="text-white text-xl">Favorites</span>
              </>
            ),
          }}
        />
      </div>
    </div>
  )
}

export default CompanyInformationSubHeader
