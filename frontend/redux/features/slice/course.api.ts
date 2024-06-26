import apiSlice from "../api/api.slice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourse: builder.query({
      query: () => ({
        url: "/get-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourse: builder.query({
      query: (id) => ({
        url: `/get-course/${id}`,
        method: "Get",
        credentials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `/get-course-content/${id}`,
        method: "Get",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useGetCourseQuery,
  useGetCourseContentQuery,
} = courseApi;
