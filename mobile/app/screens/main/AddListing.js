import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  KeyboardAvoidingView
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
const productIccon = require("../../../assets/products.png");
const serviceIccon = require("../../../assets/service.png");
const eventIccon = require("../../../assets/event.png");
const deliveryIccon = require("../../../assets/delivery.png");
import { Entypo } from "@expo/vector-icons";
import CustomButton from "../../components/auth/CustomButton";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const AddListing = () => {
  const steps = [1, 2];
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };
  const listingOption = [
    {
      id: 1,
      title: "Product",
      subtitle: "Sample caption for this listing type",
      icon: productIccon,
    },
    {
      id: 2,
      title: "Service",
      subtitle: "Sample caption for this listing type",
      icon: serviceIccon,
    },
    {
      id: 3,
      title: "Event",
      subtitle: "Sample caption for this listing type",
      icon: eventIccon,
    },
    {
      id: 4,
      title: "Request Delivery",
      subtitle: "Sample caption for this listing type",
      icon: deliveryIccon,
    },
  ];
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
          <View>
            <Text style={styles.header}>{"Select Listing Type"}</Text>
            <View style={{ marginTop: SIZES.base3 }}>
              {listingOption?.map((item, index) => (
                <Pressable
                  onPress={() => setSelectedOption(item)}
                  key={item?.id}
                  style={{
                    borderWidth: SIZES.thickness / 3,
                    borderColor:
                      selectedOption && selectedOption.id === item?.id
                        ? COLORS.primary
                        : COLORS.gray4,
                    paddingVertical: SIZES.base3,
                    paddingHorizontal: SIZES.base2,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 5,
                    marginVertical: SIZES.base,
                    borderRadius: SIZES.base,
                  }}
                >
                  <View style={{ flexDirection: "row", gap: SIZES.base2 }}>
                    <Image
                      source={item?.icon}
                      style={{
                        height: SIZES.base4,
                        width: SIZES.base4,
                        resizeMode: "cover",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />

                    <View style={{ flexDirection: "column" }}>
                      <Text style={{ ...FONTS.h3, color: COLORS.accent2 }}>
                        {item?.title}
                      </Text>
                      <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
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
                      color={COLORS.gray4}
                    />
                  )}
                </Pressable>
              ))}
            </View>

            <View
              style={{
                marginTop: SIZES.base6,
                height: SIZES.hp(2),
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

        {currentStep == 1 && (
          <KeyboardAvoidingView keyboardBottomOffset={SIZES.base5}>
            {selectedOption?.id == 1 && (
              <View>
                <Text style={styles.header}>
                  {"Tell us about\nyour business"}
                </Text>
                {completeregloading ? (
                  <ActivityIndicator size="large" color={COLORS.tertiary} />
                ) : null}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: SIZES.base2,
                    marginTop: SIZES.base,
                  }}
                >
                  <TouchableOpacity onPress={uploadImage}>
                    <Image
                      source={image ? { uri: image } : placeholder}
                      style={{
                        width: SIZES.base10,
                        height: SIZES.base10,
                        backgroundColor: COLORS.gray4,
                        borderRadius: SIZES.base10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </TouchableOpacity>
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
                    placeholder="street address, district, city, state, country"
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
                    onPress={getStartedBusiness}
                    fill={true}
                  />
                  <CustomButton text={"Back"} onPress={goBack} fill={false} />
                </View>
              </View>
            )}
            {selectedOption?.id == 2 && (
              <View>
                <Text style={styles.header}>{"Tell us about\nyourself"}</Text>
                {completeregloading ? (
                  <ActivityIndicator size="large" color={COLORS.tertiary} />
                ) : null}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: SIZES.base2,
                    marginVertical: SIZES.base,
                  }}
                >
                  <TouchableOpacity onPress={uploadImage}>
                    <Image
                      source={image ? { uri: image } : placeholder}
                      style={{
                        width: SIZES.base10,
                        height: SIZES.base10,
                        backgroundColor: COLORS.gray4,
                        borderRadius: SIZES.base10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </TouchableOpacity>
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
                    placeholder="street address, district, city, state, country"
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
                    onPress={getStartedIndividual}
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
};

export default AddListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base3,
    paddingHorizontal: SIZES.base3,
    backgroundColor: COLORS.white,
  },
  header: {
    ...FONTS.h1,
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
