// app/reboisement/animal-tracking.tsx
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
import { styles } from "../../assets/css/animal-tracking-reboisement.styles";

export const options = {
  title: "Suivi Animal",
};

interface AnimalLine {
  id: string;
  animal: string;
  hasSeen: boolean;
}

export default function AnimalTrackingScreen() {
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedPlaceau, setSelectedPlaceau] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [description, setDescription] = useState("");
  const [animalLines, setAnimalLines] = useState<AnimalLine[]>([
    { id: "1", animal: "", hasSeen: false },
  ]);
  
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [showPlaceauModal, setShowPlaceauModal] = useState(false);
  const [showAnimalModal, setShowAnimalModal] = useState<string | null>(null);
  const [showDateTimeModal, setShowDateTimeModal] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const zones = ["Zone Nord", "Zone Sud", "Zone Est", "Zone Ouest"];
  const placeaux = ["pl1", "pl2", "pl3", "pl4", "pl5"];
  const animals = ["Lémurien", "Caméléon", "Tortue", "Oiseau", "Serpent", "Grenouille"];

  const handleSubmit = () => {
    console.log({
      zone: selectedZone,
      placeau: selectedPlaceau,
      animalLines,
      latitude,
      longitude,
      dateTime: selectedDateTime,
      description,
    });
    alert('Données de suivi animal enregistrées avec succès!');
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

  // Gestion des lignes d'animaux
  const addAnimalLine = () => {
    const newLine: AnimalLine = {
      id: Date.now().toString(),
      animal: "",
      hasSeen: false,
    };
    setAnimalLines([...animalLines, newLine]);
  };

  const removeAnimalLine = (id: string) => {
    if (animalLines.length > 1) {
      setAnimalLines(animalLines.filter(line => line.id !== id));
    }
  };

  const updateAnimalLine = (id: string, field: keyof AnimalLine, value: string | boolean) => {
    setAnimalLines(animalLines.map(line =>
      line.id === id ? { ...line, [field]: value } : line
    ));
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

  // Composant Picker pour les animaux
  const AnimalPicker = ({ lineId, currentValue, onValueChange }: { 
    lineId: string; 
    currentValue: string; 
    onValueChange: (value: string) => void;
  }) => (
    <View>
      <TouchableOpacity 
        style={styles.pickerButton}
        onPress={() => setShowAnimalModal(lineId)}
      >
        <Text style={styles.pickerButtonText}>
          {currentValue || "Sélectionnez un animal"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showAnimalModal === lineId}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setShowAnimalModal(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sélectionnez un animal</Text>
              {animals.map((animal, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => {
                    onValueChange(animal);
                    setShowAnimalModal(null);
                  }}
                >
                  <Text style={styles.modalOptionText}>{animal}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setShowAnimalModal(null)}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
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

  // Composant Date et Heure Picker
  const DateTimePickerModal = () => {
    const [selectedHour, setSelectedHour] = useState(selectedDateTime.getHours());
    const [selectedMinute, setSelectedMinute] = useState(selectedDateTime.getMinutes());

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
            <Text style={styles.modalTitle}>Sélectionnez la date et l{"'"}heure</Text>
            
            {/* Date */}
            <View style={styles.dateTimeSection}>
              <Text style={styles.dateLabel}>Date</Text>
              
              {/* Années */}
              <View style={styles.yearContainer}>
                <Text style={styles.dateSubLabel}>Année</Text>
                <ScrollView horizontal style={styles.yearScrollView}>
                  {Array.from({length: 10}, (_, i) => new Date().getFullYear() - 5 + i).map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.yearButton,
                        selectedDateTime.getFullYear() === year && styles.selectedDateButton
                      ]}
                      onPress={() => setSelectedDateTime(new Date(year, selectedDateTime.getMonth(), selectedDateTime.getDate()))}
                    >
                      <Text style={[
                        styles.yearButtonText,
                        selectedDateTime.getFullYear() === year && styles.selectedDateText
                      ]}>{year}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              {/* Mois */}
              <View style={styles.monthContainer}>
                <Text style={styles.dateSubLabel}>Mois</Text>
                <View style={styles.monthGrid}>
                  {[
                    "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
                    "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
                  ].map((month, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.monthButton,
                        selectedDateTime.getMonth() === index && styles.selectedDateButton
                      ]}
                      onPress={() => setSelectedDateTime(new Date(selectedDateTime.getFullYear(), index, selectedDateTime.getDate()))}
                    >
                      <Text style={[
                        styles.monthButtonText,
                        selectedDateTime.getMonth() === index && styles.selectedDateText
                      ]}>{month}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              {/* Jours */}
              <View style={styles.dayContainer}>
                <Text style={styles.dateSubLabel}>Jour</Text>
                <ScrollView horizontal style={styles.dayScrollView}>
                  {Array.from({length: 31}, (_, i) => i + 1).map((day) => {
                    const daysInMonth = new Date(selectedDateTime.getFullYear(), selectedDateTime.getMonth() + 1, 0).getDate();
                    if (day > daysInMonth) return null;
                    
                    return (
                      <TouchableOpacity
                        key={day}
                        style={[
                          styles.dayButton,
                          selectedDateTime.getDate() === day && styles.selectedDateButton
                        ]}
                        onPress={() => setSelectedDateTime(new Date(selectedDateTime.getFullYear(), selectedDateTime.getMonth(), day))}
                      >
                        <Text style={[
                          styles.dayButtonText,
                          selectedDateTime.getDate() === day && styles.selectedDateText
                        ]}>{day}</Text>
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
                    {Array.from({length: 24}, (_, i) => i).map((hour) => (
                      <TouchableOpacity
                        key={hour}
                        style={[
                          styles.timeButton,
                          selectedHour === hour && styles.selectedDateButton
                        ]}
                        onPress={() => setSelectedHour(hour)}
                      >
                        <Text style={[
                          styles.timeButtonText,
                          selectedHour === hour && styles.selectedDateText
                        ]}>{hour.toString().padStart(2, '0')}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                
                <View style={styles.timeColumn}>
                  <Text style={styles.timeLabel}>Minutes</Text>
                  <ScrollView style={styles.timeScrollView}>
                    {Array.from({length: 60}, (_, i) => i).map((minute) => (
                      <TouchableOpacity
                        key={minute}
                        style={[
                          styles.timeButton,
                          selectedMinute === minute && styles.selectedDateButton
                        ]}
                        onPress={() => setSelectedMinute(minute)}
                      >
                        <Text style={[
                          styles.timeButtonText,
                          selectedMinute === minute && styles.selectedDateText
                        ]}>{minute.toString().padStart(2, '0')}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
            
            <View style={styles.dateModalActions}>
              <TouchableOpacity
                style={[styles.modalCancel, {flex: 1, marginRight: 10}]}
                onPress={() => setShowDateTimeModal(false)}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalConfirm, {flex: 1}]}
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
          <Text style={styles.title}>Suivi Animal</Text>

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

        {/* Lignes d'animaux */}
        <View style={styles.animalsSection}>
        <Text style={styles.label}>Animaux observés</Text>
        {animalLines.map((line, index) => (
            <View key={line.id} style={styles.animalLine}>
            <View style={[styles.animalInputContainer, { flex: 3 }]}>
                <AnimalPicker
                lineId={line.id}
                currentValue={line.animal}
                onValueChange={(value) => updateAnimalLine(line.id, 'animal', value)}
                />
            </View>
            
            <View style={[styles.checkboxContainer, { flex: 1, marginHorizontal: 5 }]}>
                <Text style={styles.checkboxLabel}>Vu</Text>
                <TouchableOpacity 
                style={[styles.checkbox, line.hasSeen && styles.checkboxChecked]}
                onPress={() => updateAnimalLine(line.id, 'hasSeen', !line.hasSeen)}
                >
                <Text style={styles.checkboxText}>{line.hasSeen ? "✓" : ""}</Text>
                </TouchableOpacity>
            </View>

            {animalLines.length > 1 ? (
                <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => removeAnimalLine(line.id)}
                >
                <Text style={styles.buttonText}>✕</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity 
                style={styles.addButton}
                onPress={addAnimalLine}
                >
                <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            )}
            </View>
        ))}
        
        {animalLines.length > 1 && (
            <TouchableOpacity style={styles.addLineButton} onPress={addAnimalLine}>
            <Text style={styles.addLineText}>+ Ajouter un autre animal</Text>
            </TouchableOpacity>
        )}
        </View>

          {/* Latitude et Longitude (côte à côte) */}
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

          {/* Date et Heure */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date et Heure</Text>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowDateTimeModal(true)}
            >
              <Text style={styles.dateText}>
                {selectedDateTime.toLocaleString('fr-FR')}
              </Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal />

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              onFocus={() => handleInputFocus('description')}
              onBlur={handleInputBlur}
              placeholder="Description de l'observation"
              placeholderTextColor="#FFFFFFAA"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
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

