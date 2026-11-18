import { useFormik } from "formik";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useLoginMutation } from "../../../../core/api/loginApi";
import {
  toAuthUser,
  useLazyGetMeQuery,
} from "../../../../core/api/user/userApi";
import { useAuthStore } from "../../../../core/store/useAuthStore";
import { registerFormStyle } from "../../styles/RegisterFormS.styles.js";
import { initialValues, validationSchema } from "../register/RegisterForm.form";

function readApiMessage(error: unknown, fallback: string): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: unknown }).data;
    if (typeof data === "string" && data.length > 0) {
      return data;
    }
    if (typeof data === "object" && data !== null) {
      const record = data as { msg?: unknown; error?: unknown };
      if (typeof record.msg === "string" && record.msg.length > 0) {
        return record.msg;
      }
      if (typeof record.error === "string" && record.error.length > 0) {
        return record.error;
      }
    }
  }
  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }
  return fallback;
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginMutation();
  const [getMe, { isLoading: isLoadingUser }] = useLazyGetMeQuery();
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);
  const setAviso = useAuthStore((state) => state.setAviso);
  const aviso = useAuthStore((state) => state.aviso);
  const submitting = isLoading || isLoadingUser;
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (values) => {
      setAviso(null);
      try {
        const data = await loginUser({
          email: values.email,
          password: values.password,
        }).unwrap();
        await setSession(data.access, data.refreshToken);
        const me = await getMe().unwrap();
        setUser(toAuthUser(me));
      } catch (error) {
        setAviso(readApiMessage(error, "No se pudo iniciar sesión"));
      }
    },
  });

  return (
    <View>
      <View style={registerFormStyle.passwordContainer}>
        <TextInput
          placeholder="Ingrese el correo"
          autoCapitalize="none"
          value={formik.values.email}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          onBlur={() => formik.setFieldTouched("email", true)}
          style={[
            registerFormStyle.input,
            formik.errors.email && formik.touched.email
              ? registerFormStyle.inputError
              : registerFormStyle.input,
          ]}
        />
      </View>

      <View style={registerFormStyle.passwordContainer}>
        <TextInput
          placeholder="Ingrese la contraseña"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          value={formik.values.password}
          style={
            (registerFormStyle.input,
            formik.errors.password && formik.touched.password
              ? registerFormStyle.inputError
              : registerFormStyle.input)
          }
          onChangeText={(text) => formik.setFieldValue("password", text)}
        />
        <Pressable onPress={() => setShowPassword((prev) => !prev)}>
          <Image
            source={
              showPassword
                ? require("../../../../../assets/icons/hiden.png")
                : require("../../../../../assets/icons/show.png")
            }
            style={{ width: 22, height: 22, tintColor: "#ffffff" }}
          />
        </Pressable>
      </View>
      <View>
        <Pressable
          style={registerFormStyle.btnRegisterContainer}
          onPress={() => formik.handleSubmit()}
          disabled={submitting}
        >
          <Text style={registerFormStyle.btnRegister}>
            {submitting ? "Iniciando Sesion" : "Iniciar Sesion"}
          </Text>
        </Pressable>
        {aviso ? (
          <Text style={registerFormStyle.errorText}>{aviso}</Text>
        ) : null}
      </View>
    </View>
  );
}
