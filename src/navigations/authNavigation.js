import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/auth/login";
import ForgotPassword from "../screens/auth/forgotPassword";
import Register from "../screens/auth/register";
import BottomNav from "./bottomNav";
import CustomsHeader from "./customHeader";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: "", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Home"
        component={BottomNav}
        options={{ title: "", headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
