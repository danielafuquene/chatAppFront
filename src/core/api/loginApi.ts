import { ENV } from "../../constants/constants";
import { baseApi } from "../../core/api/baseApi";

type LoginBodyRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  access: string;
  refreshToken: string;
};

type RefreshResponse = {
  access: string;
};

type RefreshBody = {
  refreshToken: string;
};

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginBodyRequest>({
      query: (body) => ({
        url: ENV.ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        body,
      }),
    }),
    refresh: builder.mutation<RefreshResponse, RefreshBody>({
      query: (body) => ({
        url: ENV.ENDPOINTS.AUTH.REFRESH,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
