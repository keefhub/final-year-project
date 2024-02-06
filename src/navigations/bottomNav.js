import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screens/home/Home";
import Expenses from "../screens/home/Expenses";
import Itinerary from "../screens/home/Itinerary";
import Location from "../screens/home/Location";
import Profile from "../screens/home/Profile";
import ExpenseNavigation from "./ExpenseNavigation";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home Tab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home Tab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Expenses Tab") {
            iconName = focused ? "cash" : "cash-outline";
          } else if (route.name === "Itinerary") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Location") {
            iconName = focused ? "location" : "location-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home Tab"
        component={Home}
        options={{ tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Itinerary"
        component={Itinerary}
        options={{ tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{ tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Expenses Tab"
        component={ExpenseNavigation}
        options={{ tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarShowLabel: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
