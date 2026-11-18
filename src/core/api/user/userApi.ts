import { ENV } from "../../../constants/constants";
import { baseApi } from "../../../core/api/baseApi";
import type { AuthUser } from "../../store/useAuthStore";

type User = {
  id: string;
  email: string;
  name?: string;
};

export type MeResponse = {
  msg: {
    _id: string;
    email: string;
    firstname?: string;
    lastname?: string;
    avatar?: string;
  };
};

export function toAuthUser(response: MeResponse): AuthUser {
  const user = response.msg;
  return {
    id: user._id,
    name: user.firstname || "",
    lastName: user.lastname || "",
    email: user.email,
    image: user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : null,
  };
}

export const getUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `${ENV.ENDPOINTS.USER.GET_USER}/${id}`,
        method: "GET",
      }),
    }),
    getMe: builder.query<MeResponse, void>({
      query: () => ENV.ENDPOINTS.USER.GET_ME,
    }),
    updateMe: builder.mutation<{ ok: boolean; msg: string }, FormData>({
      query: (body) => ({
        url: ENV.ENDPOINTS.USER.GET_ME,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery, // se dispara solo al montar / si cambia el id
  useLazyGetUserByIdQuery, // tú decides cuándo
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdateMeMutation,
} = getUserApi;
