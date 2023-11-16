import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import React, { useCallback, useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "./app/constant";
import StackNavigator from "./app/navigation/StackNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load custom fonts
  useEffect(() => {
    async function loadCustomFonts() {
      try {
        await Font.loadAsync({
          medium: require("./assets/fonts/DMSans-Medium.ttf"),
          regular: require("./assets/fonts/DMSans-Regular.ttf"),
          semi: require("./assets/fonts/DMSans-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.warn(error);
      }
    }

    loadCustomFonts();
  }, []);

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        try {
          // Pre-load other assets or make any API calls here
          //await Entypo.loadAsync(); // Load Entypo font
          // Artificially delay for two seconds to simulate a slow loading
          // experience. Please remove this if you copy and paste the code!
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.warn(error);
        } finally {
          // Tell the application to render
          setAppIsReady(true);
        }
      }
    }
    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar color="dark" />
      <StackNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
