
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import FormModal from "@/components/common/FormModal";

import { Gender, GenderFormData } from "@/models/gender.model";
import { COLORS } from "@/constants/colors";
import { referenceFormStyles as styles } from "@/assets/css/referenceForm.styles";

interface GenderFormProps {
  visible: boolean;
  gender: Gender | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: GenderFormData) => void;
}

export default function GenderForm({
  visible,
  gender,
  loading,
  onClose,
  onSubmit,
}: GenderFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const isEditing = gender !== null;

  useEffect(() => {
    if (visible) {
      setName(gender?.name ?? "");
      setError("");
    }
  }, [visible, gender]);

  const handleSubmit = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Le nom du genre est obligatoire.");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Le nom doit contenir au moins 2 caractères.");
      return;
    }

    setError("");

    onSubmit({ name: trimmedName });
  };

  return (
    <FormModal
      visible={visible}
      title={isEditing ? "Modifier le genre" : "Créer un genre"}
      onClose={onClose}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Nom du genre *</Text>

        <TextInput
          style={[
            styles.input,
            error ? styles.inputError : undefined,
          ]}
          value={name}
          onChangeText={(value) => {
            setName(value);
            setError("");
          }}
          placeholder="Ex. Homme, Femme"
          placeholderTextColor={COLORS.textPlaceholder}
          autoCapitalize="words"
          maxLength={50}
          editable={!loading}
        />

        {!!error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <TouchableOpacity
          style={[
            styles.submitButton,
            loading && styles.disabled,
          ]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.submitText}>
              {isEditing
                ? "Enregistrer les modifications"
                : "Créer le genre"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </FormModal>
  );
}
