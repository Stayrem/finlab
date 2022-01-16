import { configureStore } from '@reduxjs/toolkit';
import * as reducers from './rootReducer';

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});
export type RootState = ReturnType<typeof store.getState>

export default store;
