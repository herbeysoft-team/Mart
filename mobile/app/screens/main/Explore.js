import {
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
import SearchBox from "../../components/explore/SearchBox.jsx";
import Slider from "../../components/explore/Slider.jsx";
import MinMaxLabels from "../../components/explore/MinMaxLabels.jsx";
import CustomBottomSheet from "../../components/explore/CustomBottomSheet.jsx";
import FloatingBotton from "../../components/general/FloatingBotton.js";

const Explore = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.map);
  const {
    listingsbylocation,
    loadinglistingsbylocation,
    errorlistingsbylocation,
  } = useSelector((state) => state.listing);

  const location = {
    longitude: userLocation?.longitude,
    latitude: userLocation?.latitude,
  };

  useEffect(() => {
    dispatch(getListingsByLocation(location));
  }, []);

  const memoizedListingsByLocation = useMemo(
    () => listingsbylocation,
    [listingsbylocation]
  );

  const updatedData = [
    ...memoizedListingsByLocation,
    {
      id: "explore_other_neighborhood", // Some unique identifier
      componentType: "Pressable", // Identifier for Pressable
    },
  ];

  // ref
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["60%"], []);
  const [gridView, setGridView] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredData, setFilteredData] = useState(updatedData);

  const [categories, setCategories] = useState([
    { id: 0, name: "Products", key: "product" },
    { id: 1, name: "Events", key: "event" },
    { id: 2, name: "Services", key: "service" },
  ]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    if (!category) {
      // If the active category is null (reset filter), show all data
      setFilteredData(updatedData);
    } else {
      // Filter the data based on the selected category
      const filtered = updatedData.filter((item) => {
        // Modify this condition based on your category filtering logic
        return item.type === category.key; // For instance, filter by category key
      });
      setFilteredData(filtered);
    }
  };

  const handleValueChange = useCallback((low, high) => {
    console.log(low, high);
  }, []);

  const handleFilteredResult = () => {};

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

  const navigateToRequestSceen = () => {
    navigation.navigate("Request-Delivery");
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBig title={"Explore"} />
      {/* Search components */}
      <SearchBox handleOpenBottomSheetSetting={handleOpenBottomSheetSetting} />

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
        <LoadingOverlay visible={loadinglistingsbylocation} />
      ) : (
        <>
          <FlashList
            contentContainerStyle={{ paddingBottom: SIZES.base10 }}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
            data={!activeCategory ? updatedData : filteredData}
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
                      padding: SIZES.base,
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
      {/* <CustomBottomSheet
        handleCloseBottomSheet={handleCloseBottomSheet}
        renderBackdrop={renderBackdrop}
        handleOpenBottomSheetSetting={handleOpenBottomSheetSetting}
      /> */}
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
                <Slider handleValueChange={handleValueChange} />
              </View>
              <MinMaxLabels min={0} max={`100000+`} />
            </View>
            {/* <View
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
            </View> */}
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
                    borderColor: !gridView ? COLORS.white : COLORS.gray4,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: !gridView ? COLORS.primaryLight : null,
                  }}
                >
                  <MaterialCommunityIcons
                    name="view-list"
                    size={SIZES.base3}
                    color={!gridView ? COLORS.primary : COLORS.gray3}
                  />
                </View>
                <View
                  style={{
                    width: SIZES.base5,
                    height: SIZES.base5,
                    borderRadius: SIZES.base5,
                    borderWidth: SIZES.thin,
                    borderColor: gridView ? COLORS.white : COLORS.gray4,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: gridView ? COLORS.primaryLight : null,
                  }}
                >
                  <MaterialCommunityIcons
                    name="view-day"
                    size={SIZES.base3}
                    color={gridView ? COLORS.primary : COLORS.gray3}
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
      {!openSetting && <FloatingBotton navigation={navigation} />}
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
  slider: {
    flex: 1,
    alignSelf: "center",
    // Add any other styles you want for the slider container
  },
  thumb: {
    width: SIZES.base2,
    height: SIZES.base2,
    borderRadius: SIZES.base2,
    backgroundColor: COLORS.gray4,
    borderColor: COLORS.gray4,
    // Customize thumb styles as needed
  },
  rail: {
    flex: 1,
    height: SIZES.thickness,
    backgroundColor: COLORS.gray4,
    // Customize rail styles as needed
  },
  railSelected: {
    flex: 1,
    height: SIZES.thickness,
    backgroundColor: COLORS.primary,
    // Customize selected rail styles as needed
  },
  label: {
    textAlign: "center",
    color: COLORS.accent,
    // Customize label styles as needed
  },
  notch: {
    width: SIZES.thin,
    height: SIZES.thin,
    borderRadius: SIZES.base2,
    backgroundColor: COLORS.primary,
    // Customize notch styles as needed
  },
});

export default Explore;
