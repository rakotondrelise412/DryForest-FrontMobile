// app/reboisement/creation-zone.tsx
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
import { styles } from "../../assets/css/creation-zone.styles";

export const options = {
  title: "Création Zone",
};

interface CoordinateLine {
  id: string;
  latitude: string;
  longitude: string;
}

export default function CreationZoneScreen() {
  const [zoneName, setZoneName] = useState("");
  const [zoneType, setZoneType] = useState("");
  const [area, setArea] = useState("");
  const [coordinateLines, setCoordinateLines] = useState<CoordinateLine[]>([
    { id: "1", latitude: "", longitude: "" },
  ]);
  
  const [showZoneTypeModal, setShowZoneTypeModal] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const zoneTypes = ["Forêt", "Savane", "Zone humide", "Montagne", "Plaine"];

  const handleSubmit = () => {
    console.log({
      zoneName,
      zoneType,
      coordinates: coordinateLines,
      area,
    });
    alert('Zone créée avec succès!');
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
          <Text style={styles.title}>Création de Zone</Text>

          {/* Nom de la zone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom de la zone</Text>
            <TextInput
              style={styles.textInput}
              value={zoneName}
              onChangeText={setZoneName}
              onFocus={() => handleInputFocus('zoneName')}
              onBlur={handleInputBlur}
              placeholder="Entrez le nom de la zone"
              placeholderTextColor="#FFFFFFAA"
            />
          </View>

          {/* Type de zone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Type de zone</Text>
            <PickerButton
              value={zoneType}
              onPress={() => setShowZoneTypeModal(true)}
              placeholder="Sélectionnez le type de zone"
            />
            <CustomPicker
              visible={showZoneTypeModal}
              setVisible={setShowZoneTypeModal}
              options={zoneTypes}
              selectedValue={zoneType}
              onSelect={setZoneType}
              title="Sélectionnez le type de zone"
            />
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

          {/* Superficie */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Superficie (hectares)</Text>
            <TextInput
              style={styles.textInput}
              value={area}
              onChangeText={setArea}
              onFocus={() => handleInputFocus('area')}
              onBlur={handleInputBlur}
              keyboardType="numeric"
              placeholder="Superficie en hectares"
              placeholderTextColor="#FFFFFFAA"
            />
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

