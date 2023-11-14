import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/main/Profile";
import EditProfile from "../screens/profile/EditProfile";
import GetVerified from "../screens/profile/GetVerified";
import MyListing from "../screens/profile/MyListing";
import MyOrders from "../screens/profile/MyOrders";
import DeliveryRequests from "../screens/profile/DeliveryRequests";
import Insights from "../screens/profile/Insights";
import Wallet from "../screens/profile/Wallet";
import Ratings from "../screens/profile/Ratings";
import Setting from "../screens/profile/Settings";
import MySubscription from "../screens/profile/MySubscription";
import Help from "../screens/profile/Help";
import ChangePassword from "../screens/profile/ChangePassword";


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
        <Prof.Screen
          name="Get-Verified"
          component={GetVerified}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="My-Listing"
          component={MyListing}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="My-Order"
          component={MyOrders}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Delivery-Request"
          component={DeliveryRequests}
          options={{ headerShown: false }}
        />
         <Prof.Screen
          name="Insight"
          component={Insights}
          options={{ headerShown: false }}
        />
         <Prof.Screen
          name="Wallet"
          component={Wallet}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Rating"
          component={Ratings}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Setting"
          component={Setting}
          options={{ headerShown: false }}
        />
         <Prof.Screen
          name="My-Subscription"
          component={MySubscription}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Help"
          component={Help}
          options={{ headerShown: false }}
        />
        <Prof.Screen
          name="Change-Password"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
      </Prof.Navigator>
  );
};

export default ProfileNavigation;

const styles = StyleSheet.create({});
