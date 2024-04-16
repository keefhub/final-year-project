import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Itinerary from "../screens/home/Itinerary";

const Stack = createNativeStackNavigator();

const ScreenNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Expenses">
      <Stack.Screen
        name="Itinerary"
        component={Itinerary}
        options={{ title: "Itinerary Planner" }}
      />
    </Stack.Navigator>
  );
};

export default ScreenNavigation;
