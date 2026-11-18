import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../core/api/chatsApi";
import { ChatFilters } from "../../features/chats/components/chat/ChatFilters";
import { ChatList } from "../../features/chats/components/chat/ChatList";
import { ChatListHeader } from "../../features/chats/components/chat/ChatListHeader";
import { ChatListPrivacyNote } from "../../features/chats/components/chat/ChatListPrivacyNote";
import { ChatSearchField } from "../../features/chats/components/chat/ChatSearchField";
import { CreateChatButton } from "../../features/chats/components/chat/CreateChatButton";
import { readChatList } from "../../features/chats/storage/chatListDb";
import type { ChatFilter, ChatListItem } from "../../features/chats/types/chatList";

let openFilter: ChatFilter = "all";

function matchesSearch(item: ChatListItem, term: string): boolean {
  const name = item.displayName.toLowerCase();
  const email = item.email.toLowerCase();
  return name.includes(term) || email.includes(term);
}

export default function chatsScreen() {
  const [items, setItems] = useState<ChatListItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ChatFilter>(openFilter);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      readChatList()
        .then((next) => {
          if (active) {
            setItems(next);
          }
        })
        .catch(() => undefined);
      return () => {
        active = false;
      };
    }, []),
  );

  // No leídos y Favoritos no recortan filas: la respuesta no trae esos datos.
  const visibleItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return items;
    }
    return items.filter((item) => matchesSearch(item, term));
  }, [items, search]);

  const selectFilter = (next: ChatFilter) => {
    openFilter = next;
    setFilter(next);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      <ChatListHeader unreadCount={null} />
      <ChatSearchField value={search} onChangeText={setSearch} />
      <ChatFilters value={filter} onChange={selectFilter} />
      <View className="flex-1">
        <ChatList items={visibleItems} />
      </View>
      <View className="h-16 flex-row items-center px-5">
        <View className="w-14" />
        <View className="flex-1">
          <ChatListPrivacyNote />
        </View>
        <CreateChatButton />
      </View>
    </SafeAreaView>
  );
}
