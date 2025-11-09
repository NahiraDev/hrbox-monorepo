import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { moduleRegistry } from '@hrbox/modules/registry';

// Core slices
import authReducer from '@core/redux/slices/authSlice';
import themeReducer from '@core/redux/slices/themeSlice';
import languageReducer from '@core/redux/slices/languageSlice';
import formCacheReducer from '@core/redux/slices/formCacheSlice';

const persistConfig = {
  key: 'hrbox-v3',
  storage,
  whitelist: ['auth', 'theme', 'language'],
};

export function createStoreWithModules(enabledModules: string[]) {
  const moduleReducers = moduleRegistry.getAllReducers();
  const moduleApis = moduleRegistry.getAllApis();

  // Combine all slices
  const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    language: languageReducer,
    formCache: formCacheReducer,
    ...moduleReducers,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // Create store
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      });

      moduleApis.forEach((api) => {
        if (api.middleware) {
          middleware.push(api.middleware);
        }
      });

      return middleware;
    },
    devTools: import.meta.env.DEV,
  });

  setupListeners(store.dispatch);

  const persistor = persistStore(store);

  return { store, persistor };
}

export type RootState = ReturnType<ReturnType<typeof createStoreWithModules>['store']['getState']>;
export type AppDispatch = ReturnType<typeof createStoreWithModules>['store']['dispatch'];