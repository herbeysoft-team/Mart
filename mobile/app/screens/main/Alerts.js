import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderBig from "../../components/general/HeaderBig";
import NotificationRoute from "../../components/alert/NotificationRoute";
import MessageRoute from "../../components/alert/MessageRoute";
import { useDispatch, useSelector } from "react-redux";
import { getChatList } from "../../context/features/messageSlice";
import { setItem, getItem, removeItem } from "../../utils/asyncStorage.js";

const Alerts = ({navigation}) => {
  const dispatch = useDispatch();
  const { loadingchatlist, errorchatlist, chatlist } = useSelector(
    (state) => state.message
  );
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "0", title: "Notications" },
    { key: "1", title: "Messages" },
  ]);

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const id = await getItem("trowmartuserId");
        if (id) {
          dispatch(getChatList(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const memoizeChatList = useMemo(() => chatlist, [chatlist]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "0":
        return <NotificationRoute />;
      case "1":
        return <MessageRoute chatList={memoizeChatList?.userDetails} navigation={navigation}/>;
      default:
        return null;
    }
  };

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
                backgroundColor: memoizeChatList?.totalUnreadMessages > 0 ? COLORS.red : COLORS.white,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{memoizeChatList?.totalUnreadMessages > 0 ? memoizeChatList?.totalUnreadMessages: 0}</Text>
            </View>
          )}
        </View>
      )}
      indicatorStyle={{ backgroundColor: COLORS.primary }}
      style={{ backgroundColor: COLORS.white }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderBig title={"Alerts"} />
      </View>

      {loadingchatlist ? (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      ) : null}

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
