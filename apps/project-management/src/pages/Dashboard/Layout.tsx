import { HRBOXLayout } from "@hrbox/shared-templates";
import { BaseContentLayout } from "@hrbox/shared-templates";

export const DashboardLayout = ({ props }: { props: any }) => {
  const { children } = props;

  return (
    <HRBOXLayout
      props={{
        children: (
          <div className="flex gap-[26px] shadow-tight h-full min-h-fit">
            <BaseContentLayout props={{ children }} />
          </div>
        ),
      }}
    />
  );
};
