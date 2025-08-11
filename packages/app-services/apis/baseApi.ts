import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { tagTypes } from "./tagTypes";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hrbox.com",
    credentials: "include",
  }),
  tagTypes,
  endpoints: () => ({}),
});
