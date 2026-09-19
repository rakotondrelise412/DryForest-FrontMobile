import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "../../assets/css/Header.styles";
import { removeToken } from "@/utils/storage";

type Props = {
  title?: string;
  username?: string;
  logo?: any;
};

export default function Header({
  title = "Dry Forest",
  username = "User name",
  logo,
}: Props) {
  const router = useRouter();

  const onLogout = async () => {
  Keyboard.dismiss();

  await removeToken();

  router.replace("/");
};

  return (
    <View style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onLogout} style={styles.left}>
          <Ionicons name="log-out-outline" size={26} color="#fff" />
        </TouchableOpacity>
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.username}>{username}</Text>
        </View>

        <View style={styles.right}>
          {logo ? (
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          ) : (
            <View style={styles.logoPlaceholder} />
          )}
        </View>
      </View>
    </View>
  );
}
