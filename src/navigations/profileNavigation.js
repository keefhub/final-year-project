import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
              <TouchableOpacity
                title="Settings"
                onPress={() => navigation.navigate("Settings")}
              >
                <Ionicons name="settings-outline" size={24} color="black" />
              </TouchableOpacity>
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
