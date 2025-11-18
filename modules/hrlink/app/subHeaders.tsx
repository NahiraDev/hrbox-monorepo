import {
  Briefcase,
  Buildings,
  DeviceMessage,
  Heart,
  HomeHashtag,
  LampCharge,
  Medal,
  Personalcard,
  Star,
  UserOctagon,
} from 'iconsax-reactjs';

// import {
//   useLazyFetchExperienceQuery,
//   useLazyFetchEducationQuery,
//   useLazyFetchCoursesQuery,
//   useLazyFetchAwardsQuery,
//   useLazyFetchHardSkillsQuery,
//   useLazyFetchSoftSkillsQuery,
// } from '@hrbox/modules/hrlink/apis';

import {JobOffersIcon} from "~/UIKit/icons/JobOffersIcon";
import {CupStarIcon} from "~/UIKit/icons/CupStarIcon";
import { lazyRouteComponent } from "@tanstack/react-router";
import { Paths } from '@module/paths';

const ResumeSubHeader = lazyRouteComponent(() => import('@hrbox-monorepo/modules/hrlink/subheaders/ResumeSubHeader'));
const JobSubHeader = lazyRouteComponent(() => import('@hrbox-monorepo/modules/hrlink/subheaders/JobSubHeader'));
const JobDetailSubHeader = lazyRouteComponent(() => import('@hrbox-monorepo/modules/hrlink/subheaders/JobDetailSubHeader'));
const CompanySubHeader = lazyRouteComponent(() => import('@hrbox-monorepo/modules/hrlink/subheaders/CompanySubHeader'));
const CompanyInformationSubHeader = lazyRouteComponent(() => import('@hrbox-monorepo/modules/hrlink/subheaders/CompanyInformationSubHeader'));

function createResumeSubHeaderWithHook(useHook: () => any, name: string) {
  const Wrapper = (props: any) => {
    const [trigger] = useHook();

    return <ResumeSubHeader {...props} onSearch={(q: string) => trigger(q)} />;
  };

  Wrapper.displayName = name;

  return Wrapper;
}

// const ResumeExperienceSubHeader = createResumeSubHeaderWithHook(
//   useLazyFetchExperienceQuery,
//   'ResumeExperienceSubHeader',
// );
// const ResumeEducationSubHeader = createResumeSubHeaderWithHook(useLazyFetchEducationQuery, 'ResumeEducationSubHeader');
// const ResumeCourseSubHeader = createResumeSubHeaderWithHook(useLazyFetchCoursesQuery, 'ResumeCourseSubHeader');
// const ResumeAwardsSubHeader = createResumeSubHeaderWithHook(useLazyFetchAwardsQuery, 'ResumeAwardsSubHeader');
// const ResumeHardSkillsSubHeader = createResumeSubHeaderWithHook(
//   useLazyFetchHardSkillsQuery,
//   'ResumeHardSkillsSubHeader',
// );
// const ResumeSoftSkillsSubHeader = createResumeSubHeaderWithHook(
//   useLazyFetchSoftSkillsQuery,
//   'ResumeSoftSkillsSubHeader',
// );

export const HRLinkSubHeaders: any = [
  {
    path: Paths.HRLink.Dashboard,
    component: null,
  },
  {
    path: Paths.HRLink.ResumeInformation,
    component: ResumeSubHeader,
    props: {
      icon: Personalcard,
      name: 'user Information',
    },
  },
  {
    path: Paths.HRLink.ResumeExperience,
    component: null,
    props: {
      icon: Briefcase,
      name: 'Experience',
    },
  },
  {
    path: Paths.HRLink.ResumeEducation,
    component: null,
    props: {
      icon: UserOctagon,
      name: 'Education',
    },
  },
  {
    path: Paths.HRLink.ResumeCourse,
    component: null,
    props: {
      icon: UserOctagon,
      name: 'Courses',
    },
  },
  {
    path: Paths.HRLink.ResumeAwards,
    component: null,
    props: {
      icon: CupStarIcon,
      name: 'Awards',
    },
  },
  {
    path: Paths.HRLink.ResumeHardSkills,
    component: null,
    props: {
      icon: LampCharge,
      name: 'Hard Skills',
    },
  },
  {
    path: Paths.HRLink.ResumeSoftSkills,
    component: null,
    props: {
      icon: Star,
      name: 'Soft Skills',
    },
  },
  {
    path: Paths.HRLink.JobOffers,
    component: JobSubHeader,
    props: {
      icon: JobOffersIcon,
      name: 'Job Offers',
    },
  },
  {
    path: Paths.HRLink.JobDetail,
    component: JobDetailSubHeader,
    props: {
      icon: JobOffersIcon,
      name: 'Job Detail',
    },
  },
  {
    path: Paths.HRLink.JobOpportunities,
    component: JobSubHeader,
    props: {
      icon: JobOffersIcon,
      name: 'Job Detail',
    },
  },
  {
    path: Paths.HRLink.Setting,
    component: null,
  },
  {
    path: Paths.HRLink.AllCompanies,
    component: CompanySubHeader,
    props: {
      icon: Buildings,
      name: 'All Companies',
    },
  },
  {
    path: Paths.HRLink.CompanyJobOffers,
    component: CompanySubHeader,
    props: {
      icon: JobOffersIcon,
      name: 'Offers',
    },
  },
  {
    path: Paths.HRLink.CompanyEvents,
    component: CompanyInformationSubHeader,
    props: {
      icon: Medal,
      name: 'Events',
    },
  },
  {
    path: Paths.HRLink.CompanyFavorites,
    component: CompanySubHeader,
    props: {
      icon: Heart,
      name: 'Followed',
    },
  },
  {
    path: Paths.HRLink.CompanyRequested,
    component: CompanySubHeader,
    props: {
      icon: DeviceMessage,
      name: 'Requested',
    },
  },
  {
    path: Paths.HRLink.CompanyInformation,
    component: CompanySubHeader,
    props: {
      icon: HomeHashtag,
      name: 'General Info’s',
    },
  },
];
