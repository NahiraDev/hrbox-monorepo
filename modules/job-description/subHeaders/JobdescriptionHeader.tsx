import {AppButton, AppPageTitle, AppSearchInput} from "@hrbox/uikit/components"
import { Add, DocumentSketch, Setting4 } from "iconsax-reactjs";
const JobdescriptionHeader = () => {
    return ( <>
    <div className="flex flex-row justify-between">
    <AppPageTitle title="Job Description" icon={<DocumentSketch color="white" size={18}/>} />
    <div className="flex flex-row gap-2 items-center    ">
        <AppSearchInput className="bg-transparent"/>
        <AppButton
        radius="md"
        content={<Setting4 size={24} />}
         className="bg-transparent border-primary border"
         size="xs"
        />
        <AppButton
        content="Add New One"
        className="bg-transparent border-primary border"
        variant="solid"
        radius="md"
        size="md"
        startContent={<Add size={22} />}
        />
    </div>
    </div>
    </> );
}
 
export default JobdescriptionHeader;