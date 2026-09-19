// app/reboisement/creation-plantation-block.tsx
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
import { styles } from "../../assets/css/creation-plantation-block.styles";

export const options = {
  title: "Création Bloc Plantation",
};

interface CoordinateLine {
  id: string;
  latitude: string;
  longitude: string;
}

export default function CreationPlantationBlockScreen() {
  const [selectedZone, setSelectedZone] = useState("");
  const [placeauName, setPlaceauName] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [placetteCount, setPlacetteCount] = useState("");
  const [placetteLength, setPlacetteLength] = useState("");
  const [placetteWidth, setPlacetteWidth] = useState("");
  const [coordinateLines, setCoordinateLines] = useState<CoordinateLine[]>([
    { id: "1", latitude: "", longitude: "" },
  ]);
  
  const [showZoneModal, setShowZoneModal] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const zones = ["Zone Nord", "Zone Sud", "Zone Est", "Zone Ouest", "Zone Centre"];

  const handleSubmit = () => {
    console.log({
      zone: selectedZone,
      placeauName,
      length,
      width,
      placetteCount,
      placetteLength,
      placetteWidth,
      coordinates: coordinateLines,
    });
    alert('Bloc de plantation créé avec succès!');
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

  // Gestion des lignes de coordonnées
  const addCoordinateLine = () => {
    const newLine: CoordinateLine = {
      id: Date.now().toString(),
      latitude: "",
      longitude: "",
    };
    setCoordinateLines([...coordinateLines, newLine]);
  };

  const removeCoordinateLine = (id: string) => {
    if (coordinateLines.length > 1) {
      setCoordinateLines(coordinateLines.filter(line => line.id !== id));
    }
  };

  const updateCoordinateLine = (id: string, field: keyof CoordinateLine, value: string) => {
    setCoordinateLines(coordinateLines.map(line =>
      line.id === id ? { ...line, [field]: value } : line
    ));
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
          <Text style={styles.title}>Création de Bloc de Plantation</Text>

          {/* Zone et Nom placeau (côte à côte) */}
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
              <Text style={styles.label}>Nom placeau</Text>
              <TextInput
                style={styles.textInput}
                value={placeauName}
                onChangeText={setPlaceauName}
                onFocus={() => handleInputFocus('placeauName')}
                onBlur={handleInputBlur}
                placeholder="Nom du placeau"
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

          {/* Nombre de placette */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre de placette</Text>
            <TextInput
              style={styles.textInput}
              value={placetteCount}
              onChangeText={setPlacetteCount}
              onFocus={() => handleInputFocus('placetteCount')}
              onBlur={handleInputBlur}
              keyboardType="numeric"
              placeholder="Nombre de placettes"
              placeholderTextColor="#FFFFFFAA"
            />
          </View>

          {/* Longueur et Largeur du placette (côte à côte) */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Long. placette (m)</Text>
              <TextInput
                style={styles.textInput}
                value={placetteLength}
                onChangeText={setPlacetteLength}
                onFocus={() => handleInputFocus('placetteLength')}
                onBlur={handleInputBlur}
                keyboardType="numeric"
                placeholder="Longueur"
                placeholderTextColor="#FFFFFFAA"
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Larg. placette (m)</Text>
              <TextInput
                style={styles.textInput}
                value={placetteWidth}
                onChangeText={setPlacetteWidth}
                onFocus={() => handleInputFocus('placetteWidth')}
                onBlur={handleInputBlur}
                keyboardType="numeric"
                placeholder="Largeur"
                placeholderTextColor="#FFFFFFAA"
              />
            </View>
          </View>

          {/* Coordonnées */}
          <View style={styles.coordinatesSection}>
            <Text style={styles.label}>Coordonnées</Text>
            {coordinateLines.map((line, index) => (
              <View key={line.id} style={styles.coordinateLine}>
                <View style={[styles.coordinateInputContainer, { flex: 1, marginRight: 5 }]}>
                  <Text style={styles.coordinateLabel}>Latitude</Text>
                  <TextInput
                    style={styles.textInput}
                    value={line.latitude}
                    onChangeText={(value) => updateCoordinateLine(line.id, 'latitude', value)}
                    onFocus={() => handleInputFocus(`latitude-${line.id}`)}
                    onBlur={handleInputBlur}
                    keyboardType="numeric"
                    placeholder="Latitude"
                    placeholderTextColor="#FFFFFFAA"
                  />
                </View>
                
                <View style={[styles.coordinateInputContainer, { flex: 1, marginRight: 5 }]}>
                  <Text style={styles.coordinateLabel}>Longitude</Text>
                  <TextInput
                    style={styles.textInput}
                    value={line.longitude}
                    onChangeText={(value) => updateCoordinateLine(line.id, 'longitude', value)}
                    onFocus={() => handleInputFocus(`longitude-${line.id}`)}
                    onBlur={handleInputBlur}
                    keyboardType="numeric"
                    placeholder="Longitude"
                    placeholderTextColor="#FFFFFFAA"
                  />
                </View>

                {coordinateLines.length > 1 ? (
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => removeCoordinateLine(line.id)}
                  >
                    <Text style={styles.buttonText}>✕</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={addCoordinateLine}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            
            {coordinateLines.length > 1 && (
              <TouchableOpacity style={styles.addLineButton} onPress={addCoordinateLine}>
                <Text style={styles.addLineText}>+ Ajouter d{"'"}autres coordonnées</Text>
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

