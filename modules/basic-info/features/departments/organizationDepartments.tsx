import { User } from 'iconsax-react';
import { organizationDepartment } from 'mock';
import { Avatar } from '@heroui/react';
import { useTranslation } from 'react-i18next';

import { AppPagination } from '../../../../core';

const OrganizationDepartments = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full rounded-2xl border border-primary-400 bg-[#DCF0F966] flex flex-wrap gap-x-4 gap-y-2 items-center justify-center p-3">
        {organizationDepartment.map((user, index) => (
          <div
            key={index}
            className="w-82 bg-white rounded-lg border-l-2 border-primary-400 p-2 shadow-[0_1px_2px_1px_#080E1C4D] hover:bg-[#D6F2FF]"
          >
            <div className="flex items-center gap-2 border-b border-[#E5E5E5] pb-1">
              <Avatar radius="sm" src="" />
              <span className="font-semibold">{user.name}</span>
            </div>
            <div className="flex p-1">
              <span className="font-bold text-xs text-[#0C152A]">{user.job}</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="text-primary-400" size="20px" />
              <span className="text-primary-400">
                {user.people} {t('people')}
              </span>
            </div>
          </div>
        ))}
        <div className="w-350 flex justify-end mt-5">
          <AppPagination
            props={{
              size: 'sm',
              total: 10,
              initialPage: 1,
              onChange: () => console.log(),
              showControls: true,
              dotsJump: 10,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default OrganizationDepartments;
