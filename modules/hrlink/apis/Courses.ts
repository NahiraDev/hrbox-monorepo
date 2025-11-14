import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";

const courseApi = createModuleApi({
  reducerPath: 'courseApi',
  baseUrl: 'https://hrlink.hrbox.me:50443',
  tagTypes: ['Course'],
  requiresAuth: true,
  autoToast: true,
});

export const courseApiWithEndpoints = courseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCourses: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.course.getList,
      method: 'GET',
      tags: ['Course'],
    }),

    fetchCourseDetail: createQuery<any, { id: string }>(build, {
      url: HRLinkApiEndpoints.resume.course.getDetail,
      method: 'GET',
      tags: ['Course'],
    }),

    createCourse: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.course.create,
      method: 'POST',
      tags: ['Course'],
    }),

    editCourse: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.resume.course.edit,
      method: 'POST',
      tags: ['Course'],
    }),

    deleteCourse: createMutation<any, { id: string }>(build, {
      url: HRLinkApiEndpoints.resume.course.delete,
      method: 'DELETE',
      tags: ['Course'],
    }),
  }),
});

export const {
  useLazyFetchCoursesQuery,
  useLazyFetchCourseDetailQuery,
  useCreateCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation,
} = courseApiWithEndpoints;