import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { AuthUser } from "@/core/store/useAuthStore";
import { Text, View } from "react-native";
import { styles } from "../styles/UserInfo.Styles";

type UserInfoProps = {
  user: AuthUser | null;
};

export default function UserInfo({ user }: UserInfoProps) {
  console.log("UserInfo user", user);
  return (
    <View style={styles.container}>
      <Avatar className="h-32 w-32">
        <AvatarFallbackText className="text-3xl text-white">
          {user?.name?.charAt(0) || ""}
        </AvatarFallbackText>
        {user?.image ? <AvatarImage source={{ uri: user.image }} /> : null}
      </Avatar>
      {user?.name || user?.lastName ? (
        <Text style={styles.identity}>
          {`${user?.name || ""} ${user?.lastName || ""}`}
        </Text>
      ) : null}
      <Text style={styles.email}>{user?.email || ""}</Text>
    </View>
  );
}
