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
    deleteExperience: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `experiences/${id}`,
        method: "DELETE",
      }),
    }),
    addExperience: builder.mutation<Experience, Experience>({
      query: (body) => ({
        url: "experiences",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useModifyExperienceMutation,
  useDeleteExperienceMutation,
  useAddExperienceMutation,
} = experiencesApi;
