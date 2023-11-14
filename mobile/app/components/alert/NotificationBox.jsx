import { View, Text } from "react-native";
import React from "react";
import {FONTS, COLORS, SIZES } from "../../constant";
import { Feather } from '@expo/vector-icons';

const NotificationBox = ({title, subtitle, time}) => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.base2,
        paddingVertical: SIZES.base2,
        borderRadius: SIZES.base,
        backgroundColor: COLORS.gray2,
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-between",
        gap: SIZES.base,
        marginBottom:SIZES.base
      }}
    >
      <Feather name="box" size={SIZES.base2} color={COLORS.pink} />
      <View style={{flexDirection:"column", flex:3}}>
        <Text style={{...FONTS.h4, color: COLORS.tertiary}}>{title}</Text>
        <Text  style={{...FONTS.body4, color: COLORS.gray3}}>{subtitle}</Text>
      </View>
      <Text style={{...FONTS.body4, color: COLORS.gray3}}>
        {time}
      </Text>
    </View>
  );
};

export default NotificationBox;
