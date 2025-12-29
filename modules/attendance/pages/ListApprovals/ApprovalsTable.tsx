import { AppTable } from "@hrbox/uikit/components";
import { ListApprovals } from "@hrbox/modules/attendance/app/mock";

const ApprovalsTable = () => {
  return (
    <>
      <div className="h-full w-full">
        <AppTable data={ListApprovals} pageSize={8} variant="bordered" />
      </div>
    </>
  );
};

export default ApprovalsTable;
