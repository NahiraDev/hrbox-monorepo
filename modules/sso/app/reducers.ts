import { createRootReducer } from '@core/redux';
import { SSOHRLinkApi } from '@module/sso/features/HRLink/apis';
import authReducer from "@core/redux/reducers/authSlice"

export const HRLinkReducers = createRootReducer({
  [SSOHRLinkApi.reducerPath]: SSOHRLinkApi.reducer,
});
