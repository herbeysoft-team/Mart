import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FONTS, SIZES, COLORS } from "../constant";
import Home from "../screens/main/Home";
import Explore from "../screens/main/Explore";
import AddListing from "../screens/main/AddListing";
import Alerts from "../screens/main/Alerts";
import Profile from "../screens/main/Profile";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} style={{ color: COLORS.primary }} />
            ) : (
              <AntDesign
                name="home"
                size={24}
                style={{ color: COLORS.accent }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: "Explore",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} style={{ color: COLORS.accent }} />
            ) : (
              <AntDesign
                name="home"
                size={24}
                style={{ color: COLORS.primary }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="AddListing"
        component={AddListing}
        options={{
          tabBarLabel: "Add Listing",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} style={{ color: COLORS.accent }} />
            ) : (
              <AntDesign
                name="home"
                size={24}
                style={{ color: COLORS.primary }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={Alerts}
        options={{
          tabBarLabel: "Alerts",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} style={{ color: COLORS.accent }} />
            ) : (
              <AntDesign
                name="home"
                size={24}
                style={{ color: COLORS.primary }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} style={{ color: COLORS.accent }} />
            ) : (
              <AntDesign
                name="home"
                size={24}
                style={{ color: COLORS.primary }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
