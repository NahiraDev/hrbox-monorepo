import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { moduleRegistry } from '@hrbox/modules/registry';
import { ssoApiWithEndpoints } from '@hrbox/modules/sso/apis/Auth';
import authReducer from '@hrbox/core/redux/slices/authSlice';
import themeReducer from '@hrbox/core/redux/slices/themeSlice';
import languageReducer from '@hrbox/core/redux/slices/languageSlice';
import formCacheReducer from '@hrbox/core/redux/slices/formCacheSlice';
import {settingApiWithEndpoints} from "@hrbox/modules/hrlink/apis/Setting";

const persistConfig = {
  key: 'hrbox-v3',
  storage,
  whitelist: ['auth', 'theme', 'language'],
};

export function createStoreWithModules(ENABLED_MODULES: string[]) {
  const moduleReducers = moduleRegistry.getAllReducers();
  const moduleApis = moduleRegistry.getAllApis();

  const rootReducer = (state: any = {}, action: any) => ({
    auth: authReducer(state.auth, action),
    theme: themeReducer(state.theme, action),
    language: languageReducer(state.language, action),
    formCache: formCacheReducer(state.formCache, action),
    [ssoApiWithEndpoints.reducerPath]: ssoApiWithEndpoints.reducer(state[ssoApiWithEndpoints.reducerPath], action),
    [settingApiWithEndpoints.reducerPath]: settingApiWithEndpoints.reducer(state[settingApiWithEndpoints.reducerPath], action),
    ...Object.fromEntries(
      Object.entries(moduleReducers).map(([key, reducer]) => [
        key,
        reducer(state[key], action),
      ])
    ),
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(
        moduleApis
          .filter((api) => api.middleware)
          .map((api) => api.middleware)
          .concat(ssoApiWithEndpoints.middleware)
          .concat(settingApiWithEndpoints.middleware)
      ),
    devTools: import.meta.env.DEV,
  });

  setupListeners(store.dispatch);

  const persistor = persistStore(store);

  return { store, persistor };
}

export type RootState = ReturnType<
  ReturnType<typeof createStoreWithModules>['store']['getState']
>;
export type AppDispatch = ReturnType<
  typeof createStoreWithModules
>['store']['dispatch'];