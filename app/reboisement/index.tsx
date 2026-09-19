// app/reboisement/index.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { styles } from "../../assets/css/index-reboisement.styles";

export const options = {
  title: "Suivi réforestation",
};

interface SpeciesLine {
  id: string;
  species: string;
  quantity: string;
}

export default function SuiviReforestationScreen() {
  const router = useRouter();
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState("");
  const [totalPlants, setTotalPlants] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [speciesLines, setSpeciesLines] = useState<SpeciesLine[]>([
    { id: "1", species: "", quantity: "" },
  ]);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [showSpeciesModal, setShowSpeciesModal] = useState<string | null>(null);
  const [showDateModal, setShowDateModal] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const toggleBottomMenu = () => setIsBottomMenuOpen((s) => !s);

  const handleBottomMenuItemPress = (item: { id: string; label: string }) => {
    switch (item.id) {
      case "plantation":
        router.push("/reboisement/plantation");
        break;
      default:
        console.log("menu:", item);
    }
  };

  const addSpeciesLine = () => {
    const newLine: SpeciesLine = {
      id: Date.now().toString(),
      species: "",
      quantity: "",
    };
    setSpeciesLines([...speciesLines, newLine]);
  };

  const removeSpeciesLine = (id: string) => {
    if (speciesLines.length > 1) {
      setSpeciesLines(speciesLines.filter(line => line.id !== id));
    }
  };

  const updateSpeciesLine = (id: string, field: keyof SpeciesLine, value: string) => {
    setSpeciesLines(speciesLines.map(line =>
      line.id === id ? { ...line, [field]: value } : line
    ));
  };

  const handleSubmit = () => {
    console.log({
      zone: selectedZone,
      totalPlants,
      date: selectedDate,
      speciesLines,
    });
    // Traitement des données
  };

  const handleInputFocus = (inputName: string) => {
    setFocusedInput(inputName);
    // Scroll vers l'input focus après un petit délai
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 200, animated: true });
    }, 100);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const bottomMenuItems = [
    { id: "reforestation", label: "Reforestation", icon: "eco" },
    { id: "plantation", label: "Plantation", icon: "local-florist" },
    { id: "suivi-plantation", label: "Suivi plantation", icon: "visibility" },
    { id: "suivi-animal", label: "Suivi animal", icon: "pets" },
  ];

  const reforestationZones = ["Zone A", "Zone B", "Zone C", "Zone D"];
  const plantSpecies = ["Baobab", "Katrafay", "Ravintsara", "Niaouli", "Eucalyptus"];

  // Composant Picker personnalisé pour les zones
  const CustomZonePicker = () => (
    <View>
      <TouchableOpacity 
        style={styles.pickerButton}
        onPress={() => setShowZoneModal(true)}
      >
        <Text style={styles.pickerButtonText}>
          {selectedZone || "Sélectionnez une zone"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showZoneModal}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setShowZoneModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sélectionnez une zone</Text>
              {reforestationZones.map((zone, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => {
                    setSelectedZone(zone);
                    setShowZoneModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{zone}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setShowZoneModal(false)}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );

  // Composant Picker personnalisé pour les espèces
  const CustomSpeciesPicker = ({ lineId, currentValue, onValueChange }: { 
    lineId: string; 
    currentValue: string; 
    onValueChange: (value: string) => void;
  }) => (
    <View>
      <TouchableOpacity 
        style={styles.pickerButton}
        onPress={() => setShowSpeciesModal(lineId)}
      >
        <Text style={styles.pickerButtonText}>
          {currentValue || "Sélectionnez une espèce"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showSpeciesModal === lineId}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setShowSpeciesModal(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sélectionnez une espèce</Text>
              {plantSpecies.map((species, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => {
                    onValueChange(species);
                    setShowSpeciesModal(null);
                  }}
                >
                  <Text style={styles.modalOptionText}>{species}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setShowSpeciesModal(null)}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );

  // Composant Date Picker amélioré
  const DatePickerModal = () => (
    <Modal
      visible={showDateModal}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.dateModalContent}>
          <Text style={styles.modalTitle}>Sélectionnez une date</Text>
          
          {/* Années */}
          <View style={styles.yearContainer}>
            <Text style={styles.dateLabel}>Année</Text>
            <ScrollView horizontal style={styles.yearScrollView}>
              {Array.from({length: 10}, (_, i) => new Date().getFullYear() - 5 + i).map((year) => (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.yearButton,
                    selectedDate.getFullYear() === year && styles.selectedDateButton
                  ]}
                  onPress={() => setSelectedDate(new Date(year, selectedDate.getMonth(), selectedDate.getDate()))}
                >
                  <Text style={[
                    styles.yearButtonText,
                    selectedDate.getFullYear() === year && styles.selectedDateText
                  ]}>{year}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* Mois */}
          <View style={styles.monthContainer}>
            <Text style={styles.dateLabel}>Mois</Text>
            <View style={styles.monthGrid}>
              {[
                "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
                "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
              ].map((month, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.monthButton,
                    selectedDate.getMonth() === index && styles.selectedDateButton
                  ]}
                  onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), index, selectedDate.getDate()))}
                >
                  <Text style={[
                    styles.monthButtonText,
                    selectedDate.getMonth() === index && styles.selectedDateText
                  ]}>{month}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Jours */}
          <View style={styles.dayContainer}>
            <Text style={styles.dateLabel}>Jour</Text>
            <ScrollView horizontal style={styles.dayScrollView}>
              {Array.from({length: 31}, (_, i) => i + 1).map((day) => {
                const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
                if (day > daysInMonth) return null;
                
                return (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      selectedDate.getDate() === day && styles.selectedDateButton
                    ]}
                    onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                  >
                    <Text style={[
                      styles.dayButtonText,
                      selectedDate.getDate() === day && styles.selectedDateText
                    ]}>{day}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          
          <View style={styles.dateModalActions}>
            <TouchableOpacity
              style={[styles.modalCancel, {flex: 1, marginRight: 10}]}
              onPress={() => setShowDateModal(false)}
            >
              <Text style={styles.modalCancelText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalConfirm, {flex: 1}]}
              onPress={() => setShowDateModal(false)}
            >
              <Text style={styles.modalConfirmText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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
          <Text style={styles.title}>Formulaire de Reforestation</Text>
          
          {/* Zone de reforestation */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Zone de reforestation</Text>
            <CustomZonePicker />
          </View>

          {/* Nombre total de plantes */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre total de plantes</Text>
            <TextInput
              style={styles.textInput}
              value={totalPlants}
              onChangeText={setTotalPlants}
              onFocus={() => handleInputFocus('totalPlants')}
              onBlur={handleInputBlur}
              keyboardType="numeric"
              placeholder="Entrez le nombre total"
              placeholderTextColor="#FFFFFFAA"
            />
          </View>

          {/* Date */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowDateModal(true)}
            >
              <Text style={styles.dateText}>
                {selectedDate.toLocaleDateString('fr-FR')}
              </Text>
            </TouchableOpacity>
          </View>

          <DatePickerModal />

          {/* Lignes d'espèces */}
          <View style={styles.speciesSection}>
            <Text style={styles.label}>Espèces à planter</Text>
            {speciesLines.map((line, index) => (
              <View key={line.id} style={styles.speciesLine}>
                <View style={[styles.speciesInputContainer, { flex: 3 }]}>
                  <CustomSpeciesPicker
                    lineId={line.id}
                    currentValue={line.species}
                    onValueChange={(value) => updateSpeciesLine(line.id, 'species', value)}
                  />
                </View>
                
                <View style={[styles.speciesInputContainer, { flex: 2, marginHorizontal: 5 }]}>
                  <TextInput
                    style={styles.textInput}
                    value={line.quantity}
                    onChangeText={(value) => updateSpeciesLine(line.id, 'quantity', value)}
                    onFocus={() => handleInputFocus(`speciesQuantity-${line.id}`)}
                    onBlur={handleInputBlur}
                    keyboardType="numeric"
                    placeholder="Quantité"
                    placeholderTextColor="#FFFFFFAA"
                  />
                </View>

                {speciesLines.length > 1 ? (
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => removeSpeciesLine(line.id)}
                  >
                    <Text style={styles.buttonText}>X</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={addSpeciesLine}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            
            {speciesLines.length > 1 && (
              <TouchableOpacity style={styles.addLineButton} onPress={addSpeciesLine}>
                <Text style={styles.addLineText}>+ Ajouter une autre espèce</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Bouton Valider */}
          <View style={styles.validateButtonContainer}>
            <TouchableOpacity style={styles.validateButton} onPress={handleSubmit}>
              <Text style={styles.validateButtonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

