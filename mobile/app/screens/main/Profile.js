import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../../constant";
import HeaderBig from "../../components/general/HeaderBig";
import ProfilePic from "../../../assets/profilepic.jpeg";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import GetVerifiedModel from "../../components/general/GetVerifiedModel";
import LogOutModel from "../../components/general/LogOutModel";

const Profile = ({ navigation }) => {
  const [openGetVerified, setOpenGetVerified] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);

  const gotoEditProfle = () => {
    navigation.navigate("Edit-Profile");
  };

  const gotoGetVerifiedModal = () => {
    setOpenGetVerified(true);
  };

  const gotoLogOutModal = () => {
    setOpenLogOut(true);
  };

  const gotoLogOut = () => {
    navigation.navigate("Onboard");
    setOpenLogOut(false);
  };

  const gotoGetVerified = () => {
    navigation.navigate("Get-Verified");
    setOpenGetVerified(false);
  };

  const gotoMyListing = () => {
    navigation.navigate("My-Listing");
  };

  const gotoMyOrders = () => {
    navigation.navigate("My-Order");
  };

  const gotoMyDeliveryRequests = () => {
    navigation.navigate("Delivery-Request");
  };

  const gotoInsights = () => {
    navigation.navigate("Insight");
  };

  const gotoWallet = () => {
    navigation.navigate("Wallet");
  };

  const gotoRating = () => {
    navigation.navigate("Rating");
  };

  const gotoSetting = () => {
    navigation.navigate("Setting");
  };

  const gotoMySubscription = () => {
    navigation.navigate("My-Subscription");
  };

  const gotoHelp = () => {
    navigation.navigate("Help");
  };

  const gotoChangePassword = () => {
    navigation.navigate("Change-Password");
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBig title={"Profile"}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* user section */}
        <View style={styles.userSection}>
          <Pressable onPress={gotoEditProfle}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <Image
                  source={ProfilePic}
                  style={{
                    height: SIZES.base6,
                    width: SIZES.base6,
                    borderRadius: SIZES.base6,
                  }}
                />
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: SIZES.base,
                    }}
                  >
                    <Text style={{ ...FONTS.h3, color: COLORS.gray }}>
                      John Anderson
                    </Text>
                    <MaterialIcons
                      name="verified"
                      size={SIZES.base2}
                      color={COLORS.primary}
                    />
                  </View>
                  <Text style={{ ...FONTS.body4, color: COLORS.gray3 }}>
                    kelvin@gmail.com
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoGetVerifiedModal}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Octicons
                    name="verified"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Get Verified
                  </Text>
                  <View
                    style={{
                      borderColor: COLORS.amber,
                      borderWidth: SIZES.thin,
                      paddingHorizontal: SIZES.base,
                      borderRadius: SIZES.base,
                    }}
                  >
                    <Text style={{ ...FONTS.body4, color: COLORS.amber }}>
                      Pending
                    </Text>
                  </View>
                </View>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
        </View>

        {/* next section */}
        <View style={styles.userSection}>
          <Pressable onPress={gotoMyListing}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.red,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Ionicons
                    name="grid-outline"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    My Listings
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoMyOrders}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.pink,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather name="box" size={SIZES.base2} color={COLORS.white} />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    My Orders
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoMyDeliveryRequests}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.brown,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather
                    name="truck"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Delivery Requests
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoInsights}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.purple,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <MaterialIcons
                    name="insights"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Insights
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoWallet}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.lightGreen,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <SimpleLineIcons
                    name="wallet"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Wallet
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoRating}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.amber,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather
                    name="star"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Ratings & Reviews
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
        </View>

        {/* next section */}
        <View style={styles.userSection}>
          <Pressable onPress={gotoSetting}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.blue,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather
                    name="settings"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Settings
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoMySubscription}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.cadetBlue,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <FontAwesome
                    name="money"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    My Subscription
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoHelp}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.indigo,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather
                    name="help-circle"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Help & Support
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoChangePassword}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.tealGreen,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <MaterialIcons
                    name="insights"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Change Password
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
          <View
            style={{
              borderBottomColor: COLORS.gray4,
              borderBottomWidth: SIZES.thin,
              marginTop: SIZES.base,
            }}
          />
          <Pressable onPress={gotoLogOutModal}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.base2,
                }}
              >
                <View
                  style={{
                    width: SIZES.base4,
                    height: SIZES.base4,
                    backgroundColor: COLORS.gray3,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base,
                  }}
                >
                  <Feather
                    name="log-out"
                    size={SIZES.base2}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: SIZES.base,
                  }}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.gray3 }}>
                    Log Out
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={SIZES.base2}
                color={COLORS.tertiary}
              />
            </View>
          </Pressable>
        </View>
        <GetVerifiedModel
          openGetVerifiedModel={openGetVerified}
          setOpenGetVerifiedModel={setOpenGetVerified}
          gotoGetVerified={gotoGetVerified}
        />
        <LogOutModel
          openLogOutModel={openLogOut}
          setOpenLogOutModel={setOpenLogOut}
          gotoLogOut={gotoLogOut}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

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
