import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS, listing } from "../../constant";
import HeaderBig from "../../components/general/HeaderBig";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Categories from "../../components/explore/Categories";
import ListingCardView from "../../components/explore/ListingCardView";
import ListingCardViewGrid from "../../components/explore/ListingCardViewGrid";

const Explore = ({ navigation }) => {
  const [gridView, setGridView] = useState(false);
  const [activeCategory, setActiveCategory] = useState({
    id: 0,
    name: "Products",
    key: "product",
  });
  const [categories, setCategories] = useState([
    { id: 0, name: "Products", key: "product" },
    { id: 1, name: "Events", key: "event" },
    { id: 2, name: "Services", key: "service" },
  ]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBig title={"Explore"} />
      {/* Search components */}
      <View style={styles.SearchBox}>
        <View
          style={{
            paddingHorizontal: SIZES.base2,
            paddingVertical: SIZES.base2,
            flexDirection: "row",
            borderRadius: SIZES.base,
            borderColor: COLORS.gray4,
            borderWidth: SIZES.thin,
            flex: 6,
            alignItems: "center",
            gap: SIZES.base2,
          }}
        >
          <Feather name="search" size={SIZES.base2} color={COLORS.gray3} />
          <TextInput
            placeholder="Search listings"
            placeholderTextColor={COLORS.gray3}
            style={{ ...FONTS.body3, color: COLORS.gray3 }}
          />
        </View>
        <TouchableOpacity onPress={() => console.log("Options")}>
          <View
            style={{
              paddingHorizontal: SIZES.base,
              paddingVertical: SIZES.base,
              flex: 1,
              borderRadius: SIZES.base,
              borderColor: COLORS.gray4,
              borderWidth: SIZES.thin,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="options-outline"
              size={SIZES.base4}
              color={COLORS.gray3}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* categories section */}
      <View>
        {categories.length > 0 && (
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        )}
      </View>
      {/* Listing Section */}
      <FlatList
        style={{ marginBottom: SIZES.base10 }}
        showsVerticalScrollIndicator={false}
        data={listing?.filter((item) => item.type == activeCategory.key)}
        renderItem={({ item }) =>
          gridView ? (
            <ListingCardViewGrid listing={item} navigation={navigation} />
          ) : (
            <ListingCardView listing={item} navigation={navigation} />
          )
        }
      />
      <View
        style={{
          position: "absolute",
          paddingVertical: SIZES.base2,
          alignItems: "center",
          justifyContent: "center",
          bottom: SIZES.base7,
          right: 0,
          left: 0,
          borderTopWidth: SIZES.thin,
          borderColor: COLORS.gray4,
          backgroundColor: COLORS.white,
          elevation: SIZES.base,
        }}
      >
        <Text
          style={{ textAlign: "center", ...FONTS.body3 }}
        >{`${listing?.length} results`}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base2,
    paddingHorizontal: SIZES.base2,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
  SearchBox: {
    gap: SIZES.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.base3,
  },
});
