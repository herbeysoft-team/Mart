import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import CustomButton from "../../components/auth/CustomButton";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Register({ navigation }) {
  const steps = [1, 2, 3, 4];
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const [fullname, setFullname] = useState("");
  const [businessname, setBusinessname] = useState("");
  const [industry, setIndustry] = useState("");
  const [proffession, setProffession] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const profileOption = [
    {
      id: 1,
      title: "Business",
      subtitle: "Buy and Sell as a Business",
      icon: (
        <Ionicons
          name="ios-business-outline"
          size={SIZES.base2}
          color={COLORS.gray3}
        />
      ),
    },
    {
      id: 2,
      title: "Individual",
      subtitle: "Buy and Sell as an Individual",
      icon: (
        <MaterialCommunityIcons
          name="account-outline"
          size={SIZES.base2}
          color={COLORS.gray3}
        />
      ),
    },
  ];

  const handleSignUp = () => {
    setCurrentStep(currentStep + 1);
    const user = {
      email: email,
      password: password,
    };
  };

  const handleConfirm = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleResendCode = () => {
    // setCurrentStep(currentStep + 1)
  };

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const getStarted = () => {
    navigation.navigate("Login");
  };

  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={styles.header}>{"Create your\naccount"}</Text>
            <View style={{ marginTop: SIZES.base3 }}>
              <Text style={styles.inputheading}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
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
                placeholder="Enter your Email"
              />
            </View>

            <View style={{ marginTop: SIZES.base }}>
              <Text style={styles.inputheading}>Password</Text>

              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
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
                placeholder="***********"
              />
            </View>

            <View
              style={{
                marginTop: SIZES.base6,
                height: SIZES.hp(25),
                alignItems: "center",
              }}
            />

            <CustomButton text={"Sign Up"} onPress={handleSignUp} fill={true} />

            <Pressable
              onPress={() => navigation.navigate("Login")}
              style={{ marginTop: 15 }}
            >
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.accent,
                  textAlign: "center",
                }}
              >
                Already have an account?{" "}
                <Text style={{ color: COLORS.primary }}>Sign In</Text>
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        )}

        {currentStep == 1 && (
          <KeyboardAvoidingView>
            <Text style={styles.header}>{"Verify email"}</Text>
            <Text style={styles.subheading}>
              {
                "This helps us keep your account secure by verifying it’s really you."
              }
            </Text>
            <View style={{ marginTop: SIZES.base3 }}>
              <Text style={styles.inputheading}>Verification Code</Text>
              <TextInput
                value={verify}
                onChangeText={(text) => setVerify(text)}
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
                placeholder="7 difgit code sent to email"
              />
            </View>

            <View
              style={{
                marginTop: SIZES.base6,
                height: SIZES.hp(35),
                alignItems: "center",
              }}
            />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                gap: SIZES.base,
              }}
            >
              <CustomButton
                text={"Confirm"}
                onPress={handleConfirm}
                fill={true}
              />
              <CustomButton
                text={"Resend Code"}
                onPress={handleResendCode}
                fill={false}
              />
            </View>
          </KeyboardAvoidingView>
        )}

        {currentStep == 2 && (
          <View>
            <Text style={styles.header}>{"Profile Type"}</Text>
            <Text style={styles.subheading}>
              {"Select how you appear to potential buyers and sellers."}
            </Text>
            <View style={{ marginTop: SIZES.base3 }}>
              {profileOption?.map((item, index) => (
                <Pressable
                  onPress={() => setSelectedOption(item)}
                  key={item?.id}
                  style={{
                    borderWidth: SIZES.thickness / 3,
                    borderColor:
                      selectedOption && selectedOption.id === item?.id
                        ? COLORS.primary
                        : COLORS.gray3,
                    padding: SIZES.base2,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 5,
                    marginVertical: SIZES.base,
                    borderRadius: SIZES.thickness,
                  }}
                >
                  <View style={{ flexDirection: "row", gap: SIZES.base }}>
                    <View
                      style={{
                        width: SIZES.base4,
                        height: SIZES.base4,
                        backgroundColor: COLORS.gray4,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item?.icon}
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <Text style={{ ...FONTS.body3, color: COLORS.accent }}>
                        {item?.title}
                      </Text>
                      <Text style={{ ...FONTS.body4, color: COLORS.accent }}>
                        {item?.subtitle}
                      </Text>
                    </View>
                  </View>
                  {selectedOption && selectedOption.id === item?.id ? (
                    <FontAwesome5
                      name="dot-circle"
                      size={SIZES.base3}
                      color={COLORS.primary}
                    />
                  ) : (
                    <Entypo
                      onPress={() => setSelectedOption(item)}
                      name="circle"
                      size={SIZES.base3}
                      color="gray"
                    />
                  )}
                </Pressable>
              ))}
            </View>

            <View
              style={{
                marginTop: SIZES.base6,
                height: SIZES.hp(25),
                alignItems: "center",
              }}
            />

            <CustomButton
              text={"Continue"}
              onPress={handleContinue}
              fill={true}
            />
          </View>
        )}

        {currentStep == 3 && (
          <KeyboardAvoidingView>
            {selectedOption?.id == 1 && (
              <View>
                <Text style={styles.header}>
                  {"Tell us about\nyour business"}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: SIZES.base2,
                    marginTop: SIZES.base,
                  }}
                >
                  <View
                    style={{
                      width: SIZES.base10,
                      height: SIZES.base10,
                      backgroundColor: COLORS.gray4,
                      borderRadius: SIZES.base10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SimpleLineIcons
                      name="picture"
                      size={SIZES.base4}
                      color={COLORS.tertiary}
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
                      Upload Business Logo
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
                    placeholder="Enter Business Name"
                  />
                </View>

                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Profession</Text>

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
                    placeholder="Select your Industry"
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
                    placeholder="Enter your Address"
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
                    placeholder="Enter your Phone number"
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
                  <CustomButton
                    text={"Get Started"}
                    onPress={getStarted}
                    fill={true}
                  />
                  <CustomButton text={"Back"} onPress={goBack} fill={false} />
                </View>
              </View>
            )}
            {selectedOption?.id == 2 && (
              <View>
                <Text style={styles.header}>{"Tell us about\nyourself"}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: SIZES.base2,
                    marginVertical: SIZES.base,
                  }}
                >
                  <View
                    style={{
                      width: SIZES.base10,
                      height: SIZES.base10,
                      backgroundColor: COLORS.gray4,
                      borderRadius: SIZES.base10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SimpleLineIcons
                      name="picture"
                      size={SIZES.base4}
                      color={COLORS.tertiary}
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
                      Upload Profile Picture
                    </Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.tertiary }}>
                      Shouldn't be more than 2mb in Size
                    </Text>
                  </View>
                </View>
                {/* form here */}
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Full Name</Text>
                  <TextInput
                    value={fullname}
                    onChangeText={(text) => setFullname(text)}
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
                    placeholder="Your Full Name"
                  />
                </View>

                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Profession</Text>

                  <TextInput
                    value={proffession}
                    onChangeText={(text) => setProffession(text)}
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
                    placeholder="Your Profession"
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
                    placeholder="Enter your Address"
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
                    placeholder="Enter your Phone number"
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
                  <CustomButton
                    text={"Get Started"}
                    onPress={getStarted}
                    fill={true}
                  />
                  <CustomButton text={"Back"} onPress={goBack} fill={false} />
                </View>
              </View>
            )}
          </KeyboardAvoidingView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base3,
    paddingHorizontal: SIZES.base3,
  },
  header: {
    ...FONTS.header,
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
    color: COLORS.tertiary,
    ...FONTS.h4,
    marginTop: SIZES.base,
    lineHeight: SIZES.base2,
  },
});
