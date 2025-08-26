import { HRLinkLayout } from "@/layouts/HRLinkLayout.tsx";
import AppSideBar from "@/components/AppSideBar.tsx";
import { JobOffersIcon } from "@/icons/jobOffers.tsx";
import { JobOppertunitiesIcon } from "@/icons/jobOppertunities.tsx";
import { useDarkMode } from "@/context/DarkMode.tsx";

export const JobsLayout = ({ props }: { props: any }) => {
  const { darkMode } = useDarkMode();
  const { children } = props;
  const Menu = [
    {
      icon: (
        <JobOffersIcon
          props={{
            color:
              window.location.pathname === "/job/offers"
                ? "#FD1B51"
                : darkMode ? "#fff" :"#1E3363",
          }}
        />
      ),
      name: "JobOffers",
      route: "/job/offers",
    },
    {
      icon: (
        <JobOppertunitiesIcon
          props={{
            color:
              window.location.pathname === "/job/oppertunities"
                ? "#FD1B51"
                : darkMode ? "#fff" :"#1E3363",
          }}
        />
      ),
      name: "JobOppertunities",
      route: "/job/oppertunities",
    },
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
