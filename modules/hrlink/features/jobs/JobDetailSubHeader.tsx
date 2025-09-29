import { AppButton } from '@core/components';
import { ArrowLeft2, Heart } from 'iconsax-react';
import { JobOffersIcon } from '@module/hrlink/icons';
import { Shared } from '@module/hrlink/features/common';

const JobDetailSubHeader = () =>{
  return(
    <div className="flex justify-between">
      <div className="flex items-center">
        <AppButton
          props={{
            isIconOnly: true,
            color: 'default',
            variant: 'light',
            size: 'xs',
            radius: 'sm',
            onPress: () => history.back(),
            content: <ArrowLeft2 size="24" />,
          }}
        />
        <div className="flex items-center gap-2 rounded-md px-3 py-1.5 w-fit bg-secondary-400">
          <JobOffersIcon color="#fff" />
          <span className="text-white text-xl">Accounting expert (Offered)</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Shared/>
        <AppButton
          props={{
            color: 'default',
            size: 'md',
            radius: 'sm',
            startContent: <Heart size="22" />,
            content: 'Follow',
          }}
        />
      </div>
    </div>
  )
}

export default JobDetailSubHeader;
