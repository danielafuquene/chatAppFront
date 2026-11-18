import { StyleSheet } from "react-native";
import { Colors } from "../../../../constants/theme";

export const style = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    flex: 1,
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    alignItems: "center",
  },
  containerInput: {
    backgroundColor: "#0000",
    alignSelf: "stretch",
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    marginTop: 20,
    fontSize: 16,
    color: "#000000",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 12,
    paddingVertical: 15,
    alignSelf: "stretch",
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  textButton: {
    color: "#ffffff",
    fontSize: 16,
  },
  error: {
    color: "#fb0707",
    fontSize: 16,
  },
});
