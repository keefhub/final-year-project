import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import BlogComponent from "../screens/home/homeComponents/blogComponent";
import Home from "../screens/home/Home";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Plan de Vogue",
        }}
      />
      <Stack.Screen
        name="BlogComponent"
        component={BlogComponent}
        options={{
          title: "",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
