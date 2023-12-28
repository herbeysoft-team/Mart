import {
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVendorListings,
  deleteVendorListing,
} from "../../context/features/vendorSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import { TabView, TabBar } from "react-native-tab-view";
import { setItem, getItem, removeItem } from "../../utils/asyncStorage.js";
import ProductRoute from "../../components/profile/ProductRoute.js";
import EventRoute from "../../components/profile/EventRoute.js";
import LoadingOverlay from "../../components/general/LoadingOverlay";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import ServicesRoute from "../../components/profile/ServicesRoute.js";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

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
export default function MyListing({ navigation }) {
  const dispatch = useDispatch();
  // ref
  const bottomSheetListingOptionRef = useRef(null);
  const [openSetting, setOpenSetting] = useState(false);
  const [itemId, setItemId] = useState("");
  // variables
  const snapPoints = useMemo(() => ["30%"], []);

  const handleCloseBottomSheet = () =>
    bottomSheetListingOptionRef.current?.close();
  const handleOpenBottomSheet = () =>
    bottomSheetListingOptionRef.current?.expand();

  const handleOpenBottomSheetSetting = () => {
    setOpenSetting(true);
    handleOpenBottomSheet();
  };

  const handleDeleteItem = async () => {
    dispatch(deleteVendorListing({ id: itemId, Toast }));
    const getId = await getItem("trowmartuserId");
    if (getId) {
      dispatch(getVendorListings(getId));
    }
    handleCloseBottomSheet();
  };

  const handleEditItem = async () => {
    editListing = memoizeMyListings.filter((item) => item._id === itemId);
    navigation.navigate("Edit-Listing", editListing);
    handleCloseBottomSheet();
  };

  const handleSettingChanged = (value) => {
    setItemId(value?.id);
    setOpenSetting(value?.status);
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

  const { loadingvendorlisting, vendorlistings, deleteloading } = useSelector(
    (state) => state.vendor
  );

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const getId = await getItem("trowmartuserId");
        if (getId) {
          dispatch(getVendorListings(getId));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const memoizeMyListings = useMemo(() => vendorlistings, [vendorlistings]);

  const myProductListing = memoizeMyListings.filter(
    (item) => item.type === "product"
  );
  const myServiceListing = memoizeMyListings.filter(
    (item) => item.type === "service"
  );
  const myEventListing = memoizeMyListings.filter(
    (item) => item.type === "event"
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "0":
        return (
          <ProductRoute
            navigation={navigation}
            listing={myProductListing}
            handleSettingChangeFunction={handleSettingChanged}
          />
        );
      case "1":
        return (
          <ServicesRoute
            navigation={navigation}
            listing={myServiceListing}
            handleSettingChangeFunction={handleSettingChanged}
          />
        );
      case "2":
        return (
          <EventRoute
            navigation={navigation}
            listing={myEventListing}
            handleSettingChangeFunction={handleSettingChanged}
          />
        );
      default:
        return null;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "0", title: "Products" },
    { key: "1", title: "Services" },
    { key: "2", title: "Events" },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderMedium navigation={navigation} title={"My Listings"} />
      </View>
      {loadingvendorlisting &&
        LoadingOverlay((visible = { loadingvendorlisting }))}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: SIZES.wp(100) }}
        sceneContainerStyle={{ backgroundColor: COLORS.white }}
        renderTabBar={renderTabBar}
      />
      {/* BottomSheet  */}
      {openSetting && (
        <BottomSheet
          ref={bottomSheetListingOptionRef}
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
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.accent,
                textAlign: "center",
              }}
            >
              Actions
            </Text>

            <View
              style={{
                paddingVertical: SIZES.base,
                backgroundColor: COLORS.white,
              }}
            >
              <Pressable
                onPress={handleEditItem}
                style={{
                  flexDirection: "row",
                  gap: SIZES.base2,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingVertical: SIZES.base2,
                }}
              >
                <Feather
                  name="edit-2"
                  size={SIZES.base3}
                  color={COLORS.accent}
                />
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.accent,
                    textAlign: "left",
                  }}
                >
                  Edit Listing
                </Text>
              </Pressable>

              <Pressable
                onPress={handleDeleteItem}
                style={{
                  flexDirection: "row",
                  gap: SIZES.base2,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  paddingVertical: SIZES.base,
                }}
              >
                <AntDesign
                  name="delete"
                  size={SIZES.base3}
                  color={COLORS.red}
                />
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.red,
                    textAlign: "left",
                  }}
                >
                  Delete Listing
                </Text>
                {deleteloading ? (
                  <ActivityIndicator size="small" color={COLORS.tertiary} />
                ) : null}
              </Pressable>
            </View>
          </View>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
});
