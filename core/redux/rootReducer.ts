import {
  combineReducers,
  type Reducer,
  type ReducersMapObject,
} from '@reduxjs/toolkit';

import { serviceRegistry } from '@core/helpers';
import errorReducers from '@core/redux/reducers/errors';
import languageReducers from '@core/redux/reducers/language';
import authReducers from '@core/redux/reducers/authSlice';
import formCacheReducers from '@core/redux/reducers/formCache';

export const baseReducers: ReducersMapObject = {
  language: languageReducers,
  error: errorReducers,
  auth: authReducers,
  formCache: formCacheReducers,
};

export const createRootReducer = (
  additionalReducers: ReducersMapObject = {},
) => {
  const pluginReducers: Record<any, Reducer> = serviceRegistry.getAllReducers();
  const pluginApis: any[] = serviceRegistry.getAllApis();

  return combineReducers({
    ...baseReducers,
    ...pluginReducers,
    ...Object.fromEntries(
      pluginApis.map((api) => [api.reducerPath, api.reducer]),
    ),
    ...additionalReducers,
  });
};
