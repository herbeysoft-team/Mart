import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/main/Profile";
import EditProfile from "../screens/profile/EditProfile";


const Prof = createNativeStackNavigator();
const ProfileNavigation = () => {
  return (
      <Prof.Navigator initialRouteName="Profile">
        <Prof.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Edit-Profile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
      </Prof.Navigator>
  );
};

export default ProfileNavigation;

const styles = StyleSheet.create({});
