import { createBaseApi } from '@core/apis';

const HRLinkTags = [
  'Company',
  'Common',
  'Jobs',
  'Dashboard',
  'Award',
  'Skills',
  'Course',
  'Education',
  'Experience',
  'Setting',
] as const;

export const HRLinkBaseApi = createBaseApi(
  import.meta.env.VITE_HRLINK_API_URL,
  'HRLinkReducers',
  HRLinkTags,
);
