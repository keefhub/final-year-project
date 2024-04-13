import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { View, Button } from "react-native";

import BlogComponent from "../screens/home/homeComponents/blogComponent";
import Profile from "../screens/home/Profile";
import Settings from "../screens/home/profileComponent/settings";

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerRight: () => {
            return (
              <Button
                title="Settings"
                onPress={() => navigation.navigate("Settings")}
              />
            );
          },
        })}
      />
      <Stack.Screen
        name="BlogComponent"
        component={BlogComponent}
        options={{
          title: "",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
