import { StyleSheet } from "react-native";

export const registerFormStyle = StyleSheet.create({
  viewInput: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#202020",
    color: "#fff",
    fontSize: 16,
    marginVertical: 5,
    paddingHorizontal: 12,
    paddingVertical: 15,
    flex: 1,
    borderWidth: 0,
  },
  passwordContainer: {
    flexDirection: "row", // input + ojito en la misma línea
    alignItems: "center",
    backgroundColor: "#202020",
    marginVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  btnRegister: {
    color: "#ffff",
    alignSelf: "center",
    fontSize: 16,
  },
  btnRegisterContainer: {
    alignSelf: "stretch",
    backgroundColor: "#0891b2",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "red",
    fontSize: 16,
    marginVertical: 5,
    paddingHorizontal: 12,
    paddingVertical: 15,
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});
