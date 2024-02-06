import { View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import expenseStyles from "./expenseStyle";
import {
  Input,
  Pressable,
  HStack,
  InputField,
  Text,
} from "@gluestack-ui/themed";

const CalendarInput = ({ onDateSelect, initialDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    initialDate ? new Date(initialDate) : new Date()
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event, date) => {
    if (date) {
      const dateString = new Date(date);
      setSelectedDate(dateString);
      // call the callback to pass the selected date to the parent component
      onDateSelect(dateString);
    }
    hideDatePicker();
  };

  return (
    <View style={expenseStyles.container}>
      <HStack>
        <View style={expenseStyles.inputContainer}>
          <Text style={expenseStyles.label}>Date:</Text>
        </View>
        <View style={expenseStyles.actionSheet}>
          <Pressable onPress={showDatePicker}>
            <Input variant="underlined">
              <InputField
                placeholder="Selected Date"
                value={selectedDate ? selectedDate.toDateString() : ""}
                editable={false}
                type="text"
              />
            </Input>
          </Pressable>
          {isDatePickerVisible && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={handleConfirm}
            />
          )}
        </View>
      </HStack>
    </View>
  );
};

export default CalendarInput;
