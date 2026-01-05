import { AppButton, AppPageTitle, AppSearchInput } from "@hrbox/UIKit/components";
import { FormField } from "@hrbox/UIKit/components/FormField";
import { Candle2, Setting, Setting2, Setting3, Setting4 } from "iconsax-reactjs";
import { FormProvider } from "@hrbox/core/providers";
import { useLocation } from "@tanstack/react-router";

const TimeSheetHeader = (props:any) => {
    const location=useLocation();
     const isAllProjects =
    location.pathname === "/attendance/all-projects";
    return ( <>
    <div className="flex justify-between">
        <AppPageTitle title={props.title} icon={props.icon} />
        <div className="flex flex-row gap-2">
            <FormProvider
              formId="calenderHeader"
                  initialValues={{}}
                  validationSchema={{}}
                  enableCache={false} >
            <FormField 
            component={AppSearchInput}
            name="search"
            variant="bordered"
            className="bg-red-400"
            />
            </FormProvider>
            {isAllProjects&&(
            <AppButton content={<Setting4 size={24}/>} className="p-2 border border-primary " variant="" />
            )}
        </div>
    </div>
    </> );
}
 
export default TimeSheetHeader;