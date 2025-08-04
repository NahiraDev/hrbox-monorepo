export * from './store'
export * from './rootReducer'
export * from './reducers'
import { createStoreWithReducers } from "./store";
import { createRootReducer } from "./rootReducer";

const rootReducer = createRootReducer();

const { store, persistor } = createStoreWithReducers(rootReducer);

export { store, persistor };
