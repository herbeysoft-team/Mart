import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";

const AddListing = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add Listing</Text>
    </SafeAreaView>
  );
};

export default AddListing;

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
