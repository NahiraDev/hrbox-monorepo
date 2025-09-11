import { AppButton, AppSearchInput } from 'core/components';
import { JobOffersIcon, JobOpportunitiesIcon } from '../../icons';
import { Setting4 } from 'iconsax-react';

const JobSubHeader = () =>{
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'sm',
            content: (
              <>
                <JobOffersIcon color="#fff" />
                <span className="text-white text-xl font-normal">Job Recommendations</span>
              </>
            ),
          }}
        />
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'sm',
            // onPress: () => navigate('/job/oppertunities'),
            content: (
              <>
                <JobOpportunitiesIcon color="#fff" />
                <span className="text-secondary-400 dark:text-white text-xl font-normal">Job Opportunities</span>
              </>
            ),
          }}
        />
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-2">
          <AppSearchInput placeholder="Education" onSearch={()=>console.log('')} />
        </div>
        <AppButton
          props={{
            isIconOnly: true,
            color: 'white',
            size: 'md',
            radius: 'sm',
            content: <Setting4 className="text-secondary-1000" />,
          }}
        />
      </div>
    </div>
  )
}

export default JobSubHeader;
