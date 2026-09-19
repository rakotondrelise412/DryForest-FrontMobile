import {StyleSheet} from "react-native"

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#955138",
  },

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },

  pickerButton: {
    backgroundColor: "#FFC975",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 5,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
  },

  pickerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  textInput: {
    backgroundColor: "#FFC975",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 16,
    elevation: 5,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
  },

  dateButton: {
    backgroundColor: "#FFC975",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 5,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
  },

  dateText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  speciesSection: {
    marginBottom: 30,
  },

  speciesLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  speciesInputContainer: {
    flex: 1,
  },

  addButton: {
    backgroundColor: "#FFC975",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
  },

  deleteButton: {
    backgroundColor: "#FF6B6B",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
  },

  addLineButton: {
    backgroundColor: "#FFC975",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
  },

  addLineText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  validateButtonContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  validateButton: {
    backgroundColor: "#C36922",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    width: "60%", // Largeur réduite
  },

  validateButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#955138",
  },

  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  modalOptionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },

  modalCancel: {
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
  },

  modalCancelText: {
    fontSize: 16,
    color: "#FF6B6B",
    textAlign: "center",
    fontWeight: "bold",
  },

  modalConfirm: {
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    alignItems: "center",
  },

  modalConfirmText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },

  // Styles pour le DatePicker personnalisé

  dateModalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },

  yearContainer: {
    marginBottom: 20,
  },

  monthContainer: {
    marginBottom: 20,
  },

  dayContainer: {
    marginBottom: 20,
  },

  dateLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#955138",
  },

  yearScrollView: {
    maxHeight: 60,
  },

  dayScrollView: {
    maxHeight: 60,
  },

  yearButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },

  monthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  monthButton: {
    width: "23%",
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
  },

  dayButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },

  yearButtonText: {
    fontSize: 16,
    color: "#333",
  },

  monthButtonText: {
    fontSize: 14,
    color: "#333",
  },

  dayButtonText: {
    fontSize: 16,
    color: "#333",
  },

  selectedDateButton: {
    backgroundColor: "#FFC975",
  },

  selectedDateText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  dateModalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bottomToggle: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 100,
  },

  menuToggleButton: {
    backgroundColor: "#C36922",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 5,
  },

  menuToggleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  bottomMenu: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#C36922",
    borderRadius: 10,
    elevation: 5,
  },

  bottomMenuItem: {
    alignItems: "center",
    paddingHorizontal: 10,
    flex: 1,
  },

  bottomMenuText: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },

});