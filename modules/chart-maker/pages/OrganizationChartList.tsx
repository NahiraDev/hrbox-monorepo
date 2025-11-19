import { organizationCharts } from '@module/chart-maker/app/mock';

import { OrgChartCardListNode } from '@hrbox/modules/chart-maker/components/OrgChartCardList';
import {AppPagination} from "@hrbox/uikit/components/AppPagination";

const OrganizationChartList = () => {
  return (
    <div className="flex flex-col gap-6 justify-between h-full">
      <div className="grid grid-cols-4 2xl:grid-cols-6 gap-3">
        {organizationCharts.map((_item: any, index: number) => (
          <OrgChartCardListNode key={index} />
        ))}
      </div>

      <div className="flex justify-end">
        <AppPagination meta={{
                  page: 0,
                  pageSize: 0,
                  total: 0,
                  totalPages: 0
              }} onPageChange={function(page: number): void {
                  throw new Error("Function not implemented.");
              } }/>
      </div>
    </div>
  );
};

export default OrganizationChartList;
