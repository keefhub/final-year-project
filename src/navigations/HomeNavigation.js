import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity, Alert } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import BlogComponent from "../screens/home/homeComponents/blogComponent";
import AddBlog from "../screens/home/AddBlog";
import Home from "../screens/home/Home";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "Plan de Vogue",
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  navigation.navigate("Add Blog");
                }}
              >
                <AntDesign name="plus" size={24} color="black" />
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
      <Stack.Screen component={AddBlog} name="Add Blog" />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
