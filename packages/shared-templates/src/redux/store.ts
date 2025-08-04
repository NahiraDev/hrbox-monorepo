import {
  configureStore,
  type Reducer,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore, type PersistConfig } from "redux-persist";

const mockStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  key: () => null,
  length: 0,
  clear: () => {},
};

const storage: Storage = typeof window !== 'undefined'
  ? require('redux-persist/lib/storage').default
  : mockStorage;

export const createStoreWithReducers = (rootReducer: Reducer) => {
  const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
    key: "root",
    storage,
    whitelist: ["language"],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
    devTools: {
      name: "HRBOX",
    },
  });

  const persistor = persistStore(store);

  return { store, persistor };
};
export type RootState = ReturnType<Reducer>;
export type AppDispatch = (...args: any[]) => any;
