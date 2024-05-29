import { apiSlice } from "../app/api/apiSlice";

import { Experience } from "../types";

interface ExperiencesResponse {
  total: number;
  limit: number;
  skip: number;
  data: Experience[];
}

interface AddExperiencePayload {
  title: string;
  company: string;
  interval: string;
}

export const experiencesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExperiences: builder.query<ExperiencesResponse, void>({
      query: () => "experiences",
    }),
    modifyExperience: builder.mutation<Experience, Partial<Experience>>({
      query: (payload) => ({
        url: `experiences/${payload.id}`,
        method: "PATCH",
        payload,
      }),
    }),
    deleteExperience: builder.mutation<void, number>({
      query: (id) => ({
        url: `experiences/${id}`,
        method: "DELETE",
      }),
    }),
    addExperience: builder.mutation<Experience, AddExperiencePayload>({
      query: (payload) => ({
        url: "experiences",
        method: "POST",
        payload,
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
