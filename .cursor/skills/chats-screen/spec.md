# Spec: lista de chats

## Frames leídos

Frame de la lista con datos. El texto `cerca` no va.

- Título **Chats** y una pastilla con la cantidad de chats sin leer.
- Buscador con lupa y el texto `Buscar una conversación`. Filtra la lista que ya está cargada. No abre otra pantalla ni llama otra vez a la API.
- Filtros: **Todos**, **No leídos**, **Favoritos**. Al abrir la app, con la sesión todavía activa, vuelve a **Todos**. Favoritos solo cambia lo que se ve mientras la app sigue abierta.
- Cada fila, con el contrato de la captura, puede mostrar el nombre del otro participante y la fecha de `lastMessageDate`.
- Pie: escudo y `Tus conversaciones, solo tuyas.`
- Botón `+`.
- Pestañas: **Chats**, **Grupos**, **Settings**.

El punto verde y `Escribiendo...` quedan fuera de esta feature.

La hora de la fila sale de `lastMessageDate`: si es hoy, la hora (`09:38`); si fue ayer, `Ayer`; si es anterior, el día corto (`Lun`).

## Rutas

| Ruta | Papel |
| --- | --- |
| `src/app/(tabs)/chatsScreen.tsx` | Este frame. Ya existe. |
| `src/app/chatRoomScreen.tsx` | Destino de la fila. Ya existe. |
| `src/app/createChatScreen.tsx` | Destino del `+`. Ya existe. |
| `src/app/(tabs)/groupsScreen.tsx` | Solo la pestaña. Ya existe. |
| `src/app/(tabs)/settingsScreen.tsx` | Solo la pestaña. Ya existe. |

## Casos de uso

1. Abrir la pestaña Chats y ver la lista. Si no hay red, se lee la copia de SQLite.
2. Buscar sobre esa lista, por nombre o correo del otro participante.
3. Elegir Todos, No leídos o Favoritos. Al volver a abrir la app, Todos.
4. Pulsar una fila y ir a `chatRoomScreen`.
5. Pulsar `+` e ir a `createChatScreen`.
6. Cambiar a Grupos o Settings.

## Librerías

| Librería | Motivo |
| --- | --- |
| expo-router | Tab actual, fila hacia la sala y `+` hacia crear chat. |
| RTK Query | Pedir `newChatList`. El cache se limpia al cerrar sesión. |
| expo-sqlite | Guardar la lista para abrirla sin red. No está en `package.json`. Hace falta la frase `Apruebo instalar expo-sqlite`. |
| Zustand | Solo la sesión que ya existe, para saber cuál participante soy yo. El filtro no se guarda. |
| @expo/vector-icons | Lupa, escudo, `+` y pestañas. Ya está en el proyecto. |
| NativeWind | Mismo estilo con `className` que el resto de pantallas. |

`expo-image` queda reservado para cuando el contrato traiga una foto. Esta respuesta no trae URL.

## Types y objetos

La captura responde así:

```ts
type ChatParticipantResponse = {
  _id: string;
  email: string;
  password: string;
  __v: number;
  firstname?: string;
  lastname?: string;
};

type ChatResponse = {
  _id: string;
  participant_one: ChatParticipantResponse;
  participant_two: ChatParticipantResponse;
  __v: number;
  lastMessageDate: string;
};

type ChatsFoundResponse = {
  msg: string;
  newChatList: ChatResponse[];
};
```

`password` llega en el JSON. No se pinta, no se escribe en SQLite y no entra al objeto de la lista. Tampoco se guarda `__v`.

Objeto de la fila:

```ts
type ChatFilter = "all" | "unread" | "favorites";

type ChatListItem = {
  id: string;
  otherParticipantId: string;
  displayName: string;
  email: string;
  lastMessageDate: string;
};

type ChatList = {
  unreadCount: number;
  items: ChatListItem[];
};
```

El nombre sale del participante cuyo `_id` no es el `id` de la sesión (`useAuthStore`). Si trae `firstname` y `lastname`, se unen. Si no, se usa el `email`. En la captura, Daniela se vería como `Daniela fuquene gallego` y Rosa como `rosa@gmail.com`.

No hay formulario, así que no hay schema Zod. No hay store nuevo.

## Dudas

1. La captura trae el cuerpo de la respuesta y no el path ni el método. Falta la ruta HTTP para `chatsApi.ts`.
2. La pastilla y el filtro **No leídos** necesitan saber qué chat está sin leer. Este JSON no trae ese dato, así que `unreadCount` no se puede calcular todavía.
3. El filtro **Favoritos** necesita saber qué chat es favorito. Este JSON no trae ese dato.
4. El diseño muestra, debajo del nombre, un texto como `¡Nos vemos a las 6!` y, a la derecha, un doble check cuando el último mensaje lo envié yo. Este JSON no trae el mensaje ni quién lo envió. Con el contrato actual la fila lleva nombre y fecha.
5. El dibujo solo muestra la lista llena. Falta cómo se ve la pantalla mientras carga, si la petición falla, o si la persona no tiene chats.
6. En el dibujo hay una fila `Tú · Notas`, distinta de Ana, Diego o Valeria. El JSON solo trae chats de dos participantes. Falta confirmar si esa fila entra en esta feature.
