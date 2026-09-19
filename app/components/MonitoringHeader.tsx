// app/components/MonitoringHeader.tsx (similar to Header but with menu icon)
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../assets/css/MonitoringHeader.styles";

type Props = {
  title?: string;
  username?: string;
  logo?: any;
  onMenuPress: () => void;
};

export default function MonitoringHeader({
  title = "Dry Forest",
  username = "User name",
  logo,
  onMenuPress,
}: Props) {
  return (
    <View style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onMenuPress} style={styles.left}>
          <Ionicons name="menu-outline" size={26} color="#fff" />
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
