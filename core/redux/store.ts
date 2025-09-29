import type { Persistor } from 'redux-persist/es/types';

import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import { type PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { serviceRegistry } from '@core/helpers';

import { createRootReducer } from '@core/redux';

const storageInstance = {
  getItem: (key: string) => {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem: (key: string, value: string) => {
    return Promise.resolve(window.localStorage.setItem(key, value));
  },
  removeItem: (key: string) => {
    return Promise.resolve(window.localStorage.removeItem(key));
  },
};

export const createStoreWithReducers = (): { store: EnhancedStore; persistor: Persistor } => {
  const rootReducer = createRootReducer({});
  const pluginApis: any[] = serviceRegistry.getAllApis();
  const uniqueMiddlewares = Array.from(new Set(pluginApis.map((api) => api.middleware)));

  if (!storageInstance) {
    const store = configureStore({
      reducer: rootReducer,
      devTools: { name: 'HRBOX' },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(uniqueMiddlewares),
    });

    return { store, persistor: null as unknown as Persistor };
  }

  const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
    key: 'root',
    storage: storageInstance,
    whitelist: ['language'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    devTools: { name: 'HRBOX' },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'persist/PERSIST',
            'persist/REHYDRATE',
            'persist/FLUSH',
            'persist/PAUSE',
            'persist/PURGE',
            'persist/REGISTER',
          ],
        },
      }).concat(uniqueMiddlewares),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};
export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
export type AppDispatch = ReturnType<typeof createStoreWithReducers>['store']['dispatch'];
