import { AppPagination } from '../../../core';
import { OrganizationCard } from '../components';
import {organizationCharts} from "../../../mock";


function OrganizationChartList() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-4 2xl:grid-cols-6 gap-3">
        {
          organizationCharts.map((item: any)=> (
            <OrganizationCard props={{item}}/>
          ))
        }
      </div>

      <div className="flex justify-center">
        <AppPagination
          props={{
            size: 'md',
            dotsJump: 10,
            initialPage: 1,
            total: 100,
          }}
        />
      </div>
    </div>
  );
}

OrganizationChartList.meta = {
  path: 'organizationChartList',
  layout: 'BaseLayout',
  subHeader: () => (
    <div className="flex justify-between items-center border-b px-4 py-2">
      <h2 className="font-bold text-lg">Organization Chart</h2>
      <button className="px-3 py-1 bg-blue-500 text-white rounded">
        Add Org
      </button>
    </div>
  ),
};

export default OrganizationChartList;
