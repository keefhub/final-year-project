import React, { useState, useEffect } from "react";
import { View } from "react-native";
import expenseStyles from "./expenseStyle";
import { Input, InputField, HStack, Text } from "@gluestack-ui/themed";

const Amount = ({ onAmountSelect, initialAmount }) => {
  const [amount, setAmount] = useState(initialAmount || "");

  // useEffect to update the amount when the initialAmount prop changes
  useEffect(() => {
    setAmount(initialAmount || "");
  }, [initialAmount]);

  return (
    <View style={expenseStyles.container}>
      <HStack>
        <View style={expenseStyles.inputContainer}>
          <Text style={expenseStyles.label}>Amount:</Text>
        </View>
        <View style={expenseStyles.actionSheet}>
          <Input variant="underlined">
            <InputField
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
                onAmountSelect(text);
              }}
            />
          </Input>
        </View>
      </HStack>
    </View>
  );
};

export default Amount;
