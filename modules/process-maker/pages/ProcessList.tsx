import { AppTable } from '@hrbox/uikit/components';
import { sampleData } from '@module/process-maker/app/mock';
const ProcessList = () => {
  return (
    <div className="h-full ">
      <AppTable
          data={sampleData}
      />
    </div>
  );
};

export default ProcessList;
