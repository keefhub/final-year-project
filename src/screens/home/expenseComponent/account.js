import React, { useState, useEffect } from "react";
import { View } from "react-native";
import expenseStyles from "./expenseStyle";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetIcon,
  ActionsheetItemText,
  Pressable,
  Input,
  HStack,
  Text,
  InputField,
} from "@gluestack-ui/themed";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";

const Account = ({ onAccountSelect, initialAccount }) => {
  const [selectAccountType, setSelectAccountType] = useState(
    initialAccount || ""
  );
  const [showActionsheet, setShowActionsheet] = useState(false);

  useEffect(() => {
    setSelectAccountType(initialAccount || "");
  }, [initialAccount]);

  const handleAccountTypeSelection = (accountType) => {
    setSelectAccountType(accountType);
    onAccountSelect(accountType);
    setShowActionsheet(false); // Close the actionsheet after selection
  };

  const handleClose = () => {
    setShowActionsheet(false); // if not selected, reset the value
    setSelectAccountType("");
  };

  const toggleActionsheet = () => {
    setShowActionsheet(!showActionsheet);
  };

  return (
    <View style={expenseStyles.container}>
      <HStack>
        <View style={expenseStyles.inputContainer}>
          <Text style={expenseStyles.label}>Account:</Text>
        </View>
        <View style={expenseStyles.actionSheet}>
          <Pressable onPress={() => toggleActionsheet()}>
            <Input variant="underlined">
              <InputField
                editable={false}
                placeholder="Select Account Type"
                style={expenseStyles.actionText}
              >
                {selectAccountType}
              </InputField>
            </Input>
          </Pressable>

          <Actionsheet isOpen={showActionsheet} onClose={() => handleClose()}>
            <ActionsheetBackdrop />
            <ActionsheetContent>
              <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
              </ActionsheetDragIndicatorWrapper>

              <ActionsheetItem
                onPress={() => handleAccountTypeSelection("Cash")}
              >
                <ActionsheetIcon>
                  <FontAwesome name="dollar" size={15} color="black" />
                </ActionsheetIcon>
                <ActionsheetItemText style={expenseStyles.actionText}>
                  Cash
                </ActionsheetItemText>
              </ActionsheetItem>

              <ActionsheetItem
                onPress={() => handleAccountTypeSelection("Card")}
              >
                <ActionsheetIcon>
                  <AntDesign name="creditcard" size={15} color="black" />
                </ActionsheetIcon>
                <ActionsheetItemText style={expenseStyles.actionText}>
                  Card
                </ActionsheetItemText>
              </ActionsheetItem>

              <ActionsheetItem onPress={handleClose}>
                <ActionsheetIcon>
                  <MaterialIcons name="cancel" size={15} color="black" />
                </ActionsheetIcon>
                <ActionsheetItemText style={expenseStyles.actionText}>
                  Cancel
                </ActionsheetItemText>
              </ActionsheetItem>
            </ActionsheetContent>
          </Actionsheet>
        </View>
      </HStack>
    </View>
  );
};

export default Account;
