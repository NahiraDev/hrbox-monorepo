import { User } from 'iconsax-react';
import { organizationDepartment } from 'mock';
import { Avatar, Card, CardBody, CardHeader } from '@heroui/react';
import { useTranslation } from 'react-i18next';

import { AppPagination } from '../../../../core';

const OrganizationDepartments = () => {
  const { t } = useTranslation();
  const renderOrganizationDepartments = (user: any, index: number) => (
    <a href="/basic-info/TechnicalDepartments">
      <Card
        key={index}
        className="bg-white rounded-xl border-l-2 border-primary-400 py-2 px-3 shadow-light-tight-1 hover:bg-[#D6F2FF] flex flex-col gap-2"
      >
        <CardHeader className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-700 !p-0 !pb-1">
          <Avatar radius="sm" size="sm" src="" />
          <span className="font-semibold">{user.name}</span>
        </CardHeader>
        <CardBody className="!p-0 flex flex-col gap-2">
          <div className="flex">
            <span className="font-bold text-xs text-secondary-800 dark:text-white">{user.job}</span>
          </div>
          <div className="flex items-center gap-4">
            <User className="text-primary-400 dark:text-gold" size="20px" />
            <span className="text-primary-400 dark:text-gold">
              {user.people} {t('people')}
            </span>
          </div>
        </CardBody>
      </Card>
    </a>
  );

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="grid grid-cols-4 gap-4">
        {organizationDepartment.map((user, index) => renderOrganizationDepartments(user, index))}
      </div>
      <div className="flex justify-end">
        <AppPagination total={1000} />
      </div>
    </div>
  );
};

export default OrganizationDepartments;
