import { StyleSheet } from "react-native";

/**
 * Estilos do componente Loading
 * Separados da logica para facilitar manutencao e reuso
 */

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  texto: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
});
