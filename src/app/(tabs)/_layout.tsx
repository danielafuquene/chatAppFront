import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="chatsScreen"
        options={{
          title: "Chats",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={size}
              color={typeof color === "string" ? color : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="groupsScreen"
        options={{
          title: "Grupos",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={size}
              color={typeof color === "string" ? color : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settingsScreen"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={typeof color === "string" ? color : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
