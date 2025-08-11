import type { Persistor } from "redux-persist/es/types";
import { configureStore, type Reducer, type EnhancedStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
export declare const createStoreWithReducers: (rootReducer: Reducer) => {
    store: EnhancedStore;
    persistor: Persistor;
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof configureStore>["dispatch"];
//# sourceMappingURL=store.d.ts.map