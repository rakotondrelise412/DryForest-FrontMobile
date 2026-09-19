// app/patrouille/incident-patrol.tsx
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../assets/css/incident-patrol.styles";

export const options = {
  title: "Rapport d'Incident",
};

export default function IncidentPatrolScreen() {
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedPatrolGroup, setSelectedPatrolGroup] = useState("");
  const [selectedIncidentType, setSelectedIncidentType] = useState("");
  const [selectedDamageLevel, setSelectedDamageLevel] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const [showZoneModal, setShowZoneModal] = useState(false);
  const [showPatrolGroupModal, setShowPatrolGroupModal] = useState(false);
  const [showIncidentTypeModal, setShowIncidentTypeModal] = useState(false);
  const [showDamageLevelModal, setShowDamageLevelModal] = useState(false);
  const [showDateTimeModal, setShowDateTimeModal] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const zones = [
    "Zone Nord",
    "Zone Sud",
    "Zone Est",
    "Zone Ouest",
    "Zone Centre",
  ];
  const patrolGroups = ["Groupe A", "Groupe B", "Groupe C", "Groupe D"];
  const incidentTypes = [
    "Feu",
    "Déforestation",
    "Braconnage",
    "Pollution",
    "Infrastructure endommagée",
  ];
  const damageLevels = ["Faible", "Moyen", "Élevé", "Critique"];

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "Nous avons besoin de la permission de la caméra pour prendre des photos.",
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'accéder à la caméra");
      console.error("Camera error:", error);
    }
  };

  const handleSubmit = () => {
    console.log({
      zone: selectedZone,
      patrolGroup: selectedPatrolGroup,
      incidentType: selectedIncidentType,
      damageLevel: selectedDamageLevel,
      dateTime: selectedDateTime,
      latitude,
      longitude,
      photo,
      description,
    });
    alert("Rapport d'incident enregistré avec succès!");
  };

  const handleInputFocus = (inputName: string) => {
    setFocusedInput(inputName);
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 200, animated: true });
    }, 100);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  // Composant Picker personnalisé
  const CustomPicker = ({
    visible,
    setVisible,
    options,
    selectedValue,
    onSelect,
    title,
  }: {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
    title: string;
  }) => (
    <Modal visible={visible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => {
                  onSelect(option);
                  setVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.modalCancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const PickerButton = ({
    value,
    onPress,
    placeholder,
  }: {
    value: string;
    onPress: () => void;
    placeholder: string;
  }) => (
    <TouchableOpacity style={styles.pickerButton} onPress={onPress}>
      <Text style={styles.pickerButtonText}>{value || placeholder}</Text>
    </TouchableOpacity>
  );

  // Composant Date et Heure Picker amélioré (comme Animal Tracking)
  const DateTimePickerModal = () => {
    const [selectedHour, setSelectedHour] = useState(
      selectedDateTime.getHours(),
    );
    const [selectedMinute, setSelectedMinute] = useState(
      selectedDateTime.getMinutes(),
    );

    const handleConfirm = () => {
      const newDate = new Date(selectedDateTime);
      newDate.setHours(selectedHour);
      newDate.setMinutes(selectedMinute);
      setSelectedDateTime(newDate);
      setShowDateTimeModal(false);
    };

    return (
      <Modal
        visible={showDateTimeModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dateTimeModalContent}>
            <Text style={styles.modalTitle}>
              Sélectionnez la date et l{"'"}heure
            </Text>

            {/* Date */}
            <View style={styles.dateTimeSection}>
              <Text style={styles.dateLabel}>Date</Text>

              {/* Années */}
              <View style={styles.yearContainer}>
                <Text style={styles.dateSubLabel}>Année</Text>
                <ScrollView horizontal style={styles.yearScrollView}>
                  {Array.from(
                    { length: 10 },
                    (_, i) => new Date().getFullYear() - 5 + i,
                  ).map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.yearButton,
                        selectedDateTime.getFullYear() === year &&
                          styles.selectedDateButton,
                      ]}
                      onPress={() =>
                        setSelectedDateTime(
                          new Date(
                            year,
                            selectedDateTime.getMonth(),
                            selectedDateTime.getDate(),
                          ),
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.yearButtonText,
                          selectedDateTime.getFullYear() === year &&
                            styles.selectedDateText,
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Mois */}
              <View style={styles.monthContainer}>
                <Text style={styles.dateSubLabel}>Mois</Text>
                <View style={styles.monthGrid}>
                  {[
                    "Jan",
                    "Fév",
                    "Mar",
                    "Avr",
                    "Mai",
                    "Juin",
                    "Juil",
                    "Août",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Déc",
                  ].map((month, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.monthButton,
                        selectedDateTime.getMonth() === index &&
                          styles.selectedDateButton,
                      ]}
                      onPress={() =>
                        setSelectedDateTime(
                          new Date(
                            selectedDateTime.getFullYear(),
                            index,
                            selectedDateTime.getDate(),
                          ),
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.monthButtonText,
                          selectedDateTime.getMonth() === index &&
                            styles.selectedDateText,
                        ]}
                      >
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Jours */}
              <View style={styles.dayContainer}>
                <Text style={styles.dateSubLabel}>Jour</Text>
                <ScrollView horizontal style={styles.dayScrollView}>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const daysInMonth = new Date(
                      selectedDateTime.getFullYear(),
                      selectedDateTime.getMonth() + 1,
                      0,
                    ).getDate();
                    if (day > daysInMonth) return null;

                    return (
                      <TouchableOpacity
                        key={day}
                        style={[
                          styles.dayButton,
                          selectedDateTime.getDate() === day &&
                            styles.selectedDateButton,
                        ]}
                        onPress={() =>
                          setSelectedDateTime(
                            new Date(
                              selectedDateTime.getFullYear(),
                              selectedDateTime.getMonth(),
                              day,
                            ),
                          )
                        }
                      >
                        <Text
                          style={[
                            styles.dayButtonText,
                            selectedDateTime.getDate() === day &&
                              styles.selectedDateText,
                          ]}
                        >
                          {day}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>

            {/* Heure */}
            <View style={styles.dateTimeSection}>
              <Text style={styles.dateLabel}>Heure</Text>
              <View style={styles.timeContainer}>
                <View style={styles.timeColumn}>
                  <Text style={styles.timeLabel}>Heures</Text>
                  <ScrollView style={styles.timeScrollView}>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <TouchableOpacity
                        key={hour}
                        style={[
                          styles.timeButton,
                          selectedHour === hour && styles.selectedDateButton,
                        ]}
                        onPress={() => setSelectedHour(hour)}
                      >
                        <Text
                          style={[
                            styles.timeButtonText,
                            selectedHour === hour && styles.selectedDateText,
                          ]}
                        >
                          {hour.toString().padStart(2, "0")}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.timeColumn}>
                  <Text style={styles.timeLabel}>Minutes</Text>
                  <ScrollView style={styles.timeScrollView}>
                    {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                      <TouchableOpacity
                        key={minute}
                        style={[
                          styles.timeButton,
                          selectedMinute === minute &&
                            styles.selectedDateButton,
                        ]}
                        onPress={() => setSelectedMinute(minute)}
                      >
                        <Text
                          style={[
                            styles.timeButtonText,
                            selectedMinute === minute &&
                              styles.selectedDateText,
                          ]}
                        >
                          {minute.toString().padStart(2, "0")}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>

            <View style={styles.dateModalActions}>
              <TouchableOpacity
                style={[styles.modalCancel, { flex: 1, marginRight: 10 }]}
                onPress={() => setShowDateTimeModal(false)}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalConfirm, { flex: 1 }]}
                onPress={handleConfirm}
              >
                <Text style={styles.modalConfirmText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Rapport d{"'"}Incident</Text>

          {/* Zone et Groupe de patrouille (côte à côte) */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Zone</Text>
              <PickerButton
                value={selectedZone}
                onPress={() => setShowZoneModal(true)}
                placeholder="Sélectionnez une zone"
              />
              <CustomPicker
                visible={showZoneModal}
                setVisible={setShowZoneModal}
                options={zones}
                selectedValue={selectedZone}
                onSelect={setSelectedZone}
                title="Sélectionnez une zone"
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Groupe de patrouille</Text>
              <PickerButton
                value={selectedPatrolGroup}
                onPress={() => setShowPatrolGroupModal(true)}
                placeholder="Sélectionnez un groupe"
              />
              <CustomPicker
                visible={showPatrolGroupModal}
                setVisible={setShowPatrolGroupModal}
                options={patrolGroups}
                selectedValue={selectedPatrolGroup}
                onSelect={setSelectedPatrolGroup}
                title="Sélectionnez un groupe"
              />
            </View>
          </View>

          {/* Type d'incident et Niveau de dégât (côte à côte) */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Type d{"'"}incident</Text>
              <PickerButton
                value={selectedIncidentType}
                onPress={() => setShowIncidentTypeModal(true)}
                placeholder="Sélectionnez un type"
              />
              <CustomPicker
                visible={showIncidentTypeModal}
                setVisible={setShowIncidentTypeModal}
                options={incidentTypes}
                selectedValue={selectedIncidentType}
                onSelect={setSelectedIncidentType}
                title="Sélectionnez un type d'incident"
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Niveau de dégât</Text>
              <PickerButton
                value={selectedDamageLevel}
                onPress={() => setShowDamageLevelModal(true)}
                placeholder="Sélectionnez un niveau"
              />
              <CustomPicker
                visible={showDamageLevelModal}
                setVisible={setShowDamageLevelModal}
                options={damageLevels}
                selectedValue={selectedDamageLevel}
                onSelect={setSelectedDamageLevel}
                title="Sélectionnez un niveau de dégât"
              />
            </View>
          </View>

          {/* Date et Heure */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date et Heure</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDateTimeModal(true)}
            >
              <Text style={styles.dateText}>
                {selectedDateTime.toLocaleString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal />

          {/* Longitude et Latitude (côte à côte) */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Latitude</Text>
              <TextInput
                style={styles.textInput}
                value={latitude}
                onChangeText={setLatitude}
                onFocus={() => handleInputFocus("latitude")}
                onBlur={handleInputBlur}
                keyboardType="numeric"
                placeholder="Latitude"
                placeholderTextColor="#FFFFFFAA"
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Longitude</Text>
              <TextInput
                style={styles.textInput}
                value={longitude}
                onChangeText={setLongitude}
                onFocus={() => handleInputFocus("longitude")}
                onBlur={handleInputBlur}
                keyboardType="numeric"
                placeholder="Longitude"
                placeholderTextColor="#FFFFFFAA"
              />
            </View>
          </View>

          {/* Photo */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Photo</Text>
            <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.photoImage} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoText}>📷 Prendre une photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              onFocus={() => handleInputFocus("description")}
              onBlur={handleInputBlur}
              placeholder="Description de l'incident"
              placeholderTextColor="#FFFFFFAA"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Bouton Valider */}
          <View style={styles.validateButtonContainer}>
            <TouchableOpacity
              style={styles.validateButton}
              onPress={handleSubmit}
            >
              <Text style={styles.validateButtonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
