import { router } from "expo-router";
import { Text, View } from "react-native";
import { RegisterForm } from "../features/auth/components/register/RegisterForm";
import { registerStyles } from "../features/auth/styles/RegisterStyles/registerScreen.styles.js";

export default function registerScreen() {
  const goBackToLogin = () => {
    router.back(); // vuelve a la pantalla anterior (login)
  };

  return (
    <View style={registerStyles.content}>
      <Text style={registerStyles.title}>
        Crea tu cuenta y empieza a enviar mensajes
      </Text>
      <RegisterForm />
      {/* <Text style={registerStyles.register} onPress={goBackToLogin}>
        Iniciar Session
      </Text> */}
    </View>
  );
}
