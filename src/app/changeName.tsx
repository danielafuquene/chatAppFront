import { View } from "react-native";
import ChangeNameForms from "../features/settings/components/forms/ChangeNameForms";

export default function changeName() {
  return (
    <View style={{ flex: 1 }}>
      <ChangeNameForms />
    </View>
  );
}
