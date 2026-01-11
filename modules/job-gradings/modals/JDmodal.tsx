import {AppTable, type ColumnConfig} from "@hrbox/uikit/components";
import {JDPageList} from "@hrbox/modules/job-gradings/app/mock";
import "../app/index.css"
const JDmodal = () =>{
    const columns: ColumnConfig[] = [
        { key: "Job_title", label: "Job Title" },
        { key: "score", label: "Score" },
    ];

    return (
        <>
        <AppTable   showRowNumber columns={columns} data={JDPageList}  styles={{

            tableClassName: "custom-table ",
        }} />
        </>
    )
}
export default JDmodal;