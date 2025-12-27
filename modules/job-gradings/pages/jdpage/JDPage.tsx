import { AppTable } from "@hrbox/uikit/components";
import { ListTable} from "../../app/mock"
const JDPage = () => {
    return ( 
        <div className="w-full h-full ">
            <AppTable data={ListTable} />
        </div>
    );
}
 
export default JDPage;