import { StyleSheet } from "react-native";

export default StyleSheet.create({
    bg: {
      flex: 1,
      resizeMode: "cover",
      backgroundColor: "#8e4f3f", // fallback
    },
    overlay: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    welcome1: {
      color: "#fff",
      fontSize: 36,
      fontWeight: "900",
      letterSpacing: 2,
      marginBottom: 6,
      textAlign: "center",
    },
    welcome2: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 6,
      textAlign: "center",
    },
    welcome3: {
      color: "#fff",
      fontSize: 32,
      fontWeight: "900",
      marginBottom: 30,
      textAlign: "center",
    },
    buttons: {
      width: "100%",
      alignItems: "center",
      gap: 14,
    },
    btn: {
      backgroundColor: "#C36922",
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 20,
      minWidth: 200,
      alignItems: "center",
      elevation: 3,
    },
    btnText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 16,
    },
  });
  