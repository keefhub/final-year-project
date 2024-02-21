import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import BlogComponent from "../screens/home/homeComponents/blogComponent";
import Home from "../screens/home/Home";

const Stack = createNativeStackNavigator();

const ScreenNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="BlogComponent"
        component={BlogComponent}
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
