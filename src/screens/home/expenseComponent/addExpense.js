import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";
import expenseStyles from "./expenseStyle";
import CalendarInput from "./calendar";
import Account from "./account";
import Category from "./category";
import Amount from "./amount";
import Note from "./note";
import {
  GluestackUIProvider,
  Button,
  ButtonIcon,
  ButtonGroup,
  ButtonText,
  VStack,
  ArrowLeftIcon,
  CheckIcon,
  set,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const AddExpense = ({ navigation }) => {
  const [getDate, setGetDate] = useState(null);
  const [getAccountType, setGetAccountType] = useState(null);
  const [getCategoryType, setGetCategoryType] = useState(null);
  const [getAmount, setGetAmount] = useState(null);
  const [getNote, setGetNote] = useState(null);

  const handleSelectedDate = (date) => {
    setGetDate(date);
  };

  const handleCategory = (categoryType) => {
    setGetCategoryType(categoryType);
  };

  const handleSelectedAccount = (accountType) => {
    setGetAccountType(accountType);
  };

  const handleAmount = (amount) => {
    setGetAmount(amount);
  };

  const handleNote = (note) => {
    setGetNote(note);
  };

  const saveData = async () => {
    const dataToSave = {
      date: getDate,
      account: getAccountType,
      category: getCategoryType,
      amount: getAmount,
      note: getNote,
    };

    try {
      // Get existing expenses or initialize an empty array
      const existingExpenses = await AsyncStorage.getItem("expenses");
      const expensesArray = existingExpenses
        ? JSON.parse(existingExpenses)
        : [];

      // Add the new expense to the array
      expensesArray.push(dataToSave);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem("expenses", JSON.stringify(expensesArray));
    } catch (error) {
      console.log("Error while saving data:", error);
    }
  };

  const goBack = () => {
    navigation.navigate("Expenses");
  };

  return (
    <GluestackUIProvider config={config}>
      <View style={styles.containerHeader}>
        <ScrollView>
          <View style={expenseStyles.inputFieldContainer}>
            <CalendarInput onDateSelect={handleSelectedDate} />
            <Account onAccountSelect={handleSelectedAccount} />
            <Category onCategorySelect={handleCategory} />
            <Amount onAmountSelect={handleAmount} />
            <Note onNoteSelect={handleNote} />
            <View style={expenseStyles.buttonContainer}>
              <ButtonGroup>
                <VStack space="md">
                  <Button
                    action="secondary"
                    onPress={goBack}
                    size="md"
                    style={expenseStyles.button}
                  >
                    <ButtonText>Back</ButtonText>
                    <ButtonIcon as={ArrowLeftIcon} style={{ marginLeft: 10 }} />
                  </Button>
                  <Button
                    action="positive"
                    size="md"
                    onPress={() => {
                      saveData();
                      navigation.navigate("Expenses");
                    }}
                  >
                    <ButtonText>Save</ButtonText>
                    <ButtonIcon as={CheckIcon} style={{ marginLeft: 10 }} />
                  </Button>
                </VStack>
              </ButtonGroup>
            </View>
          </View>
        </ScrollView>
      </View>
    </GluestackUIProvider>
  );
};

export default AddExpense;
