import { createEndpoint } from '../../../../../../core';
import { HRLinkApiEndpoints } from '../../../../app/endpoints';
import { HRLinkBaseApi } from '../../../../app/baseApiConfig';

export const CourseApi = HRLinkBaseApi.injectEndpoints({
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
