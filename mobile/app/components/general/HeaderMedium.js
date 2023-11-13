import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { AntDesign } from "@expo/vector-icons";

export default function HeaderMedium({ navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: SIZES.base3,
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.navigate("Profile")}
      >
        <AntDesign name="arrowleft" size={SIZES.base2} color={COLORS.gray} />
      </TouchableOpacity>

      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.secondary,
          flex: 1,
          textAlign: "center",
        }}
      >
        Edit Profile
      </Text>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}
