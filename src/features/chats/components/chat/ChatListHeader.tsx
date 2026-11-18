import { Text, View } from "react-native";

type ChatListHeaderProps = {
  unreadCount: number | null;
};

export function ChatListHeader({ unreadCount }: ChatListHeaderProps) {
  return (
    <View className="flex-row items-center px-5 pb-3 pt-2">
      <Text className="text-3xl font-bold text-slate-900">Chats</Text>
      {unreadCount === null ? null : (
        <View className="ml-2 min-w-6 items-center rounded-full bg-blue-600 px-2 py-0.5">
          <Text className="text-xs font-semibold text-white">{unreadCount}</Text>
        </View>
      )}
    </View>
  );
}
