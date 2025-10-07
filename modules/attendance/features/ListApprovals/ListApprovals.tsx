import ApprovalsTable from '@module/attendance/features/ListApprovals/ApprovalsTable';
import ApprovalsFilter from '@module/attendance/features/ListApprovals/ApprovalsFilter';

const ListApprovals=()=>{
  return(
    <>
    <div className="flex w-full h-full flex-row gap-3">
      <ApprovalsFilter/>
      <ApprovalsTable/>
    </div>
    </>
  )
}
export default ListApprovals;
