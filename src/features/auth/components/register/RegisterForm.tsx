import { router } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useRegisterMutation } from "../../../../core/api/authApi";
import { registerFormStyle } from "../../styles/RegisterFormS.styles.js";
import { initialValues, validationSchema } from "../register/RegisterForm.form";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (values) => {
      try {
        const data = await registerUser({
          email: values.email,
          password: values.password,
        }).unwrap();
        console.log("usuario creado", data);
        router.back();
      } catch (error) {
        console.error("Error al registrar usuario", error);
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
      {formik.touched.email && formik.errors.email && (
        <Text style={registerFormStyle.errorText}>{formik.errors.email}</Text>
      )}

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
          disabled={isLoading}
        >
          <Text style={registerFormStyle.btnRegister}>
            {isLoading ? "Registrando..." : "Registrarse"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
