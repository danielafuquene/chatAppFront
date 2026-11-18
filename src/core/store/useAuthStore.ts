import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveTokens,
} from "../auth/tokenStorage";

export type AuthUser = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  image: string | null;
};

export type SessionStatus = "loading" | "signedIn" | "signedOut";

type AuthState = {
  status: SessionStatus;
  user: AuthUser | null;
  aviso: string | null;
  hydrated: boolean;
  setSession: (access: string, refresh: string) => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setAviso: (aviso: string | null) => void;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  hydrate: () => Promise<void>;
};

let sessionEpoch = 0;
let refreshInFlight: Promise<boolean> | null = null;
let hydrateInFlight: Promise<void> | null = null;

async function resetServerCache(): Promise<void> {
  const { store } = await import("./index");
  const { baseApi } = await import("../api/baseApi");
  store.dispatch(baseApi.util.resetApiState());
}

export function refreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    const epoch = sessionEpoch;
    refreshInFlight = runRefresh(epoch).finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

async function runRefresh(epoch: number): Promise<boolean> {
  if (epoch !== sessionEpoch) {
    return false;
  }

  const refreshToken = await getRefreshToken();
  if (epoch !== sessionEpoch) {
    return false;
  }
  if (!refreshToken) {
    await useAuthStore.getState().logout();
    return false;
  }

  try {
    const { store } = await import("./index");
    const { loginApi } = await import("../api/loginApi");
    const request = store.dispatch(
      loginApi.endpoints.refresh.initiate({ refreshToken }),
    );
    const body = await request.unwrap();
    if (epoch !== sessionEpoch) {
      return false;
    }
    if (!body.access) {
      await useAuthStore.getState().logout();
      return false;
    }
    await saveAccessToken(body.access);
    if (epoch !== sessionEpoch) {
      return false;
    }
    useAuthStore.setState({ status: "signedIn", aviso: null });
    return true;
  } catch {
    if (epoch === sessionEpoch) {
      await useAuthStore.getState().logout();
    }
    return false;
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      status: "loading",
      user: null,
      aviso: null,
      hydrated: false,
      setSession: async (access, refresh) => {
        await saveTokens(access, refresh);
        set({ status: "signedIn", user: null, aviso: null });
      },
      setUser: (user) => set({ user }),
      setAviso: (aviso) => set({ aviso }),
      logout: async () => {
        sessionEpoch += 1;
        await clearTokens();
        set({ status: "signedOut", user: null, aviso: null });
        queueMicrotask(() => {
          void resetServerCache();
        });
      },
      refreshSession,
      hydrate: () => {
        if (!hydrateInFlight) {
          hydrateInFlight = (async () => {
            try {
              const access = await getAccessToken();
              if (access) {
                set({ status: "signedIn", hydrated: true });
                return;
              }
              set({
                status: "signedOut",
                user: null,
                aviso: null,
                hydrated: true,
              });
            } catch {
              set({
                status: "signedOut",
                user: null,
                aviso: null,
                hydrated: true,
              });
            }
          })();
        }
        return hydrateInFlight;
      },
    }),
    {
      name: "auth-session",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        status: state.status === "loading" ? "signedOut" : state.status,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        const hydrate = state?.hydrate ?? useAuthStore.getState().hydrate;
        void hydrate();
      },
    },
  ),
);

useAuthStore.persist.onFinishHydration(() => {
  void useAuthStore.getState().hydrate();
});

export const selectStatus = (state: AuthState) => state.status;
export const selectUser = (state: AuthState) => state.user;
export const selectAviso = (state: AuthState) => state.aviso;
export const selectIsAuthenticated = (state: AuthState) =>
  state.status === "signedIn";
