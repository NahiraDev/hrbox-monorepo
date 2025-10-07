import { AppTable } from '@core/components';
import { ReportPersonnal } from '@module/attendance/app/mock' ;
const ReportTable=()=>{
  return(
    <>
      <AppTable data={ReportPersonnal}/>
    </>
  )
}

export default ReportTable;
