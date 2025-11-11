import { EntryExitData } from '@module/attendance/app/mock';
import { AppTable } from '@hrbox/uikit/components';

const EntryExit = () => {;

  return (
    <>
      <div className="w-full h-full flex ">
        <AppTable data={EntryExitData} hasPagination={true} />
      </div>
    </>
  );
};

export default EntryExit;
