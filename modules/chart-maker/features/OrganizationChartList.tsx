import { AppPagination } from 'core/components';

import { OrganizationCard } from '../components';

const OrganizationChartList = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        <OrganizationCard />
      </div>
      <AppPagination
        props={{
          size: 'md',
          dotsJump: 10,
          initialPage: 1,
          total: 100,
        }}
      />
    </div>
  );
};

export default OrganizationChartList;
