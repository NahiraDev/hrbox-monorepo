import createBaseApi from '../../../../../../core/apis/baseApi';
import { createEndpoint } from '../../../../../../core';
import { HRLinkApiEndpoints } from '../../../../app/endpoints';

const BaseApi = createBaseApi('https://api.hrbox.com', 'Course', ['Course'] as const);

export const CourseApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCourses: createEndpoint(build, HRLinkApiEndpoints.resume.course.getList, 'GET', ['Course']),
    fetchCourseDetail: createEndpoint(build, HRLinkApiEndpoints.resume.course.getDetail, 'GET', ['Course']),
    createCourse: createEndpoint(build, HRLinkApiEndpoints.resume.course.create, 'POST', ['Course']),
    editCourse: createEndpoint(build, HRLinkApiEndpoints.resume.course.edit, 'POST', ['Course']),
    deleteCourse: createEndpoint(build, HRLinkApiEndpoints.resume.award.delete, 'DELETE', ['Course']),
  }),
  overrideExisting: false,
});

export const {useLazyFetchCoursesQuery , useLazyFetchCourseDetailQuery , useCreateCourseMutation , useDeleteCourseMutation , useEditCourseMutation} = CourseApi;
