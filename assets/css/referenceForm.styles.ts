
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const referenceFormStyles = StyleSheet.create({
  form: {
    padding: 20,
    gap: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primaryDark,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },

  inputError: {
    borderColor: COLORS.error,
  },

  errorText: {
    color: COLORS.error,
    fontSize: 13,
    marginTop: 4,
  },

  submitButton: {
    height: 48,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: COLORS.buttonBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  submitText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "bold",
  },

  disabled: {
    opacity: COLORS.buttonDisabledOpacity,
  },
});
