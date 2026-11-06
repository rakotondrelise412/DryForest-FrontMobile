import React, { useCallback } from "react";
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import styles from "../../assets/css/sync";
import { useSyncRef } from "@/src/hooks/syncRef.hook";

const TREE = require("../../assets/img/baobab.png");

export default function SyncRefPage() {
  const router = useRouter();
  const { syncing, progressMessage, error, success, startPush } = useSyncRef();

  const handlePush = useCallback(async () => {
    try {
      // Optionnel: récupérer token depuis un auth hook/service
      const result = await startPush({ mode: "reforestation", chunkSize: 200 /*, token: "xxx"*/ });

      // result vaut { ok: boolean, summary: [...] } ou { ok:false, summary:[], error: "..." }
      if (!result) {
        Alert.alert("Erreur", "Réponse inattendue du service de synchronisation.");
        return;
      }

      if ((result as any).ok) {
        // résumé utile à afficher
        const summary = (result as any).summary ?? [];
        const totalProcessed = summary.reduce((acc: number, s: any) => acc + (s.processed || 0), 0);
        Alert.alert("Succès", `Synchronisation terminée. Enregistrements marqués comme synchronisés : ${totalProcessed}`);
        return;
      }

      // si nok -> afficher détails succincts
      const summary = (result as any).summary ?? [];
      const failed = summary.filter((s: any) => !s.ok);
      if (failed.length === 0 && (result as any).error) {
        Alert.alert("Erreur", String((result as any).error));
        return;
      }

      // Construire un message lisible : tables échouées + erreurs
      const lines = failed.map((s: any) => {
        const tab = s.table || "unknown";
        const errs = Array.isArray(s.errors) && s.errors.length > 0 ? String(s.errors[0]) : "erreur non précisée";
        return `${tab}: ${errs}`;
      });

      const message = lines.length > 0 ? `Échecs pour ${failed.length} table(s):\n` + lines.join("\n") : "Synchronisation incomplète.";
      Alert.alert("Synchronisation partielle", message);
    } catch (err: any) {
      Alert.alert("Erreur", err instanceof Error ? err.message : String(err));
    }
  }, [startPush]);

  const handlePull = useCallback(() => {
    Alert.alert("Info", "Récupération non implémentée dans ce bouton pour l'instant.");
  }, []);

  return (
    <ImageBackground source={TREE} style={styles.bg} imageStyle={{ opacity: 0.15 }}>
      <View style={styles.overlay}>
        <Text style={styles.welcome1}>SYNCHRONISATION</Text>
        <Text style={styles.welcome2}>to serveur</Text>
        <Text style={styles.welcome3}>Dry Forest</Text>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handlePush} disabled={syncing}>
            {syncing ? (
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="small" />
                <Text style={[styles.buttonText, { marginLeft: 8 }]}>
                  {progressMessage ? progressMessage : "Envoi..."}
                </Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Envoie</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handlePull} disabled={syncing}>
            <Text style={styles.buttonText}>Récupération</Text>
          </TouchableOpacity>
        </View>

        {/* affichage d'un message d'erreur / succès sous les boutons (optionnel) */}
        {error ? <Text style={{ color: "red", marginTop: 12, textAlign: "center" }}>{error}</Text> : null}
        {success ? <Text style={{ color: "green", marginTop: 12, textAlign: "center" }}>{success}</Text> : null}
      </View>
    </ImageBackground>
  );
}
