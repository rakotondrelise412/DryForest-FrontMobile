import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { removeToken } from "../../../utils/storage";

const TREE = require("../../../assets/img/baobab.png");

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await removeToken();
      router.replace("/(auth)/login");
    } catch {
      Alert.alert(
        "Erreur",
        "Impossible de supprimer la session. Réessayez.",
      );
    }
  };

  return (
    <ImageBackground
      source={TREE}
      style={styles.bg}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* En-tête */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.appName}>DRY FOREST</Text>
            <Text style={styles.appSubtitle}>
              Gestion forestière
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            accessibilityLabel="Se déconnecter"
            accessibilityRole="button"
          >
            <Ionicons
              name="log-out-outline"
              size={25}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        {/* Contenu principal */}
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.welcome1}>BIENVENUE</Text>
          <Text style={styles.welcome2}>dans</Text>
          <Text style={styles.welcome3}>Dry Forest</Text>

          <Text style={styles.description}>
            Protégeons nos forêts et suivons
            {"\n"}
            ensemble les activités de terrain.
          </Text>

          {/* Navigation vers les modules */}
          <View style={styles.buttons}>
            <HomeButton
              title="Zones forestières"
              icon="map-outline"
              onPress={() => router.push("/zones")}
            />

            <HomeButton
              title="Reboisement et plantations"
              icon="leaf-outline"
              onPress={() => router.push("/reforestation")}
            />

            <HomeButton
              title="Espèces et biodiversité"
              icon="paw-outline"
              onPress={() => router.push("/biodiversity")}
            />

            <HomeButton
              title="Patrouilles"
              icon="walk-outline"
              onPress={() => router.push("/patrols")}
            />

            <HomeButton
              title="Suivi des animaux"
              icon="locate-outline"
              onPress={() =>
                router.push("/animals/animal-tracking")
              }
            />

            <HomeButton
              title="Utilisateurs"
              icon="people-outline"
              onPress={() => router.push("/users")}
            />

            <HomeButton
              title="Paramètres"
              icon="settings-outline"
              onPress={() => router.push("/settings")}
            />
          </View>
        </ScrollView>

        {/* Pied de page */}
        <Text style={styles.footer}>
          Dry Forest — Application mobile
        </Text>
      </View>
    </ImageBackground>
  );
}

type HomeButtonProps = {
  title: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
};

function HomeButton({
  title,
  icon,
  onPress,
}: HomeButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
    >
      <Ionicons
        name={icon}
        size={23}
        color="#FFFFFF"
      />

      <Text style={styles.buttonText}>{title}</Text>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#FFFFFF"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#173D2A",
  },

  backgroundImage: {
    opacity: 0.2,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(10, 39, 25, 0.78)",
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 12,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  appName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },

  appSubtitle: {
    color: "#D3E5D5",
    fontSize: 13,
    marginTop: 3,
  },

  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
  },

  welcome1: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "bold",
    letterSpacing: 3,
    textAlign: "center",
  },

  welcome2: {
    color: "#D3E5D5",
    fontSize: 18,
    marginTop: 4,
  },

  welcome3: {
    color: "#A9D18E",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },

  description: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 14,
    marginBottom: 28,
  },

  buttons: {
    width: "100%",
    gap: 12,
  },

  button: {
    minHeight: 55,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#28623F",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },

  buttonText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  footer: {
    color: "#D3E5D5",
    fontSize: 11,
    textAlign: "center",
    paddingVertical: 6,
  },
});
