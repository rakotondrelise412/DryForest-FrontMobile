import React from "react";
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import styles from "@/assets/css/Header.styles";
import { removeToken } from "@/utils/storage";

type Props = {
  title?: string;
  username?: string;
  logo?: number;
};

export default function Header({
  title = "Dry Forest",
  username = "User name",
  logo,
}: Props) {
  const router = useRouter();

  const onLogout = async () => {
    try {
      Keyboard.dismiss();

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
    <View style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onLogout}
          style={styles.left}
          accessibilityRole="button"
          accessibilityLabel="Se déconnecter"
        >
          <Ionicons
            name="log-out-outline"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>

        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.username}>{username}</Text>
        </View>

        <View style={styles.right}>
          {logo ? (
            <Image
              source={logo}
              style={styles.logo}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.logoPlaceholder} />
          )}
        </View>
      </View>
    </View>
  );
}