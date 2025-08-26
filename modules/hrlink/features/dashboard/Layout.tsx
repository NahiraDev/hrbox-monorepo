import {
  ElementEqual,
} from "iconsax-react";

import { HRLinkLayout } from "@/layouts/HRLinkLayout.tsx";
import AppSideBar from "@/components/AppSideBar.tsx";
export const Menu = [
  { icon: <ElementEqual size="24" />, name: "Dashboard", route: "/dashboard" },
];
export const DashboardLayout = ({ props }: { props: any }) => {
  const { children } = props;

  return (
    <HRLinkLayout
      props={{
        children: (
          <div className="flex gap-[26px] shadow-tight h-full min-h-fit">
            <AppSideBar menu={Menu} />
            {children}
          </div>
        ),
      }}
    />
  );
};
