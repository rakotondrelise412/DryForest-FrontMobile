import { StyleSheet } from "react-native";

const COLORS = {
  primary: "#8e4f3f",
  white: "#fff",
  accent: "#C36922",

  overlay: "rgba(142, 79, 63, 0.78)",
  whiteTransparent: "rgba(255, 255, 255, 0.15)",
  whiteBorder: "rgba(255, 255, 255, 0.18)",
};

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
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },

  appSubtitle: {
    color: COLORS.white,
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
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "bold",
    letterSpacing: 3,
    textAlign: "center",
  },

  welcome2: {
    color: COLORS.white,
    fontSize: 18,
    marginTop: 4,
    opacity: 0.8,
  },

  welcome3: {
    color: COLORS.accent,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },

  description: {
    color: COLORS.white,
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
    backgroundColor: COLORS.accent,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.whiteBorder,
  },

  buttonText: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "600",
  },

  footer: {
    color: COLORS.white,
    fontSize: 11,
    textAlign: "center",
    paddingVertical: 6,
    opacity: 0.8,
  },
});
