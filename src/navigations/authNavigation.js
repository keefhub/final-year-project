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
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "" }}
      ></Stack.Screen>
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: "" }}
      ></Stack.Screen>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "" }}
      ></Stack.Screen>
      <Stack.Screen
        name="Home"
        component={BottomNav}
        options={{ title: "" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
