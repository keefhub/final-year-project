import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
  avatar: {
    marginTop: 20,
    marginLeft: 20,
  },

  card: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignItems: "flex-start",
  },

  cardContent: {
    marginTop: 10,
  },

  header: {
    fontSize: 15,
    color: "#999",
    marginBottom: 10,
  },
});

export default profileStyles;
