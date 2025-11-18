const BaseUrl = "/DesktopModules/Freelancer/api";

export const HRLinkApiEndpoints = {
  resume:{
    award: {
      create: `/Award/Add`,
      edit: `/Award/Edit`,
      delete: `/Award/Delete`,
      getList: `/Award/GetList`,
      getDetail: `/Award/Get`,
    },

    course: {
      create: `/Course/Add`,
      edit: `/Course/Edit`,
      delete: `/Course/Delete`,
      getList: `/Course/GetCourseList?TypeId=2`,
      getDetail: `/Course/Get`,
    },

    education: {
      create: `/Education/Add`,
      edit: `/Education/Edit`,
      delete: `/Education/Delete`,
      getList: `/Education/GetList`,
      getDetail: `/Education/Get`,
      getUniversity: `/Education/GetUniversity`,
      getField: `/MasterService/GetFieldOfEducation`,
    },

    experience: {
      create: `/Experience/Add`,
      edit: `/Experience/Edit`,
      delete: `/Experience/Delete`,
      getList: `/Experience/GetList`,
      getDetail: `/Experience/GetDetails`,
      typeOfActivity: `/Experience/TypeOfActivity`,
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
  },

  job: {
    offers: `/JobOffers/GetAndSearchJobOffer`,
    opportunities: `/JobOffers/GetAndSearchJobOpportunities`,
  },

  profile: {
    getInfo: `/Profile/GetProfile`,
    edit: `/Profile/EditProfile`,
    changePassword: `/profile/ChangePassword`,
    fetchSettings: `/Profile/GetGeneralSetting`,
    editSettings: ` /Profile/EditGeneralSetting`,
  },

  user: {
    get: `/User/GetUser`,
    edit: `/User/Edit`,
    add: `/User/Add`,
    getMilitaryStatus: `/User/GetUserMilitaryStatus`,
    getUserCity: `/User/getUserCity`,
    downloadResume: `/User/DownloadResume`,
    getProfileAvatar: '/User/GetProfilePhoto'
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
    saveTemplateFile: `/MasterService/SaveTempFile`,
    deleteTemplateFile: '/MasterService/DeleteFile'
  },

  dashboard: {
    getViewResume: `/Dashboard/ViewedResumes?count=12`,
    getResumePercent: `/Dashboard/GetResumePercent`,
    getJobOpportunitiesSent: '/Dashboard/GetJobOpportunitiesSent?page=0&pageSize=10',
    getCompaniesList: '/Company/GetCompaniesList?page=0&pageSize=12',
    getData: `/Dashboard/GetAllAdaptionByUserId`,
  },
};
