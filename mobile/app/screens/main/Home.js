import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Touchable,
} from "react-native";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { FONTS, SIZES, COLORS, listing, vendor } from "../../constant";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import SearchBar from "../../components/home/SearchBar";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import CustomButton from "../../components/auth/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  // ref
  const bottomSheetRefHome = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["60%"], ["80%"]);
  const handleCloseBottomSheet = () => bottomSheetRefHome.current?.close();
  const handleOpenBottomSheet = () => bottomSheetRefHome.current?.expand();

  const handleCloseVendor = (item) => {
    setSelectedVendor(null);
    handleCloseBottomSheet()
  };

  const handleOpenVendor = (item) => {
    setSelectedVendor(null);
    setSelectedVendor(item);
    handleOpenBottomSheet()
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
            paddingVertical: SIZES.base,
            borderRadius: SIZES.base,
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
              source={item?.image[0]}
              style={{
                height: SIZES.hp(15),
                width: SIZES.hp(15),
                borderRadius: SIZES.base,
                resizeMode: "cover",
              }}
            />
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
  const [mapRegion, setmapRegion] = useState({
    latitude: 8.4905382,
    longitude: 4.5108319,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });
  return (
    <View style={styles.container}>
      <SearchBar />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}
      >
        {vendor?.map((item, index) => (
          <Marker
            onPress={() => handleOpenVendor(item)}
            key={item.id}
            coordinate={{
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <View
                style={[
                  styles.marker,
                  {
                    backgroundColor:
                      selectedVendor?.id === item?.id
                        ? COLORS.primary
                        : COLORS.white,
                  },
                ]}
              >
                <Image
                  source={item?.profile}
                  style={{
                    height: SIZES.base5,
                    width: SIZES.base5,
                    borderRadius: SIZES.base5,
                    resizeMode: "cover",
                  }}
                />
              </View>
              <View
                style={[
                  styles.arrow,
                  {
                    borderTopColor:
                      selectedVendor?.id === item?.id
                        ? COLORS.primary
                        : COLORS.white,
                  },
                ]}
              />
            </View>
          </Marker>
        ))}
      </MapView>
      {/* BottomSheet  */}
      {selectedVendor !== null && (
        <BottomSheet
          ref={bottomSheetRefHome}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{ color: COLORS.primary }}
        >
          <View
            style={{
              paddingVertical: SIZES.base,
              paddingHorizontal: SIZES.base2,
              backgroundColor: COLORS.white,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: SIZES.base2,
                borderColor: COLORS.gray4,
                paddingVertical: SIZES.base2,
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
                  source={selectedVendor?.profile}
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
                      {selectedVendor?.name}
                    </Text>
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
                      {`${selectedVendor?.rating} (${selectedVendor?.ratingTotal})`}
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
                      {`${selectedVendor?.location?.address} . ${selectedVendor?.distance}`}
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
                  <AntDesign name="close" size={SIZES.base2}
                    color={COLORS.tertiary} />
                  
                </View>
              </TouchableOpacity>
            </View>
            <Text style={{ ...FONTS.h3, color: COLORS.tertiary }}>
              Recent Listings
            </Text>
            <FlatList
              data={listing}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.contentContainer}
              horizontal
            />
            <CustomButton
              fill={false}
              text={"View Vendor"}
              onPress={() => {}}
            />
          </View>
        </BottomSheet>
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
    shadowOffset: SIZES.thin,
    shadowColor: COLORS.gray2,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    zIndex: 2,
  },
  arrow: {
    position: "relative",
    top: -SIZES.base2,
    width: 0,
    height: 0,
    borderTopWidth: SIZES.base3,
    borderRightWidth: SIZES.base2,
    borderBottomWidth: 0,
    borderLeftWidth: SIZES.base2,
    borderTopColor: COLORS.white,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    elevation: SIZES.thickness,
    shadow: SIZES.thickness,
    shadowOffset: SIZES.thin,
    shadowColor: COLORS.gray2,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
  },
  contentContainer: {
    flexDirection: "row", // Ensure items are laid out horizontally
    alignItems: "center", // Align items in the center
  },
  itemContainer: {
    marginHorizontal: SIZES.base,
  },
});
