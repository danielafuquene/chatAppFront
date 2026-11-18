import { baseApi } from "../../core/api/baseApi";

type RegisterBodyRequest = {
  email: string;
  password: string;
};

type RegisterResponse = {
  email: string;
  password: string;
  id: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterBodyRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
