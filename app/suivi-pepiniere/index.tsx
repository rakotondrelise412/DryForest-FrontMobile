// app/suivi-pepiniere/index.tsx
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../assets/css/index-suivi-pepiniere.styles";

export default function SuiviPepiniere() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>
        Contenu principal de Suivi Pépinière (ajoutez vos composants ici)
      </Text>
    </View>
  );
}
