import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS, COLORS, SIZES } from "../../constant";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function VendorCard({
  navigation,
  id,
  image,
  name,
  rating,
  ratingTotal,
  address,
  distance,
}) {
  return (
    <Pressable onPress={() => {}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: SIZES.base2,
          borderColor: COLORS.gray4,
          paddingVertical: SIZES.base2,
          borderBottomWidth: SIZES.thin/2,
          marginBottom: SIZES.base3
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: SIZES.base2,
          }}
        >
          <Image
            source={image}
            style={{
              height: SIZES.base6,
              width: SIZES.base6,
              borderRadius: SIZES.base6,
            }}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: SIZES.base,
              }}
            >
              <Text style={{ ...FONTS.h3, color: COLORS.gray }}>{name}</Text>
              <MaterialIcons
                name="verified"
                size={SIZES.base2}
                color={COLORS.primary}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: SIZES.base,
              }}
            >
              <FontAwesome
                name="star"
                size={SIZES.base2}
                color={COLORS.amber}
              />
              <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                {`${rating} (${ratingTotal})`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: SIZES.thickness,
              }}
            >
              <Ionicons
                name="location-outline"
                size={SIZES.base2}
                color={COLORS.gray3}
              />
              <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                {`${address} . ${distance}`}
              </Text>
            </View>
          </View>
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={SIZES.base2}
          color={COLORS.tertiary}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
