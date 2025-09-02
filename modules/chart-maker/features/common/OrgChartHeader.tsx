import { AppButton, AppSearchInput } from 'core/components';
import { ArrowDown2, Edit, Eye, Setting4 } from 'iconsax-react';
import Counter from 'core/components/Counter';
import Maximize from 'core/components/maximize';

export const OrgChartHeader = ({ wrapperRef }: any) => {
  return (
    <div className="flex items-center p-2 border-b bg-white relative z-50">
      <div className="flex items-center gap-2">
        <AppButton
          props={{
            size: 'md',
            color: 'primary',
            variant: 'bordered',
            content: <Edit className="text-secondary-1000" />,
          }}
        />
        <AppButton
          props={{
            size: 'md',
            color: 'primary',
            variant: 'bordered',
            content: <Eye className="text-secondary-1000" />,
          }}
        />
        <AppButton
          props={{
            size: 'md',
            color: 'primary',
            variant: 'bordered',
            content: <ArrowDown2 className="text-secondary-1000" />,
          }}
        />
        <Counter />
        <Maximize targetRef={wrapperRef} />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <AppSearchInput />
        <Setting4 />
      </div>
    </div>
  );
};
