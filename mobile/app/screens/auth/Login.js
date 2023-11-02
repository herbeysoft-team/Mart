import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Pressable
        onPress={()=> navigation.navigate("Main")}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? COLORS.secondary : COLORS.primary,
            padding: SIZES.radius,
            borderRadius: SIZES.radius,
          },
        ]}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
         GO TO Main
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;

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