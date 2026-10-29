import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { removeToken } from "@/utils/storage";
import { styles } from "@/assets/css/home";

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