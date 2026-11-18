# Archivos: lista de chats

Un paso por archivo. El orden de abajo es el orden de implementación.

## Archivos nuevos

### Paso 1. `src/features/chats/types/chatList.ts`

Types de `spec.md`: `ChatParticipantResponse`, `ChatResponse`, `ChatsFoundResponse`, `ChatFilter`, `ChatListItem` y `ChatList`.

`password` y `__v` no entran en `ChatListItem`.

### Paso 2. `src/features/chats/components/chat/ChatListHeader.tsx`

Título **Chats** y la pastilla de chats sin leer. El texto `cerca` no va.

### Paso 3. `src/features/chats/components/chat/ChatSearchField.tsx`

Lupa y el texto `Buscar una conversación`. Filtra la lista ya cargada, por nombre o correo.

### Paso 4. `src/features/chats/components/chat/ChatFilters.tsx`

**Todos**, **No leídos** y **Favoritos**. Al abrir la app vuelve a **Todos**. El filtro no se guarda.

### Paso 5. `src/features/chats/components/chat/ChatListItem.tsx`

Nombre del otro participante y la fecha formateada de `lastMessageDate`. Hoy se muestra como hora (`09:38`), ayer como `Ayer`, y una fecha anterior como día corto (`Lun`).

### Paso 6. `src/features/chats/components/chat/ChatList.tsx`

Lista de filas. Al pulsar una fila navega a `chatRoomScreen`.

### Paso 7. `src/features/chats/components/chat/ChatListPrivacyNote.tsx`

Escudo y el texto `Tus conversaciones, solo tuyas.`

### Paso 8. `src/features/chats/components/chat/CreateChatButton.tsx`

Botón `+`. Navega a `createChatScreen`.

### Paso 9. `src/features/chats/storage/chatListDb.ts`

Lectura y escritura de la lista en SQLite para abrirla sin red. No guarda `password` ni `__v`. Este paso espera la instalación aprobada de `expo-sqlite`.

### Paso 10. `src/core/api/chatsApi.ts`

Pedir `newChatList` con RTK Query. El cache se limpia al cerrar sesión. El path y el método siguen en las dudas de `spec.md`.

## Archivos a modificar

### Paso 11. `src/app/(tabs)/chatsScreen.tsx`

Se conserva la ruta y el nombre del archivo. Se quita el placeholder y la pantalla se arma con los componentes de `src/features/chats/components/chat/`.

### Paso 12. `src/app/(tabs)/_layout.tsx`

En Chats se oculta el header del sistema, porque el título va dentro de la pantalla. La tercera pestaña pasa de `Ajustes` a `Settings`. Se conservan las tres rutas del tab.

### Paso 13. `src/constants/constants.ts`

Agregar el endpoint de chats cuando el path esté definido. Se conservan `AUTH` y `USER`.

`chatRoomScreen.tsx`, `createChatScreen.tsx`, `groupsScreen.tsx` y `settingsScreen.tsx` no cambian con este frame.
