import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
    ScrollView
  } from "react-native";
  import React, { useState } from "react";
  import { useRoute } from "@react-navigation/native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
  import HeaderMini from "../../components/general/HeaderMini";
  import { Entypo } from "@expo/vector-icons";
  import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import CustomButton from "../../components/auth/CustomButton";
  import OrderCompleteModel from "../../components/general/OrderCompleteModel";
  import VendorHeading from "../../components/explore/VendorHeading";
  
  export default function CartSceen({ navigation }) {
    
  
    const gotoHome = () => {
      navigation.navigate("Main");
      setOpenOrderCompleteModel(false);
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <HeaderMini title={"Cart"} navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.itemContainer}>
          {/* <VendorHeading navigation={navigation} user={route.params?.user}/> */}
          <View
            style={{
              paddingVertical: SIZES.base,
              borderRadius: SIZES.base,
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: SIZES.base,
            }}
          >
            {/* <Image
              source={{ uri: `${URLBASE.imageBaseUrl}${route.params.image[0]}`}}
              style={{
                height: SIZES.base14,
                width: SIZES.base12,
                flex: 1,
                borderRadius: SIZES.base,
                resizeMode: "cover",
              }}
            /> */}
            <View style={{ flex: 2, gap: SIZES.base, alignItems: "flex-start" }}>
              <Text style={{ ...FONTS.listHead, color: COLORS.accent2 }}>
                {route.params?.name}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
                {route.params?.type == "product"
                  ? `N${route.params?.price}`
                  : `N${route.params?.price}/${route.params?.unit}`}
              </Text>
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
                  {route.params?.location?.address}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                gap: SIZES.base,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => console.log("add")}>
                <View
                  style={{
                    width: SIZES.base3,
                    height: SIZES.base3,
                    backgroundColor: COLORS.gray4,
                    borderRadius: SIZES.base3,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>+</Text>
                </View>
              </TouchableOpacity>
              <Text>1</Text>
              <TouchableOpacity onPress={() => console.log("add")}>
                <View
                  style={{
                    width: SIZES.base3,
                    height: SIZES.base3,
                    backgroundColor: COLORS.gray4,
                    borderRadius: SIZES.base3,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>-</Text>
                </View>
              </TouchableOpacity>
              <View></View>
            </View>
          </View>
        </View>
       
  
        {/* Summary */}
        {/* <View style={styles.itemContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: SIZES.wp(85),
              alignItems: "center",
            }}
          >
            <Text
              style={{ ...FONTS.body3, color: COLORS.gray3 }}
            >{`Item (1)`}</Text>
            <Text
              style={{ ...FONTS.body3, color: COLORS.gray3 }}
            >{`N${route.params?.price}`}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: SIZES.wp(85),
              alignItems: "center",
            }}
          >
            <Text
              style={{ ...FONTS.body3, color: COLORS.gray3 }}
            >{`Delivery Fee`}</Text>
            <Text
              style={{ ...FONTS.body3, color: COLORS.gray3 }}
            >{`N${route.params?.price}`}</Text>
          </View>
        </View>
   */}
        {/* Order Total */}
        <View
          style={{
            paddingVertical: SIZES.base3,
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: SIZES.base2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: SIZES.wp(85),
              alignItems: "center",
            }}
          >
            <Text
              style={{ ...FONTS.h3, color: COLORS.accent }}
            >{`Order Total`}</Text>
            <Text
              style={{ ...FONTS.h3, color: COLORS.accent }}
            >{`N${route.params?.price}`}</Text>
          </View>
        </View>
        <CustomButton onPress={gotoOrderComplete} text={"Confirm and Pay"} fill={true}/>
       
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      marginBottom: SIZES.base3,
      paddingTop: SIZES.base2,
      paddingHorizontal: SIZES.base2,
    },
    itemContainer: {
      paddingVertical: SIZES.base,
      borderRadius: SIZES.base,
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: SIZES.base2,
      borderBottomColor: COLORS.gray4,
      borderBottomWidth: SIZES.thin,
    },
  });
  