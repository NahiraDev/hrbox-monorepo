import { createRootReducer } from "@hrbox/shared-templates";
import type {Reducer} from "@reduxjs/toolkit";

const dummyReducer: Reducer<any> = (state = null, _action) => state;

export const rootReducer = createRootReducer({
  project: dummyReducer,
});
