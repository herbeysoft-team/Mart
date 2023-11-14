import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderBig from "../../components/general/HeaderBig";
import NotificationBox from "../../components/alert/NotificationBox";
import ProfilePic from "../../../assets/profilepic.jpeg";
import MessageBox from "../../components/alert/MessageBox";
const FirstRoute = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={{
      flex: 1,
      backgroundColor: COLORS.white,
      paddingVertical: SIZES.base2,
      paddingHorizontal: SIZES.base2,
      marginBottom: SIZES.base3,
    }}
  >
    <NotificationBox
      title={"New Listing 6min away"}
      subtitle={"Check out the existing listing now!"}
      time={"Just Now"}
    />
    <NotificationBox
      title={"New Listing 6min away"}
      subtitle={"Check out the existing listing now!"}
      time={"2 min ago"}
    />
    <NotificationBox
      title={"New Listing 6min away"}
      subtitle={"Check out the existing listing now!"}
      time={"1 hour ago"}
    />
    <NotificationBox
      title={"Low Stock Alert"}
      subtitle={"Check out the existing listing now!"}
      time={"6 days ago"}
    />
    <NotificationBox
      title={"Low Stock Alert"}
      subtitle={"Check out the existing listing now!"}
      time={"6 days ago"}
    />
    <NotificationBox
      title={"Low Stock Alert"}
      subtitle={"Check out the existing listing now!"}
      time={"6 days ago"}
    />
    <NotificationBox
      title={"Low Stock Alert"}
      subtitle={"Check out the existing listing now!"}
      time={"6 days ago"}
    />
    <NotificationBox
      title={"Low Stock Alert"}
      subtitle={"Check out the existing listing now!"}
      time={"6 days ago"}
    />
    <NotificationBox
      title={"Low Stock Alert"}
      subtitle={"Check out the existing listing now!"}
      time={"6 days ago"}
    />
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={{
      flex: 1,
      backgroundColor: COLORS.white,
      paddingVertical: SIZES.base2,
      paddingHorizontal: SIZES.base2,
      marginBottom: SIZES.base3,
    }}
  >
    <MessageBox
      profilePic={ProfilePic}
      user={"Abiodun Adam"}
      message={"Do you still have this?"}
      time={"Just Now"}
      number={2}
    />
     <MessageBox
      profilePic={ProfilePic}
      user={"Abiodun Adam"}
      message={"Do you still have this?"}
      time={"few minutes ago"}
      number={1}
    />
     <MessageBox
      profilePic={ProfilePic}
      user={"Jackson Adam"}
      message={"Do you still have this?"}
      time={"1 hour ago"}
      number={0}
    />
     <MessageBox
      profilePic={ProfilePic}
      user={"Abiodun Adam"}
      message={"Do you still have this?"}
      time={"3 days ago"}
      number={5}
    />
    <MessageBox
      profilePic={ProfilePic}
      user={"Abiodun Adam"}
      message={"Do you still have this?"}
      time={"3 days ago"}
      number={5}
    />
    <MessageBox
      profilePic={ProfilePic}
      user={"Abiodun Adam"}
      message={"Do you still have this?"}
      time={"3 days ago"}
      number={5}
    />
    <MessageBox
      profilePic={ProfilePic}
      user={"Abiodun Adam"}
      message={"Do you still have this?"}
      time={"3 days ago"}
      number={0}
    />
  </ScrollView>
);

const renderScene = SceneMap({
  0: FirstRoute,
  1: SecondRoute,
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
        {route.key === "0" && (
          <View
            style={{
              width: SIZES.base2,
              height: SIZES.base2,
              borderRadius: SIZES.base,
              backgroundColor: COLORS.red,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>1</Text>
          </View>
        )}
        {route.key === "1" && (
          <View
            style={{
              width: SIZES.base2,
              height: SIZES.base2,
              borderRadius: SIZES.base,
              backgroundColor: COLORS.red,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>2</Text>
          </View>
        )}
      </View>
    )}
    indicatorStyle={{ backgroundColor: COLORS.primary }}
    style={{ backgroundColor: COLORS.white }}
  />
);

const Alerts = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "0", title: "Notications" },
    { key: "1", title: "Messages" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderBig title={"Alerts"} />
      </View>

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
};

export default Alerts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
  header: {
    ...FONTS.header,
    color: COLORS.accent,
  },
});
