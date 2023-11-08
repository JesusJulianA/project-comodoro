// /src/components/atoms/styles/timerStyles.js
import { StyleSheet } from "react-native";

export const timerStyles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 15
  },
  time: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333"
  }
});
