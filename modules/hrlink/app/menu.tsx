import type { ReactNode } from "react";
import {
  Building,
  Chart2,
  DeviceMessage,
  FavoriteChart,
  Heart,
  LampCharge,
  Personalcard,
  UserOctagon
} from "iconsax-reactjs";
import { AcademyIcon } from "@hrbox/uikit/icons/AcademyIcon";
import { CupStarIcon, JobOpportunitiesIcon } from "@hrbox/uikit/icons";

const DashboardIcons = {
  dashboard: Chart2
};

const ResumeIcons = {
  information: Personalcard,
  experience: FavoriteChart,
  education: UserOctagon,
  hardskills: LampCharge,
  softskills: LampCharge,
  awards: CupStarIcon,
  courses: AcademyIcon
};

const JobIcons = {
  offers: JobOffersIcon,
  opportunities: JobOpportunitiesIcon
};

const CompanyIcons = {
  companies: Building,
  requested: DeviceMessage,
  favorites: Heart,
  offers: DeviceMessage,
  companyinfo: Building
};

const iconGroups: Record<string, Record<string, any>> = {
  dashboard: DashboardIcons,
  resume: ResumeIcons,
  job: JobIcons,
  company: CompanyIcons
};

export const HRLinkMenu = (): { label: string; path: string; icon?: ReactNode }[] => {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const moduleName = "hrlink";

  const parts = pathname.split("/").filter(Boolean);
  const section = parts[1] as keyof typeof iconGroups;

  const groupIcons = iconGroups[section] ?? DashboardIcons;

  return Object.keys(groupIcons).map((key) => {
    const IconComponent = groupIcons[key as keyof typeof groupIcons];
    return {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      path: `/${moduleName}/${section}/${key.toLowerCase()}`,
      icon: IconComponent ? <IconComponent /> : null
    };
  });
};
