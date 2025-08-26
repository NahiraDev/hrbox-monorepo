import {
  FavoriteChart,
  LampCharge,
  Personalcard,
  UserOctagon
} from "iconsax-react";

import { HRLinkLayout } from "@/layouts/HRLinkLayout.tsx";
import AppSideBar from "@/components/AppSideBar.tsx";
import { CupStar } from "@/icons/cupStar.tsx";
import { Academy } from "@/icons/academy.tsx";
import { ActiveCupStar } from "@/icons/activeCupStar.tsx";
import { ActiveAcademy } from "@/icons/activeAcademy.tsx";

export const ResumeLayout = ({ props }: { props: any }) => {
  const { children } = props;
  const Menu = [
    {
      icon: <Personalcard size="24"/>,
      name: "User Info’s",
      route: "/resume/info"
    },
    {
      icon: <FavoriteChart size="24"/>,
      name: "Work Exp.",
      route: "/resume/job-experience"
    },
    {
      icon: <UserOctagon size="24"/>,
      name: "Acad. Hist.",
      route: "/resume/academic-history"
    },
    {
      icon: <LampCharge size="24"/>,
      name: "Skills",
      route: "/resume/hard-skills"
    },
    {
      icon:
        window.location.pathname === "/resume/achievements-accolades" ? (
          <ActiveCupStar />
        ) : (
          <CupStar props={{
            color:"#04070E"
          }}/>
        ),
      name: "AchievementsAndAccolades",
      route: "/resume/achievements-accolades"
    },
    {
      icon:
        window.location.pathname === "/resume/courses" ? (
          <ActiveAcademy />
        ) : (
          <Academy props={{
            color:"#04070E"
          }}/>
        ),
      name: "Courses",
      route: "/resume/courses"
    }
  ];

  return (
    <HRLinkLayout
      props={{
        children: (
          <div className="flex gap-[26px] shadow-tight h-full min-h-fit">
            <AppSideBar menu={Menu} />
            {children}
          </div>
        )
      }}
    />
  );
};
