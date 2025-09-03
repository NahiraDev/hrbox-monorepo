import { AppButton, AppInput } from 'core/components';
import { ArrowDown2, Edit, Eye, SearchNormal, SearchNormal1, User } from 'iconsax-react';
import Counter from 'core/components/Counter';
import Maximize from 'core/components/maximize';
import DepartmentSelect from 'core/components/AppDepartment';

export const OrgChartHeader = ({ wrapperRef }: any) => {
  return (
    <div>
      <div className="flex items-center p-2 border-b bg-white relative z-50 w-full justify-between gap- ">
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
              variant: 'solid',
              content: <Eye className="text-secondary-1000 " />,
            }}
          />
        </div>
        <div className="flex items-center gap-[50px] ">
          <div className="flex items-center gap-2">
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
          <div className=" flex items-center gap-1.5">
            <AppInput
              props={{
                color: 'primary',
                variant: 'bordered',
                startContent: <SearchNormal1 />,
              }}
            />
            <DepartmentSelect />
            <AppButton
              props={{
                size: 'md',
                color: 'primary',
                variant: 'bordered',
                content: <User className="text-secondary-1000" />,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
