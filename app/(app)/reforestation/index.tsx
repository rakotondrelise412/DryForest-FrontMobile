import { useState } from "react";
import { View } from "react-native";

import { styles } from "@/assets/css/capacite-du-parcelle.styles";
import MonitoringHeader from "@/components/navigation/MonitoringHeader";

export default function IndexReorestation() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.center}>
      <MonitoringHeader
        title="Suivi des plantations"
        username="Agent de terrain"
        onMenuPress={() => setMenuVisible(true)}
      />

      {menuVisible && (
        <View>
          Intégrer ici le composant de menu latéral 
        </View>
      )}
    </View>
  );
}
