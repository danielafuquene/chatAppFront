import { View, Text } from "react-native";

export default function createChatScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-50 px-4">
      <Text className="text-3xl font-black text-blue-600 mb-2">
        Soy la pantalla para crear un nuevo chat, vengo del icono +
      </Text>
    </View>
  );
}
