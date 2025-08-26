import { Buildings, DeviceMessage, Heart } from "iconsax-react";

import { HRLinkLayout } from "@/layouts/HRLinkLayout.tsx";
import AppSideBar from "@/components/AppSideBar.tsx";

export const CompanyLayout = ({ props }: { props: any }) => {
  const { children } = props;
  const Menu = [
    {
      icon: <Buildings size="24" />,
      name: "All Comanies",
      route: "/company/all-companies",
    },
    {
      icon: <DeviceMessage size="24" />,
      name: "Requested",
      route: "/company/requested",
    },
    { icon: <Heart size="24" />, name: "Followed", route: "/company/favorites", },
  ];

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
