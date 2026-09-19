// app/reboisement/subplot.tsx
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
import { styles } from "../../assets/css/subplot.styles";

export const options = {
  title: "Mise à jour Placette",
};

export default function SubplotScreen() {
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedPlaceau, setSelectedPlaceau] = useState("");
  const [selectedPlacetteNumber, setSelectedPlacetteNumber] = useState("");
  const [placetteName, setPlacetteName] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [showPlaceauModal, setShowPlaceauModal] = useState(false);
  const [showPlacetteNumberModal, setShowPlacetteNumberModal] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const [, setFocusedInput] = useState<string | null>(null);

  const zones = ["Zone Nord", "Zone Sud", "Zone Est", "Zone Ouest", "Zone Centre"];
  const placeaux = ["plc_1", "plc_2", "plc_3", "plc_4", "plc_5"];
  const placetteNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const handleSubmit = () => {
    console.log({
      zone: selectedZone,
      placeau: selectedPlaceau,
      placetteNumber: selectedPlacetteNumber,
      placetteName,
      length,
      width,
      latitude,
      longitude,
    });
    alert('Placette mise à jour avec succès!');
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
          <Text style={styles.title}>Mise à jour de Placette</Text>

          {/* Zone et Placeau (côte à côte) */}
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
          </View>

          {/* Numéro du placette et Nom du placette (côte à côte) */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Numéro du placette</Text>
              <PickerButton
                value={selectedPlacetteNumber}
                onPress={() => setShowPlacetteNumberModal(true)}
                placeholder="Sélectionnez un numéro"
              />
              <CustomPicker
                visible={showPlacetteNumberModal}
                setVisible={setShowPlacetteNumberModal}
                options={placetteNumbers}
                selectedValue={selectedPlacetteNumber}
                onSelect={setSelectedPlacetteNumber}
                title="Sélectionnez un numéro"
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Nom du placette</Text>
              <TextInput
                style={styles.textInput}
                value={placetteName}
                onChangeText={setPlacetteName}
                onFocus={() => handleInputFocus('placetteName')}
                onBlur={handleInputBlur}
                placeholder="Nom du placette"
                placeholderTextColor="#FFFFFFAA"
              />
            </View>
          </View>

          {/* Longueur et Largeur (côte à côte) */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Longueur (m)</Text>
              <TextInput
                style={styles.textInput}
                value={length}
                onChangeText={setLength}
                onFocus={() => handleInputFocus('length')}
                onBlur={handleInputBlur}
                keyboardType="numeric"
                placeholder="Longueur"
                placeholderTextColor="#FFFFFFAA"
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Largeur (m)</Text>
              <TextInput
                style={styles.textInput}
                value={width}
                onChangeText={setWidth}
                onFocus={() => handleInputFocus('width')}
                onBlur={handleInputBlur}
                keyboardType="numeric"
                placeholder="Largeur"
                placeholderTextColor="#FFFFFFAA"
              />
            </View>
          </View>

          {/* Longitude et Latitude (côte à côte) */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Latitude</Text>
              <TextInput
                style={styles.textInput}
                value={latitude}
                onChangeText={setLatitude}
                onFocus={() => handleInputFocus('latitude')}
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
                onFocus={() => handleInputFocus('longitude')}
                onBlur={handleInputBlur}
                keyboardType="numeric"
                placeholder="Longitude"
                placeholderTextColor="#FFFFFFAA"
              />
            </View>
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

