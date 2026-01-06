import { AppTable, type ColumnConfig } from "@hrbox/uikit/components";
import { JDPageList } from "../../app/mock";

const columns: ColumnConfig[] = [
    {
        key: "Job_title",
        label: "job title",
    },
    {
        key: "unit",
        label: "unit",
    },
    {
        key: "grade_status",
        label: "Grade status",
        render: (value) => (value === "has" ? "has" : "does not have"),
    },
    {
        key: "Grade",
        label: "Grade",
        render: (value, row) => (
            <span
                className="rounded-full px-3 py-1 text-xs font-medium text-white"
                style={{ backgroundColor: row.gradeColor }}
            >
        {value}
      </span>
        ),
    },
    {
        key: "score",
        label: "Score",
    },
];

const JDPage = () => {
    return (
        <div className="w-full h-full">
            <AppTable data={JDPageList} columns={columns} showRowNumber />
        </div>
    );
};

export default JDPage;