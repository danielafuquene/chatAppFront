import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export function ChatListPrivacyNote() {
  return (
    <View className="flex-row items-center justify-center px-5 py-3">
      <Ionicons name="shield-checkmark-outline" size={16} color="#64748b" />
      <Text className="ml-2 text-sm text-slate-500">
        Tus conversaciones, solo tuyas.
      </Text>
    </View>
  );
}
