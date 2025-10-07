import { AppTable } from '@root/core/components';
import { ListApprovals } from '@module/attendance/app/mock';

const ApprovalsTable=()=>{
  return(
    <>
      <AppTable data={ListApprovals} paginationConfig={{
        total: 3,
        pageKey: '5',
        sizeKey: "xl",
        defaultSize: 10,
      }} enableActions={false}
      />
    </>
  )
}

export default ApprovalsTable;
