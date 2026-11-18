import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export function CreateChatButton() {
  return (
    <Pressable
      onPress={() => router.push("/createChatScreen")}
      accessibilityRole="button"
      accessibilityLabel="Crear chat"
      className="h-14 w-14 items-center justify-center rounded-full bg-blue-600"
    >
      <Ionicons name="add" size={28} color="#ffffff" />
    </Pressable>
  );
}
