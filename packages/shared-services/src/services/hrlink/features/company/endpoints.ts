import { HRLinkApiEndpoints } from "@hrbox/shared-templates";

export const companyEndpoints = {
  fetchList: HRLinkApiEndpoints.Company.list,
  detail: (id: string) => `${HRLinkApiEndpoints.Company.detail}?OrgId=${id}`,
  sendRequest: (id: string) => `${HRLinkApiEndpoints.Company.sendRequest}?OrgId=${id}`,
};
