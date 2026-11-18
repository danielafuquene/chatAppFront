# Bitácora: lista de chats

## 2026-11-13

### Hecho

1. `src/features/chats/types/chatList.ts` — types de la respuesta y de la fila. `password` y `__v` no entran en `ChatListItem`.
2. `src/features/chats/components/chat/ChatListHeader.tsx` — título **Chats** y pastilla. La pastilla solo se pinta si llega un número.
3. `src/features/chats/components/chat/ChatSearchField.tsx` — lupa y `Buscar una conversación`.
4. `src/features/chats/components/chat/ChatFilters.tsx` — **Todos**, **No leídos**, **Favoritos**.
5. `src/features/chats/components/chat/ChatListItem.tsx` — nombre y fecha: hora si es hoy, `Ayer` si fue ayer, día corto si es anterior.
6. `src/features/chats/components/chat/ChatList.tsx` — filas. Al pulsar una, va a `chatRoomScreen` con `chatId`.
7. `src/features/chats/components/chat/ChatListPrivacyNote.tsx` — escudo y `Tus conversaciones, solo tuyas.`
8. `src/features/chats/components/chat/CreateChatButton.tsx` — `+` hacia `createChatScreen`.
9. `expo-sqlite` ~58.0.17. `npx expo install` también agregó el plugin en `app.json`. `src/features/chats/storage/chatListDb.ts` lee y reemplaza la lista. No guarda `password` ni `__v`.
10. `src/core/api/chatsApi.ts` — `newChatList` en RTK Query, tag `Chat`. Al tener respuesta, guarda la fila con el `id` de `useAuthStore` y sin `password`. El cierre de sesión ya limpia este cache con `resetApiState`.
11. `src/app/(tabs)/chatsScreen.tsx` — se quitó el placeholder. La lista sale de SQLite. La búsqueda filtra por nombre o correo. El filtro vive en memoria y al abrir la app vuelve a **Todos**.
12. `src/app/(tabs)/_layout.tsx` — header oculto en Chats. La tercera pestaña dice **Settings**. Siguen las tres rutas. El color del icono se pasa como texto cuando el tab lo entrega así.
13. `src/constants/constants.ts` — sin cambio. El path sigue sin definirse, así que no se agregó endpoint. `AUTH` y `USER` quedan igual.

`chatRoomScreen.tsx`, `createChatScreen.tsx`, `groupsScreen.tsx` y `settingsScreen.tsx` no se editaron.

### Dudas abiertas

1. Falta la ruta HTTP y el método. `newChatList` no se dispara y no hay URL inventada.
2. `unreadCount` no se calcula. La pastilla no muestra un número.
3. **No leídos** y **Favoritos** cambian la pastilla elegida, y no quitan filas.
4. La fila no lleva el texto del último mensaje ni el doble check.
5. No hay vista de carga, error ni lista vacía.
6. No está la fila `Tú · Notas`.
