import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadUser } from "../slice/auth.slice";
import { apiDomain } from "@/helps";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain(),
  }),
  endpoints: (builder) => ({
    refresToken: builder.query({
      query: (data) => ({
        url: "/refresh-token",
        method: "GET",
        data: data,
        credentials: "include" as const,
      }),
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: "/get-user",
        method: "GET",
        data: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            loadUser({
              user: result.data,
            })
          );
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),
  }),
});
export const { useLoadUserQuery } = apiSlice;
export default apiSlice;
