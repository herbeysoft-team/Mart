import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
export default function Register({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <Pressable
        onPress={()=> navigation.navigate("Login")}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? COLORS.secondary : COLORS.primary,
            padding: SIZES.radius,
            borderRadius: SIZES.radius,
          },
        ]}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
         GO TO LOGIN
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    ...FONTS.header,
    color: COLORS.accent,
  },
});
