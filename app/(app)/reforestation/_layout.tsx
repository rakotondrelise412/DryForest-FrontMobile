import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { View } from "react-native";

import DrawerHeader from "@/components/navigation/DrawerHeader";
import DrawerNavigationItems from "@/components/navigation/DrawerNavigationItems";
import MonitoringHeader from "@/components/navigation/MonitoringHeader";

import { styles } from "@/assets/css/drawerStyle.styles";

const LOGO = require("../../../assets/img/Home_Dry_Forest.png");

const SCREEN_TITLES: Record<string, string> = {
  index: "Reboisement",
  "blocks/index": "Blocs de plantation",
  "subplots/index": "Sous-parcelles",
  "plantation/index": "Plantations",
  "monitoring/index": "Suivi des plantations",
  "details/[id]": "Détails du reboisement",
};

export default function ReforestationLayout() {
  return (
    <Drawer
      drawerContent={(props) => (
        <View style={styles.drawerContainer}>
          {/* En-tête du menu */}
          <DrawerHeader onClose={() => props.navigation.closeDrawer()} />

          {/* Rubriques de navigation */}
          <DrawerNavigationItems props={props} />
        </View>
      )}
      screenOptions={{
        header: ({ route, options, navigation }) => (
          <MonitoringHeader
            title={options.title ?? SCREEN_TITLES[route.name] ?? route.name}
            username="Utilisateur connecté"
            logo={LOGO}
            onMenuPress={() => navigation.toggleDrawer()}
          />
        ),

        headerShown: true,

        drawerStyle: styles.drawer,

        drawerActiveTintColor: "#FFFFFF",
        drawerInactiveTintColor: "#FFFFFF",

        drawerActiveBackgroundColor: "rgba(255, 255, 255, 0.20)",

        drawerInactiveBackgroundColor: "transparent",

        drawerLabelStyle: styles.drawerLabel,
      }}
    >
      {/* Accueil du module */}
      <Drawer.Screen
        name="index"
        options={{
          title: "Reboisement",
          drawerLabel: "Reboisement",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="leaf-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Gestion des blocs de plantation */}
      <Drawer.Screen
        name="blocks/index"
        options={{
          title: "Blocs de plantation",
          drawerLabel: "Blocs de plantation",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Gestion des sous-parcelles */}
      <Drawer.Screen
        name="subplots/index"
        options={{
          title: "Sous-parcelles",
          drawerLabel: "Sous-parcelles",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Gestion des plantations */}
      <Drawer.Screen
        name="plantation/index"
        options={{
          title: "Plantations",
          drawerLabel: "Plantations",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="flower-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Suivi des plantations */}
      <Drawer.Screen
        name="monitoring/index"
        options={{
          title: "Suivi des plantations",
          drawerLabel: "Suivi des plantations",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Détails d'un projet de reboisement */}
      <Drawer.Screen
        name="details/[id]"
        options={{
          title: "Détails du reboisement",
          drawerLabel: "Détails du reboisement",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer>
  );
}
