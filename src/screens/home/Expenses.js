import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Forex from "./expenseComponent/forex";
import ExpenseCard from "./expenseComponent/expenseCard";
import styles from "./styles";
import {
  GluestackUIProvider,
  Box,
  AddIcon,
  Button,
  ButtonText,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const Expenses = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = useCallback(async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem("expense");

      if (storedExpenses) {
        console.log(storedExpenses);
        // Parse the stored data and update the state
        setExpenses(Object.values(JSON.parse(storedExpenses)));
      } else {
        // If no data is available, set an empty array
        setExpenses([]);
      }
    } catch (error) {
      console.log("Error while loading expenses:", error);
    }
  }, []);

  useEffect(() => {
    // Load expenses data when the component mounts
    loadExpenses();
  }, [loadExpenses]);

  useEffect(() => {
    // Reload expenses when the component is focused
    if (isFocused) {
      loadExpenses();
    }
  }, [isFocused, loadExpenses]);

  const onAddingExpense = () => {
    navigation.navigate("AddExpense");
  };

  // Handle the onPress event for ExpenseCard
  const onExpenseCardPress = (expenseData) => {
    // Implement your logic to navigate to the edit screen or show an editing interface
    console.log("Expense card tapped:", expenseData);
    navigation.navigate("EditExpense", { expenseData });
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <Box style={styles.container}>
          <ScrollView>
            <Forex />
            {/* Map through expenses and render ExpenseCard for each item */}
            {expenses.map((expense, index) => (
              <ExpenseCard
                key={index}
                expenseData={expense}
                onPress={() => onExpenseCardPress(expense)}
              />
            ))}
          </ScrollView>
          <Box>
            <Button size="lg" onPress={onAddingExpense} action="negative">
              <ButtonText>Add Expense</ButtonText>
              <ButtonIcon as={AddIcon} />
            </Button>
          </Box>
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default Expenses;
