import { lazyLoad } from '@core/routes';
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
} from 'iconsax-react';
import { CupStarIcon, JobOffersIcon } from '@module/hrlink/icons';

import {
  useLazyFetchExperienceQuery,
  useLazyFetchEducationQuery,
  useLazyFetchCoursesQuery,
  useLazyFetchAwardsQuery,
  useLazyFetchHardSkillsQuery,
  useLazyFetchSoftSkillsQuery,
} from '@module/hrlink/features/resume/apis';

import { HRLinkPaths } from '@module/hrlink/app/paths';

const ResumeSubHeader = lazyLoad(() => import('@module/hrlink/features/resume/ResumeSubHeader'));
const JobSubHeader = lazyLoad(() => import('@module/hrlink/features/jobs/JobSubHeader'));
const JobDetailSubHeader = lazyLoad(() => import('@module/hrlink/features/jobs/JobDetailSubHeader'));
const CompanySubHeader = lazyLoad(() => import('@module/hrlink/features/companies/CompanySubHeader'));
const CompanyInformationSubHeader = lazyLoad(() => import('@module/hrlink/features/companies/CompanyInformationSubHeader'));

function createResumeSubHeaderWithHook(useHook: () => any, name: string) {
  const Wrapper = (props: any) => {
    const [trigger] = useHook();

    return <ResumeSubHeader {...props} onSearch={(q: string) => trigger(q)} />;
  };

  Wrapper.displayName = name;

  return Wrapper;
}

const ResumeExperienceSubHeader = createResumeSubHeaderWithHook(
  useLazyFetchExperienceQuery,
  'ResumeExperienceSubHeader',
);
const ResumeEducationSubHeader = createResumeSubHeaderWithHook(useLazyFetchEducationQuery, 'ResumeEducationSubHeader');
const ResumeCourseSubHeader = createResumeSubHeaderWithHook(useLazyFetchCoursesQuery, 'ResumeCourseSubHeader');
const ResumeAwardsSubHeader = createResumeSubHeaderWithHook(useLazyFetchAwardsQuery, 'ResumeAwardsSubHeader');
const ResumeHardSkillsSubHeader = createResumeSubHeaderWithHook(
  useLazyFetchHardSkillsQuery,
  'ResumeHardSkillsSubHeader',
);
const ResumeSoftSkillsSubHeader = createResumeSubHeaderWithHook(
  useLazyFetchSoftSkillsQuery,
  'ResumeSoftSkillsSubHeader',
);

export const HRLinkSubHeaders: any = [
  {
    path: HRLinkPaths.Impersonate,
    component: null,
  },
  {
    path: HRLinkPaths.Dashboard,
    component: null,
  },
  {
    path: HRLinkPaths.ResumeInformation,
    component: ResumeSubHeader,
    props: {
      icon: Personalcard,
      name: 'user Information',
    },
  },
  {
    path: HRLinkPaths.ResumeExperience,
    component: ResumeExperienceSubHeader,
    props: {
      icon: Briefcase,
      name: 'Experience',
    },
  },
  {
    path: HRLinkPaths.ResumeEducation,
    component: ResumeEducationSubHeader,
    props: {
      icon: UserOctagon,
      name: 'Education',
    },
  },
  {
    path: HRLinkPaths.ResumeCourse,
    component: ResumeCourseSubHeader,
    props: {
      icon: UserOctagon,
      name: 'Courses',
    },
  },
  {
    path: HRLinkPaths.ResumeAwards,
    component: ResumeAwardsSubHeader,
    props: {
      icon: CupStarIcon,
      name: 'Awards',
    },
  },
  {
    path: HRLinkPaths.ResumeHardSkills,
    component: ResumeHardSkillsSubHeader,
    props: {
      icon: LampCharge,
      name: 'Hard Skills',
    },
  },
  {
    path: HRLinkPaths.ResumeSoftSkills,
    component: ResumeSoftSkillsSubHeader,
    props: {
      icon: Star,
      name: 'Soft Skills',
    },
  },
  {
    path: HRLinkPaths.JobOffers,
    component: JobSubHeader,
    props: {
      icon: JobOffersIcon,
      name: 'Job Offers',
    },
  },
  {
    path: HRLinkPaths.JobDetail,
    component: JobDetailSubHeader,
    props: {
      icon: JobOffersIcon,
      name: 'Job Detail',
    },
  },
  {
    path: HRLinkPaths.JobOpportunities,
    component: JobSubHeader,
    props: {
      icon: JobOffersIcon,
      name: 'Job Detail',
    },
  },
  {
    path: HRLinkPaths.Setting,
    component: null,
  },
  {
    path: HRLinkPaths.AllCompanies,
    component: CompanySubHeader,
    props: {
      icon: Buildings,
      name: 'All Companies',
    },
  },
  {
    path: HRLinkPaths.CompanyJobOffers,
    component: CompanySubHeader,
    props: {
      icon: JobOffersIcon,
      name: 'Offers',
    },
  },
  {
    path: HRLinkPaths.CompanyEvents,
    component: CompanyInformationSubHeader,
    props: {
      icon: Medal,
      name: 'Events',
    },
  },
  {
    path: HRLinkPaths.CompanyFavorites,
    component: CompanySubHeader,
    props: {
      icon: Heart,
      name: 'Followed',
    },
  },
  {
    path: HRLinkPaths.CompanyRequested,
    component: CompanySubHeader,
    props: {
      icon: DeviceMessage,
      name: 'Requested',
    },
  },
  {
    path: HRLinkPaths.CompanyInformation,
    component: CompanySubHeader,
    props: {
      icon: HomeHashtag,
      name: 'General Info’s',
    },
  },
];
