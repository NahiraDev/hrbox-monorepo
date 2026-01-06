import { useMemo } from "react";
import { AppTable, type ColumnConfig } from "@hrbox/uikit/components";
import { JDPageList } from "../../app/mock";
import { useAppSelector } from "@hrbox/core/redux";
import '../../app/index.css'
const columns: ColumnConfig[] = [
    { key: "Job_title", label: "Job Title" },{ key: "Job_title", label: "Job Title" },
    { key: "unit", label: "Unit" },
    {
        key: "grade_status",
        label: "Grade Status",
        render: (v) => (v === "has" ? "Has Grade" : "No Grade"),
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
    { key: "score", label: "Score" },
];

const JDPage = () => {
    const { showGraded, showNoGrade } = useAppSelector(
        (state) => state.jdFilter
    );

    const filteredData = useMemo(() => {
        if (!showGraded && !showNoGrade) return [];

        return JDPageList.filter(({ grade_status }) =>
            (showGraded && grade_status === "has") ||
            (showNoGrade && grade_status !== "has")
        );
    }, [showGraded, showNoGrade]);

    return (
        <AppTable
            data={filteredData}
            columns={columns}
            showRowNumber
            hasPagination
            pageSize={10}
            styles={{
                rowClassName: (row) =>
                    row.grade_status === "has"
                        ? "graded-row"
                        : "no-grade-row",
            }}
        />
    );
};

export default JDPage;
