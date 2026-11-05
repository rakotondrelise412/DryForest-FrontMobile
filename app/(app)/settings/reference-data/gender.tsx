
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useToast } from "@/components/common/ToastProvider";
import GenderForm from "@/components/settings/GenderForm";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import genderService from "@/services/gender.service";
import { Gender, GenderFormData } from "@/models/gender.model";

import { COLORS } from "@/constants/colors";
import { referenceDataStyles as styles } from "@/assets/css/referenceData.styles";

export default function GenderListScreen() {
  const { showToast } = useToast();

  const [genders, setGenders] = useState<Gender[]>([]);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [formVisible, setFormVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [genderToDelete, setGenderToDelete] = useState<Gender | null>(null);

  const loadGenders = useCallback(async () => {
    try {
      setLoading(true);

      const data = await genderService.getAll();

      setGenders(data);
    } catch (error: any) {
      showToast(
        error?.response?.data?.message ??
          "Impossible de charger les genres.",
        "error",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadGenders();
  }, [loadGenders]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadGenders();
  };

  const openCreateModal = () => {
    setSelectedGender(null);
    setFormVisible(true);
  };

  const openEditModal = (gender: Gender) => {
    setSelectedGender(gender);
    setFormVisible(true);
  };

  const closeFormModal = () => {
    if (submitting) return;

    setFormVisible(false);
    setSelectedGender(null);
  };

  const openDeleteModal = (gender: Gender) => {
    setGenderToDelete(gender);
    setDeleteVisible(true);
  };

  const handleSubmit = async (data: GenderFormData) => {
    try {
      setSubmitting(true);

      if (selectedGender) {
        await genderService.update(selectedGender.id, data);

        showToast("Le genre a été modifié avec succès.", "success");
      } else {
        await genderService.create(data);

        showToast("Le genre a été créé avec succès.", "success");
      }

      setFormVisible(false);
      setSelectedGender(null);

      await loadGenders();
    } catch (error: any) {
      showToast(
        error?.response?.data?.message ??
          "Une erreur est survenue lors de l'enregistrement du genre.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!genderToDelete) return;

    try {
      setSubmitting(true);

      await genderService.delete(genderToDelete.id);

      setDeleteVisible(false);
      setGenderToDelete(null);

      showToast("Le genre a été supprimé avec succès.", "success");

      await loadGenders();
    } catch (error: any) {
      showToast(
        error?.response?.data?.message ??
          "Impossible de supprimer ce genre.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderItem = ({ item }: { item: Gender }) => (
    <View style={styles.card}>
      <View style={styles.genderInfo}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="people-outline"
            size={24}
            color={COLORS.primary}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.genderName}>{item.name}</Text>

          <Text style={styles.genderId}>
            Identifiant : {item.id}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openEditModal(item)}
          accessibilityLabel={`Modifier le genre ${item.name}`}
        >
          <Ionicons
            name="create-outline"
            size={20}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => openDeleteModal(item)}
          accessibilityLabel={`Supprimer le genre ${item.name}`}
        >
          <Ionicons
            name="trash-outline"
            size={20}
            color={COLORS.error}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          router.push("/(app)/settings/reference-data")
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
        activeOpacity={0.7}
      >
        <Ionicons
          name="arrow-back"
          size={22}
          color={COLORS.primary}
        />

        <Text
          style={{
            color: COLORS.primary,
            marginLeft: 6,
            fontWeight: "600",
          }}
        >
          Retour aux données de référence
        </Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Gestion des genres</Text>

          <Text style={styles.subtitle}>
            {genders.length} genre(s) enregistré(s)
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={openCreateModal}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={22} color={COLORS.white} />

          <Text style={styles.addButtonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
          />
        </View>
      ) : (
        <FlatList
          data={genders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
            />
          }
          ListEmptyComponent={
            !loading ? (
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="people-outline"
                  size={50}
                  color={COLORS.primary}
                />

                <Text style={styles.emptyTitle}>
                  Aucun genre disponible
                </Text>

                <Text style={styles.emptyText}>
                  Appuyez sur « Ajouter » pour créer votre premier genre.
                </Text>
              </View>
            ) : null
          }
        />
      )}

      <GenderForm
        visible={formVisible}
        gender={selectedGender}
        loading={submitting}
        onClose={closeFormModal}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        visible={deleteVisible}
        title="Confirmer la suppression"
        message={`Voulez-vous vraiment supprimer le genre « ${
          genderToDelete?.name ?? ""
        } » ? Cette action est irréversible.`}
        loading={submitting}
        onCancel={() => {
          if (submitting) return;

          setDeleteVisible(false);
          setGenderToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </View>
  );
}
