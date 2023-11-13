import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { AntDesign } from "@expo/vector-icons";

export default function HeaderBig() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SIZES.base3
      }}
    >
      <View ></View>
      <Text style={{ ...FONTS.h1, color: COLORS.secondary, textAlign:"center" }}>Profile</Text>
      <TouchableOpacity onPress={() => console.log("Cart")}>
        <View
          style={{
            width: SIZES.base4,
            height: SIZES.base4,
            backgroundColor: COLORS.gray4,
            borderRadius: SIZES.base4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign
            name="shoppingcart"
            size={SIZES.base2}
            color={COLORS.gray3}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
