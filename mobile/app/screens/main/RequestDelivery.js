import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FONTS,
  SIZES,
  COLORS,
  deliveryoption,
} from "../../constant";
import { Entypo } from "@expo/vector-icons";
import CustomButton from "../../components/auth/CustomButton";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import HeaderListing from "../../components/general/HeaderLising";
import CustomTextInput from "../../components/auth/CustomTextInput";
import CustomMultiLineInput from "../../components/auth/CustomMultiLineInput";
import CustomTextInputWithPicker from "../../components/auth/CustomTextInputWithPicker";
import CustomTextInputWithIcon from "../../components/auth/CustomTextInputWithIcon";
import CustomInputTags from "../../components/auth/CustomInputTags";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import CustomDateInputWithIcon from "../../components/auth/CustomDateInputWithIcon";

export default function RequestDelivery({navigation}) {

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [productname, setProductName] = useState("");
  const [servicename, setServiceName] = useState("");
  const [packagename, setPackageName] = useState("");
  const [eventname, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [plocation, setpLocation] = useState("");
  const [dlocation, setdLocation] = useState("");
  const [pcontact, setpContact] = useState("");
  const [dcontact, setdContact] = useState("");
  const [category, setCategory] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [from, setFrom] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [to, setTo] = useState(null);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);

  const handleAddRequest = () => {
    if (
      !packagename ||
      !description ||
      !plocation ||
      !dlocation ||
      !pcontact ||
      !dcontact ||
      !deliveryOption
    ) {
      Toast.show({
        type: "info",
        text1: "All field required!!!",
      });
    } else {
      console.log({
        "Package Name": packagename,
        Description: description,
        plocation,
        dlocation,
        pcontact,
        dcontact,
        deliveryOption,
      });
      Toast.show({
        type: "success",
        text1: "We are good to go",
      });

      setPackageName("");
      setDescription("");
      setpContact("");
      setdContact("");
      setpLocation("");
      setdLocation("");
      setDeliveryOption("");
    }
  };

  const handleGoBack = () => {
    navigation.goBack()
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderListing title={"New Listing"} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={SIZES.base5}
          behavior="padding"
        >
          {/* form here */}
          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Package Name</Text>
            <CustomTextInput
              value={packagename}
              onChangeText={(text) => setPackageName(text)}
              placeholder="Enter Package Name"
            />
          </View>
          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Package Description</Text>
            <CustomMultiLineInput
              multiline={true}
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="Enter Package Description"
            />
          </View>

          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Pick Up Location</Text>
            <CustomTextInputWithIcon
              value={plocation}
              onChangeText={(text) => setpLocation(text)}
              placeholder="Enter Pick Up Location"
              icon="enviromento"
            />
          </View>
          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Pick Up Contact</Text>
            <CustomTextInputWithIcon
              value={pcontact}
              onChangeText={(text) => setpContact(text)}
              placeholder="Enter Pick Up Contact"
              icon="phone"
              keyboardType="numeric"
            />
          </View>

          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Drop Off Location</Text>
            <CustomTextInputWithIcon
              value={dlocation}
              onChangeText={(text) => setdLocation(text)}
              placeholder="Enter Drop Off Location"
              icon="enviromento"
              // textIcon="₦"
            />
          </View>

          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Drop Off Contact</Text>
            <CustomTextInputWithIcon
              value={dcontact}
              onChangeText={(text) => setdContact(text)}
              placeholder="Enter Drop Off Contact"
              icon="phone"
              // textIcon="₦"
            />
          </View>

          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Preferred Carrier</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
                marginBottom: SIZES.base3,
              }}
            >
              {deliveryoption?.map((item, index) => (
                <Pressable
                  onPress={() => setDeliveryOption(item)}
                  key={item?.id}
                  style={{
                    borderWidth: SIZES.thickness / 3,
                    borderColor:
                      deliveryOption && deliveryOption.id === item?.id
                        ? COLORS.primary
                        : COLORS.gray4,
                    paddingVertical: SIZES.base3,
                    paddingHorizontal: SIZES.base3,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                    width: SIZES.base10,
                    height: SIZES.base10,
                    marginVertical: SIZES.base,
                    borderRadius: SIZES.base,
                    backgroundColor: COLORS.gray2,
                  }}
                >
                  <Image
                    source={item?.icon}
                    style={{
                      height: SIZES.base5,
                      width: SIZES.base5,
                      resizeMode: "contain",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </Pressable>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ ...FONTS.h3, color: COLORS.accent }}
              >{`Order Estimate`}</Text>
              <Text
                style={{ ...FONTS.h3, color: COLORS.accent }}
              >{`₦${"3500"}`}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              gap: SIZES.base,
              marginTop: SIZES.base3,
            }}
          >
            <CustomButton
              text={"Send Request"}
              onPress={handleAddRequest}
              fill={true}
            />
            <CustomButton text={"Back"} onPress={handleGoBack} fill={false} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base3,
    paddingHorizontal: SIZES.base3,
    backgroundColor: COLORS.white,
  },
  header: {
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  indicator: {
    height: SIZES.thickness,
    width: SIZES.base2,
    backgroundColor: COLORS.indicator,
    marginHorizontal: SIZES.thickness,
    borderRadius: SIZES.radius,
  },
  subheading: {
    color: COLORS.tertiary,
    ...FONTS.h4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
  inputheading: {
    color: COLORS.gray3,
    ...FONTS.h4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
  underheading: {
    color: COLORS.gray3,
    ...FONTS.body4,
    marginTop: SIZES.thickness,
    lineHeight: SIZES.base2,
  },
});
