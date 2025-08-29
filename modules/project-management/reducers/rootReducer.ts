import type { Reducer } from '@reduxjs/toolkit';

import { createRootReducer } from 'core';

const dummyReducer: Reducer<any> = (state = null, _action) => state;

createRootReducer({
  project: dummyReducer,
});
