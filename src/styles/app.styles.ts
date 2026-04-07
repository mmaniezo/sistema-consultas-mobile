import { StyleSheet } from "react-native";
/**
 * Estilos do App
 * 
 * Note que removemos TODOS os estilos do card!
 * Eles agora estão encapsulados no componente ConsultaCard.
 * 
 * App.tsx agora só tem estilos de layout geral:
 * - Container principal
 * - Cabeçalho
 * - Rodapé
 */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#199C",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  titulo: {
    fontFamily: "OdibeeSans_400Regular",
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitulo: {
    fontFamily: "OdibeeSans_400Regular",
    fontSize: 18,
    color: "#fff",
    opacity: 0.9,
  },
  rodape: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
  },
  rodapeTexto: {
    fontFamily: "OdibeeSans_400Regular",
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 4,
  },
});