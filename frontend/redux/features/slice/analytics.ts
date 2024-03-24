import apiSlice from "../api/api.slice";

const analyticsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseAnalytics: builder.query({
      query: () => ({
        url: "/get-course-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUserAnalytics: builder.query({
      query: () => ({
        url: "/get-user-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrderAnalytics: builder.query({
      query: () => ({
        url: "/get-order-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetUserAnalyticsQuery,
  useGetOrderAnalyticsQuery,
  useGetCourseAnalyticsQuery,
} = analyticsSlice;
