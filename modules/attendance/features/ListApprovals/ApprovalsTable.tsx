import { AppTable } from '@root/core/components';
import { ListApprovals } from '@module/attendance/app/mock';

const ApprovalsTable=()=>{
  return(
    <>
      <div className="h-full w-full">
      <AppTable
        data={ListApprovals}
        pageSize={10}
      />
      </div>
    </>
  )
}

export default ApprovalsTable;
