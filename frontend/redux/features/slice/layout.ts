import apiSlice from "../api/api.slice";

const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    insertLayout: builder.mutation({
      query: (data) => ({
        url: "/insert-layout",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    putLayout: builder.mutation({
      query: ({ type, faq, image, title, subTitle, category }) => ({
        url: "/edit-layout",
        method: "PUT",
        body: { type, faq, image, title, subTitle, category },
        credentials: "include" as const,
      }),
    }),
    getLayout: builder.query({
      query: (data) => ({
        url: `/get-layout/${data}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useInsertLayoutMutation,
  useGetLayoutQuery,
  usePutLayoutMutation,
} = layoutApi;
