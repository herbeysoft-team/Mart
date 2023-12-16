import React, { useState } from "react";
import { View, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { FONTS, SIZES, COLORS } from "../../constant";
import { AntDesign } from "@expo/vector-icons";

const CustomTextInputWithPicker = ({
  placeholder,
  items,
  onValueChange,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View
      style={{
        ...FONTS.body3,
        borderWidth: SIZES.thickness / 3,
        borderColor: isFocused ? COLORS.primary : COLORS.gray4,
        color: COLORS.tertiary,
        marginVertical: SIZES.thickness,
        alignItems:"center",
        justifyContent:"center",
        padding: SIZES.base2,
        borderRadius: SIZES.radius / 2,
      }}
    >
      <RNPickerSelect
        placeholder={{
          label: placeholder,
          value: null,
        }}
        onValueChange={onValueChange}
        items={items}
        style={{
          inputIOS: {
            ...FONTS.body3,
            color: COLORS.tertiary,
          },
          inputAndroid: {
            ...FONTS.body3,
            color: COLORS.tertiary,
          },
          chevronUp: {
            borderColor: COLORS.tertiary,
          },
          chevronDown: {
            borderColor: COLORS.tertiary,
          },
          done: {
            ...FONTS.h3,
            color: COLORS.primary,
          },
        }}
        Icon={() => {
          return (
            <AntDesign
              name="down"
              size={SIZES.base2}
              color={isFocused ? COLORS.primary : COLORS.gray4}
            />
          );
        }}
        onOpen={handleFocus}
        onClose={handleBlur}
      />
    </View>
  );
};

export default CustomTextInputWithPicker;
