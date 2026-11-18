import { router } from "expo-router";
import { FlatList } from "react-native";
import type { ChatListItem as ChatListItemData } from "../../types/chatList";
import { ChatListItem } from "./ChatListItem";

type ChatListProps = {
  items: ChatListItemData[];
};

function openChat(item: ChatListItemData) {
  router.push({
    pathname: "/chatRoomScreen",
    params: { chatId: item.id },
  });
}

export function ChatList({ items }: ChatListProps) {
  return (
    <FlatList
      className="flex-1"
      data={items}
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => <ChatListItem item={item} onPress={openChat} />}
    />
  );
}
