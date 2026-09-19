import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import styles from "../assets/css/login";
import { login } from "../services/auth.service";
import { saveToken } from "../utils/storage";

const TREE_IMAGE = require("../assets/img/Home Dry Forest.png");

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    setUsernameError("");
    setPasswordError("");
    setLoginError("");

    if (!username.trim()) {
      setUsernameError("Le nom d'utilisateur est obligatoire.");
    }

    if (!password.trim()) {
      setPasswordError("Le mot de passe est obligatoire.");
    }

    if (!username.trim() || !password.trim()) {
      return;
    }

    try {
      setLoading(true);

      Keyboard.dismiss();

      const response = await login({
        username: username.trim(),
        password,
      });

      await saveToken(response.token);

      router.replace("/home");
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;

        if (status === 401 || status === 403) {
          setUsernameError("Nom d'utilisateur ou mot de passe incorrect.");
          setPasswordError("Nom d'utilisateur ou mot de passe incorrect.");

          setLoginError("");
          
        } else if (status === 404) {
          setUsernameError("Nom d'utilisateur introuvable.");
        } else if (status >= 500) {
          setLoginError(
            "Une erreur est survenue sur le serveur. Veuillez réessayer.",
          );
        } else {
          setLoginError("Une erreur est survenue. Veuillez réessayer.");
        }
      } else {
        setLoginError(
          "Impossible de contacter le serveur. Vérifiez votre connexion.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 44 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Login</Text>

            <Text style={styles.subtitle}>Dry Forest</Text>

            <Image
              source={TREE_IMAGE}
              style={styles.treeImage}
              resizeMode="contain"
            />

            <TextInput
              style={[
                styles.input,
                usernameError !== "" && {
                  borderWidth: 2,
                  borderColor: "#ff0000",
                },
              ]}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (usernameError) {
                  setUsernameError("");
                }
                if (loginError) {
                  setLoginError("");
                }
              }}
              autoCapitalize="none"
              editable={!loading}
            />
            {usernameError !== "" && (
              <Text style={styles.errorText}>{usernameError}</Text>
            )}

            <TextInput
              style={[
                styles.input,
                passwordError !== "" && {
                  borderWidth: 2,
                  borderColor: "#ff0000",
                },
              ]}
              placeholder="Mot de passe"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={password}
              onChangeText={(text) => {
                setPassword(text);

                if (passwordError) {
                  setPasswordError("");
                }

                if (loginError) {
                  setLoginError("");
                }
              }}
              secureTextEntry
              editable={!loading}
            />

            {passwordError !== "" && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}

            {loginError ? (
              <Text style={styles.loginErrorText}>{loginError}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Connexion..." : "Se connecter"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
