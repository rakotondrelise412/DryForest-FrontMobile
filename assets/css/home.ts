
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  backgroundImage: {
    opacity: 0.2,
  },

  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 12,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  appName: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },

  appSubtitle: {
    color: COLORS.text,
    fontSize: 13,
    marginTop: 3,
    opacity: 0.8,
  },

  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.whiteTransparent,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
  },

  welcome1: {
    color: COLORS.text,
    fontSize: 29,
    fontWeight: "bold",
    letterSpacing: 3,
    textAlign: "center",
  },

  welcome2: {
    color: COLORS.text,
    fontSize: 18,
    marginTop: 4,
    opacity: 0.8,
  },

  welcome3: {
    color: COLORS.primary,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },

  description: {
    color: COLORS.text,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 14,
    marginBottom: 28,
  },

  buttons: {
    width: "100%",
    gap: 12,
  },

  button: {
    minHeight: 55,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.whiteBorder,
  },

  buttonText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "600",
  },

  footer: {
    color: COLORS.text,
    fontSize: 11,
    textAlign: "center",
    paddingVertical: 6,
    opacity: 0.8,
  },
});
