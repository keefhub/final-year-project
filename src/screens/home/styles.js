import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    paddingTop: 45,
  },

  cardContainer: {
    padding: 8,
  },

  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },

  cardElevated: {
    elevation: 3,
    shadowOffset: { width: 5, height: 5 },
  },

  cardAfrica: {
    backgroundColor: "#4a4948",
  },

  cardAsia: {
    backgroundColor: "#fdfd96",
  },
  cardAmerica: {
    backgroundColor: "#ff6961",
  },
  cardEurope: {
    backgroundColor: "#aec6cf",
  },

  header: {
    fontWeight: "bold",
    fontSize: 20,
  },

  image: {
    marginTop: 10,
    width: "100%",
    height: 375,
    borderRadius: 5,
    aspectRatio: 1,
  },

  imageText: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 5,
  },

  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    textAlign: "center",
  },

  forexContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },

  selectList: {
    width: 350,
    margin: 10,
  },

  selectListOption: {
    padding: 0,
    margin: 0,
  },

  search: {
    width: 390,
  },

  searchContainer: {
    display: "flex",
    alignItems: "center",
  },

  formContainer: {
    backgroundColor: "#fff",
    height: "100%",
  },

  blogContainer: {
    margin: 20,
  },

  radioGroup: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
  },

  heading: {
    marginLeft: 20,
    marginTop: 10,
  },

  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },

  button: {
    width: 200,
  },

  buttonText: {
    marginRight: 10,
  },

  itineraryInput: {
    marginLeft: 20,
    marginTop: 5,
    width: "90%",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },

  itineraryText: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },

  itineraryIcon: {
    marginLeft: 5,
  },
});

export default styles;
