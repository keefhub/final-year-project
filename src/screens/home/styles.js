import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    paddingTop: 45,
  },

  containerHeader: {
    backgroundColor: "#fff",
    height: "100%",
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
    padding: 10,
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
    paddingTop: 10,
  },

  itineraryText: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },

  itineraryIcon: {
    marginLeft: 5,
  },

  resultHeading: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    textAlign: "center",
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
  },

  resultText: {
    fontSize: 15,
  },

  resultTextContainer: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    margin: 20,
    borderColor: "#ccc",
    minHeight: 200,
  },

  noResultText: {
    minHeight: 80,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },

  noResultTextContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  noResultIcon: {
    paddingTop: 20,
  },
});

export default styles;
