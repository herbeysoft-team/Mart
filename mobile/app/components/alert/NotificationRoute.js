import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import NotificationBox from "./NotificationBox";
import { FONTS, SIZES, COLORS } from "../../constant";

export default function NotificationRoute() {
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
  )
}

const styles = StyleSheet.create({})