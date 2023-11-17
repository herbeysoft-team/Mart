import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS, COLORS, SIZES } from "../../constant";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function VendorListingCardView({ listing, navigation }) {
  return (
    <Pressable onPress={() => navigation.navigate("Listing-Detail", listing)}>
      <View
        style={{
          paddingVertical: SIZES.base,
          borderRadius: SIZES.base,
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: SIZES.base,
          marginBottom: SIZES.base,
          borderBottomColor: COLORS.gray4,
          borderBottomWidth: SIZES.thin,
        }}
      >
        <View>
        <Image
          source={listing.image[0]}
          style={{
            height: SIZES.base14,
            width: SIZES.base12,
            flex: 1,
            borderRadius: SIZES.base,
            resizeMode: "cover",
          }}
        />
         
          </View>
        <View style={{ flex: 2, gap: SIZES.base, alignItems: "flex-start" }}>
          <Text style={{ ...FONTS.listHead, color: COLORS.accent2 }}>
            {listing?.name}
          </Text>
          <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
            {listing?.type == "product"
              ? `N${listing?.price}`
              : `N${listing?.price}/${listing?.unit}`}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: SIZES.thickness,
            }}
          >
            {listing?.type == "product" ? (
              <Feather
                name="calendar"
                size={SIZES.base2}
                color={COLORS.gray3}
              />
            ) : (
              <Feather name="box" size={SIZES.base2} color={COLORS.gray3} />
            )}
            <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
              {listing?.type == "product"
                ? `${listing?.stock?.quantity} pcs left`
                : listing?.type == "event"
                ? `${listing?.date} . ${listing?.time}`
                : `${listing?.available} . ${listing?.time}`}
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
              {listing?.location?.address}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
