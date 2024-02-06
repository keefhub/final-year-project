import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import expenseStyles from "./expenseStyle";
import styles from "../styles";
import CalendarInput from "./calendar";
import Account from "./account";
import Category from "./category";
import Amount from "./amount";
import Note from "./note";
import {
  Button,
  ButtonIcon,
  ButtonGroup,
  ButtonText,
  VStack,
  ArrowLeftIcon,
  CheckIcon,
} from "@gluestack-ui/themed";

const EditExpense = ({ route, navigation }) => {
  const { expenseData } = route.params;
  const [editedExpenseData, setEditedExpenseData] = useState({
    ...expenseData,
  });

  const handleSaveChanges = () => {
    // Implement your logic to save the changes
    console.log("Saving changes:", editedExpenseData);
    // Example: Save changes to your data storage
    // Navigate back to the Expenses screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={expenseStyles.inputFieldContainer}>
          <CalendarInput
            onDateSelect={(date) =>
              setEditedExpenseData({ ...editedExpenseData, date })
            }
            initialDate={editedExpenseData.date}
          />
          <Account
            onAccountSelect={(account) =>
              setEditedExpenseData({ ...editedExpenseData, account })
            }
            initialAccount={editedExpenseData.account}
          />
          <Category
            onCategorySelect={(category) =>
              setEditedExpenseData({ ...editedExpenseData, category })
            }
            initialCategory={editedExpenseData.category}
          />
          <Amount
            onAmountSelect={(amount) =>
              setEditedExpenseData({ ...editedExpenseData, amount })
            }
            initialAmount={editedExpenseData.amount}
          />
          <Note
            onNoteSelect={(note) =>
              setEditedExpenseData({ ...editedExpenseData, note })
            }
            initialNote={editedExpenseData.note}
          />
          <View style={expenseStyles.buttonContainer}>
            <ButtonGroup>
              <VStack space="md">
                <Button
                  action="secondary"
                  onPress={() => navigation.goBack()}
                  size="md"
                  style={expenseStyles.button}
                >
                  <ButtonText>Back</ButtonText>
                  <ButtonIcon as={ArrowLeftIcon} style={{ marginLeft: 10 }} />
                </Button>
                <Button action="positive" size="md" onPress={handleSaveChanges}>
                  <ButtonText>Save Changes</ButtonText>
                  <ButtonIcon as={CheckIcon} style={{ marginLeft: 10 }} />
                </Button>
              </VStack>
            </ButtonGroup>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditExpense;
