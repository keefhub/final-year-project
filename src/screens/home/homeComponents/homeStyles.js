import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  noImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    height: 300,
  },

  noImage: {
    fontSize: 20,
  },

  captionContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 2,
    minHeight: 10,
    marginVertical: 20,
  },

  caption: {
    marginLeft: 10,
    marginTop: 5,
    paddingBottom: 5,
    fontSize: 16,
  },

  image: {
    width: 360,
    height: 300,
    resizeMode: "cover",
    marginHorizontal: 5,
  },

  imageContainer: {
    // Style for the container of the image carousel
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    // Style for the ScrollView
    width: "100%",
    height: 300,
  },

  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 5,
    right: 10,
    alignItems: "center",
    marginRight: 5,
    backgroundColor: "white",
    padding: 2,
    borderRadius: 10,
  },

  authorTitle: {
    marginLeft: 5,
    fontSize: 13,
  },
});

export default homeStyles;
