import { AppPageTitle } from '@hrbox/uikit/components';

const ApprovalsSubHeader=(props:any)=>{
  return(
    <>
      <div className="flex flex-row-reverse justify-end ">
        <div className="flex">
          <AppPageTitle title={props.title} icon={props.icon} />
        </div>
      </div>
    </>
  )
}
export default ApprovalsSubHeader
