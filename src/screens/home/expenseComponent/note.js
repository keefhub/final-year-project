import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import expenseStyles from "./expenseStyle";
import { HStack, Text } from "@gluestack-ui/themed";

const Note = ({ onNoteSelect, initialNote }) => {
  const [note, setNote] = useState(initialNote || "");

  // useEffect to update the note when the initialNote prop changes
  useEffect(() => {
    setNote(initialNote || "");
  }, [initialNote]);

  return (
    <View style={expenseStyles.container}>
      <HStack>
        <View style={expenseStyles.inputContainer}>
          <Text style={expenseStyles.label}>Note:</Text>
        </View>
        <View style={expenseStyles.actionSheet}>
          <TextInput
            style={{
              height: 150,
              borderColor: "#D3D3D3",
              borderRadius: 5,
              borderWidth: 1,
              padding: 10,
              textAlignVertical: "top",
            }}
            multiline
            placeholder="Input Caption Here.."
          />
        </View>
      </HStack>
    </View>
  );
};

export default Note;
