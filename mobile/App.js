import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "./app/constant";
import StackNavigator from "./app/navigation/StackNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  //load the custom fonts
  const [fontsLoaded] = useFonts({
    medium: require("./assets/fonts/DMSans-Medium.ttf"),
    regular: require("./assets/fonts/DMSans-Regular.ttf"),
    semi: require("./assets/fonts/DMSans-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  //check if the font is not loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StackNavigator/>
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
