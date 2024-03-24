"use client";
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./features/api/api.slice";
import authSlice from "./features/slice/auth.slice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const initialApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refresToken.initiate({}, { forceRefetch: true })
  );
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initialApp();
export default store;
