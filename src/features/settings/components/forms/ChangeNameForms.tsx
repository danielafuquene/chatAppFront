import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import {
    toAuthUser,
    useLazyGetMeQuery,
    useUpdateMeMutation,
} from "../../../../core/api/user/userApi";
import { useAuthStore } from "../../../../core/store/useAuthStore";
import { nameFormData } from "../../utils/NameFormat";
import { style as styleForm } from "./StyleForms.Styles";

export default function ChangeNameForms() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [updateMe] = useUpdateMeMutation();
  const [getMe] = useLazyGetMeQuery();
  const setUser = useAuthStore((state) => state.setUser);

  async function saveName() {
    const trimmed = name.trim();
    if (trimmed.length === 0) {
      setError("Por Favor, escribir un nombre");
      return;
    }
    setError(null);
    await updateMe(nameFormData(trimmed)).unwrap();
    const me = await getMe().unwrap();
    setUser(toAuthUser(me));
    router.back();
  }
  return (
    <View style={styleForm.container}>
      <Text style={styleForm.text}>Cambiar Nombre</Text>
      <View style={styleForm.containerInput}>
        <TextInput
          style={styleForm.input}
          value={name}
          onChangeText={(name) => {
            setName(name);
            if (error) setError(null);
          }}
          placeholder="Cambiar nombre"
          placeholderTextColor="#9ca3af"
        ></TextInput>
        {error ? <Text style={styleForm.error}>{error}</Text> : null}
      </View>
      <Pressable style={styleForm.button} onPress={saveName}>
        <Text style={styleForm.textButton}>Guardar Cambios</Text>
      </Pressable>
    </View>
  );
}
