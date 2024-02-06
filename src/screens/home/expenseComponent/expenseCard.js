import React from "react";
import { Box, Text, Pressable } from "@gluestack-ui/themed";

import expenseStyle from "./expenseStyle";

const ExpenseCard = ({ expenseData, onPress }) => {
  if (!expenseData) {
    return null;
  }
  const { date, account, category, amount, note } = expenseData;

  return (
    <Pressable onPress={onPress}>
      <Box style={expenseStyle.expenseCard}>
        <Text>Date: {date}</Text>
        <Text>Account: {account}</Text>
        <Text>Category: {category}</Text>
        <Text>Amount: {amount}</Text>
        <Text>Note: {note}</Text>
      </Box>
    </Pressable>
  );
};

export default ExpenseCard;
