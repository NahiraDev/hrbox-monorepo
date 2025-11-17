import { AppButton } from '@hrbox-monorepo/UIKit/components';
import { ArrowLeft } from 'iconsax-reactjs';

const TechnicalDepartmentsSubHeader = (props: any) => {
  return (
    <div>
      <AppButton
        props={{
          content: <ArrowLeft color="#292D32" size={24} />,
        }}
      />
      <div className="flex items-center gap-2 rounded-md bg-primary-panel shdow-theme-sm px-3 py-1.5 w-fit">
        {props.icon && <props.icon color="#fff" />}
        <span className="text-white text-xl font-normal">{props.name}</span>
      </div>
    </div>
  );
};

export default TechnicalDepartmentsSubHeader;
