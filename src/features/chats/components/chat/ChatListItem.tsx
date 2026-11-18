import { Pressable, Text, View } from "react-native";
import type { ChatListItem as ChatListItemData } from "../../types/chatList";

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] as const;
const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function formatLastMessageDate(value: string, now = new Date()): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const dayDiff = Math.round((startOfDay(now) - startOfDay(date)) / DAY_MS);
  if (dayDiff === 0) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  if (dayDiff === 1) {
    return "Ayer";
  }
  if (dayDiff > 1) {
    return WEEKDAYS[date.getDay()];
  }
  return "";
}

type ChatListItemProps = {
  item: ChatListItemData;
  onPress: (item: ChatListItemData) => void;
};

export function ChatListItem({ item, onPress }: ChatListItemProps) {
  return (
    <Pressable
      onPress={() => onPress(item)}
      className="flex-row items-center justify-between border-b border-slate-200 px-5 py-4"
    >
      <Text className="flex-1 text-base font-semibold text-slate-900" numberOfLines={1}>
        {item.displayName}
      </Text>
      <Text className="ml-3 text-sm text-slate-500">
        {formatLastMessageDate(item.lastMessageDate)}
      </Text>
    </Pressable>
  );
}
