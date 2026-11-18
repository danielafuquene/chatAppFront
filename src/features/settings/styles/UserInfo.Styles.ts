import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  containerButtons: {
    marginTop: 40,
    alignSelf: "stretch",
  },
  identity: {
    marginTop: 10,
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
  email: {
    marginTop: 10,
    fontSize: 15,
    color: "#000000",
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.7,
  },
  buttonChange: {
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: Colors.light.primary,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    alignSelf: "center",
  },
});
