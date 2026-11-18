import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import {
  toAuthUser,
  useLazyGetMeQuery,
  useUpdateMeMutation,
} from "../../../core/api/user/userApi";
import { useAuthStore } from "../../../core/store/useAuthStore";
import { styles } from "../styles/OptionsUser.Styles";
import { avatarFormData } from "../utils/AvatarFormat";

export default function OptionsUser() {
  const [updateMe] = useUpdateMeMutation();
  const [getMe] = useLazyGetMeQuery();
  const setUser = useAuthStore((state) => state.setUser);

  async function openGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    const photo = result.assets[0];
    console.log(photo.uri);
    await updateMe(avatarFormData(result.assets[0])).unwrap();
    const me = await getMe().unwrap();
    setUser(toAuthUser(me));
  }

  const goToChangeName = () => {
    router.push("/changeName");
  };

  const goToChangeLastName = () => {
    router.push("/changeLastName");
  };
  return (
    <View style={styles.containerButtons}>
      <Pressable
        style={styles.buttonChange}
        onPress={() => {
          void openGallery();
        }}
        className="mt-auto w-full items-center rounded-lg bg-blue-600 px-6 py-3"
      >
        <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
      </Pressable>
      <Pressable
        style={styles.buttonChange}
        onPress={() => {
          goToChangeName();
        }}
        className="mt-auto w-full items-center rounded-lg bg-blue-600 px-6 py-3"
      >
        <Text style={styles.buttonText}>Cambiar nombre</Text>
      </Pressable>
      <Pressable
        style={styles.buttonChange}
        onPress={() => {
          goToChangeLastName();
        }}
        className="mt-auto w-full items-center rounded-lg bg-blue-600 px-6 py-3"
      >
        <Text style={styles.buttonText}>Cambiar apellidos</Text>
      </Pressable>
    </View>
  );
}
