// app/suivi-pepiniere/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";
import Menu from "../components/MonitoringHeader";

const LOGO = require("../../assets/img/Home Dry Forest.png");

export default function SuiviPepiniereLayout() {
  return (
    <Drawer
      screenOptions={{
        header: (props) => {
          const routeName = props.options?.title ?? props.route?.name ?? "Suivi pépinière";
          const prettyTitle = routeName === "index" ? "Suivi pépinière" : routeName;
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
          drawerLabel: "Home",
          title: "Suivi pépinière", // This title is for the header, but overridden in header prop
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="creation-parcelle"
        options={{
          drawerLabel: "Creation parcelle",
          drawerIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="stock-de-graine"
        options={{
          drawerLabel: "Stock de graine",
          drawerIcon: ({ color, size }) => <Ionicons name="leaf-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="semis"
        options={{
          drawerLabel: "Semis",
          drawerIcon: ({ color, size }) => <Ionicons name="flower-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="germination"
        options={{
          drawerLabel: "Germination",
          drawerIcon: ({ color, size }) => <Ionicons name="sunny-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="suivi-de-mort"
        options={{
          drawerLabel: "Suivi de mort",
          drawerIcon: ({ color, size }) => <Ionicons name="close-circle-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="capacite-du-parcelle"
        options={{
          drawerLabel: "Capacité du parcelle",
          drawerIcon: ({ color, size }) => <Ionicons name="resize-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="pointage"
        options={{
          drawerLabel: "Pointage",
          drawerIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="tache-effectuee"
        options={{
          drawerLabel: "Tâche effectuée",
          drawerIcon: ({ color, size }) => <Ionicons name="checkbox-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="incident"
        options={{
          drawerLabel: "Incident",
          drawerIcon: ({ color, size }) => <Ionicons name="alert-circle-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="observation"
        options={{
          drawerLabel: "Observation",
          drawerIcon: ({ color, size }) => <Ionicons name="eye-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#C36922", // Match the header color
    width: 250,
  },
});