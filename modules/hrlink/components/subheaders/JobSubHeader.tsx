import { AppButton, AppSearchInput } from '~/UIKit/components';
import { Setting4 } from 'iconsax-reactjs';
import { JobOffersIcon, JobOpportunitiesIcon } from "~/UIKit/icons";

export const JobSubHeader = (props: any) => {

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <AppButton
          props={{
            color: props.name === 'Job Offers' ? 'secondary' : 'default',
            variant: props.name === 'Job Offers' ? 'solid' : 'light',
            size: 'md',
            radius: 'md',
            // onPress: () => navigate(HRLinkPaths.JobOffers),
            content: (
              <>
                <JobOffersIcon color={props.name === 'Job Offers' ? '#fff' : '#1E3363'} />
                <span className={`text-xl ${props.name === 'Job Offers' ? 'text-white' : 'text-secondary-400'}`}>
                  Job Offers
                </span>
              </>
            ),
          }}
        />
        <AppButton
          props={{
            color: props.name === 'Job Opportunities' ? 'secondary' : 'default',
            variant: props.name === 'Job Opportunities' ? 'solid' : 'light',
            size: 'md',
            radius: 'md',
            // onPress: () => navigate(HRLinkPaths.JobOpportunities),
            content: (
              <>
                <JobOpportunitiesIcon color={props.name === 'Job Opportunities' ? '#fff' : '#1E3363'} />
                <span className={`text-xl ${props.name === 'Job Opportunities' ? 'text-white' : 'text-secondary-400'}`}>
                  Job Opportunities
                </span>
              </>
            ),
          }}
        />
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-2">
          <AppSearchInput onSearch={props.onSearch} />
        </div>
        <AppButton
          props={{
            isIconOnly: true,
            color: 'default',
            size: 'xs',
            radius: 'sm',
            content: <Setting4 className="text-secondary-1000" />,
          }}
        />
      </div>
    </div>
  );
};