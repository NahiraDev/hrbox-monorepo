import { useMemo } from "react";
import { AppTable, type ColumnConfig } from "@hrbox/uikit/components";
import { useAppSelector } from "@hrbox/core/redux";
import { JDPageList } from "../../app/mock";
import "../../app/index.css";

const columns: ColumnConfig[] = [
    { key: "Job_title", label: "Job Title" },
    { key: "unit", label: "Unit" },
    {
        key: "grade_status",
        label: "Grade Status",
        render: (v) => (v === "has" ? "Has Grade" : "No Grade"),
    },
    {
        key: "Grade",
        label: "Grade",
        render: (value, row) =>
            row.grade_status === "has" ? (
                <span
                    className="rounded-full px-2 py-1 text-sm font-medium text-white"
                    style={{ backgroundColor: row.gradeColor }}
                >
          {value}
        </span>
            ) : (
                <span className="text-gray-500">-</span>
            ),
    },
    { key: "score", label: "Score" },
];

const JDPage = () => {
    const { showGraded, showNoGrade } = useAppSelector(
        (state) => state.jdFilter
    );
    const searchQuery = useAppSelector(
        (state) => state.search.query
    );

    const filteredData = useMemo(() => {
        return JDPageList.filter((item) => {

            const gradeMatch =
                (showGraded && item.grade_status === "has") ||
                (showNoGrade && item.grade_status !== "has");

            if (!gradeMatch) return false;


            if (!searchQuery.trim()) return true;

            const q = searchQuery.toLowerCase();
            return (
                item.Job_title?.toLowerCase().includes(q) ||
                item.unit?.toLowerCase().includes(q) ||
                item.Grade?.toLowerCase().includes(q) ||
                item.score?.toString().includes(q)
            );
        });
    }, [showGraded, showNoGrade, searchQuery]);

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
