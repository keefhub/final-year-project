import { StyleSheet } from "react-native";

const blogStyles = StyleSheet.create({
  container: {
    marginTop: 0,
  },

  homeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardContainer: {
    padding: 16,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 3,
    width: "45%",
    height: 250,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  preview: {
    fontSize: 15,
  },

  noItemText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },

  homeCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  touchableBlogComponent: {
    width: "80%",
  },
});
export default blogStyles;
