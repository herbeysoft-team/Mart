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
  listingoption,
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
import ListingAddedModel from "../../components/general/ListingAddedModel";
import {
  getProductCategory,
  getEventCategory,
  getServiceCategory,
} from "../../context/features/categorySlice";

import {
  addListing,
  setListingStatus,
} from "../../context/features/listingSlice";
import LoadingOverlay from "../../components/general/LoadingOverlay";

const AddListing = ({ navigation }) => {
  const steps = [1, 2];
  const dispatch = useDispatch();
  const [openListingAdddedModel, setOpenListingAddedModel] = useState(false);
  const { productCategory, eventCategory, serviceCategory } = useSelector(
    (state) => state.category
  );

  const { loadingaddlisting, errorfileloading, addlistingstatus } = useSelector(
    (state) => state.listing
  );

  useEffect(() => {
    dispatch(getProductCategory("product"));
    dispatch(getEventCategory("event"));
    dispatch(getServiceCategory("service"));
  }, []);

  const memoizedProductCategory = useMemo(
    () => productCategory,
    [productCategory]
  );
  const memoizedEventCategory = useMemo(() => eventCategory, [eventCategory]);
  const memoizedServiceCategory = useMemo(
    () => serviceCategory,
    [serviceCategory]
  );

  useEffect(() => {
    addlistingstatus && gotoListingAdded();
  }, [addlistingstatus]);

  const gotoListingAdded = () => {
    setOpenListingAddedModel(true);
    setTimeout(() => {
      setServiceName("");
      setProductName("");
      setEventName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setQuantity("");
      setLocation("");
      setTags([]);
      setImages([]);
      setUnit("");
      setTo("");
      setFrom("");
      setAvailability("");
      setTime("");
      setDate("");
    }, 1000);
  };

  const gotoHome = () => {
    setOpenListingAddedModel(false);
    dispatch(setListingStatus());
    navigation.navigate("Home");
  };

  const daysAvailableOptions = [
    { label: "Mon-Fri", value: "Mon-Fri" },
    { label: "Weekends", value: "Weekends" },
    { label: "Everyday", value: "Everyday" },
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];

  const productUnits = [
    { label: "Piece", value: "Piece" },
    { label: "Unit", value: "Unit" },
    { label: "Kilogram (kg)", value: "Kilogram" },
    { label: "Gram (g)", value: "Gram" },
    { label: "Liter (L)", value: "Liter" },
    { label: "Meter (m)", value: "Meter" },
    { label: "Dozen", value: "Dozen" },
    { label: "Carton", value: "Carton" },
    { label: "Bundle", value: "Bundle" },
  ];

  const serviceUnits = [
    { label: "Hour", value: "Hour" },
    { label: "Session", value: "Session" },
    { label: "Consultation", value: "Consultation" },
    { label: "Visit", value: "Visit" },
    { label: "Project", value: "Project" },
  ];

  const eventUnits = [
    { label: "Ticket", value: "Ticket" },
    { label: "Seat", value: "Seat" },
    { label: "Pass", value: "Pass" },
    { label: "Entry", value: "Entry" },
  ];

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

  const handleSelectedFromTime = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setFrom(formattedTime);
  };

  const handleSelectedToTime = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTo(formattedTime);
  };

  const handleSelectedTime = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(formattedTime);
  };

  const handleSelectedDate = (date) => {
    const selectedDate = new Date(date);

    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;

    setDate(formattedDate);
  };

  const handleDropdownChange = (value) => {
    setCategory(value);
  };

  const handleServiceAvailablity = (value) => {
    setAvailability(value);
  };

  const handleProductUnitChange = (value) => {
    setUnit(value);
  };

  const handleAddTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleGoBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddProduct = async () => {
    if (
      !productname ||
      !description ||
      !price ||
      !quantity ||
      !category ||
      !location ||
      !tags ||
      !unit ||
      !images
    ) {
      Toast.show({
        type: "info",
        text1: "All field required!!!",
      });
    } else {
      const formData = new FormData();
      try {
        images.forEach((image, index) => {
          formData.append(`files`, {
            uri: image,
            name: `image_${index}.jpg`,
            type: "image/jpeg",
          });
        });

        formData.append("type", "product");
        formData.append("name", productname);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("location", location);
        formData.append("tags", tags);
        formData.append("quantity", quantity);
        formData.append("unit", unit);

        dispatch(addListing({ formData, Toast }));
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error,
        });
        console.log(error);
      }
    }
  };

  const handleAddService = () => {
    if (
      !servicename ||
      !description ||
      !price ||
      !category ||
      !from ||
      !to ||
      !location ||
      !tags ||
      !unit ||
      !images
    ) {
      Toast.show({
        type: "info",
        text1: "All field required!!!",
      });
    } else {
      const formData = new FormData();
      try {
        images.forEach((image, index) => {
          formData.append(`files`, {
            uri: image,
            name: `image_${index}.jpg`,
            type: "image/jpeg",
          });
        });

        formData.append("type", "service");
        formData.append("name", servicename);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("location", location);
        formData.append("tags", tags);
        formData.append("quantity", quantity);
        formData.append("unit", unit);
        formData.append("available", availability);
        formData.append("from", from);
        formData.append("to", to);

        dispatch(addListing({ formData, Toast }));
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error,
        });
        console.log(error);
      }
    }
  };

  const handleAddEvent = () => {
    if (
      !eventname ||
      !description ||
      !price ||
      !category ||
      !time ||
      !date ||
      !location ||
      !tags ||
      !unit ||
      !images
    ) {
      Toast.show({
        type: "info",
        text1: "All field required!!!",
      });
    } else {
      const formData = new FormData();
      try {
        images.forEach((image, index) => {
          formData.append(`files`, {
            uri: image,
            name: `image_${index}.jpg`,
            type: "image/jpeg",
          });
        });

        formData.append("type", "event");
        formData.append("name", eventname);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("location", location);
        formData.append("tags", tags);
        formData.append("unit", unit);
        formData.append("time", time);
        formData.append("date", date);

        dispatch(addListing({ formData, Toast }));
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error,
        });
        console.log(error);
      }
    }
  };

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

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const uploadImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const maxSize = 2 * 1024 * 1024; // 2MB
      const selectedImages = result.assets;

      const validImages = selectedImages.filter((image) => {
        const imageSize = image.fileSize;
        return imageSize <= maxSize;
      });

      if (validImages.length > 0) {
        const newImageUris = validImages.map((image) => image.uri);
        setImages((prevImages) => [...prevImages, ...newImageUris]);
      } else {
        Toast.show({
          type: "info",
          text1: "Selected image(s) are too large.",
          text2: "Please select image(s) smaller than 2MB",
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderListing title={"New Listing"} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Indicator container */}
        <View
          style={{
            flex: 1,
            paddingBottom: SIZES.base3,
            flexDirection: "row",
            marginTop: SIZES.base2,
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
              {listingoption?.map((item, index) => (
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
                marginTop: SIZES.base2,
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
          <KeyboardAvoidingView
            keyboardVerticalOffset={SIZES.base5}
            behavior="padding"
          >
            {selectedOption?.id == 1 && (
              <View style={{ marginBottom: SIZES.base5 }}>
                <Text style={styles.header}>{"Listing Details"}</Text>
                {/* {loadingaddlisting ? (
                  <ActivityIndicator size="large" color={COLORS.tertiary} />
                ) : null} */}

                {/* form here */}
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Product Name</Text>
                  <CustomTextInput
                    value={productname}
                    onChangeText={(text) => setProductName(text)}
                    placeholder="Enter Product Name"
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Description</Text>
                  <CustomMultiLineInput
                    multiline={true}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Enter Item Description"
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Category</Text>
                  <CustomTextInputWithPicker
                    placeholder="Select Category"
                    items={memoizedProductCategory}
                    onValueChange={handleDropdownChange}
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Location</Text>
                  <CustomTextInputWithIcon
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                    placeholder="Enter Location"
                    icon="enviromento"
                    // textIcon="₦"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: SIZES.base,
                    flex: 1,
                  }}
                >
                  <View style={{ marginTop: SIZES.base, flex: 1.5 }}>
                    <Text style={styles.inputheading}>Price</Text>
                    <CustomTextInputWithIcon
                      value={price}
                      onChangeText={(text) => setPrice(text)}
                      placeholder="3500"
                      textIcon="₦"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ marginTop: SIZES.base, flex: 1 }}>
                    <Text style={styles.inputheading}>Quantity</Text>
                    <CustomTextInput
                      value={quantity}
                      onChangeText={(text) => setQuantity(text)}
                      placeholder="100"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Unit</Text>
                  <CustomTextInputWithPicker
                    placeholder="Select Unit"
                    items={productUnits}
                    onValueChange={handleProductUnitChange}
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Tags</Text>
                  <CustomInputTags
                    addTag={handleAddTag}
                    removeTag={handleRemoveTag}
                  />
                  <Text style={styles.underheading}>
                    This helps your listing reach more people
                  </Text>
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Add Product Images</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {images &&
                      images.map((image, index) => (
                        <View key={index} style={{ position: "relative" }}>
                          <Image
                            source={image ? { uri: image } : placeholder}
                            style={{
                              width: SIZES.base10,
                              height: SIZES.base10,
                              backgroundColor: COLORS.gray4,
                              borderRadius: SIZES.base,
                              alignItems: "center",
                              justifyContent: "center",
                              margin: SIZES.base,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => removeImage(index)}
                            style={{
                              position: "absolute",
                              top: SIZES.thickness,
                              right: SIZES.thickness,
                              backgroundColor: COLORS.white,
                              borderRadius: SIZES.base,
                              padding: SIZES.base / 2,
                            }}
                          >
                            <AntDesign
                              name="close"
                              size={SIZES.base}
                              color={COLORS.gray3}
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    <TouchableOpacity onPress={uploadImages}>
                      <View
                        style={{
                          width: SIZES.base10,
                          height: SIZES.base10,
                          backgroundColor: COLORS.white,
                          borderRadius: SIZES.base,
                          alignItems: "center",
                          justifyContent: "center",
                          borderColor: COLORS.gray4,
                          borderWidth: SIZES.thin,
                          margin: SIZES.base,
                        }}
                      >
                        <AntDesign
                          name="picture"
                          size={SIZES.base3}
                          color={COLORS.gray4}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <LoadingOverlay visible={loadingaddlisting} />

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: SIZES.base,
                    marginTop: SIZES.base3,
                  }}
                >
                  <CustomButton
                    text={"Add Listing"}
                    onPress={handleAddProduct}
                    fill={true}
                  />
                  <CustomButton
                    text={"Back"}
                    onPress={handleGoBack}
                    fill={false}
                  />
                </View>
              </View>
            )}
            {selectedOption?.id == 2 && (
              <View style={{ marginBottom: SIZES.base5 }}>
                <Text style={styles.header}>{"Listing Details"}</Text>
                {/* {completeregloading ? (
                 <ActivityIndicator size="large" color={COLORS.tertiary} />
               ) : null} */}
                <LoadingOverlay visible={loadingaddlisting} />
                {/* form here */}
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Service Name</Text>
                  <CustomTextInput
                    value={servicename}
                    onChangeText={(text) => setServiceName(text)}
                    placeholder="Enter Service Name"
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Description</Text>
                  <CustomMultiLineInput
                    multiline={true}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Enter Item Description"
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Category</Text>
                  <CustomTextInputWithPicker
                    placeholder="Select Category"
                    items={memoizedServiceCategory}
                    onValueChange={handleDropdownChange}
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Location</Text>
                  <CustomTextInputWithIcon
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                    placeholder="Enter Location"
                    icon="enviromento"
                    // textIcon="₦"
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Price</Text>
                  <CustomTextInputWithIcon
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    placeholder="Enter Price"
                    textIcon="₦"
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Days Available</Text>
                  <CustomTextInputWithPicker
                    placeholder="Select Availability"
                    items={daysAvailableOptions}
                    onValueChange={handleServiceAvailablity}
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Unit</Text>
                  <CustomTextInputWithPicker
                    placeholder="Select Unit"
                    items={serviceUnits}
                    onValueChange={handleProductUnitChange}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: SIZES.base,
                    flex: 1,
                  }}
                >
                  <View style={{ marginTop: SIZES.base, flex: 1 }}>
                    <Text style={styles.inputheading}>From</Text>
                    <CustomDateInputWithIcon
                      placeholder="09:00"
                      icon="time-outline"
                      onSelectedTimeChange={handleSelectedFromTime}
                      mode="time"
                    />
                  </View>
                  <View style={{ marginTop: SIZES.base, flex: 1 }}>
                    <Text style={styles.inputheading}>To</Text>
                    <CustomDateInputWithIcon
                      placeholder="9:00"
                      icon="time-outline"
                      onSelectedTimeChange={handleSelectedToTime}
                      mode="time"
                    />
                  </View>
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Tags</Text>
                  <CustomInputTags
                    addTag={handleAddTag}
                    removeTag={handleRemoveTag}
                  />
                  <Text style={styles.underheading}>
                    This helps your listing reach more people
                  </Text>
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Add Service Images</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {images &&
                      images.map((image, index) => (
                        <View key={index} style={{ position: "relative" }}>
                          <Image
                            source={image ? { uri: image } : placeholder}
                            style={{
                              width: SIZES.base10,
                              height: SIZES.base10,
                              backgroundColor: COLORS.gray4,
                              borderRadius: SIZES.base,
                              alignItems: "center",
                              justifyContent: "center",
                              margin: SIZES.base,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => removeImage(index)}
                            style={{
                              position: "absolute",
                              top: SIZES.thickness,
                              right: SIZES.thickness,
                              backgroundColor: COLORS.white,
                              borderRadius: SIZES.base,
                              padding: SIZES.base / 2,
                            }}
                          >
                            <AntDesign
                              name="close"
                              size={SIZES.base}
                              color={COLORS.gray3}
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    <TouchableOpacity onPress={uploadImages}>
                      <View
                        style={{
                          width: SIZES.base10,
                          height: SIZES.base10,
                          backgroundColor: COLORS.white,
                          borderRadius: SIZES.base,
                          alignItems: "center",
                          justifyContent: "center",
                          borderColor: COLORS.gray4,
                          borderWidth: SIZES.thin,
                          margin: SIZES.base,
                        }}
                      >
                        <AntDesign
                          name="picture"
                          size={SIZES.base3}
                          color={COLORS.gray4}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <LoadingOverlay visible={loadingaddlisting} />

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: SIZES.base,
                    marginTop: SIZES.base3,
                  }}
                >
                  <CustomButton
                    text={"Add Listing"}
                    onPress={handleAddService}
                    fill={true}
                  />
                  <CustomButton
                    text={"Back"}
                    onPress={handleGoBack}
                    fill={false}
                  />
                </View>
              </View>
            )}
            {selectedOption?.id == 3 && (
              <View style={{ marginBottom: SIZES.base5 }}>
                <Text style={styles.header}>{"Listing Details"}</Text>
                {/* {completeregloading ? (
                 <ActivityIndicator size="large" color={COLORS.tertiary} />
               ) : null} */}

                {/* form here */}
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Event Name</Text>
                  <CustomTextInput
                    value={eventname}
                    onChangeText={(text) => setEventName(text)}
                    placeholder="Enter Event Name"
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Description</Text>
                  <CustomMultiLineInput
                    multiline={true}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Enter Item Description"
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Category</Text>
                  <CustomTextInputWithPicker
                    placeholder="Select Category"
                    items={memoizedEventCategory}
                    onValueChange={handleDropdownChange}
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Location</Text>
                  <CustomTextInputWithIcon
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                    placeholder="Enter Location"
                    icon="enviromento"
                    // textIcon="₦"
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Unit</Text>
                  <CustomTextInputWithPicker
                    placeholder="Select Unit"
                    items={eventUnits}
                    onValueChange={handleProductUnitChange}
                  />
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Price</Text>
                  <CustomTextInputWithIcon
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    placeholder="Price"
                    textIcon="₦"
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: SIZES.base,
                    flex: 1,
                  }}
                >
                  <View style={{ marginTop: SIZES.base, flex: 1 }}>
                    <Text style={styles.inputheading}>Date</Text>
                    <CustomDateInputWithIcon
                      placeholder="DD/MM/YYYY"
                      icon="ios-calendar-outline"
                      onSelectedTimeChange={handleSelectedDate}
                      mode="date"
                    />
                  </View>
                  <View style={{ marginTop: SIZES.base, flex: 1 }}>
                    <Text style={styles.inputheading}>Time</Text>
                    <CustomDateInputWithIcon
                      placeholder="09:00"
                      icon="time-outline"
                      onSelectedTimeChange={handleSelectedTime}
                      mode="time"
                    />
                  </View>
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Tags</Text>
                  <CustomInputTags
                    addTag={handleAddTag}
                    removeTag={handleRemoveTag}
                  />
                  <Text style={styles.underheading}>
                    This helps your listing reach more people
                  </Text>
                </View>
                <View style={{ marginTop: SIZES.base }}>
                  <Text style={styles.inputheading}>Add Event Images</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {images &&
                      images.map((image, index) => (
                        <View key={index} style={{ position: "relative" }}>
                          <Image
                            source={image ? { uri: image } : placeholder}
                            style={{
                              width: SIZES.base10,
                              height: SIZES.base10,
                              backgroundColor: COLORS.gray4,
                              borderRadius: SIZES.base,
                              alignItems: "center",
                              justifyContent: "center",
                              margin: SIZES.base,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => removeImage(index)}
                            style={{
                              position: "absolute",
                              top: SIZES.thickness,
                              right: SIZES.thickness,
                              backgroundColor: COLORS.white,
                              borderRadius: SIZES.base,
                              padding: SIZES.base / 2,
                            }}
                          >
                            <AntDesign
                              name="close"
                              size={SIZES.base}
                              color={COLORS.gray3}
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    <TouchableOpacity onPress={uploadImages}>
                      <View
                        style={{
                          width: SIZES.base10,
                          height: SIZES.base10,
                          backgroundColor: COLORS.white,
                          borderRadius: SIZES.base,
                          alignItems: "center",
                          justifyContent: "center",
                          borderColor: COLORS.gray4,
                          borderWidth: SIZES.thin,
                          margin: SIZES.base,
                        }}
                      >
                        <AntDesign
                          name="picture"
                          size={SIZES.base3}
                          color={COLORS.gray4}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <LoadingOverlay visible={loadingaddlisting} />

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: SIZES.base,
                    marginTop: SIZES.base3,
                  }}
                >
                  <CustomButton
                    text={"Add Listing"}
                    onPress={handleAddEvent}
                    fill={true}
                  />
                  <CustomButton
                    text={"Back"}
                    onPress={handleGoBack}
                    fill={false}
                  />
                </View>
              </View>
            )}
            {selectedOption?.id == 4 && (
              <View style={{ marginBottom: SIZES.base5 }}>
                <Text style={styles.header}>{"Listing Details"}</Text>
                {/* {completeregloading ? (
                 <ActivityIndicator size="large" color={COLORS.tertiary} />
               ) : null} */}

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
                  <CustomButton
                    text={"Back"}
                    onPress={handleGoBack}
                    fill={false}
                  />
                </View>
              </View>
            )}
          </KeyboardAvoidingView>
        )}
        <ListingAddedModel
          openListingAddedModel={openListingAdddedModel}
          gotoHome={gotoHome}
        />
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
