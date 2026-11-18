import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/src/global.css";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

//uso para rtk
import { Provider } from "react-redux";
import { store } from "../../src/core/store";

import { connectSocket } from "../core/socket/sockets";
import { useAuthStore } from "../core/store/useAuthStore";

connectSocket();

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {}
        <GluestackUIProvider mode="dark">
          <RootNavigation />
        </GluestackUIProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

function RootNavigation() {
  const router = useRouter();
  const segments = useSegments();
  const status = useAuthStore((state) => state.status);
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = status === "signedIn";

  useEffect(() => {
    if (hydrated) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    const root = (segments as readonly string[])[0];
    const atLogin = root === undefined || root === "index";
    const isAuthRoute = atLogin || root === "registerUser";
    if (!isAuthenticated && !isAuthRoute) {
      router.replace("/");
    } else if (isAuthenticated && atLogin) {
      router.replace("/(tabs)/chatsScreen");
    }
  }, [hydrated, isAuthenticated, router, segments]);

  if (!hydrated) {
    return null;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#0a0a0a" },
        headerStyle: { backgroundColor: "#0a0a0a" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: "Login" }}
      />
      <Stack.Screen
        name="registerUser"
        options={{ headerShown: true, title: "Crear Cuenta" }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="chatRoomScreen"
        options={{ headerShown: true, title: "Chat" }}
      />
      <Stack.Screen
        name="changeName"
        options={{
          headerShown: true,
          title: "Cambiar Nombre",
          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "#000000",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="changeLastName"
        options={{
          headerShown: true,
          title: "Cambiar apellido",
          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "#000000",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      {}
    </Stack>
  );
}
