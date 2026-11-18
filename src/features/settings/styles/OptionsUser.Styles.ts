import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/theme";

export const styles = StyleSheet.create({
  containerButtons: {
    marginTop: 40,
    alignSelf: "stretch",
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
