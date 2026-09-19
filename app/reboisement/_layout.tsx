// app/reboisement/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";
import Menu from "../components/MonitoringHeader";

const LOGO = require("../../assets/img/Home Dry Forest.png");

export default function ReboisementLayout() {
  return (
    <Drawer
      screenOptions={{
        header: (props) => {
          const routeName = props.options?.title ?? props.route?.name ?? "Suivi reforestation";
          const prettyTitle = routeName === "index" ? "Suivi réforestation" : routeName;
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
          drawerLabel: "Réforestation",
          title: "Suivi réforestation",
          drawerIcon: ({ color, size }) => <Ionicons name="leaf-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="creation-zone"
        options={{
          drawerLabel: "Creation zone de plantation",
          drawerIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="creation-plantation-block"
        options={{
          drawerLabel: "Creation placeau",
          drawerIcon: ({ color, size }) => <Ionicons name="layers-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="subplot"
        options={{
          drawerLabel: "Création parcelle",
          drawerIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="plantation"
        options={{
          drawerLabel: "Plantation",
          drawerIcon: ({ color, size }) => <Ionicons name="flower-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="plantation-monitoring"
        options={{
          drawerLabel: "Suivi plantation",
          drawerIcon: ({ color, size }) => <Ionicons name="eye-outline" size={size} color={color} />,
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
