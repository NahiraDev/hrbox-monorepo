import { AppTable } from 'core/components';
import { ReportPersonnal } from '@mock/attendenceEntry';
const ReportTable=()=>{
  return(
    <>
      <AppTable data={ReportPersonnal}/>
    </>
  )
}

export default ReportTable;
