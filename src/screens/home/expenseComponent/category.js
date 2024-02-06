// Import necessary modules
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
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
  InputField,
} from "@gluestack-ui/themed";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import expenseStyles from "./expenseStyle";

// Define the Category component
const Category = ({ onCategorySelect, initialCategory }) => {
  const [selectCategoryType, setSelectCategoryType] = useState(
    initialCategory || ""
  );
  const [showActionsheet, setShowActionsheet] = useState(false);

  useEffect(() => {
    setSelectCategoryType(initialCategory || "");
  }, [initialCategory]);

  const handleClose = () => {
    setShowActionsheet(false);
    setSelectCategoryType("");
  };

  const handleOpen = () => {
    setShowActionsheet(!showActionsheet);
  };

  const handleCategoryTypeSelection = (categoryType) => {
    setSelectCategoryType(categoryType);
    onCategorySelect(categoryType);
    setShowActionsheet(false);
  };

  return (
    <View style={expenseStyles.container}>
      <HStack>
        <View style={expenseStyles.inputContainer}>
          <Text style={expenseStyles.label}>Category:</Text>
        </View>
        <View style={expenseStyles.actionSheet}>
          <Pressable onPress={handleOpen}>
            <Input variant="underlined">
              <InputField
                editable={false}
                placeholder="Select Category"
                style={expenseStyles.actionText}
              >
                {selectCategoryType}
              </InputField>
            </Input>
          </Pressable>

          <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
            <ActionsheetBackdrop />
            <ActionsheetContent>
              <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
              </ActionsheetDragIndicatorWrapper>

              <ActionsheetItem
                onPress={() => handleCategoryTypeSelection("Transport")}
              >
                <ActionsheetIcon>
                  <FontAwesome name="train" size={15} color="black" />
                </ActionsheetIcon>
                <ActionsheetItemText style={expenseStyles.actionText}>
                  Transportation
                </ActionsheetItemText>
              </ActionsheetItem>

              <ActionsheetItem
                onPress={() => handleCategoryTypeSelection("Food")}
              >
                <ActionsheetIcon>
                  <MaterialCommunityIcons name="food" size={15} color="black" />
                </ActionsheetIcon>
                <ActionsheetItemText>Food</ActionsheetItemText>
              </ActionsheetItem>

              <ActionsheetItem
                onPress={() => handleCategoryTypeSelection("Miscellaneous")}
              >
                <ActionsheetIcon>
                  <MaterialIcons
                    name="miscellaneous-services"
                    size={15}
                    color="black"
                  />
                </ActionsheetIcon>
                <ActionsheetItemText>Miscellaneous</ActionsheetItemText>
              </ActionsheetItem>

              <ActionsheetItem onPress={handleClose}>
                <ActionsheetIcon>
                  <MaterialIcons name="cancel" size={15} color="black" />
                </ActionsheetIcon>
                <ActionsheetItemText>Cancel</ActionsheetItemText>
              </ActionsheetItem>
            </ActionsheetContent>
          </Actionsheet>
        </View>
      </HStack>
    </View>
  );
};

export default Category;
