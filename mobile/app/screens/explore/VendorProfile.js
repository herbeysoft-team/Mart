import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { FONTS, SIZES, COLORS } from "../../constant";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderSmall from "../../components/general/HeaderSmall";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HeaderMini from "../../components/general/HeaderMini";

export default function VendorProfile({ navigation }) {
  const route = useRoute();

  const { id, image, name, rating, address } = route.params;
  console.log(address);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderMini title={"Vendor Profile"} navigation={navigation} />
      </View>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2, alignItems:"center", gap: SIZES.base}}>
      <Image
            source={image}
            style={{
              height: SIZES.base8,
              width: SIZES.base8,
              borderRadius: SIZES.base6,
            }}
          />
        <Text style={{ ...FONTS.h3, color: COLORS.gray }}>{name}</Text>
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
                {address}
              </Text>
            </View>
        
      </View>

      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
});
