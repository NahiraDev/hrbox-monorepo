import { User } from 'iconsax-reactjs';
import { organizationDepartment } from '@module/basic-info/app/mock';
import { Avatar, Card, CardBody, CardHeader } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { AppPagination } from '@hrbox/uikit/components/AppPagination';
import { useNavigation } from "@hrbox/core/hooks/useNavigation";
import {Paths} from "@hrbox-monorepo/modules/paths";

const borderColors = ['#000000', '#A61111', '#F4D082', '#05856F', '#DB5918', '#2F80ED', '#0ED2F7'];

const OrganizationDepartments = () => {
  const { t } = useTranslation();
  const {push} = useNavigation();

  const renderOrganizationDepartments = (user: any, index: number) => (
    <Card
      key={index}
      className="rounded-xl border-l-2 py-2 px-3 shadow-light-tight-1 flex flex-col gap-2 hover:bg-[#D6F2FF] hover:cursor-pointer"
      style={{ borderLeftColor: borderColors[index % borderColors.length] }}
      onPress={() => push({to:Paths.BasicInfo.TechnicalDepartment})}
    >
      <CardHeader className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-700 !p-0 !pb-1">
        <Avatar radius="sm" size="sm" src="https://i.pravatar.cc/150?u=e04258114e29026302d"/>
        <span className="!font-semibold text-[16px]">{user.name}</span>
      </CardHeader>
      <CardBody className="!p-0 flex flex-col gap-2">
        <div className="flex">
          <span className="!font-bold text-xs text-secondary-800 dark:text-white">{user.job}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <User className="text-primary-panel dark:text-gold" size="18"/>
          <span className="text-primary-panel dark:text-gold">
            {user.people} {t('people')}
          </span>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="flex flex-col justify-between p-4">
      <div className="grid grid-cols-4 gap-4 ">
        {organizationDepartment.map((user, index) => renderOrganizationDepartments(user, index))}
      </div>
      <div className="flex justify-end p-2">
          {/*<AppPagination total={5} />*/}
      </div>
    </div>
  );
};

export default OrganizationDepartments;
