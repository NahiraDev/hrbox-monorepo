import { combineReducers } from "@reduxjs/toolkit";

import languageReducer from "./language";

export const rootReducer = combineReducers({
  language: languageReducer,
});

export * from "./language";
