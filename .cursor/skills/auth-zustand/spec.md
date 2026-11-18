# Spec de la app

## Pantallas que sí puede tocar

- Notas: lista privada. Solo se monta con sesión iniciada.
- Acceso: correo y contraseña.

<!-- ## Pantallas que no puede tocar

- Inicio.
 -->

## Librerías

- Estado de sesión: Zustand.
- Token: react-native-keychain.
- Navegación: la que ya está en el proyecto (expo Router). No agregues otra.

## Casos de uso

1. Iniciar sesion: Al iniciar sesion la peticion Login devuelve access y refresh donde vienen los token de autenticacion.
2. Respusta ok del servidor: al recibir el body guardar el token y el refresh mediante zustand de manera que el token quede activo en la app, como vairable global para cada pantalla
3. Guardar en Zustand: guardar en zustand tanto los access el refresh y el objeto usuario que se llama con la api getMe llamda en el login
4. Abrir la app: si hay token, la sesión pasa a la pantalla de chats (tabs/chatsScreen.tsx) . Si no hay, el estado queda en signedOut y se muestra la screen de index.tsx (login).
5. Salir o Cerrar sesion: se borra el token y el estado pasa a signedOut.
6. Token vencido: una sola función renueva la sesión o la pasa a signedOut.

## Variables globales

El store de Zustand se llama useAuthStore y solo guarda:

- status: token, refresh, setSession, setUser, logout
- user: id y nombre, o null
- aviso: texto de error, o null

El token no va en el store. Va en expo-secure-store.

<!-- La URL de la API va en EXPO_PUBLIC_API_URL. El modelo no inventa esa URL ni escribe el archivo .env. -->

## Plan

Antes de editar, el plan lista los archivos, la librería que usa cada uno y el caso de uso que cumple.
Si un caso se puede hacer de dos formas, el plan las numera y se detiene hasta que yo escriba el número.
