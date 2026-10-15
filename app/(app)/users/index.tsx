import { styles } from "@/assets/css/usersAccessScreen.styles";
import { Text, View } from "react-native";

export default function UsersAccessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Utilisateurs et accès
      </Text>

      <Text>
        Gestion des accès à Dry Forest.
      </Text>
    </View>
  );
}


