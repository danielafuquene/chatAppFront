import { Pressable, Text, View } from "react-native";
import { Colors } from "../../constants/theme";
import { useAuthStore } from "../../core/store/useAuthStore";
import OptionsUser from "../../features/settings/components/OptionsUser";
import UserInfo from "../../features/settings/components/UserInfo";

export default function settingsScreen() {
  const logout = useAuthStore((state) => state.logout);
  const userLogged = useAuthStore((state) => state.user);

  return (
    <View className=" flex-1 items-center px-5 pb-4">
      <UserInfo user={userLogged} />
      <OptionsUser />
      <Pressable
        style={{ backgroundColor: Colors.light.red }}
        onPress={() => {
          void logout();
        }}
        className="mt-auto w-full items-center rounded-lg bg-blue-600 px-6 py-3"
      >
        <Text style={{ color: "white", fontSize: 16 }}>Cerrar Session</Text>
      </Pressable>
    </View>
  );
}
