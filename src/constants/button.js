import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Button = ({ title, onPress, icon, color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles.button}>
      <Entypo name={icon} size={24} color={color ? color : "#f1f1f1"} />
      <Text style={buttonStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#f1f1f1",
    marginLeft: 10,
  },
});

export default Button;
