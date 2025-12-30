import { AppTable } from "@hrbox/uikit/components";
import { CostEmployee } from "../app/mock";
import "../app/index.css";

type CostCenterModalProps = {
  profile: any;
};

const CostCenterModal = ({ profile }: CostCenterModalProps) => {
  return (
    <div className="w-full flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-row items-center gap-4">
        <img
          className="w-20 h-20 rounded-lg object-cover"
          src={profile.image}
          alt={profile.Name}
        />

        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-secondary-1000">
            {profile.Name}
          </p>

          <span className="text-xs w-fit px-2 py-1 text-primary bg-[#DCF0F960] rounded-lg">
            {profile.category}
          </span>
        </div>
      </div>

      {/* Table */}
      <AppTable data={CostEmployee}  hasPagination={false} />

      {/* Divider */}
      <div className="gradient-divider my-2" />

      {/* Scores */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-3">
          <span className="text-[34px] text-success-700 dark:text-[#DFF3E7]!  font-extrabold">
            Fit Score
          </span>
          <span className="text-2xl font-bold text-secondary-1000">72%</span>
        </div>

        <div className="flex flex-row items-center gap-3   text-right">
          <span className="text-[34px] text-warning-600 dark:text-[#FD8F02]! font-extrabold">
            Gap Score
          </span>
          <span className="text-2xl font-bold  text-secondary-1000">28%</span>
        </div>
      </div>

      {/* Overview */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-secondary-1000">
          Overview
        </h3>

        <p className="text-sm text-secondary-1000 leading-6">
          This component assigns jobs a numerical score or index based on
          predefined evaluation factors such as complexity, autonomy, impact,
          and required qualifications. The index serves as a reference point
          to ensure internal consistency and benchmark roles across
          departments or units.
        </p>
      </div>

      {/* Example Factors */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xl font-semibold text-secondary-1000">
          Example factors:
        </h4>

        <ul className="list-disc list-inside text-sm text-secondary-1000 space-y-1">
          <li>Decision-making scope</li>
          <li>Technical knowledge required</li>
          <li>Communication complexity</li>
          <li>Operational responsibility</li>
        </ul>
      </div>
    </div>
  );
};

export default CostCenterModal;
