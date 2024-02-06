import React, { useState, useEffect } from "react";
import { View } from "react-native";
import expenseStyles from "./expenseStyle";
import { Textarea, TextareaInput, HStack, Text } from "@gluestack-ui/themed";

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
          <Textarea size="sm">
            <TextareaInput
              placeholder="Note (optional)"
              value={note}
              maxLength={30}
              onChangeText={(text) => {
                setNote(text);
                onNoteSelect(text);
              }}
            />
          </Textarea>
        </View>
      </HStack>
    </View>
  );
};

export default Note;
