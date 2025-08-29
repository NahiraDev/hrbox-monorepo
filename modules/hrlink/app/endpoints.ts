const BaseUrl = "/DesktopModules/Freelancer/api";

export const HRLinkApiEndpoints = {
  resume:{
    award: {
      create: `${BaseUrl}/Award/Add`,
      edit: `${BaseUrl}/Award/Edit`,
      delete: `${BaseUrl}/Award/Delete`,
      search: `${BaseUrl}/Award/Search`,
      getList: `${BaseUrl}/Award/GetList`,
      getDetail: `${BaseUrl}/Award/Get`,
    },

    course: {
      create: `${BaseUrl}/Course/Add`,
      edit: `${BaseUrl}/Course/Edit`,
      delete: `${BaseUrl}/Course/Delete`,
      search: `${BaseUrl}/Course/Search`,
      getList: `${BaseUrl}/Course/GetCourseList?TypeId=2`,
      getDetail: `${BaseUrl}/Course/Get`,
    },

    education: {
      create: `${BaseUrl}/Education/Add`,
      edit: `${BaseUrl}/Education/Edit`,
      delete: `${BaseUrl}/Education/Delete`,
      search: `${BaseUrl}/Education/Search`,
      getList: `${BaseUrl}/Education/GetList`,
      getDetail: `${BaseUrl}/Education/Get`,
      getUniversity: `${BaseUrl}/Education/GetUniversity`,
      getField: `${BaseUrl}/MasterService/GetFieldOfEducation`,
    },

    experience: {
      create: `${BaseUrl}/Experience/Add`,
      edit: `${BaseUrl}/Experience/Edit`,
      delete: `${BaseUrl}/Experience/Delete`,
      search: `${BaseUrl}/Experience/Search`,
      getList: `${BaseUrl}/Experience/GetList`,
      getDetail: `${BaseUrl}/Experience/GetDetails`,
      typeOfActivity: `${BaseUrl}/Experience/TypeOfActivity`,
      getIndustries: `${BaseUrl}/MasterService/GetIndustrys`,
    },

    skill: {
      create: `${BaseUrl}/UserSkill/Add`,
      edit: `${BaseUrl}/UserSkill/Edit`,
      delete: `${BaseUrl}/UserSkill/Delete`,
      search: `${BaseUrl}/UserSkill/Search`,
      getListHard: `${BaseUrl}/UserSkill/UserSkillProfisionalAndSearch`,
      getListSoft: `${BaseUrl}/UserSkill/UserSkillGeneralAndSearch`,
      getByType: `${BaseUrl}/UserSkill/GetSkillsByType`,
      getByParentIdAndType: `${BaseUrl}/UserSkill/GetSkillsByParentIdAndType`,
    },
  },

  company: {
    getList: `${BaseUrl}/Company/GetCompaniesList`,
    sendRequest: `${BaseUrl}/Company/SendRequest`,
    getDetail: `${BaseUrl}/Company/GetDetail`,
    followOrUnfollow: `${BaseUrl}/Company/FollowAndUnFollowCompany`,
  },

  job: {
    offers: `${BaseUrl}/JobOffers/GetAndSearchJobOffer`,
    opportunities: `${BaseUrl}/JobOffers/GetAndSearchJobOpportunities`,
  },

  profile: {
    getInfo: `${BaseUrl}/Profile/GetProfile`,
    edit: `${BaseUrl}/Profile/EditProfile`,
    changePassword: `${BaseUrl}/profile/ChangePassword`,
    fetchSettings: `${BaseUrl}/Profile/GetGeneralSetting`,
    editSettings: `${BaseUrl}/Profile/EditGeneralSetting`,
  },

  user: {
    get: `${BaseUrl}/User/GetUser`,
    edit: `${BaseUrl}/User/Edit`,
    add: `${BaseUrl}/User/Add`,
    getMilitaryStatus: `${BaseUrl}/User/GetUserMilitaryStatus`,
    getUserCity: `${BaseUrl}/User/getUserCity`,
    downloadResume: `${BaseUrl}/User/DownloadResume`,
  },

  common: {
    getJobGroup: `${BaseUrl}/MasterService/GetJobGroup`,
    getJobCategory: `${BaseUrl}/MasterService/GetJobCategory`,
    getMilitaryStatus: `${BaseUrl}/MasterService/GetMilitaryStatus`,
    getPlaceByLevel: `${BaseUrl}/MasterService/GetPlaceByLevel`,
    getIndustry: `${BaseUrl}/MasterService/GetIndustrys`,
    getFieldOfEducation: `${BaseUrl}/MasterService/GetFieldOfEducation`,
    getRequestOrg: `${BaseUrl}/MasterService/GetRequestOrg`,
    addLocation: `${BaseUrl}/MasterService/AddLocation`,
    editLocation: `${BaseUrl}/MasterService/EditLocation`,
    getLocation: `${BaseUrl}/MasterService/GetLocation`,
    saveTemplateFile: `${BaseUrl}/MasterService/SaveTempFile`,
  },

  dashboard: {
    getData: `${BaseUrl}/Dashboard/GetAllAdaptionByUserId`,
  },
};
