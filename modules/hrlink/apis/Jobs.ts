import { createMutation, createQuery } from "@hrbox/core/apis/createEndpoints";
import { HRLinkApiEndpoints } from "@module/hrlink/app/endpoints";
import { HRLinkApi } from "@module/hrlink/app/baseApi";

export const jobsApiEndpoints = HRLinkApi.injectEndpoints({
  endpoints: (build: any) => ({
    fetchJobOffers: createQuery<any>(build, {
      url: HRLinkApiEndpoints.job.getJobOfferDetail,
      tags: ["Jobs"],
    }),

    fetchJobOpportunities: createQuery<any>(build, {
      url: HRLinkApiEndpoints.job.opportunities,
      tags: ["Jobs"],
    }),

    fetchJobOfferDetail: createQuery<any>(build, {
      url: HRLinkApiEndpoints.job.getJobOfferDetail,
      tags: ["Jobs"],
    }),

    setTag: createMutation<any, any>(build, {
      url: HRLinkApiEndpoints.job.setTag,
      method: "POST",
      tags: ["Jobs"],
    }),

    fetchJobOpportunitiesDetail: createQuery<any>(build, {
      url: HRLinkApiEndpoints.job.useGetJobOpportunitiesDetail,
      tags: ["Jobs"],
    }),

    fetchUserOrganization: createQuery<any>(build, {
      url: HRLinkApiEndpoints.job.getUserOrganization,
      tags: ["Jobs"],
    }),

    fetchAboutCompany: createQuery<any>(build, {
      url: HRLinkApiEndpoints.job.getAboutCompany,
      tags: ["Jobs"],
    }),

    fetchJobOfferListDetail: createQuery<any>(build, {
      url: HRLinkApiEndpoints.job.getJobOfferListDetail,
      tags: ["Jobs"],
    }),

    fetchListJobOffer: createQuery<any>(build, {
      url: HRLinkApiEndpoints.job.getListJobOffer,
      tags: ["Jobs"],
    }),
  }),
});

export const {
  useFetchJobOffersQuery,
  useFetchJobOpportunitiesQuery,
  useFetchJobOfferDetailQuery,
  useSetTagMutation,
  useFetchJobOpportunitiesDetailQuery,
  useFetchUserOrganizationQuery,
  useFetchAboutCompanyQuery,
  useFetchJobOfferListDetailQuery,
  useFetchListJobOfferQuery,
} = jobsApiEndpoints;
