import { AppTable } from "@hrbox/uikit/components";
import {JD} from "../../app/mock"
const JDPage = () => {
    return ( 
        <div className="w-full h-full ">
            <AppTable data={JD} />
        </div>
    );
}
 
export default JDPage;