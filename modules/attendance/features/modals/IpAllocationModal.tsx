import { AppModal } from '@core/components';
import IpAllocationForm from '@module/attendance/features/forms/IpAllocationForm';

const IpAllocationModal=()=>{
  return(
    <>
      <AppModal.Body>
        <IpAllocationForm/>
      </AppModal.Body>
    </>
  )
}
export default IpAllocationModal;
