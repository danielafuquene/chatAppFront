import { Pressable, Text, View } from "react-native";
import type { ChatFilter } from "../../types/chatList";

const FILTERS: { id: ChatFilter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "unread", label: "No leídos" },
  { id: "favorites", label: "Favoritos" },
];

type ChatFiltersProps = {
  value: ChatFilter;
  onChange: (filter: ChatFilter) => void;
};

export function ChatFilters({ value, onChange }: ChatFiltersProps) {
  return (
    <View className="flex-row gap-2 px-5 pb-3">
      {FILTERS.map((filter) => {
        const selected = filter.id === value;
        return (
          <Pressable
            key={filter.id}
            onPress={() => onChange(filter.id)}
            className={
              selected
                ? "rounded-full bg-blue-600 px-4 py-2"
                : "rounded-full bg-white px-4 py-2"
            }
          >
            <Text
              className={
                selected
                  ? "text-sm font-semibold text-white"
                  : "text-sm font-semibold text-slate-600"
              }
            >
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
