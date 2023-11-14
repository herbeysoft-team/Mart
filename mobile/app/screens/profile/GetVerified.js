import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderMedium from "../../components/general/HeaderMedium";
import CustomButton from "../../components/auth/CustomButton";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function GetVerified({ navigation }) {
  const steps = [1, 2, 3];
  const [currentStep, setCurrentStep] = useState(0);
  const [idType, setIDType] = useState("");
  

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleContinueFacial = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleSubmit = () => {
    navigation.navigate("Profile")
  };
  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMedium navigation={navigation} title={"Get Verified"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: SIZES.base3 }}
      >
        {/* Indicator container */}
        <View
          style={{
            flex: 1,
            paddingBottom: SIZES.base3,
            flexDirection: "row",
            marginTop: SIZES.base,
          }}
        >
          {/* Render indicator */}
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentStep == index && {
                  backgroundColor: COLORS.primaryDeep,
                  width: SIZES.base3,
                  height: SIZES.thickness,
                },
              ]}
            />
          ))}
        </View>

        {/* the Pages here */}
        {currentStep == 0 && (
          <KeyboardAvoidingView>
            <Text style={styles.subheading}>Government Issued ID</Text>
            <View style={{ marginTop: SIZES.base3 }}>
              <Text style={styles.inputheading}>Select ID type</Text>
              <TextInput
                value={idType}
                onChangeText={(text) => setIDType(text)}
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
                placeholder="National ID"
              />
            </View>
            <View
              style={{
                marginTop: SIZES.base3,
                paddingVertical: SIZES.base3,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderWidth: SIZES.thickness / 3,
                borderColor: COLORS.tertiary,
                color: COLORS.tertiary,
                // width: SIZES.wp(90),
                padding: SIZES.base2,
                borderRadius: SIZES.radius / 2,
              }}
            >
              <SimpleLineIcons
                name="picture"
                size={SIZES.base4}
                color={COLORS.tertiary}
              />
              <Text style={styles.inputheading}>Upload Front Page</Text>
            </View>

            <View
              style={{
                marginTop: SIZES.base3,
                paddingVertical: SIZES.base3,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderWidth: SIZES.thickness / 3,
                borderColor: COLORS.tertiary,
                color: COLORS.tertiary,
                // width: SIZES.wp(90),
                padding: SIZES.base2,
                borderRadius: SIZES.radius / 2,
              }}
            >
              <SimpleLineIcons
                name="picture"
                size={SIZES.base4}
                color={COLORS.tertiary}
              />
              <Text style={styles.inputheading}>Upload Back Page</Text>
            </View>

            <View
              style={{
                marginTop: SIZES.base6,
                height: SIZES.hp(5),
                alignItems: "center",
              }}
            />

            <CustomButton
              text={"Continue"}
              onPress={handleContinue}
              fill={true}
            />
          </KeyboardAvoidingView>
        )}

        {currentStep == 1 && (
          <View>
            <Text style={styles.subheading}>Facial Recognition</Text>
            <View
              style={{
                marginTop: SIZES.base3,
                borderWidth: SIZES.base,
                height: SIZES.hp(45),
                borderColor: COLORS.gray4,
                borderRadius: SIZES.base10 * 10,
                marginHorizontal: SIZES.base4,
              }}
            ></View>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.body3,
                marginVertical: SIZES.base2,
                color: COLORS.gray3,
              }}
            >
              {"Make sure to fit your face\ninto the oval"}
            </Text>

            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                gap: SIZES.base,
                marginTop: SIZES.base3,
              }}
            >
              <CustomButton
                text={"Continue"}
                onPress={handleContinueFacial}
                fill={true}
              />
              <CustomButton text={"Back"} onPress={goBack} fill={false} />
            </View>
          </View>
        )}

        {currentStep == 2 && (
          <View>
            <Text style={styles.subheading}>CAC Document</Text>
            <View
              style={{
                marginTop: SIZES.base3,
                paddingVertical: SIZES.base3,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderWidth: SIZES.thickness / 3,
                borderColor: COLORS.tertiary,
                color: COLORS.tertiary,
                // width: SIZES.wp(90),
                padding: SIZES.base2,
                borderRadius: SIZES.radius / 2,
              }}
            >
              <SimpleLineIcons
                name="picture"
                size={SIZES.base4}
                color={COLORS.tertiary}
              />
              <Text style={styles.inputheading}>Upload Front Page</Text>
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
                text={"Submit"}
                onPress={handleSubmit}
                fill={true}
              />
              <CustomButton text={"Back"} onPress={goBack} fill={false} />
            </View>
          </View>
        )}
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
  indicator: {
    height: SIZES.thickness,
    width: SIZES.base2,
    backgroundColor: COLORS.indicator,
    marginHorizontal: SIZES.thickness,
    borderRadius: SIZES.radius,
  },
  subheading: {
    color: COLORS.tertiary,
    ...FONTS.h2,
    color: COLORS.secondary,
  },
  inputheading: {
    color: COLORS.tertiary,
    ...FONTS.h4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
});
