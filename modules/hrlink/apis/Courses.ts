import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';


export const courseApiWithEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build) => ({
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

    fetchCourseList: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.course.getCourseList,
      method: 'GET',
      tags: ['Course'],
    }),

    fetchInstituList: createQuery<any>(build, {
      url: HRLinkApiEndpoints.resume.course.getInstituList,
      method: 'GET',
      tags: ['Course'],
    }),

    deleteCourse: createMutation<any, { id: string }>(build, {
      url: HRLinkApiEndpoints.resume.course.delete,
      method: 'DELETE',
      tags: ['Course'],
    }),

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

  }),
});

export const {
  useFetchCoursesQuery,
  useFetchCourseDetailQuery,
  useFetchCourseListQuery,
  useFetchInstituListQuery,
  useCreateCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation,
} = courseApiWithEndpoints;