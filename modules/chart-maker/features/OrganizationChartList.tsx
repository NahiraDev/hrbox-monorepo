import { AppPagination } from '../../../core';
import { organizationCharts } from '../../../mock';

import { OrgChartCardListNode } from './common';

const OrganizationChartList = () => {
  return (
    <div className="flex flex-col gap-6 justify-between h-full">
      <div className="grid grid-cols-4 2xl:grid-cols-6 gap-3">
        {organizationCharts.map((_item: any, index: number) => (
          <OrgChartCardListNode key={index} />
        ))}
      </div>

      <div className="flex justify-end">
        <AppPagination total={100} />
      </div>
    </div>
  );
};

export default OrganizationChartList;
