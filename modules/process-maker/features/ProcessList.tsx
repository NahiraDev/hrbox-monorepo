import AppTable from '../../../core/components/AppTable';
import { sampleData, columns } from '../../../mock';
const ProcessList = () => {

  return (
    <div className="flex flex-col w-full">
      <AppTable columns={columns} data={sampleData} />
    </div>
  );
};

 export default ProcessList;
