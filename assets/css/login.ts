// styles/login.ts
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#955138",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loginContainer: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 30,
  },
  treeImage: {
    width: 300,
    height: 150,
    marginBottom: 40,
    opacity: 0.9,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#F9AC5E",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: "#FFFFFF",
    fontSize: 16,
    elevation: 2,
  },
  button: {
    backgroundColor: "#C36922",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Bordure rouge lorsque le champ contient une erreur
  inputError: {
    borderWidth: 4,
    borderColor: "#ff4d4d",
  },

  // Message d'erreur affiché sous un champ
  errorText: {
    width: "100%",
    marginTop: -10,
    marginBottom: 12,
    color: "#ff4d4d",
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  },

  // Message d'erreur général de connexion
  loginErrorText: {
    width: "100%",
    marginTop: 4,
    marginBottom: 15,
    color: "#ff4d4d",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
});
