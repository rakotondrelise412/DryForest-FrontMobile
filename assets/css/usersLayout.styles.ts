import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors"; 


export const styles = StyleSheet.create({
  drawer: {
    backgroundColor: COLORS.primary,
    width: 270,
  },

  drawerContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  drawerHeader: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 18,
    paddingRight: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },

  drawerTitle: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
  },

  closeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  pressed: {
    opacity: 0.7,
  },

  drawerContent: {
    paddingTop: 8,
  },

  drawerLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
});
