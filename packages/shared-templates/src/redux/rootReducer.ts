import {combineReducers, type ReducersMapObject} from "@reduxjs/toolkit";
import languageReducer from "./reducers/language";

const baseReducers = {
  language: languageReducer,
};

export const createRootReducer = (additionalReducers: ReducersMapObject = {}) => {
  return combineReducers({
    ...baseReducers,
    ...additionalReducers,
  });
};
