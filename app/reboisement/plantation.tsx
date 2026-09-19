// app/reboisement/plantation.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../assets/css/plantation.styles";

export const options = {
  title: "Suivi Plantation",
};

export default function PlantationScreen() {
  const [selectedPlaceau, setSelectedPlaceau] = useState("");
  const [selectedPlacette, setSelectedPlacette] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diameter, setDiameter] = useState("");
  const [height, setHeight] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [showPlaceauModal, setShowPlaceauModal] = useState(false);
  const [showPlacetteModal, setShowPlacetteModal] = useState(false);
  const [showSpeciesModal, setShowSpeciesModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const [, setFocusedInput] = useState<string | null>(null);

  const placeaux = ["plc_1", "plc_2", "plc_3", "plc_4"];
  const placettes = ["plct_1", "plct_2", "plct_3", "plct_4"];
  const species = ["Baobab", "Katrafay", "Ravintsara", "Niaouli", "Eucalyptus"];

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Nous avons besoin de la permission de la caméra pour prendre des photos.');
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
      Alert.alert('Erreur', 'Impossible d\'accéder à la caméra');
      console.error('Camera error:', error);
    }
  };

  const handleSubmit = () => {
    console.log({
      placeau: selectedPlaceau,
      placette: selectedPlacette,
      species: selectedSpecies,
      date: selectedDate,
      diameter,
      height,
      photo,
    });
    Alert.alert('Succès', 'Données enregistrées avec succès!');
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

  // Composant Picker personnalisé réutilisable
  const CustomPicker = ({ 
    visible, 
    setVisible, 
    options, 
    selectedValue, 
    onSelect,
    title 
  }: {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
    title: string;
  }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
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

  const PickerButton = ({ value, onPress, placeholder }: {
    value: string;
    onPress: () => void;
    placeholder: string;
  }) => (
    <TouchableOpacity style={styles.pickerButton} onPress={onPress}>
      <Text style={styles.pickerButtonText}>
        {value || placeholder}
      </Text>
    </TouchableOpacity>
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
              {Array.from({length: 50}, (_, i) => new Date().getFullYear() - 5 + i).map((year) => (
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
          <Text style={styles.title}>Formulaire de Plantation</Text>

          {/* Placeau */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Placeau</Text>
            <PickerButton
              value={selectedPlaceau}
              onPress={() => setShowPlaceauModal(true)}
              placeholder="Sélectionnez un placeau"
            />
            <CustomPicker
              visible={showPlaceauModal}
              setVisible={setShowPlaceauModal}
              options={placeaux}
              selectedValue={selectedPlaceau}
              onSelect={setSelectedPlaceau}
              title="Sélectionnez un placeau"
            />
          </View>

          {/* Placette */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Placette</Text>
            <PickerButton
              value={selectedPlacette}
              onPress={() => setShowPlacetteModal(true)}
              placeholder="Sélectionnez une placette"
            />
            <CustomPicker
              visible={showPlacetteModal}
              setVisible={setShowPlacetteModal}
              options={placettes}
              selectedValue={selectedPlacette}
              onSelect={setSelectedPlacette}
              title="Sélectionnez une placette"
            />
          </View>

          {/* Espèce et Date (côte à côte) */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 2, marginRight: 10 }]}>
              <Text style={styles.label}>Espèce</Text>
              <PickerButton
                value={selectedSpecies}
                onPress={() => setShowSpeciesModal(true)}
                placeholder="Sélectionnez une espèce"
              />
              <CustomPicker
                visible={showSpeciesModal}
                setVisible={setShowSpeciesModal}
                options={species}
                selectedValue={selectedSpecies}
                onSelect={setSelectedSpecies}
                title="Sélectionnez une espèce"
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1 }]}>
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
          </View>

          <DatePickerModal />

          {/* Diamètre et Hauteur (côte à côte) */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Diamètre (cm)</Text>
              <TextInput
                style={styles.textInput}
                value={diameter}
                onChangeText={setDiameter}
                onFocus={() => handleInputFocus('diameter')}
                onBlur={handleInputBlur}
                keyboardType="numeric"
                placeholder="Diamètre"
                placeholderTextColor="#FFFFFFAA"
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Hauteur (m)</Text>
              <TextInput
                style={styles.textInput}
                value={height}
                onChangeText={setHeight}
                onFocus={() => handleInputFocus('height')}
                onBlur={handleInputBlur}
                keyboardType="numeric"
                placeholder="Hauteur"
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

