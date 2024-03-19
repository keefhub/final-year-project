import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import BlogComponent from "../screens/home/homeComponents/blogComponent";
import Profile from "../screens/home/Profile";

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
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

export default ProfileNavigation;
