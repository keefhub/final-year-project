import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AddExpense from "../screens/home/expenseComponent/addExpense";
import Expenses from "../screens/home/Expenses";
import EditExpense from "../screens/home/expenseComponent/editExpense";

const Stack = createNativeStackNavigator();

const ScreenNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Expenses">
      <Stack.Screen
        name="Expenses"
        component={Expenses}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="AddExpense"
        component={AddExpense}
        options={{
          title: "",
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="EditExpense"
        component={EditExpense}
        options={{
          title: "",
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default ScreenNavigation;
