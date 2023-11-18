import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import React, { useEffect } from "react";
import { FONTS, SIZES, COLORS, listing } from "../../constant";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HeaderMini from "../../components/general/HeaderMini";
import VendorListingCardView from "../../components/explore/VendorListingCardView";
import VendorReviewCard from "../../components/explore/VendorReviewCard";

const ListingsRoute = ({ navigation }) => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={{
      flex: 1,
      backgroundColor: COLORS.white,
      paddingVertical: SIZES.base,
      paddingHorizontal: SIZES.base2,
    }}
  >
    {listing.length > 0 &&
      listing
        .filter((item) => item.type === "product" && item?.price <= 4000)
        .map((item, index) => (
          <VendorListingCardView
            key={item.id}
            listing={item}
            navigation={navigation}
          />
        ))}
  </ScrollView>
);

const ReviewsRoute = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={{
      flex: 1,
      backgroundColor: COLORS.white,
      paddingVertical: SIZES.base2,
      paddingHorizontal: SIZES.base2,
      marginBottom: SIZES.base,
    }}
  >
    <VendorReviewCard/>
    <VendorReviewCard/>
    <VendorReviewCard/>
    <VendorReviewCard/>
    <VendorReviewCard/>
    <VendorReviewCard/>
  </ScrollView>
);

const renderScene = SceneMap({
  0: ListingsRoute,
  1: ReviewsRoute,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    renderLabel={({ route, focused, index }) => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            color: focused ? COLORS.primary : COLORS.gray3,
            margin: 8,
            ...FONTS.body1,
          }}
        >
          {route.title}
        </Text>
      </View>
    )}
    indicatorStyle={{ backgroundColor: COLORS.primary }}
    style={{ backgroundColor: COLORS.white }}
  />
);
export default function VendorProfile({ navigation }) {
  const route = useRoute();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "0", title: "Listings" },
    { key: "1", title: "Reviews" },
  ]);

  const { id, image, name, rating, address } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderMini title={"Vendor Profile"} navigation={navigation} />
      </View>
      <View
        style={{
          paddingTop: SIZES.base2,
          paddingHorizontal: SIZES.base2,
          alignItems: "center",
          gap: SIZES.base,
        }}
      >
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
          <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>{address}</Text>
        </View>
      </View>
      {/* the tabview  */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: SIZES.wp(100) }}
        sceneContainerStyle={{ backgroundColor: COLORS.white }}
        renderTabBar={renderTabBar}
      />
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
