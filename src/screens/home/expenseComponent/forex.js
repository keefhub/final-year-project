import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "../styles";
import {
  Select,
  SelectTrigger,
  SelectPortal,
  SelectBackdrop,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectContent,
  SelectItem,
  SelectInput,
  HStack,
  VStack,
  Box,
} from "@gluestack-ui/themed";
import expenseStyle from "./expenseStyle";

//my endpoint - https://rapidapi.com/natkapral/api/currency-converter5/
//log in using limhehe02761@gmail.com

const Forex = () => {
  const [selected, setSelected] = useState("");
  const [forex, setForex] = useState("");
  data = [
    { key: "1", value: "" },
    { key: "2", value: "USD" },
    { key: "3", value: "JPY" },
    { key: "4", value: "KRW" },
    { key: "5", value: "MYR" },
  ];

  const selectItems = data.map((item) => (
    <SelectItem key={item.key} label={item.value} value={item.value} />
  ));

  return (
    <View style={styles.forexContainer}>
      <VStack space="md">
        <Select>
          <Box style={expenseStyle.topBox}>
            <Box style={expenseStyle.selectBox}>
              <HStack>
                <Box>
                  <Text style={expenseStyle.selectLabel}>From</Text>
                </Box>
                <Box style={expenseStyle.selectDropDown}>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select currency" />
                  </SelectTrigger>
                </Box>
              </HStack>
            </Box>
          </Box>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {selectItems}
            </SelectContent>
          </SelectPortal>
        </Select>
        <Select>
          <Box style={expenseStyle.box}>
            <HStack>
              <Box>
                <Text style={expenseStyle.selectLabel}>To</Text>
              </Box>
              <Box style={expenseStyle.selectDropDown}>
                <SelectTrigger variant="outline" size="md">
                  <SelectInput placeholder="Select currency" />
                </SelectTrigger>
              </Box>
            </HStack>
          </Box>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {selectItems}
            </SelectContent>
          </SelectPortal>
        </Select>
      </VStack>
    </View>
  );
};

export default Forex;
