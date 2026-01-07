import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { moduleRegistry } from "@hrbox/modules/registry";
import { ssoApiWithEndpoints } from "@hrbox/modules/sso/apis/Auth";
import authReducer from "@hrbox/core/redux/slices/authSlice";
import themeReducer from "@hrbox/core/redux/slices/themeSlice";
import languageReducer from "@hrbox/core/redux/slices/languageSlice";
import formCacheReducer from "@hrbox/core/redux/slices/formCacheSlice";
import dnnSupervisorEditSlice from "@hrbox/core/redux/slices/dnnSupervisorEditSlice";
import profile from "@hrbox/core/redux/slices/profile";
import messengerAction from "@hrbox/core/redux/slices/messengerAction";
import messageAction from "@hrbox/core/redux/slices/messageAction";
import { HRLinkApi } from "@hrbox/modules/hrlink/app/baseApi";
import { MessengerApi } from "@hrbox/modules/messenger/app/baseApi";
import jdFilterReducer from "@hrbox/core/redux/slices/jdFilterSlice";
import searchReducer from "@hrbox/core/redux/slices/searchSlice";


const persistConfig = {
  key: "hrbox-v3",
  storage,
  whitelist: ["auth", "theme", "language", "user", "messageAction", "messengerAction"]
};

let _store: any = null;
let _persistor: any = null;

export function createStoreWithModules(ENABLED_MODULES: string[]) {
  const moduleReducers = moduleRegistry.getAllReducers();
  const moduleApis = moduleRegistry.getAllApis();

  const rootReducer = (state: any = {}, action: any) => ({
    auth: authReducer(state.auth, action),
    theme: themeReducer(state.theme, action),
    language: languageReducer(state.language, action),
    formCache: formCacheReducer(state.formCache, action),
    dnnSupervisorEdit: dnnSupervisorEditSlice(state.dnnSupervisorEdit, action),
    jdFilter: jdFilterReducer(state.jdFilter, action),
    profile: profile(state.profile, action),
    messengerAction: messengerAction(state.messengerAction, action),
    messageAction: messageAction(state.messageAction, action),
    search: searchReducer(state.search, action),
    [ssoApiWithEndpoints.reducerPath]: ssoApiWithEndpoints.reducer(state?.[ssoApiWithEndpoints.reducerPath], action),
    [HRLinkApi.reducerPath]: HRLinkApi.reducer(state?.[HRLinkApi.reducerPath], action),
    [MessengerApi.reducerPath]: MessengerApi.reducer(state?.[MessengerApi.reducerPath], action),

    ...Object.fromEntries(
      Object.entries(moduleReducers).map(([key, reducer]) => [
        key,
        reducer(state[key], action)
      ])
    )
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
        }
      }).concat(
        moduleApis
          .filter((api) => api.middleware)
          .map((api) => api.middleware)
          .concat(ssoApiWithEndpoints.middleware)
          .concat(HRLinkApi.middleware)
          .concat(MessengerApi.middleware)
      ),
    devTools: import.meta.env.DEV
  });

  setupListeners(store.dispatch);

  const persistor = persistStore(store);

  _store = store;
  _persistor = persistor;

  return { store, persistor };
}

export function getStore() {
  if (!_store) {
    throw new Error("Store not initialized! Call createStoreWithModules() first");
  }
  return _store;
}

export function getPersistor() {
  if (!_persistor) {
    throw new Error("Persistor not initialized! Call createStoreWithModules() first");
  }
  return _persistor;
}

export type RootState = ReturnType<typeof createStoreWithModules>["store"]["getState"];
export type AppDispatch = ReturnType<typeof createStoreWithModules>["store"]["dispatch"];