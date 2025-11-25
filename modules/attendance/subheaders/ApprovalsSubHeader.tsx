import { AppPageTitle } from '@hrbox/uikit/components';
import { useTranslation } from 'react-i18next';

const ApprovalsSubHeader=(props:any)=>{
  const {t}=useTranslation();
  return(
    <>
      <div className="flex flex-row-reverse justify-end ">
        <div className="flex">
          <AppPageTitle title={t(props.title)} icon={props.icon} />
        </div>
      </div>
    </>
  )
}
export default ApprovalsSubHeader
