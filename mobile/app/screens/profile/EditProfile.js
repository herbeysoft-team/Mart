import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import ProfilePic from "../../../assets/profilepic.jpeg";
import CustomButton from "../../components/auth/CustomButton";

export default function EditProfile({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const [fullname, setFullname] = useState("");
  const [businessname, setBusinessname] = useState("");
  const [industry, setIndustry] = useState("");
  const [proffession, setProffession] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: SIZES.base2,
              marginTop: SIZES.base,
              marginBottom: SIZES.base3,
            }}
          >
            <View
              style={{
                width: SIZES.base8,
                height: SIZES.base8,
                backgroundColor: COLORS.gray4,
                borderRadius: SIZES.base8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={ProfilePic}
                style={{
                  height: SIZES.base8,
                  width: SIZES.base8,
                  borderRadius: SIZES.base8,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary,
                  paddingVertical: SIZES.base,
                }}
              >
                Upload Image
              </Text>
              <Text style={{ ...FONTS.body4, color: COLORS.tertiary }}>
                Shouldn't be more than 2mb in Size
              </Text>
            </View>
          </View>
          {/* form here */}
          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Business Name</Text>
            <TextInput
              value={businessname}
              onChangeText={(text) => setBusinessname(text)}
              style={{
                ...FONTS.body3,
                borderWidth: SIZES.thickness / 3,
                borderColor: COLORS.tertiary,
                color: COLORS.tertiary,
                marginVertical: SIZES.thickness,
                // width: SIZES.wp(90),
                padding: SIZES.base2,
                borderRadius: SIZES.radius / 2,
              }}
              placeholder="Bk's Pasteries"
            />
          </View>

          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Industry</Text>

            <TextInput
              value={industry}
              onChangeText={(text) => setIndustry(text)}
              style={{
                ...FONTS.body3,
                borderWidth: SIZES.thickness / 3,
                borderColor: COLORS.tertiary,
                color: COLORS.tertiary,
                marginVertical: SIZES.thickness,
                // width: SIZES.wp(90),
                padding: SIZES.base2,
                borderRadius: SIZES.radius / 2,
              }}
              placeholder="Catering"
            />
          </View>
          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Address</Text>

            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              style={{
                ...FONTS.body3,
                borderWidth: SIZES.thickness / 3,
                borderColor: COLORS.tertiary,
                color: COLORS.tertiary,
                marginVertical: SIZES.thickness,
                // width: SIZES.wp(90),
                padding: SIZES.base2,
                borderRadius: SIZES.radius / 2,
              }}
              placeholder="Oloje Ilorin"
            />
          </View>
          <View style={{ marginTop: SIZES.base }}>
            <Text style={styles.inputheading}>Phone Number</Text>

            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              style={{
                ...FONTS.body3,
                borderWidth: SIZES.thickness / 3,
                borderColor: COLORS.tertiary,
                color: COLORS.tertiary,
                marginVertical: SIZES.thickness,
                // width: SIZES.wp(90),
                padding: SIZES.base2,
                borderRadius: SIZES.radius / 2,
              }}
              placeholder="08022407013"
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              gap: SIZES.base,
              marginTop: SIZES.base3,
            }}
          >
            <CustomButton text={"Save"} onPress={() => {}} fill={true} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
  userSection: {
    paddingVertical: SIZES.base2,
    paddingHorizontal: SIZES.base2,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.base,
    marginBottom: SIZES.base2,
  },
});
