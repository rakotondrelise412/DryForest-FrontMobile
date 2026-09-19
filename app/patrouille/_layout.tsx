// app/patrouille/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";
import Menu from "../components/MonitoringHeader";

const LOGO = require("../../assets/img/Home Dry Forest.png");

export default function PatrouilleLayout() {
  return (
    <Drawer
      screenOptions={{
        header: (props) => {
          const routeName = props.options?.title ?? props.route?.name ?? "Patrouille";
          const prettyTitle = routeName === "index" ? "Patrouille" : routeName;
          return (
            <Menu
              title={prettyTitle}
              username="User name"
              logo={LOGO}
              onMenuPress={() => props.navigation.toggleDrawer()}
            />
          );
        },
        drawerStyle: styles.drawer,
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#fff",
        drawerActiveBackgroundColor: "rgba(255, 255, 255, 0.2)",
        drawerInactiveBackgroundColor: "transparent",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Observation",
          title: "Observation",
          drawerIcon: ({ color, size }) => <Ionicons name="eye-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="incident-patrol"
        options={{
          drawerLabel: "Incident pendant le patrouille",
          drawerIcon: ({ color, size }) => <Ionicons name="alert-circle-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="animal-tracking"
        options={{
          drawerLabel: "Suivi animaux",
          drawerIcon: ({ color, size }) => <Ionicons name="paw-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#C36922",
    width: 250,
  },
});
