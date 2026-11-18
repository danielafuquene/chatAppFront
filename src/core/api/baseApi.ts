import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { ENV } from "../../constants/constants";
import { getAccessToken } from "../auth/tokenStorage";
import { refreshSession } from "../store/useAuthStore";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: ENV.API_URL,
  prepareHeaders: async (headers) => {
    const token = await getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

function requestUrl(args: string | FetchArgs): string {
  return typeof args === "string" ? args : args.url;
}

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  const isRefresh = requestUrl(args).includes(ENV.ENDPOINTS.AUTH.REFRESH);
  if (result.error?.status === 401 && !isRefresh) {
    const renewed = await refreshSession();
    if (renewed) {
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User", "Chat"],
  endpoints: (builder) => ({}),
});
