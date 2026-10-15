import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  StatusBar,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { login } from "../../services/auth.service";
import { saveToken } from "../../utils/storage";
import { COLORS } from "@/constants/colors";
import { styles } from "@/assets/css/login";

const TREE_IMAGE = require("../../assets/img/Home_Dry_Forest.png");

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingText, setLoadingText] = useState("Connexion");

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

      router.replace("/(app)/home");
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
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 4000 - elapsed);

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setLoadingText("Connexion");
      return;
    }

    const messages = ["Connexion", "Connexion.", "Connexion..", "Connexion..."];

    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingText(messages[index]);
    }, 400);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <ImageBackground
      source={require("../../assets/img/dry-forest-background.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.backgroundOverlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={COLORS.primaryDark}
          />

          <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              bounces={false}
            >
              <View style={styles.loginContainer}>
                {/* Identité de l'application */}
                <View style={styles.brandContainer}>
                  <Text style={styles.brandTitle}>Dry Forest</Text>

                  <Text style={styles.brandSubtitle}>
                    Ensemble, restaurons nos forêts.
                  </Text>
                </View>

                {/* Formulaire de connexion */}
                <View style={styles.formContainer}>
                  <View style={styles.headingContainer}>
                    <Text style={styles.title}>Bienvenue !</Text>

                    <Text style={styles.subtitle}>
                      Connectez-vous à votre espace.
                    </Text>
                  </View>

                  {/* Nom d'utilisateur */}
                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Nom d'utilisateur</Text>

                    <TextInput
                      style={[
                        styles.input,
                        usernameError !== "" && styles.inputError,
                      ]}
                      placeholder="Saisissez votre identifiant"
                      placeholderTextColor={COLORS.textSecondary}
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
                      autoCorrect={false}
                      autoComplete="username"
                      textContentType="username"
                      returnKeyType="next"
                      editable={!loading}
                      accessibilityLabel="Nom d'utilisateur"
                      accessibilityState={{ disabled: loading }}
                    />

                    {usernameError !== "" && (
                      <Text style={styles.errorText} accessibilityRole="alert">
                        {usernameError}
                      </Text>
                    )}
                  </View>

                  {/* Mot de passe */}

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Mot de passe</Text>

                    <View
                      style={[
                        styles.passwordInputContainer,
                        passwordError !== "" && styles.inputError,
                      ]}
                    >
                      <TextInput
                        style={styles.passwordInput}
                        placeholder="Saisissez votre mot de passe"
                        placeholderTextColor={COLORS.textSecondary}
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
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="current-password"
                        textContentType="password"
                        returnKeyType="go"
                        onSubmitEditing={handleLogin}
                        editable={!loading}
                        accessibilityLabel="Mot de passe"
                      />

                      <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setShowPassword((previous) => !previous)}
                        disabled={loading}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel={
                          showPassword
                            ? "Masquer le mot de passe"
                            : "Afficher le mot de passe"
                        }
                      >
                        <Ionicons
                          name={
                            showPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={23}
                          color={COLORS.textSecondary}
                        />
                      </TouchableOpacity>
                    </View>

                    {passwordError !== "" && (
                      <Text style={styles.errorText} accessibilityRole="alert">
                        {passwordError}
                      </Text>
                    )}
                  </View>

                  {/* Erreur générale */}
                  {loginError !== "" && (
                    <View style={styles.loginErrorContainer}>
                      <Text
                        style={styles.loginErrorText}
                        accessibilityRole="alert"
                      >
                        {loginError}
                      </Text>
                    </View>
                  )}

                  {/* Bouton de connexion */}
                  <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Se connecter"
                    accessibilityState={{ disabled: loading, busy: loading }}
                  >
                    <View style={styles.buttonContent}>
                      {loading && (
                        <View style={styles.loadingDots}>
                          <View style={[styles.dot, styles.dot1]} />
                          <View style={[styles.dot, styles.dot2]} />
                          <View style={[styles.dot, styles.dot3]} />
                        </View>
                      )}

                      <Text style={styles.buttonText}>
                        {loading ? loadingText : "Se connecter"}
                      </Text>

                      {!loading && <Text style={styles.buttonArrow}>→</Text>}
                    </View>
                  </TouchableOpacity>

                  <Text style={styles.securityText}>
                    Accès réservé aux utilisateurs autorisés.
                  </Text>
                </View>

                {/* Pied de page */}
                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    PROTÉGER • RESTAURER • PRÉSERVER
                  </Text>

                  <Text style={styles.footerCopyright}>© Dry Forest</Text>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
