import { StyleSheet } from "react-native";

const blogStyles = StyleSheet.create({
  container: {
    marginTop: 0,
  },

  modalTitle: {
    marginBottom: 10,
    paddingTop: 10,
  },

  card: {
    padding: 16,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  preview: {
    fontSize: 16,
  },

  noItemText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
export default blogStyles;
