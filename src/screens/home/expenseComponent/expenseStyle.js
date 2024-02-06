import { StyleSheet } from "react-native";

const expenseStyle = StyleSheet.create({
  container: {
    marginLeft: 20,
  },

  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },

  inputFieldContainer: {
    backgroundColor: "white",
    marginTop: 30,
  },

  Input: {
    width: 250,
    borderColor: "black",
    borderWidth: 1,
    height: 35,
    borderRadius: 20,
    textAlign: "center",
    color: "black",
  },

  accountInput: {
    borderWidth: 1,
    padding: 10,
    width: 200,
  },

  label: {
    marginRight: 10,
    width: 100,
  },

  modalContainer: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  closeLabel: {
    textAlign: "center",
    borderWidth: 0,
    padding: 10,
    width: "90%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
    alignItems: "center",
  },

  button: {
    width: 200,
  },

  buttonContainer: {
    marginTop: 50,
    alignItems: "center",
  },

  selectBox: {
    width: "max-content",
    display: "flex",
    alignItems: "left",
    justifyContent: "center",
  },

  selectLabel: {
    width: 50,
    marginTop: 10,
    marginLeft: 10,
  },

  selectDropDown: {
    width: 275,
    marginRight: 50,
  },

  topBox: {
    marginTop: 20,
  },

  actionSheet: {
    marginTop: 10,
    width: 250,
  },
});

export default expenseStyle;
