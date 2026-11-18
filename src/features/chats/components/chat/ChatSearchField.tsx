import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

type ChatSearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function ChatSearchField({ value, onChangeText }: ChatSearchFieldProps) {
  return (
    <View className="mx-5 mb-3 flex-row items-center rounded-xl bg-white px-3 py-2">
      <Ionicons name="search" size={18} color="#64748b" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar una conversación"
        placeholderTextColor="#94a3b8"
        autoCapitalize="none"
        autoCorrect={false}
        className="ml-2 flex-1 text-base text-slate-900"
      />
    </View>
  );
}
