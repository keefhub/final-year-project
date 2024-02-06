import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffe0",
    height: "100%",
  },

  resetContainer: {
    alignItems: "center",
    marginTop: 150,
  },

  input: {
    marginTop: 5,
    width: 300,
  },

  buttonContent: {
    textAlign: "center",
  },

  pressableContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },

  button: {
    width: 200,
  },

  forgetPasswordBtn: {
    marginTop: 10,
    display: "flex",
    bottom: 0,
  },

  textInputContainer: {
    alignItems: "center",
  },

  error: {
    height: 40,
    borderWidth: 1,
    width: "80%",
    borderRadius: 10,
    borderColor: "#ff0000",
    marginTop: 10,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  logo: {
    height: 300,
    width: 300,
    alignSelf: "center",
    marginBottom: -5,
  },
});

export default styles;
