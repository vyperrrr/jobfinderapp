import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { jobsApi } from "../features/JobList/jobsApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(jobsApi.middleware),
});
