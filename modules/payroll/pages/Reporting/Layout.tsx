import AppSideBar from "@/components/AppSideBar.tsx";
import { HRBOXLayout } from "@/layouts/HRBOXLayout.tsx";
import { useDarkMode } from "@/context/DarkMode.tsx";
import { GetMenuConfig } from "@/helpers/menuConfig.tsx";
import HRBOXContentLayout from "@/layouts/HRBOXContentLayout.tsx";

export const ReportsLayout = ({ props }: { props: any }) => {
  const { darkMode } = useDarkMode();
  const { children } = props;

  return (
    <HRBOXLayout
      props={{
        children: (
          <div className="flex gap-[26px] shadow-tight h-full min-h-fit">
            <AppSideBar menu={GetMenuConfig(location.pathname, darkMode)} />
            <HRBOXContentLayout props={{ children }} />
          </div>
        ),
      }}
    />
  );
};
