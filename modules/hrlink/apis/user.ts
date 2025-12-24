import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from '@module/hrlink/app/baseApi';

export const userApiWithEndpoints = HRLinkApi.injectEndpoints({ 
    endpoints: (build) => ({
        fetchUser: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.get,
          tags: ['User'],
        }),

        editUser: createMutation<any, any>(build, {
          url: HRLinkApiEndpoints.user.edit,
          method: 'PUT',
          tags: ['User'],
        }),

        addUser: createMutation<any, any>(build, {
          url: HRLinkApiEndpoints.user.add,
          method: 'POST',
          tags: ['User'],
        }),

        fetchMilitaryStatus: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.getMilitaryStatus,
          tags: ['User'],
        }),

        fetchCity: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.getUserCity,
          tags: ['User'],
        }),

        downloadResume: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.downloadResume,
          tags: ['User'],
        }),

        fetchProfileAvatar: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.getProfileAvatar,
          tags: ['User'],
        }),

        editProfilePhoto: createMutation<any, any>(build, {
          url: HRLinkApiEndpoints.user.editProfilePhoto,
          method: 'PUT',
          tags: ['User'],
        }),

        fetchUserAboutMe: createQuery<any>(build, {
          url: HRLinkApiEndpoints.user.gatUserAboutMe,
          tags: ['User'],
        }),

        editAboutMe: createMutation<any, any>(build, {
          url: HRLinkApiEndpoints.user.editAboutMe,
          method: 'PUT',
          tags: ['User'],
        }),

        userEdTour: createMutation<any, any>(build, {
          url: HRLinkApiEndpoints.user.userEdTour,
          method: 'POST',
          tags: ['User'],
        }),

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
    useFetchCityQuery,
    useDownloadResumeQuery,
    useFetchProfileAvatarQuery,
    useEditProfilePhotoMutation,
    useFetchUserAboutMeQuery,
    useEditAboutMeMutation,
    useUserEdTourMutation,
    useFetchUserNotificationQuery,
} = userApiWithEndpoints;