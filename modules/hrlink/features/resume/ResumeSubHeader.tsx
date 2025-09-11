import { CupStarIcon } from '../../icons';
import { AppButton, AppSearchInput } from 'core/components';
import { Add, ArrowLeft2, ArrowRight2, ReceiveSquare } from 'iconsax-react';

const ResumeSubHeader = () => {
  return(
    <div className="flex justify-between">
      <div className="flex">
        <div className="flex items-center gap-2 rounded-md bg-secondary-400 shdow-theme-sm px-3 py-1.5 w-fit">
          <CupStarIcon color="#fff" />
          <span className="text-white text-xl font-normal">Achievements and accolades</span>
        </div>
      </div>
      <div className="flex gap-2">
        <AppButton
          props={{
            isIconOnly: true,
            color: 'white',
            size: 'md',
            radius: 'sm',
            // onPress: () => navigate('/resume/hard-skills'),
            content: <ArrowLeft2 className="text-secondary-1000" size="24" />,
          }}
        />
        <AppButton
          props={{
            isIconOnly: true,
            color: 'white',
            size: 'md',
            radius: 'sm',
            // onPress: () => navigate('/resume/courses'),
            content: <ArrowRight2 className="text-secondary-1000" size="24" />,
          }}
        />
        <AppSearchInput placeholder="Education" onSearch={()=> console.log('search')} />
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'sm',
            content: (
              <>
                <Add className="text-secondary-1000" size="16" />
                <span className="text-secondary-1000 font-semibold text-base">Add New One</span>
              </>
            ),
          }}
        />
        <AppButton
          props={{
            color: 'white',
            size: 'md',
            radius: 'sm',
            content: (
              <>
                <ReceiveSquare className="text-secondary-1000" size="16" />
                <span className="text-secondary-1000 font-semibold text-base">Download Resume</span>
              </>
            ),
          }}
        />
      </div>
    </div>
  )
}

export default ResumeSubHeader;
