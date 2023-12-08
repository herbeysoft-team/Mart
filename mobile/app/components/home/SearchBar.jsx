import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FONTS, SIZES, COLORS } from "../../constant";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import Logo from "../../../assets/logo.png";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View style={styles.search}>
      <View >
        <Image
          source={Logo}
          style={{
            height: SIZES.base4,
            width: SIZES.base4,
            borderRadius: SIZES.base4,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: SIZES.thickness,
          flex: 3,
        }}
      >
        <Ionicons
          name="location-outline"
          size={SIZES.base2}
          color={COLORS.gray3}
        />
        <TextInput
          placeholder="Oloje Ilorin"
          placeholderTextColor={COLORS.gray3}
          style={{ ...FONTS.body3, color: COLORS.gray3 }}
        />
      </View>
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

const styles = StyleSheet.create({
  search: {
    position: "absolute",
    top: SIZES.base6,
    right: SIZES.base3,
    left: SIZES.base3,
    elevation: SIZES.thin,
    shadowOffset: 2,
    backgroundColor: COLORS.white,
    zIndex: 1,
    height: SIZES.base7,
    flex: 1,
    borderRadius: SIZES.base,
    padding: SIZES.base2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SIZES.thickness,
  },
});
