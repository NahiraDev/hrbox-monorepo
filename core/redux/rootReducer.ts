import {
  combineReducers,
  type Reducer,
  type ReducersMapObject,
} from '@reduxjs/toolkit';

import { serviceRegistry } from '../helpers';

import { languageReducers, errorReducers } from './reducers';

export const baseReducers: ReducersMapObject = {
  language: languageReducers,
  error: errorReducers,
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
