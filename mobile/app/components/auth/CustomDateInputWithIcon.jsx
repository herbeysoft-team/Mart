import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS, SIZES, COLORS } from "../../constant";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CustomDateInputWithIcon({
  placeholder,
  icon,
  onSelectedTimeChange,
  mode,
  defaultTime,
  ...rest
}) {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(
    defaultTime ? defaultTime : null // Set default time if provided
  );
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setTimePickerVisibility(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    setSelectedTime(time);
    onSelectedTimeChange(time); // Notify the parent about the selected time
    hideTimePicker();
  };

  return (
    <View
      style={{
        ...FONTS.body3,
        borderWidth: SIZES.thickness / 3,
        borderColor: isFocused ? COLORS.primary : COLORS.gray4,
        color: COLORS.tertiary,
        marginVertical: SIZES.thickness,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: SIZES.base,
        padding: SIZES.base2,
        borderRadius: SIZES.radius / 2,
      }}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={SIZES.base2}
          color={COLORS.gray3}
          onPress={showTimePicker}
        />
      )}
      <TextInput
        value={
            selectedTime
              ? selectedTime.toLocaleString(undefined, {
                  year: mode === "time" ? undefined : "numeric",
                  month: mode === "time" ? undefined: "2-digit",
                  day: mode === "time" ? undefined : "2-digit",
                  hour: mode === "time" ? "2-digit" : undefined,
                  minute: mode === "time" ? "2-digit" : undefined,
                })
              : ""
          }
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        style={{
          ...FONTS.body3,
          color: COLORS.tertiary,
          flex: 1,
          marginLeft: SIZES.base,
        }}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        buttonTextColorIOS={COLORS.primary}
        textColor={COLORS.gray3}
      />
    </View>
  );
}
