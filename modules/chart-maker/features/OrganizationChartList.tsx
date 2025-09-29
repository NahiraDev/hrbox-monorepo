import { AppPagination } from '@core/components';
import { organizationCharts } from '@module/chart-maker/app/mock';

import { OrgChartCardListNode } from '@module/chart-maker/features/common';

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
