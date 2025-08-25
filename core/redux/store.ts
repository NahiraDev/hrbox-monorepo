import type { Persistor } from 'redux-persist/es/types';

import {
  configureStore,
  type Reducer,
  type EnhancedStore,
} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  type PersistConfig,
} from 'redux-persist';

import { createRootReducer } from './rootReducer';

const asyncLocalStorage = {
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

const storageInstance =
  typeof window !== 'undefined' ? asyncLocalStorage : undefined;

export const createStoreWithReducers = (
  additionalReducers?: Reducer,
): { store: EnhancedStore; persistor: Persistor } => {
  const rootReducer = createRootReducer(
    additionalReducers ? { additional: additionalReducers } : {},
  );

  if (!storageInstance) {
    const store = configureStore({
      reducer: rootReducer,
      devTools: { name: 'HRBOX' },
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
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
export type AppDispatch = ReturnType<
  typeof createStoreWithReducers
>['store']['dispatch'];
