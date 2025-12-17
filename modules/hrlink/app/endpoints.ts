// import { useGetJobOpportunitiesSentQuery } from "apis";

const BaseUrl = "/DesktopModules/Freelancer/api";

export const HRLinkApiEndpoints = {
  resume:{
    award: {
      create: `/Award/Add`,
      edit: `/Award/Edit`,
      delete: `/Award/Delete`,
      getList: `/Award/GetList`,
      getDetail: `/Award/GetDetail`,
    },

    course: {
      create: `/Course/Add`,
      edit: `/Course/Edit`,
      getCourseList: 'Course/GetCourseTypeList',
      getInstituList: 'Course/GetInstitutionsList',
      delete: `/Course/Delete`,
      getList: `/Course/GetCourseList`,
      getDetail: `/Course/Get`,
      getCourses: 'Course/GetList',
    },

    education: {
      create: `/Education/Add`,
      edit: `/Education/Edit`,
      delete: `/Education/Delete`,
      getList: `/Education/GetList`,
      getDetail: `/Education/GetDetail`,
      getUniversity: `/Education/GetUniversity`,
      getFieldOfStudy: 'Education/fieldOfEducation',
    },

    experience: {
      create: `/Experience/Add`,
      edit: `/Experience/Edit`,
      delete: `/Experience/Delete`,
      getList: `/Experience/GetList`,
      getDetail: `/Experience/GetDetails`,
      typeOfActivity: `/Experience/TypeOfActivity`,
      reasonToQuite: 'Experience/ReasonsOfQuit',
    },

    skill: {
      create: `/UserSkill/Add`,
      edit: `/UserSkill/Edit`,
      delete: `/UserSkill/Delete`,
      getProfessionalSkills: `/UserSkill/UserSkillProfessionalAndSearch`,
      getAllSkills: `/UserSkill/UserSkillGeneralAndSearch`,
      getSoftSkill: `/UserSkill/GetSkillsByType?type=1`,
      getHardSkill: `/UserSkill/GetSkillsByType?type=2`,
      getUserSoftSkills: `/UserSkill/GetUserSkills?type=1`,
      getUserHardSkills: `/UserSkill/GetUserSkills?type=2`,
    },
  },

  company: {
    getList: `/Company/GetCompaniesList`,
    getEvents: `/Company/GetEvents`,
    sendRequest: `/Company/SendRequest`,
    getDetail: `/Company/GetDetail`,
    followOrUnfollow: `/Company/FollowAndUnFollowCompany`,
    reasyApply: 'Company/EasyApply',
    lookingForJobSituations: 'Company/LookingForJobSituations',
    getCompanyScore: 'Company/GetScore',
    easyApply: 'Company/EasyApply',
    orgOffer: 'Company/OrgOffers',
    allCompany: 'Company/GetAllCompany',
  },

  job: {
    offers: `/JobOffers/GetAndSearchJobOffer`,
    getJobOfferDetail: 'JobOffers/GetJobOfferDetail',
    setTag: 'JobOffers/SetTag',
    useGetJobOpportunitiesDetail: 'JobOffers/GetJobOpportunitiesDetail',
    getUserOrganization: 'JobOffers/GetUserOrganization',
    opportunities: `/JobOffers/GetAndSearchJobOpportunities`,
    getAboutCompany: 'JobOffers/AboutCompany',
    getJobOfferListDetail: 'JobOffers/GetListDetail',
    getListJobOffer: 'JobOffers/GetListJobOffer',
  },

  profile: {
    getInfo: `/Profile/GetProfile`,
    edit: `/Profile/EditProfile`,
    changePassword: `/profile/ChangePassword`,
    fetchSettings: `/Profile/GetGeneralSetting`,
    editSettings: `/Profile/EditGeneralSetting`,
    deactivateAccount: '/Profile/DeactiveAccount',
  },

  user: {
    get: `/User/GetUser`,
    edit: `/User/Edit`,
    add: `/User/Add`,
    getMilitaryStatus: `/User/GetUserMilitaryStatus`,
    getUserCity: `/User/getUserCity`,
    downloadResume: `/User/DownloadResume`,
    getProfileAvatar: '/User/GetProfilePhoto',
    editProfilePhoto: 'User/EditProfilePhoto',
    gatUserAboutMe: '/User/AboutMe',
    editAboutMe: 'User/EditAboutMe',
    userEdTour: 'User/EdTour',
    getUserNotification: 'User/GetUserNotification',
  },

  common: {
    getJobGroup: `/MasterService/GetJobGroup`,
    getJobCategory: `/MasterService/GetJobCategory`,
    getMilitaryStatus: `/MasterService/GetMilitaryStatus`,
    getPlaceByLevel: `/MasterService/GetPlaceByLevel`,
    getIndustry: `/MasterService/GetIndustrys`,
    getFieldOfEducation: `/MasterService/GetFieldOfEducation`,
    getRequestOrg: `/MasterService/GetRequestOrg`,
    addLocation: `/MasterService/AddLocation`,
    editLocation: `/MasterService/EditLocation`,
    getLocation: `/MasterService/GetLocation`,
    deleteLocation: `MasterService/DeleteLocation`,
    saveTempFile: `/MasterService/SaveTempFile`,
    deleteFile: '/MasterService/DeleteFile'
  },

  dashboard: {
    getViewResume: `/Dashboard/ViewedResumes`,
    getResumePercent: `/Dashboard/GetResumePercent`,
    getJobOpportunitiesSent: '/Dashboard/GetJobOpportunitiesSent',
    getCompaniesList: '/Company/GetCompaniesList',
    // THIS MIGHT BE DEPRECATED
    getData: `/Dashboard/GetAllAdaptionByUserId`,
  },
};
