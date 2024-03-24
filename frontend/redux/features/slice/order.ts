import apiSlice from "../api/api.slice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPublishableKey: builder.query({
      query: () => ({
        url: "/get-publishableKey",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPayment: builder.mutation({
      query: (amount) => ({
        url: "/create-payment",
        body: { amount },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ course, payment_info }) => ({
        url: "/create-order",
        method: "POST",
        body: { course, payment_info },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useCreateOrderMutation,
  useGetPublishableKeyQuery,
} = orderApi;
