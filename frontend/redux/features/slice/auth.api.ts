import apiSlice from "../api/api.slice";
import { loadUser, registrationUser } from "./auth.slice";

type registrationRes = {
  message: string;
  token: string;
};
type activationRes = {
  message: string;
  token: string;
  user: {};
};

type registrationData = {};

const authAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<registrationRes, registrationData>({
      query: (data) => ({
        url: "/register-user",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            registrationUser({
              token: result.data.token,
            })
          );
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),
    activationToken: builder.mutation({
      query: ({ activationCode, activationToken }) => ({
        url: "/create-user",
        method: "POST",
        body: {
          activationCode,
          activationToken,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            loadUser({
              token: result.data.token,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login-user",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            loadUser({
              token: result.data.access_Token,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: (data) => ({
        url: "/social-auth",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            loadUser({
              token: result.data.access_Token,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useActivationTokenMutation,
  useLoginUserMutation,
  useSocialAuthMutation,
} = authAPi;
