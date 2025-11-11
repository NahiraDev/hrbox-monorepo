import ApprovalsTable from '@hrbox/modules/attendance/pages/ListApprovals/ApprovalsTable';
import ApprovalsFilter from '@hrbox/modules/attendance/pages/ListApprovals/ApprovalsFilter';

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
