import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import ProfilePic from "../../../assets/profilepic.jpeg";
import MessageBox from "./MessageBox";
import { FONTS, SIZES, COLORS, URLBASE } from "../../constant";

export default function MessageRoute({ navigation, chatList }) {
  return (
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
        {chatList?.length > 0 &&
          chatList.map((chat, index) => (
            <MessageBox
              key={index}
              profilePic={chat?.image}
              user={chat?.fullname || chat?.businessName }
              message={chat?.lastMessage}
              time={chat?.lastMessageTime}
              number={chat?.unreadMessageCount}
              userId={chat?.userId}
              navigation={navigation}
            />
          ))}
        
      </ScrollView>
  );
}

const styles = StyleSheet.create({});
