import { router } from "expo-router";
import { Text, View } from "react-native";
import { LoginForm } from "../features/auth/components/login/LoginForm";
import { styles } from "../features/auth/styles/LoginStyles/loginScreen.styles.js";

export default function LoginScreen() {
  const goToRegister = () => {
    router.push("/registerUser");
  };

  return (
    <View style={styles.content}>
      {/* <Text style={styles.title}>Hola, soy el login de la app</Text> */}
      <LoginForm />
      <Text style={styles.register} onPress={goToRegister}>
        Registrarse
      </Text>
      <Text style={styles.info}>
        Debes tener al menos 18 aNos de edad para registrarte. Mas informacion
        sobre la app en las politicas de ChatApp
      </Text>
    </View>
  );
}
