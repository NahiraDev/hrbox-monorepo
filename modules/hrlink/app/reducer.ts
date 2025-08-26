import { createRootReducer } from 'core/index';
import { JobsApi } from '../features/jobs/apis';

export const HRLinkReducers = createRootReducer({
  [JobsApi.reducerPath]: JobsApi.reducer,
});
