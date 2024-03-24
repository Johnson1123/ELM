import apiSlice from "../api/api.slice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/get-all-user",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `/delete-by-id/${data}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    updateUserRole: builder.mutation({
      query: (data) => ({
        url: `/update-user-role`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = userApi;
