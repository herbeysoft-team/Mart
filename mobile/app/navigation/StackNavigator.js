import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";
import BottomNavigation from "./BottomNavigation";
import Onboard from "../screens/onboarding/Onboard";
import ForgetPassword from "../screens/auth/ForgetPassword";
import ListingDetails from "../screens/main/ListingDetails";
import VendorProfile from "../screens/explore/VendorProfile";
import Checkout from "../screens/explore/Checkout";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboard">
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Forget-Password"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboard"
          component={Onboard}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Listing-Detail"
          component={ListingDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Vendor-Profile"
          component={VendorProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
