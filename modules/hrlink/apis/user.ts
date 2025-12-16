import { createModuleApi } from '@hrbox/core/apis/baseApi';
import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';

export const userApiWithEndpoints = HRLinkApi.injectEndpoints({ 
    endpoints: (build) => ({
        // GET: Get user data
        fetchUser: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.get,
          tags: ['User'],
        }),

        // PUT: Edit user
        editUser: createMutation<any, any>(build, {
          url: HRLinkApiEndpoints.user.edit,
          method: 'PUT',
          tags: ['User'],
        }),

        // POST: Add user
        addUser: createMutation<any, any>(build, {
          url: HRLinkApiEndpoints.user.add,
          method: 'POST',
          tags: ['User'],
        }),

        // GET: Get military status
        fetchMilitaryStatus: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.getMilitaryStatus,
          tags: ['User'],
        }),

        // GET: Fetch cities
        fetchCity: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.getUserCity,
          tags: ['User'],
        }),

        // GET: Download resume
        downloadResume: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.downloadResume,
          tags: ['User'],
        }),

        // GET: Get profile avatar
        fetchProfileAvatar: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.getProfileAvatar,
          tags: ['User'],
        }),

        // PUT: Edit profile photo
        editProfilePhoto: createMutation<any, any>(build, {
          url: HRLinkApiEndpoints.user.editProfilePhoto,
          method: 'PUT',
          tags: ['User'],
        }),

        // GET: Get user about me
        fetchUserAboutMe: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.gatUserAboutMe,
          tags: ['User'],
        }),

        // PUT: Edit about me
        editAboutMe: createMutation<any, any>(build, {
          url: HRLinkApiEndpoints.user.editAboutMe,
          method: 'PUT',
          tags: ['User'],
        }),

        // POST: User ed tour
        userEdTour: createMutation<any, any>(build, {
          url: HRLinkApiEndpoints.user.userEdTour,
          method: 'POST',
          tags: ['User'],
        }),

        // GET: Get user notifications
        fetchUserNotification: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.getUserNotification,
          tags: ['User'],
        }),
    })
});

export const {
    useFetchUserQuery,
    useEditUserMutation,
    useAddUserMutation,
    // useFetchMilitaryStatusQuery,
    useFetchCityQuery,
    useDownloadResumeQuery,
    useFetchProfileAvatarQuery,
    useEditProfilePhotoMutation,
    useFetchUserAboutMeQuery,
    useEditAboutMeMutation,
    useUserEdTourMutation,
    useFetchUserNotificationQuery,
} = userApiWithEndpoints;