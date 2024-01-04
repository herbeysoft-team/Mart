import {
  KeyboardAvoidingView,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRoute } from "@react-navigation/native";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderChat from "../../components/general/HeaderChat";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  sendMessage,
  getChatList,
} from "../../context/features/messageSlice";
import { getItem } from "../../utils/asyncStorage.js";
import moment from "moment";
import ChatInputBox from "../../components/general/ChatInputBox.js";
import MessageListingCardView from "../../components/explore/MessageListingCardView.jsx";

export default function ChatScreen({ navigation }) {
  const route = useRoute();
  const userId = route.params;
  const dispatch = useDispatch();
  const { chathistory, loadingsend } = useSelector((state) => state.message);
  const [senderId, setSenderId] = useState("");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const id = await getItem("trowmartuserId");
        setSenderId(id);
        if (id) {
          dispatch(getMessages({ senderId: id, recepientId: userId }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserId();
  }, []);

  const memoizeChatHistory = useMemo(() => chathistory, [chathistory]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  const handleSend = (message) => {
    content = {
      senderId,
      recepientId: userId,
      messageType: "text",
      textMessage: message,
    };
    if (message) {
      dispatch(sendMessage(content));
    }

    setTimeout(() => {
      dispatch(getMessages({ senderId: senderId, recepientId: userId }));
      dispatch(getChatList(senderId));
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: SIZES.base2, paddingHorizontal: SIZES.base2 }}>
        <HeaderChat userId={userId} navigation={navigation} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      >
        {memoizeChatHistory.map((item, index) => {
          if (item.messageType === "text") {
            return (
              <Pressable
                key={index}
                style={[
                  item?.senderId !== userId
                    ? styles.sentMessage
                    : styles.receivedMessage,
                  { textAlign: item?.senderId !== userId ? "right" : "left" },
                ]}
              >
                <Text
                  style={{
                    textAlign: item?.senderId !== userId ? "right" : "left",
                    ...FONTS.body3,
                    color: COLORS.gray3,
                    marginBottom: SIZES.thickness,
                  }}
                >
                  {moment(item?.timeStamp).format("dddd h:mma")}
                </Text>
                <View
                  style={[
                    item?.senderId !== userId
                      ? styles.sentText
                      : styles.receivedText,

                    // isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                  ]}
                >
                  <Text
                    style={{
                      ...FONTS.body3,
                      textAlign: "left",
                      paddingHorizontal: SIZES.base2,
                      color:
                        item?.senderId !== userId
                          ? COLORS.white
                          : COLORS.accent,
                    }}
                  >
                    {item?.textMessage}
                  </Text>
                </View>
              </Pressable>
            );
          }
          // Other message type handling if needed
          if (item.messageType === "listing") {
            return (
              <MessageListingCardView
                key={index}
                listing={item?.listing}
                navigation={navigation}
              />
            );
          }
        })}
      </ScrollView>
      {loadingsend ? (
        <ActivityIndicator size="small" color={COLORS.tertiary} />
      ) : null}
      <KeyboardAvoidingView behavior="padding">
        <ChatInputBox handleSend={handleSend} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base3,
  },
  sentMessage: {
    alignSelf: "flex-end",
    padding: SIZES.base,
    maxWidth: "100%",
    borderRadius: SIZES.thickness,
    // margin: SIZES.base,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    borderRadius: SIZES.thickness,
    padding: SIZES.base,
    width: "100%",
    maxWidth: "100%",
  },
  sentText: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base2,
    maxWidth: "100%",
    borderTopLeftRadius: SIZES.base,
    borderBottomLeftRadius: SIZES.base,
    borderBottomRightRadius: SIZES.base,
  },
  receivedText: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.gray4,
    paddingVertical: SIZES.base2,
    // margin: SIZES.base,
    width: "100%",
    borderTopRightRadius: SIZES.base,
    borderBottomLeftRadius: SIZES.base,
    borderBottomRightRadius: SIZES.base,
    maxWidth: "100%",
  },
});
