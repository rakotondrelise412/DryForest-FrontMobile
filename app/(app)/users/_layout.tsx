import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Pressable,
  Text,
  View,
} from "react-native";

import MonitoringHeader from "@/components/navigation/MonitoringHeader";
import { styles } from "@/assets/css/usersLayout.styles";

const LOGO = require("../../../assets/img/Home_Dry_Forest.png");

const SCREEN_TITLES: Record<string, string> = {
  index: "Utilisateurs et accès",
  "persons/person": "Employés",
  "users/users": "Utilisateurs",
};

export default function UsersLayout() {
  return (
    <Drawer
      drawerContent={(props) => (
        <View style={styles.drawerContainer}>
          {/* En-tête du menu */}
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>
              Menu de navigation
            </Text>

            <Pressable
              onPress={() => props.navigation.closeDrawer()}
              accessibilityRole="button"
              accessibilityLabel="Fermer le menu"
              hitSlop={8}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name="close-outline"
                size={30}
                color="#FFFFFF"
              />
            </Pressable>
          </View>

          {/* Rubriques de navigation */}
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.drawerContent}
          >
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        </View>
      )}
      screenOptions={{
        header: ({ route, options, navigation }) => (
          <MonitoringHeader
            title={
              options.title ??
              SCREEN_TITLES[route.name] ??
              route.name
            }
            username="Utilisateur connecté"
            logo={LOGO}
            onMenuPress={() => navigation.toggleDrawer()}
          />
        ),

        headerShown: true,

        drawerStyle: styles.drawer,

        drawerActiveTintColor: "#FFFFFF",
        drawerInactiveTintColor: "#FFFFFF",

        drawerActiveBackgroundColor:
          "rgba(255, 255, 255, 0.20)",

        drawerInactiveBackgroundColor: "transparent",

        drawerLabelStyle: styles.drawerLabel,
      }}
    >
      {/* Accueil du module */}
      <Drawer.Screen
        name="index"
        options={{
          title: "Utilisateurs et accès",
          drawerLabel: "Utilisateurs et accès",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="shield-checkmark-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Gestion des employés */}
      <Drawer.Screen
        name="persons/person"
        options={{
          title: "Employés",
          drawerLabel: "Employés",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="people-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Gestion des utilisateurs */}
      <Drawer.Screen
        name="users/users"
        options={{
          title: "Utilisateurs",
          drawerLabel: "Utilisateurs",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Drawer>
  );
}