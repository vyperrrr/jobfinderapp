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
    modifyExperience: builder.mutation<Experience, Partial<Experience>>({
      query: (body) => ({
        url: `experiences/${body.id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useGetExperiencesQuery, useModifyExperienceMutation } =
  experiencesApi;
