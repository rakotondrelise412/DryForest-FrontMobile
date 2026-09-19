// app/home/index.tsx
import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, TextStyle } from "react-native";
import { useRouter } from "expo-router";
import styles from "../assets/css/home";

const TREE = require("../assets/img/baobab.png");

export default function HomePage() {
  const router = useRouter();

  return (
    <ImageBackground source={TREE} style={styles.bg} imageStyle={{ opacity: 0.15 }}>
      <View style={styles.overlay}>
        <Text style={styles.welcome1}>WELCOME</Text>
        <Text style={styles.welcome2}>to</Text>
        <Text style={styles.welcome3}>Dry Forest</Text>

        <View style={styles.buttons}>
          <HomeButton title="Suivi pepinière" onPress={() => router.push("/suivi-pepiniere")} />
          <HomeButton title="Reboisement" onPress={() => router.push("/reboisement")} />
          <HomeButton title="Patrouille" onPress={() => router.push("/patrouille")} />
        </View>
      </View>
    </ImageBackground>
  );
}

function HomeButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText as TextStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

