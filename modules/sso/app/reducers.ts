import { createRootReducer } from '@core/redux';
import { SSOHRLinkApi } from '@module/sso/features/HRLink/apis';

export const HRLinkReducers = createRootReducer({
  [SSOHRLinkApi.reducerPath]: SSOHRLinkApi.reducer,
});
