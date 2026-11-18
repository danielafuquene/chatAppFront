import * as Keychain from "react-native-keychain";

const ACCESS_SERVICE = "chatapp.access";
const REFRESH_SERVICE = "chatapp.refresh";

async function writeSecret(service: string, secret: string): Promise<void> {
  const saved = await Keychain.setGenericPassword(service, secret, {
    service,
  });
  if (!saved) {
    throw new Error("No se pudo guardar la sesión");
  }
}

async function readSecret(service: string): Promise<string | null> {
  try {
    const credentials = await Keychain.getGenericPassword({ service });
    if (!credentials) {
      return null;
    }
    return credentials.password;
  } catch {
    return null;
  }
}

export async function saveTokens(
  access: string,
  refresh: string,
): Promise<void> {
  try {
    await writeSecret(ACCESS_SERVICE, access);
    await writeSecret(REFRESH_SERVICE, refresh);
  } catch (error) {
    await clearTokens();
    throw error;
  }
}

export async function saveAccessToken(access: string): Promise<void> {
  await writeSecret(ACCESS_SERVICE, access);
}

export function getAccessToken(): Promise<string | null> {
  return readSecret(ACCESS_SERVICE);
}

export function getRefreshToken(): Promise<string | null> {
  return readSecret(REFRESH_SERVICE);
}

export async function clearTokens(): Promise<void> {
  await Promise.all([
    Keychain.resetGenericPassword({ service: ACCESS_SERVICE }).catch(
      () => false,
    ),
    Keychain.resetGenericPassword({ service: REFRESH_SERVICE }).catch(
      () => false,
    ),
  ]);
}
