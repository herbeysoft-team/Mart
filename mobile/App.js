import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "./app/constant";

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
      <View style={styles.container}>
        <Text style={{ ...FONTS.h1, color: COLORS.accent }}>Explore</Text>
        <Text style={{ ...FONTS.h2, color: COLORS.primary }}>Cup Cakes</Text>
        <Text style={{ ...FONTS.h3, color: COLORS.secondary }}>Product</Text>
        <Text style={{ ...FONTS.h4, color: COLORS.tertiary }}>3500/Ticket</Text>
        <Text style={{ ...FONTS.body1, color: COLORS.pink }}>TrowMart App</Text>
        <Text style={{ ...FONTS.body2, color: COLORS.lightGreen }}>
          TrowMart App
        </Text>
        <Text style={{ ...FONTS.body3, color: COLORS.success }}>
          TrowMart App
        </Text>
        <Text style={{ ...FONTS.body4, color: COLORS.red }}>TrowMart App</Text>
      </View>
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
