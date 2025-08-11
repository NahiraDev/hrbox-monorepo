import { baseApi } from "../../../baseApi";

import { companyEndpoints } from "./endpoints";

const companyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCompanyList: build.query<any, void>({
      query: () => companyEndpoints.fetchList,
      providesTags: ["Company"],
    }),
    getDetail: build.query<any, string>({
      query: (id) => companyEndpoints.detail(id),
    }),
    sendRequest: build.mutation<any, string>({
      query: (id) => ({
        url: companyEndpoints.sendRequest(id),
        method: "POST",
      }),
      invalidatesTags: ["Company"],
    }),
  }),
  overrideExisting: false,
});

export default companyApi;
