import { BaseLayout } from 'core';
import { People } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

const OrganizationDepartments = () => {
  const { t } = useTranslation();

  return (
    <BaseLayout props={{
      children:(
        <div className="rounded-5 border-1 border-primary-400 bg-[#dcf0f966]">
          <People
            size="32"
            className="text-secondary-1000"
          />
          {t('lorem')}
        </div>
      )
    }}/>
  )
}

export default OrganizationDepartments;
