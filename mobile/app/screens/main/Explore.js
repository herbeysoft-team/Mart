import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderBig from "../../components/general/HeaderBig";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Categories from "../../components/explore/Categories";
import ListingCardView from "../../components/explore/ListingCardView";
import ListingCardViewGrid from "../../components/explore/ListingCardViewGrid";
import { FlashList } from "@shopify/flash-list";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import CustomButton from "../../components/auth/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { getListingsByLocation } from "../../context/features/listingSlice";
import LoadingOverlay from "../../components/general/LoadingOverlay";

const Explore = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    listingsbylocation,
    loadinglistingsbylocation,
    errorlistingsbylocation,
  } = useSelector((state) => state.listing);

  const location = {
    longitude: 4.5444192,
    latitude: 8.537279,
  };

  useEffect(() => {
    dispatch(getListingsByLocation(location));
  }, []);

  const memoizedListingsByLocation = useMemo(
    () => listingsbylocation,
    [listingsbylocation]
  );

  // const updatedData = [
  //   ...memoizedListingsByLocation,
  //   {
  //     id: "explore_other_neighborhood", // Some unique identifier
  //     componentType: "Pressable", // Identifier for Pressable
  //   },
  // ];

  // ref
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["70%"], []);
  const [gridView, setGridView] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
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

  const handleCloseBottomSheet = () => bottomSheetRef.current?.close();
  const handleOpenBottomSheet = () => bottomSheetRef.current?.expand();

  const handleOpenBottomSheetSetting = () => {
    setOpenSetting(true);
    handleOpenBottomSheet();
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
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
        <TouchableOpacity onPress={handleOpenBottomSheetSetting}>
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
      {loadinglistingsbylocation ? (
        <LoadingOverlay visible={false} />
      ) : (
        <>
          <FlashList
            contentContainerStyle={{ paddingBottom: SIZES.base12 }}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
            data={memoizedListingsByLocation}
            renderItem={({ item }) =>
              item.componentType === "Pressable" ? (
                <Pressable onPress={() => {}}>
                  <Text
                    style={{
                      textAlign: "center",
                      ...FONTS.h4,
                      color: COLORS.primary,
                      borderWidth: SIZES.thin,
                      borderColor: COLORS.gray4,
                      padding: SIZES.base
                    }}
                  >{`Explore other Neighborhood`}</Text>
                </Pressable>
              ) : gridView ? (
                <ListingCardViewGrid listing={item} navigation={navigation} />
              ) : (
                <ListingCardView listing={item} navigation={navigation} />
              )
            }
          />
          <View style={{ padding: SIZES.base }}></View>
        </>
      )}

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
          style={{ textAlign: "center", ...FONTS.body4 }}
        >{`${memoizedListingsByLocation?.length} results in your Neighborhood`}</Text>
      </View>
      {/* BottomSheet  */}
      {openSetting && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{ color: COLORS.primary }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingVertical: SIZES.base2,
              paddingHorizontal: SIZES.base2,
              backgroundColor: COLORS.white,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Pressable onPress={() => {}}>
                <Text style={{ ...FONTS.body4, color: COLORS.white, flex: 1 }}>
                  Reset
                </Text>
              </Pressable>
              <Text
                style={{
                  flex: 1,
                  ...FONTS.h3,
                  color: COLORS.accent,
                  textAlign: "center",
                }}
              >
                Filter List
              </Text>
              <Pressable onPress={() => {}}>
                <Text
                  style={{ ...FONTS.body3, color: COLORS.primary, flex: 1 }}
                >
                  Reset
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                paddingHorizontal: SIZES.base2,
                paddingVertical: SIZES.base2,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>Price</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.base,
                  gap: SIZES.base,
                }}
              >
                <View
                  style={{
                    borderRadius: SIZES.thickness,
                    borderWidth: SIZES.thin,
                    borderColor: COLORS.gray4,
                    paddingHorizontal: SIZES.base,
                    paddingVertical: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                    Less than 30 min
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: SIZES.thickness,
                    borderWidth: SIZES.thin,
                    borderColor: COLORS.gray4,
                    paddingHorizontal: SIZES.base,
                    paddingVertical: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                    More than 30 min
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: SIZES.base2,
                paddingVertical: SIZES.base2,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>Distance from you</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.base,
                  gap: SIZES.base,
                }}
              >
                <View
                  style={{
                    borderRadius: SIZES.thickness,
                    borderWidth: SIZES.thin,
                    borderColor: COLORS.gray4,
                    paddingHorizontal: SIZES.base,
                    paddingVertical: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                    Less than 30 min
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: SIZES.thickness,
                    borderWidth: SIZES.thin,
                    borderColor: COLORS.gray4,
                    paddingHorizontal: SIZES.base,
                    paddingVertical: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                    More than 30 min
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: SIZES.base2,
                paddingVertical: SIZES.base2,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>Event Time</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.base,
                  gap: SIZES.base,
                }}
              >
                <View
                  style={{
                    borderRadius: SIZES.thickness,
                    borderWidth: SIZES.thin,
                    borderColor: COLORS.gray4,
                    paddingHorizontal: SIZES.base,
                    paddingVertical: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                    This Week
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: SIZES.thickness,
                    borderWidth: SIZES.thin,
                    borderColor: COLORS.gray4,
                    paddingHorizontal: SIZES.base,
                    paddingVertical: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                    This Month
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: SIZES.thickness,
                    borderWidth: SIZES.thin,
                    borderColor: COLORS.gray4,
                    paddingHorizontal: SIZES.base,
                    paddingVertical: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                    Next Month
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: SIZES.base2,
                paddingVertical: SIZES.base2,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>View</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.base,
                  gap: SIZES.base,
                }}
              >
                <View
                  style={{
                    width: SIZES.base5,
                    height: SIZES.base5,
                    borderRadius: SIZES.base5,
                    borderWidth: SIZES.thin,
                    borderColor: COLORS.gray4,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="view-list"
                    size={SIZES.base3}
                    color={COLORS.gray3}
                  />
                </View>
                <View
                  style={{
                    width: SIZES.base5,
                    height: SIZES.base5,
                    borderRadius: SIZES.base5,
                    borderWidth: SIZES.thin,
                    borderColor: COLORS.gray4,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="view-day"
                    size={SIZES.base3}
                    color={COLORS.gray3}
                  />
                </View>
              </View>
            </View>
            <CustomButton
              onPress={handleCloseBottomSheet}
              text={"Show Result"}
              fill={true}
            />
          </ScrollView>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

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

export default Explore;
