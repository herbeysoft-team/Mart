import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import { TabView, TabBar } from "react-native-tab-view";
import HeaderMedium from "../../components/general/HeaderMedium";
import OrderMade from "../../components/profile/OrderMade";
import OrderRecieved from "../../components/profile/OrderRecieved";


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
export default function MyOrders({ navigation }) {
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "0":
        return (
          <OrderMade
            navigation={navigation}
            
          />
        );
      case "1":
        return (
          <OrderRecieved
            navigation={navigation}
          />
        );
      default:
        return null;
    }
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "0", title: "Made" },
    { key: "1", title: "Recieved" },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderMedium navigation={navigation} title={"My Orders"} />
      </View>
      {/* {loadingvendorlisting && (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      )} */}
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
    paddingVertical: SIZES.base2,
    paddingHorizontal: SIZES.base2,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
});
