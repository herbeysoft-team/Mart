import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const COLORS = {
  background: "#031F2B",
  primary: "#0AA1DD",
  secondary: "#003D55",
  tertiary: "#757575",
  accent: "#343434",
  accent2: "#616161",
  white: "#FFFFFF",
  gray: "#424242",
  black: "#32343E",
  success: "#00C247",
  pink: "#EA1E61",
  error: "#FF3333",
  red: "#F54336",
  brown: "#7A5548",
  purple: "#9D28AC",
  lightGreen: "#8BC255",
  amber: "#FFC02D",
  indigo: "#3F51B2",
};

export const SIZES = {
  // GLOBAL SIZES
  base: 8,
  font: 14,
  radius: 30,
  padding: 8,
  padding2: 12,
  padding3: 16,

  // FONTS SIZES
  h0: hp(4.1),
  h1: hp(3.1),
  h2: hp(2.6),
  h3: hp(2.1),
  h4: hp(1.6),
  body1: hp(2.2),
  body2: hp(2.0),
  body3: hp(1.8),
  body4: hp(1.6),

  // APP DIMENSIONS
  width,
  height,
  wp,
  hp,
};

export const FONTS = {
  header: { fontFamily: "semi", fontSize: SIZES.h0, fontWeight: "700" },
  h1: { fontFamily: "semi", fontSize: SIZES.h1, fontWeight: "700" },
  h2: { fontFamily: "semi", fontSize: SIZES.h2, fontWeight:"700" },
  h3: { fontFamily: "semi", fontSize: SIZES.h3, fontWeight: "700" },
  h4: { fontFamily: "semi", fontSize: SIZES.h4, fontWeight: "700" },
  body1: { fontFamily: "medium", fontSize: SIZES.body1, fontWeight: "400" },
  body2: { fontFamily: "medium", fontSize: SIZES.body2, fontWeight: "400" },
  body3: { fontFamily: "medium", fontSize: SIZES.body3, fontWeight: "400" },
  body4: { fontFamily: "medium", fontSize: SIZES.body4, fontWeight: "400" },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
