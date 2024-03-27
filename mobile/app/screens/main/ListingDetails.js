import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderSmall from "../../components/general/HeaderSmall";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import VendorCard from "../../components/explore/VendorCard";
import CustomButton from "../../components/auth/CustomButton";
import ListingCarousel from "../../components/explore/ListingCarousel";
import { getItem } from "../../utils/asyncStorage.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  sendMessage,
  getChatList,
} from "../../context/features/messageSlice";

import SimilarListing from "../../components/explore/SimilarListing.jsx";

export default function ListingDetails({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.map);
  const [senderId, setSenderId] = useState("");
  const userId = route.params?.user;
  const { loadingsend } = useSelector((state) => state.message);
  const listingcontent = {
    id: route.params?._id,
    longitude: userLocation?.longitude,
    latitude: userLocation?.latitude,
  };

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const id = await getItem("trowmartuserId");

        if (id) {
          setSenderId(id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const handleSend = () => {
    content = {
      senderId,
      recepientId: userId,
      messageType: "listing",
      listingId: route.params?._id,
    };

    dispatch(sendMessage(content));

    setTimeout(() => {
      dispatch(getMessages({ senderId: senderId, recepientId: userId }));
      dispatch(getChatList(senderId));
      navigation.navigate("Chat-Screen", userId);
    }, 500);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderSmall
          title={
            route?.params?.type == "product"
              ? "Product"
              : route?.params?.type == "event"
              ? "Event"
              : "Service"
          }
          navigation={navigation}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*Listing Carousel */}
        <ListingCarousel images={route.params?.image} />
        <View style={{ paddingHorizontal: SIZES.base2 }}>
          {/* Listing Description  */}
          <View
            style={{
              flex: 2,
              gap: SIZES.base,
              alignItems: "flex-start",
              borderBottomWidth: SIZES.thin / 2,
              borderColor: COLORS.gray4,
              paddingVertical: SIZES.base2,
            }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.accent2 }}>
              {route.params?.name}
            </Text>
            <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
              {route.params?.type == "product"
                ? `₦${route.params?.price}`
                : `₦${route.params?.price}/${route.params?.unit}`}
            </Text>
            {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: SIZES.thickness,
            }}
          >
            {route.params?.type == "product" ? (
              <Feather
                name="calendar"
                size={SIZES.base2}
                color={COLORS.gray3}
              />
            ) : (
              <Feather name="box" size={SIZES.base2} color={COLORS.gray3} />
            )}
            <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
              {route.params?.type == "product"
                ? `${route.params?.stock?.quantity} pcs left`
                : route.params?.type == "event"
                ? `${route.params?.date} . ${route.params?.time}`
                : `${route.params?.available} . ${route.params?.time}`}
            </Text>
          </View> */}
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
            <Text style={{ ...FONTS.body3, color: COLORS.gray3 }}>
              {route.params?.description}
              {/* <Text style={{ color: COLORS.primary }}>Read more</Text> */}
            </Text>
          </View>
          {/* Vendor of the listing */}
          <VendorCard navigation={navigation} user={route.params?.user} />
          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              gap: SIZES.base,
              flex: 1,
            }}
          >
            {loadingsend ? (
              <ActivityIndicator size="small" color={COLORS.tertiary} />
            ) : null}
            <CustomButton
              onPress={() => {
                navigation.navigate("Checkout", route?.params);
              }}
              text={
                route.params?.type == "product" ? "Buy Now" : "Visit Website"
              }
              fill={true}
            />
            {route.params?.type == "product" ? (
              <CustomButton
                onPress={() => {}}
                text={"Add to Cart"}
                fill={false}
              />
            ) : null}

            <CustomButton
              onPress={handleSend}
              text={"Message Vendor"}
              fill={false}
            />
          </View>
          <SimilarListing
            navigation={navigation}
            listingcontent={listingcontent}
          />
        </View>
      </ScrollView>
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
