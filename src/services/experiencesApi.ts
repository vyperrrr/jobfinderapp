import { apiSlice } from "../app/api/apiSlice";

import { Experience } from "../types";

type ExperiencesResponse = {
  total: number;
  limit: number;
  skip: number;
  data: Experience[];
};

export const experiencesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExperiences: builder.query<ExperiencesResponse, void>({
      query: () => "experiences",
    }),
  }),
});

export const { useGetExperiencesQuery } = experiencesApi;
