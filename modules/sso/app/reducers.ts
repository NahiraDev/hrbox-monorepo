import { createRootReducer } from 'core/index';
import { SSOHRLinkApi } from '../features/HRLink/apis';

export const HRLinkReducers = createRootReducer({
  [SSOHRLinkApi.reducerPath]: SSOHRLinkApi.reducer,
});
