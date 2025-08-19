import type { Persistor } from 'redux-persist/es/types';
import { type Reducer, type EnhancedStore } from '@reduxjs/toolkit';
import { createRootReducer } from './rootReducer';
export declare const createStoreWithReducers: (additionalReducers?: Reducer) => {
    store: EnhancedStore;
    persistor: Persistor;
};
export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
export type AppDispatch = ReturnType<typeof createStoreWithReducers>['store']['dispatch'];
//# sourceMappingURL=store.d.ts.map