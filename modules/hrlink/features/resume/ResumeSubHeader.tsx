import { AppButton, AppSearchInput } from 'core/components';
import { Add, ArrowLeft2, ArrowRight2, ReceiveSquare } from 'iconsax-react';

const ResumeSubHeader = (props:any) => {

  return(
    <div className="flex justify-between">
      <div className="flex items-center gap-2 rounded-md bg-secondary-400 shdow-theme-sm px-3 py-1.5 w-fit">
        {props.icon && <props.icon color="#fff" />}
        <span className="text-white text-xl font-normal">{props.name}</span>
      </div>
      <div className="flex gap-2">
        <AppButton
          props={{
            isIconOnly: true,
            color: 'default',
            size: 'xs',
            radius: 'sm',
            // onPress: () => navigate('/resume/hard-skills'),
            content: <ArrowLeft2 className="text-secondary-1000" size="24" />,
          }}
        />
        <AppButton
          props={{
            isIconOnly: true,
            color: 'default',
            size: 'xs',
            radius: 'sm',
            // onPress: () => navigate('/resume/courses'),
            content: <ArrowRight2 className="text-secondary-1000" size="24" />,
          }}
        />
        <AppSearchInput onSearch={props.onSearch} />
        <AppButton
          props={{
            color: 'default',
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
            color: 'default',
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
