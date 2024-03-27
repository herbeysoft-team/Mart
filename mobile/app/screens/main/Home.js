import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Touchable,
  Platform,
} from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { FONTS, SIZES, COLORS, listing, URLBASE } from "../../constant";
import placeholder from "../../../assets/placeholder.png";
import SearchBar from "../../components/home/SearchBar";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import CustomButton from "../../components/auth/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import AppMapView from "../../components/home/AppMapView";
import { setUserLocation } from "../../context/features/mapSlice";
import {
  getVendorsByLocation,
  getVendorListings,
} from "../../context/features/vendorSlice";
import { useDispatch, useSelector } from "react-redux";
import FloatingBotton from "../../components/general/FloatingBotton";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.map);
  const { vendorbylocation, loadingvendorlisting, vendorlistings } =
    useSelector((state) => state.vendor);
  // ref
  const bottomSheetRefHome = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["50%"], ["80%"]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const handleCloseBottomSheet = () => bottomSheetRefHome.current?.close();
  const handleOpenBottomSheet = () => bottomSheetRefHome.current?.expand();

  const [mapRegion, setmapRegion] = useState({});

  const handleCloseVendor = (item) => {
    setSelectedVendor(null);
    setmapRegion({
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      latitudeDelta: 0.10922,
      longitudeDelta: 0.0921,
    });
    setIsBottomSheetOpen(false);
    handleCloseBottomSheet();
  };

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(null);
    setSelectedVendor(vendor);
    setmapRegion({
      latitude: vendor?.location?.coordinates[1],
      longitude: vendor?.location?.coordinates[0],
      latitudeDelta: 0.10922,
      longitudeDelta: 0.0921,
    });
    setIsBottomSheetOpen(true);
    dispatch(getVendorListings(vendor._id));
    handleOpenBottomSheet(); // Open the bottom sheet when a vendor is selected
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
  // render
  const renderItem = useCallback(
    ({ item }) => (
      <Pressable
        style={styles.itemContainer}
        onPress={() => navigation.navigate("Listing-Detail", item)}
      >
        <View
          style={{
            paddingVertical: SIZES.thickness,
            borderRadius: SIZES.base,
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: SIZES.base,
            marginBottom: SIZES.thin,
            // borderBottomColor: COLORS.gray4,
            // borderBottomWidth: SIZES.thin,
          }}
        >
          <View>
            <Image
              source={{ uri: `${URLBASE.imageBaseUrl}${item?.image[0]}` }}
              style={{
                height: SIZES.hp(12),
                width: SIZES.hp(12),
                borderRadius: SIZES.base,
                resizeMode: "cover",
              }}
            />
            <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
              {item?.type == "product"
                ? `₦${item?.price}`
                : `₦${item?.price}/${item?.unit}`}
            </Text>
            <Text style={{ ...FONTS.listHead, color: COLORS.accent2 }}>
              {item?.name}
            </Text>
          </View>
          <View style={{ flex: 2, gap: SIZES.base, alignItems: "flex-start" }}>
            <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
              {item?.type == "product"
                ? `N${item?.price}`
                : `N${item?.price}/${item?.unit}`}
            </Text>
            <Text style={{ ...FONTS.listHead, color: COLORS.accent2 }}>
              {item?.name}
            </Text>
          </View>
        </View>
      </Pressable>
    ),
    []
  );

  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      if (location) {
        dispatch(setUserLocation(location.coords));
        setmapRegion({
          latitude: location.coords?.latitude,
          longitude: location.coords?.longitude,
          latitudeDelta: 0.10922,
          longitudeDelta: 0.0921,
        });
      }
    })();
  }, []);

  const location = {
    longitude: userLocation?.longitude,
    latitude: userLocation?.latitude,
  };

  useEffect(() => {
    if (userLocation?.longitude) {
      dispatch(getVendorsByLocation(location));
    }
  }, [userLocation?.longitude]);


  return (
    <View style={styles.container}>
      <SearchBar navigation={navigation} />
      <AppMapView
        vendor={vendorbylocation}
        mapRegion={mapRegion}
        isBottomSheetOpen={isBottomSheetOpen}
        onVendorSelect={handleVendorSelect}
      />
      {/* BottomSheet  */}
      {selectedVendor !== null && (
        <BottomSheet
          ref={bottomSheetRefHome}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{ color: COLORS.primary }}
        >
          <View
            style={{
              paddingHorizontal: SIZES.base2,
              backgroundColor: COLORS.white,
              zIndex: 3,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderColor: COLORS.gray4,
                paddingVertical: SIZES.thickness,
                borderBottomWidth: SIZES.thin / 2,
                marginBottom: SIZES.base,
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
                  source={
                    selectedVendor?.profile
                      ? {
                          uri: `${URLBASE.imageBaseUrl}${selectedVendor?.profile}`,
                        }
                      : placeholder
                  }
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
                    <Text style={{ ...FONTS.h3, color: COLORS.gray }}>
                      {selectedVendor?.fullname || selectedVendor?.businessName}
                    </Text>
                    {selectedVendor?.verifiedAccount && (
                      <MaterialIcons
                        name="verified"
                        size={SIZES.base2}
                        color={COLORS.primary}
                      />
                    )}
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
                      {`${selectedVendor?.rating} (${selectedVendor?.ratingCount})`}
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
                    <Text
                      numberOfLines={1}
                      style={{ ...FONTS.body4, color: COLORS.gray3 }}
                    >
                      {`${selectedVendor?.address?.slice(0, 20)} . ${parseInt(
                        selectedVendor?.travelTimeMinutes
                      )}min away`}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={handleCloseVendor}>
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.gray2,
                    borderRadius: SIZES.base4,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AntDesign
                    name="close"
                    size={SIZES.base2}
                    color={COLORS.tertiary}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={{ ...FONTS.h3, color: COLORS.tertiary }}>
              {vendorlistings.length > 0 ? "Recent Listings" : ""}
            </Text>
            {vendorlistings.length > 0 ? (
              <FlatList
                data={vendorlistings}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
                horizontal
              />
            ) : (
              <View>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.gray,
                    paddingVertical: SIZES.base3,
                  }}
                >
                  No Listing Yet!
                </Text>
              </View>
            )}
            <CustomButton
              fill={false}
              text={"View Vendor"}
              onPress={() =>
                navigation.navigate("Vendor-Profile", {
                  vendor: selectedVendor,
                })
              }
            />
          </View>
        </BottomSheet>
      )}

      {selectedVendor === null && (
        <FloatingBotton navigation={navigation} />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  header: {
    ...FONTS.header,
    color: COLORS.accent,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    width: SIZES.base6,
    height: SIZES.base6,
    borderRadius: SIZES.base6,
    borderColor: COLORS.gray4,
    borderWidth: SIZES.thin,
    elevation: SIZES.thickness,
    shadow: SIZES.thickness,
    shadowColor: COLORS.gray2,
    shadowOffset:
      Platform.OS === "ios" ? { width: 0, height: SIZES.thickness } : undefined,
    shadowOpacity: Platform.OS === "ios" ? 0.3 : undefined,
    shadowRadius: Platform.OS === "ios" ? 4 : undefined,
    zIndex: 2,
  },
  arrow: {
    position: "relative",
    top: -SIZES.base2,
    width: 0,
    height: 0,
    borderTopWidth: SIZES.base3,
    borderRightWidth: SIZES.base3,
    borderBottomWidth: 0,
    borderLeftWidth: SIZES.base3,
    borderTopColor: COLORS.white,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    elevation: SIZES.thickness,
    shadow: SIZES.thickness,
    shadowOffset: SIZES.thin,
    shadowColor: COLORS.gray2,
  },
  contentContainer: {
    flexDirection: "row", // Ensure items are laid out horizontally
    alignItems: "center", // Align items in the center
  },
  itemContainer: {
    marginHorizontal: SIZES.base,
  },
});
