import { baseApi } from "./baseApi";
import { replaceChatList } from "../../features/chats/storage/chatListDb";
import type {
  ChatListItem,
  ChatParticipantResponse,
  ChatResponse,
  ChatsFoundResponse,
} from "../../features/chats/types/chatList";
import { useAuthStore } from "../store/useAuthStore";

function displayNameOf(participant: ChatParticipantResponse): string {
  if (participant.firstname && participant.lastname) {
    return `${participant.firstname} ${participant.lastname}`;
  }
  return participant.email;
}

export function toChatListItem(
  chat: ChatResponse,
  sessionUserId: string,
): ChatListItem | null {
  const other =
    chat.participant_one._id === sessionUserId
      ? chat.participant_two
      : chat.participant_two._id === sessionUserId
        ? chat.participant_one
        : null;
  if (!other) {
    return null;
  }
  return {
    id: chat._id,
    otherParticipantId: other._id,
    displayName: displayNameOf(other),
    email: other.email,
    lastMessageDate: chat.lastMessageDate,
  };
}

export async function rememberChatList(
  response: ChatsFoundResponse,
  sessionUserId: string,
): Promise<ChatListItem[]> {
  const items = response.newChatList.flatMap((chat) => {
    const item = toChatListItem(chat, sessionUserId);
    return item ? [item] : [];
  });
  await replaceChatList(items);
  return items;
}

// El path y el método HTTP siguen en las dudas de spec.md.
// El endpoint queda en el mismo API cuyo cache se limpia al cerrar sesión.
export const chatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    newChatList: builder.query<ChatsFoundResponse, void>({
      queryFn: () => ({
        error: {
          status: "CUSTOM_ERROR",
          error: "La ruta HTTP de newChatList sigue sin definirse.",
        },
      }),
      providesTags: ["Chat"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const sessionUserId = useAuthStore.getState().user?.id;
          if (!sessionUserId) {
            return;
          }
          await rememberChatList(data, sessionUserId);
        } catch {
          return;
        }
      },
    }),
  }),
});
